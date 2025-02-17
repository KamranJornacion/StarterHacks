import React from 'react';
import './recipeItem.css'; // Import the CSS file

const RecipeItem = ({ name, time }) => {
    return (
        <div className="recipe-item">
            <div className="text-container">
                <h1 className="name">{name}</h1>
                <h3 className="time">Cooking Time: {time}</h3>
                <p>Read More</p>
                {/* add onclick to read more later */}
            </div>
        </div>
    );
};

export default RecipeItem;


