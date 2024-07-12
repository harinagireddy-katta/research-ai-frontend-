// import React, { useContext, useRef } from "react";
// import { assets } from "../../assets/assets";
// import "./main.css";
// import { Context } from "../../context/Context";
// import { useLogout } from "../login/logout";
// import { useAuthContext } from "../../reducer/useAuthContext";

// const Main = () => {
// 	const { logout } = useLogout();
//   	const { user } = useAuthContext();
// 	const {
// 		onSent,
// 		recentPrompt,
// 		showResults,
// 		loading,
// 		resultData,
// 		setInput,
// 		input,
// 		setResultText,
// 	} = useContext(Context);
// 	//const inpFileRef = useRef(null);
// 	const inpFileRef = React.createRef();

// 	const handleCardClick = (promptText) => {
// 		setInput(promptText);
// 	};

// 	const handleClick = () => {
// 		logout();
// 	  };
	
// 	const handleUpload = () => {
// 		const formData = new FormData();
// 		formData.append('pdfFile', inpFileRef.current.files[0]);

// 		fetch('/extract-text', {
// 			method: 'post',
// 			body: formData,
// 		})
// 			.then(response => response.text())
// 			.then(extractedText => {
// 				setResultText(extractedText.trim());
// 			});
// 	};

// 	const handleFileSelect = () => {
// 		inpFileRef.current.click();
// 	};

// 	return (
// 		<div className="main">
// 			<div className="nav">
// 				<p>PDF</p>
// 				<button onClick={handleClick} className="image-button">
// 					<img src={assets.user} alt="User" />
// 				</button>
				
// 			</div>
// 			<div className="main-container">
// 				{!showResults ? (
// 					<>
// 						<div className="greet">
// 							<p><span>Hello, USER </span></p>
// 							<p>INPUT YOUR LINK</p>
// 						</div>
// 						<div className="cards">
// 							<div className="card" onClick={() => handleCardClick("D")}>
// 								<p>D</p>
// 								<img src={assets.compass_icon} alt="Compass" />
// 							</div>
// 							<div className="card" onClick={() => handleCardClick("C")}>
// 								<p>C</p>
// 								<img src={assets.message_icon} alt="Message" />
// 							</div>
// 							<div className="card" onClick={() => handleCardClick("B")}>
// 								<p>B</p>
// 								<img src={assets.bulb_icon} alt="Bulb" />
// 							</div>
// 							<div className="card" onClick={() => handleCardClick("A")}>
// 								<p>A</p>
// 								<img src={assets.code_icon} alt="Code" />
// 							</div>
// 						</div>
// 					</>
// 				) : (
// 					<div className="result">
// 						<div className="result-title">
// 							<img src={assets.user} alt="User" />
// 							<p>{recentPrompt}</p>
// 						</div>
// 						<div className="result-data">
// 							<img src={assets.gemini_icon} alt="Gemini" />
// 							{loading ? (
// 								<div className="loader">
// 									<hr />
// 									<hr />
// 									<hr />
// 								</div>
// 							) : (
// 								<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
// 							)}
// 						</div>
// 					</div>
// 				)}
//         <div className="main-bottom">
//           <div className="search-box">
//             <input
//               onChange={(e) => setInput(e.target.value)}
//               value={input}
//               type="text"
//               placeholder="ENTER THE LINK"
//             />
//             <div>
//               <img src={assets.gallery_icon} alt="" ref = {inpFileRef} onClick={handleFileSelect} />
//               <img src={assets.mic_icon} alt="" />
//               <img
//                 src={assets.send_icon}
//                 alt=""
//                 onClick={onSent}
//               />
//             </div>
//             <input
//               type="file"
//               ref={inpFileRef}
//               style={{ display: 'none' }}
//               onChange={handleUpload}
//             />
//           </div>
//           <div className="bottom-info">
//             <p>IT's A PROJECT</p>
//           </div>
//         </div>
//       </div>
//     </div>
// 	);
// };

// export default Main;

import React, { useContext, useRef, useState } from 'react';
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";
import { useLogout } from "../login/logout";
import { useAuthContext } from "../../reducer/useAuthContext";
import { uploadPdf } from '../../services/Apis';
import { saveUserdata } from '../../services/Apis';

const Dropdown = () => {
    const { user } = useAuthContext();
    return (
      <div className="dropdown-menu">
        <ul>
          <li>{user.email}</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>
    );
  };

const Main = () => {
    const { setInput, input, setResultText } = useContext(Context);
    const { logout } = useLogout();
    const { user } = useAuthContext(); 
    const inpFileRef = useRef(null);
    const [extractedText, setExtractedText] = useState('');
    const [showResults, setShowResults] = useState(false); 
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
	const [link, setLink] = useState("");

    const handleLinkClick = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
		setLink("");
	};

	const handleLinkSubmit = async (e) => {
		// console.log("Link submitted:", link);
		// setInput(link);
		// setIsModalOpen(false);
        e.preventDefault();
        try {
            const newdata = {
                email:user.email, data:link
            };
            const response = await saveUserdata(newdata);
            console.log(response.newdata);
            setInput(link);
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
        setInput(promptText);
    };

    return (
        <div className="main">
            <div className="nav">
                <p>PDF</p>
                {/* <button onClick={handleLogoutClick} className="image-button">
                    <img src={assets.user} alt="User" />
                </button> */}
                <button onClick={handleDropdownClick} className="image-button">
                    <img src={assets.user} alt="User" />
                </button>
                {isDropdownVisible && <Dropdown />}
            </div>
            <div className="main-container">
                {!showResults ? (
                    <>
                        <div className="greet">
                            <p><span>Hello, {user.email} </span></p>
                            <p>INPUT YOUR LINK</p>
                        </div>
                        {/* <div className="cards">
                            <div className="card" onClick={() => handleCardClick("D")}>
                                <p>D</p>
                                <img src={assets.compass_icon} alt="Compass" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("C")}>
                                <p>C</p>
                                <img src={assets.message_icon} alt="Message" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("B")}>
                                <p>B</p>
                                <img src={assets.bulb_icon} alt="Bulb" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("A")}>
                                <p>A</p>
                                <img src={assets.code_icon} alt="Code" />
                            </div>
                        </div> */}
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
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="ENTER THE LINK"
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="Open" onClick={handleFileSelect} />
                            <img src={assets.mic_icon} alt="Mic" />
                            <img
										src={assets.link_icon}
										alt="Link Icon"
										onClick={handleLinkClick}
									/>
                            <img
                                src={assets.send_icon}
                                alt="Send"
                                onClick={handleSentClick}
                            />
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
