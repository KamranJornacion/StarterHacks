import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './recipeHist.css'; // Import the CSS file for styling

const ScrollableWindow = () => {
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/get-rec', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setRecipe(data.recipe); // Adjust according to your response structure
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setRecipe('Failed to fetch recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="scrollable-container">
          <div className="white-window">
            {loading ? 'Loading...' : <ReactMarkdown>{recipe}</ReactMarkdown>}
          </div>
        </div>
      <button onClick={fetchRecipe}>Get Recipe</button>
    </div>
  );
};

export default ScrollableWindow;
