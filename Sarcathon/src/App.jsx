import React, { useState, useEffect } from 'react';

const App = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
 
  const [typingEffectText, setTypingEffectText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Typing effect for heading text
  const heading = "Saras Institution - Ask Me Anything";
 

  // Typing effect for placeholder text in the input field
  const typingPlaceholders = ["What's your question?", "Ask me anything...", "How can I help you today?"];
  useEffect(() => {
    let index = 0;
    let word = typingPlaceholders[currentWordIndex];
    const typingInterval = setInterval(() => {
      setTypingEffectText(word.slice(0, index));
      index++;
      if (index > word.length) {
        index = 0;
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % typingPlaceholders.length); // Move to the next word
        word = typingPlaceholders[(currentWordIndex + 1) % typingPlaceholders.length];
      }
    }, 150); // Adjust speed as needed
    return () => clearInterval(typingInterval);
  }, [currentWordIndex]);

  // Function to handle form submission and display the answer
  const handleSubmit = (e) => {
    e.preventDefault();
    setAnswer(`Your question: "${question}" has been received!`);
    setQuestion('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold mt-10 text-center border-r-2 border-black whitespace-nowrap overflow-hidden animate-typing w-full">
        {heading}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-6">
        <input
          type="text"
          value={question}
          placeholder={typingEffectText}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-[40vw] h-16 px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
        />
        <button
          type="submit"
          className=" w-24 h-12 px-6 py-1 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all text-2xl"
        >
          Ask
        </button>
      </form>
      {answer && <p className="mt-4 text-lg text-gray-800">{answer}</p>}
    </div>
  );
};

export default App;
