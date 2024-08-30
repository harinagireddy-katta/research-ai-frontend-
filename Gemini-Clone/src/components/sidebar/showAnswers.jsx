import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../reducer/useAuthContext';
import { showSavedAns } from '../../services/Apis';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import "C:/languages/researchAI/G-30/Gemini-Clone/src/components/main/main.css"; // Ensure this CSS file is correctly linked

const ShowAnswers = () => {
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState('');
    const [popoverAnchor, setPopoverAnchor] = useState(null);
    const [image, setImage] = useState(null); // State for storing the image URL
    const [loading, setLoading] = useState(false); // State for loading status
    const [timeoutId, setTimeoutId] = useState(null); // State for timeout ID
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const email = user?.email || 'blabla@gmail.com'; // Default email
            const newdata = { email: email };
            const response = await showSavedAns(newdata);
            if (Array.isArray(response.data)) {
                setUserData(response.data);
            } else {
                setUserData([]);
                setError('Unexpected response format.');
            }
            setError('');
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError(err.response?.data?.error || 'An error occurred.');
            setUserData([]);
        }
    };

    useEffect(() => {
        fetchUserData(); 
    }, []); 

    const handleTextSelect = (e) => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (selectedText) {
            const range = selection.getRangeAt(0).getBoundingClientRect();
            setPopoverAnchor({
                top: range.top + window.scrollY,
                left: range.left + window.scrollX,
                text: selectedText
            });
        } else {
            setPopoverAnchor(null);
        }
    };

    const sendData = async (type) => {
        setLoading(true); // Set loading to true
        setImage(null); // Reset image before sending new request
        
        // Clear any previous timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Set a timeout for 6 seconds
        const id = setTimeout(() => {
            if (!image) {
                setLoading(false);
                setError('Insufficient data');
                setImage(null); // Ensure the image is cleared if timeout occurs
            }
        }, 10000);
        setTimeoutId(id);

        try {
            const email = user?.email || 'blabla@gmail.com'; // Default email
            const response = await axios.post('http://127.0.0.1:8000/plot', {
                username: email,
                type: type,
                data: popoverAnchor.text // Include the selected text
            });
            console.log('Data sent successfully:', response.data);
            
            // Set the image URL received from the server
            setImage(response.data.imageURL);
        } catch (error) {
            console.error('Error sending data:', error);
            setError('Failed to process the image');
        } finally {
            setLoading(false); // Set loading to false when done
        }
        
        setPopoverAnchor(null); // Close the popover after sending the data
    };

    const formatText = (text) => {
      // Handle bold headings (e.g., **Heading**)
      text = text.replace(/(?:\*\*)(.*?)(?:\*\*)/g, '<h2>$1</h2>');
      
      // Handle italic subheadings (e.g., *Subheading*)
      text = text.replace(/(?:\*)(.*?)(?:\*)/g, '<h3>$1</h3>');
      
      // Handle ordered lists (e.g., 1. Item)
      text = text.replace(/(?:^|\n)(\d+)\.\s+(.*?)(?=\n\d+\.|\n\n|\n$)/g, (match, number, content) => {
          return `<ol><li>${content}</li></ol>`;
      });
  
      // Handle unordered lists (e.g., * Item)
      text = text.replace(/(?:^|\n)\*\s+(.*?)(?=\n\*|\n\n|\n$)/g, (match, content) => {
          return `<ul><li class="normal-text">${content}</li></ul>`;
      });
  
      // Handle inline code (e.g., `code`)
      text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  
      // Handle block code (e.g., ```code```)
      text = text.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
  
      // Replace new lines with <br> tags for better formatting
      text = text.replace(/\n/g, '<br />');
  
      // Handle plain paragraphs with custom styling
      text = text.replace(/^(?!\*\*|\*|(\d+\.|\*)|`|```).*$/gm, '<p class="normal-text">$&</p>');
  
      return <div dangerouslySetInnerHTML={{ __html: text }} />;
  };

    return (
      <section>
      <div>
        <div onMouseUp={handleTextSelect} style={{ position: 'relative' }}>
            <button onClick={() => navigate('/')}>Go to home</button>
            {error && <div id="error-message" style={{ color: 'red' }}>{error}</div>}
            <div id="#result-data">
                {userData.map((item, index) => (
                    <li key={index}>
                        {typeof item === 'string' ? formatText(item) : formatText(JSON.stringify(item.answer, null, 2))}
                    </li>
                ))}
            </div>
            {popoverAnchor && (
                <div className="popover" style={{ top: popoverAnchor.top, left: popoverAnchor.left }}>
                    <button onClick={() => sendData('Bar Graph')}>Bar Graph</button>
                    <button onClick={() => sendData('Histogram')}>Histogram</button>
                    <button onClick={() => sendData('Line Graph')}>Line Graph</button>
                    <button onClick={() => sendData('Scatter Graph')}>Scatter Graph</button>
                </div>
            )}
            {(loading || image) && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-content">
                        <span className="close" onClick={() => { setImage(null); setError(''); }}>&times;</span>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            image ? (
                                <img src={image} alt="Result" />
                            ) : (
                                <p>Insufficient data</p>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
        </div>
        </section>
    );
};

export default ShowAnswers;
