// import React, { useContext, useRef, useState } from 'react';
// import { assets } from "../../assets/assets";
// import "./main.css";
// import { Context } from "../../context/Context";
// import { useLogout } from "../login/logout";
// import { useAuthContext } from "../../reducer/useAuthContext";
// import { uploadPdf, saveUserdata } from '../../services/Apis';

// const Dropdown = ({ handleLogoutClick }) => {
//     const { user } = useAuthContext();
//     return (
//         <div className="dropdown-menu">
//             <ul>
//                 <li>{user.email}</li>
//                 <li>
//                     <button className="logout-button" onClick={handleLogoutClick}>
//                         Logout
//                     </button>
//                 </li>
//             </ul>
//         </div>
//     );
// };

// const Main = () => {
//     const { setInput, input, setResultText } = useContext(Context);
//     // const {setResultText} = useContext(Context);
//     // const {input, setInput} = useState("");
//     const { logout } = useLogout();
//     const { user } = useAuthContext();
//     const inpFileRef = useRef(null);
//     const [extractedText, setExtractedText] = useState('');
//     const [showResults, setShowResults] = useState(false);
//     const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [link, setLink] = useState("");

//     const handleLinkClick = () => {
//         setIsModalOpen(true);
//     };

//     const handleModalClose = () => {
//         setIsModalOpen(false);
//         setLink("");
//     };

//     const handleLinkSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const newdata = {
//                 email: user.email, data: link
//             };
//             const response = await saveUserdata(newdata);
//             console.log(response.newdata);
//             setInput(link);
//             setIsModalOpen(false);
//         } catch (error) {
//             console.error('Error saving link', error);
//         }
//     };

//     const handleDropdownClick = () => {
//         setIsDropdownVisible(!isDropdownVisible);
//     };

//     const handleUpload = async () => {
//         try {
//             const file = inpFileRef.current.files[0];
//             const text = await uploadPdf(file);
//             setExtractedText(text.trim());
//             setResultText(text.trim());
//             setShowResults(true);
//         } catch (error) {
//             console.error('Error uploading file:', error);
//         }
//     };

//     const handleFileSelect = () => {
//         inpFileRef.current.click();
//     };

//     const handleLogoutClick = () => {
//         logout();
//     };

//     const handleSentClick = () => {
//         console.log('Sent');
//     };

//     const handleCardClick = (promptText) => {
//         setInput(promptText);
//     };

//     return (
//         <div className="main">
//             <div className="nav">
//                 <p>PDF</p>
//                 <button onClick={handleDropdownClick} className="image-button">
//                     <img src={assets.user} alt="User" />
//                 </button>
//                 {isDropdownVisible && <Dropdown handleLogoutClick={handleLogoutClick} />}
//             </div>
//             <div className="main-container">
//                 {!showResults ? (
//                     <>
//                         <div className="greet">
//                             <p><span>Hello, {user.name}</span></p>
//                             <p>INPUT YOUR LINK</p>
//                         </div>
//                     </>
//                 ) : (
//                     <div className="result">
//                         <div className="result-title">
//                             <img src={assets.user} alt="User" />
//                             <p>Recent Prompt</p>
//                         </div>
//                         <div className="result-data">
//                             <img src={assets.gemini_icon} alt="Gemini" />
//                             <p>{extractedText}</p>
//                         </div>
//                     </div>
//                 )}
//                 <div className="main-bottom">
//                     <div className="search-box">
//                         <input
//                             onChange={(e) => setInput(e.target.value)}
//                             value={input}
//                             type="text"
//                             placeholder="ENTER THE LINK"
//                         />
//                         <div>
//                             <img src={assets.gallery_icon} alt="Open" onClick={handleFileSelect} />
//                             <img src={assets.mic_icon} alt="Mic" />
//                             <img src={assets.link_icon} alt="Link Icon" onClick={handleLinkClick} />
//                             <img src={assets.send_icon} alt="Send" onClick={handleSentClick} />
//                         </div>
//                         <input
//                             type="file"
//                             ref={inpFileRef}
//                             style={{ display: 'none' }}
//                             onChange={handleUpload}
//                         />
//                         {showResults && (
//                             <div className="main-bottom">
//                                 <div className="bottom-info">
//                                     <p>IT's A PROJECT</p>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             {isModalOpen && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <span className="close" onClick={handleModalClose}>
//                             &times;
//                         </span>
//                         <h2>Enter Link</h2>
//                         <input
//                             type="text"
//                             value={link}
//                             onChange={(e) => setLink(e.target.value)}
//                             placeholder="Enter your link here"
//                         />
//                         <button onClick={handleLinkSubmit}>Submit</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Main;

import React, { useContext, useRef, useState } from 'react';
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";
import { useLogout } from "../login/logout";
import { useAuthContext } from "../../reducer/useAuthContext";
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
                email: user.email, data: link
            };
            const response = await saveUserdata(newdata);
            console.log(response.newdata);
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
            setShowResults(true);
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

    const handleSentClick = () => {
        console.log('Sent');
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
                {!showResults ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, {user.name}</span></p>
                            <p>INPUT YOUR LINK</p>
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user} alt="User" />
                            <p>Recent Prompt</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="Gemini" />
                            <p>{extractedText}</p>
                        </div>
                    </div>
                )}
                <div className="main-bottom">
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
                        {showResults && (
                            <div className="main-bottom">
                                <div className="bottom-info">
                                    <p>IT's A PROJECT</p>
                                </div>
                            </div>
                        )}
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
        </div>
    );
};

export default Main;
