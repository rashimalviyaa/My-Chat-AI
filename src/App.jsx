import { useState } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateAnswer() {
    setLoading(true);
    setAnswer("loading... Please wait a few seconds");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAbKjqyxtWQcyRJN_WVBWX9LfVO4r2MohM",
        method: "post",
        data: { "contents": [{ "parts": [{ "text": question }] }] }
      });
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAnswer('Error fetching data.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      generateAnswer();
    }
  }

  return (
    <div className="container">
      <h1>Rashi's Chat AI</h1>
      <textarea className="question-box"
        value={question} 
        onChange={(e) => setQuestion(e.target.value)}
        onKeyPress={handleKeyPress}
        cols="30"
        rows="10"
        placeholder="ask me anything..">
      </textarea>
      <button onClick={generateAnswer} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Answer'}
      </button>
      {loading && <div className="spinner"></div>}
      <p style={{ fontSize: '1rem', color: 'red', fontStyle: 'normal'}}>{answer}</p>
    </div>
  );
}

export default App;


//use netlify to deploy it