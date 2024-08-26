import React, { useContext, useRef, useState } from 'react';
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";
import { useLogout } from "../login/logout";
import { useAuthContext } from "../../reducer/useAuthContext";
import { toast, ToastContainer } from 'react-toastify';
import { getAnswer, saveAnswer } from '../../services/Apis'; 
import { uploadPdf, saveUserdata } from '../../services/Apis';

const Dropdown = ({ handleLogoutClick }) => {
    const { user } = useAuthContext();
    return (
        <div className="dropdown-menu">
            <ul>
                <li>{user.email}</li>
                <li>
                    <button className="logout-button" onClick={handleLogoutClick}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

const Main = () => {
    const { setResultText } = useContext(Context);
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const inpFileRef = useRef(null);
    const [extractedText, setExtractedText] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [link, setLink] = useState("");
    const [mainInput, setMainInput] = useState("");
    const [answer, setAnswer] = useState(""); 
    const [qaList, setQaList] = useState([]); 

    const handleLinkClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setLink("");
    };

    const handleLinkSubmit = async (e) => {
        e.preventDefault();
        try {
            const newdata = {
                email: user.email,
                data: link
            };
            const response = await saveUserdata(newdata);
            console.log(response.data.answer);
            const newQa = { question: "summarize", answer: response.data.answer };
            setQaList([...qaList, newQa]); 
            setAnswer(response.data.answer); 
           setShowResults(true); 
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving link', error);
        }
    };

    const handleDropdownClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleUpload = async () => {
        try {
            const file = inpFileRef.current.files[0];
            const text = await uploadPdf(file);
            setExtractedText(text.trim());
            setResultText(text.trim());
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleFileSelect = () => {
        inpFileRef.current.click();
    };

    const handleLogoutClick = () => {
        logout();
    };

    const handleSentClick = async (e) => {
        e.preventDefault();
        console.log('Sent');
        if (mainInput === "") {
            toast.error("Enter the text");
            return; 
        }
        try {
            const data = { username: "Sathvik", query: mainInput }; 
            const response = await getAnswer(data); 
            console.log(response.data.answer);
            const newQa = { question: mainInput, answer: response.data.answer };
            setQaList([...qaList, newQa]); 
            setAnswer(response.data.answer); 
           setShowResults(true); 
            setMainInput(""); 
        } catch (error) {
            console.error('Error getting answer:', error.response ? error.response.data : error.message);
        }
    };

    const handleSaveClick = async (qa) => {
        try {
            const response = await saveAnswer({
                email: user.email,
                // question: qa.question,
                answer: qa.answer
            });
            toast.success('Answer saved successfully');
        } catch (error) {
            console.error('Error saving answer:', error);
            toast.error('Error saving answer');
        }
    };

    const handleCardClick = (promptText) => {
        setMainInput(promptText);
    };

    return (
        <div className="main">
            <div className="nav">
                <p>PDF</p>
                <button onClick={handleDropdownClick} className="image-button">
                    <img src={assets.user} alt="User" />
                </button>
                {isDropdownVisible && <Dropdown handleLogoutClick={handleLogoutClick} />}
            </div>
            <div className="main-container">
                <div className="greet">
                    <p><span>Hello, {user.name}</span></p>
                    <p>INPUT YOUR LINK</p>
                </div>
                <div className="main-bottom">
                    {showResults && (
                        <div className="main-bottom">
                            {qaList.map((qa, index) => (
                                <div key={index} className="result">
                                    <div className="result-title">
                                        <img src={assets.user} alt="User" />
                                        <p>Recent Prompt</p>
                                        <p>{qa.question}</p> 
                                    </div>
                                    <div className="result-data">
                                        <img src={assets.gemini_icon} alt="Gemini" />
                                        
                                        <p>{qa.answer}</p>
                                        <button onClick={() => handleSaveClick(qa)}>Save</button> 
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="search-box">
                        <input
                            onChange={(e) => setMainInput(e.target.value)}
                            value={mainInput}
                            type="text"
                            placeholder="ENTER THE TEXT"
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="Open" onClick={handleFileSelect} />
                            <img src={assets.mic_icon} alt="Mic" />
                            <img src={assets.link_icon} alt="Link Icon" onClick={handleLinkClick} />
                            <img src={assets.send_icon} alt="Send" onClick={handleSentClick} />
                        </div>
                        <input
                            type="file"
                            ref={inpFileRef}
                            style={{ display: 'none' }}
                            onChange={handleUpload}
                        />
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleModalClose}>
                            &times;
                        </span>
                        <h2>Enter Link</h2>
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Enter your link here"
                        />
                        <button onClick={handleLinkSubmit}>Submit</button>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default Main;