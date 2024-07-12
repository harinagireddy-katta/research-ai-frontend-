import React, { useEffect, useState } from "react";
import axios from "axios";
// import GenVid from "./Videogen";
// import QuizApp from "./questions";
// import DsaCompiler from "./dsa";

const Pdfreader = ({ setResultText }) => {
    const [resultText, setLocalResultText] = useState('');
    const inpFileRef = React.createRef();
    const [enhance, setEnhance] = useState('');
    const [stack, setStack] = useState(["Hello! Ask me a question?"]);
    const [usermessage, setUser] = useState('');

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('pdfFile', inpFileRef.current.files[0]);

        fetch('/extract-text', {
            method: 'post',
            body: formData,
        })
        .then(response => response.text())
        .then(extractedText => {
            setLocalResultText(extractedText.trim());
            setResultText(extractedText.trim()); // Update parent state
        });
    };

    const enhanceText = () => {
        axios.post('/enhancetext', { text: resultText })
            .then(response => setEnhance(response.data.analysis))
            .catch(error => console.error(error));
    };

    const handleResponse = () => {
        setStack([...stack, usermessage]);
        axios.post("/lessonresponse", { text: resultText, ques: usermessage })
            .then(response => setStack([...stack, response.data.analysis]))
            .catch(error => console.error(error));
    };

    const handleSendMessage = () => {
        setStack([...stack, usermessage]);
    };

    const handleUpdateData = (event) => {
        setUser(event.target.value);
    };

    return (
        <section>
            <h1 className="heading">Select your PDF file ...</h1>
            <div className="add-comment2">
                <input type="file" className="globalbtn" ref={inpFileRef} />
                <button type="button" className="inline-option-btn" onClick={handleUpload}>Upload</button>
            </div>
            {resultText && (
                <>
                    <div className="globalcontainer">
                        <textarea
                            className="globalsub"
                            style={{ border: '1px rgba(0, 0, 0, 0.59) solid' }}
                            value={resultText}
                            placeholder="Your PDF text will appear here..."
                            readOnly
                        />
                    </div>
                    <textarea
                        style={{
                            width: 254,
                            height: 682,
                            left: 1280,
                            top: 426,
                            position: 'absolute',
                            background: 'white',
                            border: '1px rgba(0, 0, 0, 0.59) solid',
                            borderRadius: 5
                        }}
                        value={stack.join("\n\n")}
                        placeholder="Neil tells ..."
                        readOnly
                    />
                    <input
                        type="text"
                        style={{
                            width: 239,
                            height: 104,
                            left: 1290,
                            top: 990,
                            position: 'absolute',
                            background: 'white',
                            borderRadius: 2,
                            border: '1px rgba(0, 0, 0, 0.59) solid'
                        }}
                        onChange={handleUpdateData}
                    />
                    <button
                        onClick={handleResponse}
                        style={{
                            width: 213,
                            height: 29,
                            left: 1300,
                            top: 1060,
                            position: 'absolute',
                            background: 'rgba(188, 19, 254, 0.68)',
                            borderRadius: 22
                        }}
                    >
                        Clarify!
                    </button>
                    {/* <div className="video-container">
                        <GenVid data={resultText} />
                        <QuizApp data={resultText} />
                        <DsaCompiler data={resultText} />
                    </div> */}
                </>
            )}
        </section>
    );
};

export default Pdfreader;
