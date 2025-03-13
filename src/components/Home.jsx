import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hi! Enter a job role to get relevant skills.", sender: "bot" }
  ]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const navigate = useNavigate();

  // Generate skills based on job role
  const generateSkills = async () => {
    if (input.trim() === '') return;

    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/generate_skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_role: input }),
      });

      const data = await response.json();
      const skillsMessage =
        data.skills?.length > 0 ? data.skills.join(', ') : 'No skills found.';

      setMessages((prev) => [...prev, { text: skillsMessage, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching skills:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Failed to fetch skills. Try again later.', sender: 'bot' },
      ]);
    }

    setIsTyping(false);
    setInput('');
  };

  // Handle pressing 'Enter' in the input field
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') generateSkills();
  };

  // Redirect to templates page
  const handleCreateResume = () => {
    navigate('/templates');
  };

  return (
    <div className="home-container">
      <center>
      <div className="header-container">
        <h1>RESUME BUILDER</h1>
        <p>Unleash Your Professional Story with the Ultimate Resume Building Experience!</p><br />
        <button className="create-resume" onClick={handleCreateResume}>
          Create Resume
        </button>
      </div>
      </center>

      {/* Chatbot Toggle */}
      <div className="chat-toggle" onClick={() => setIsChatOpen(!isChatOpen)}>
        💬
      </div>

      {/* Chatbox */}
      {isChatOpen && (
        <div className="chat-box-container">
          <div className="chat-header">
            <span>AI Resume Skills Generator</span>
            <button onClick={() => setIsChatOpen(false)}>✖</button>
          </div>
          <div className="chat-box">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && <div className="typing-indicator">Bot is typing...</div>}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter Job Role..."
            />
            <button onClick={generateSkills}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
