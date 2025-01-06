import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={require(`../images/${recipe.image}`)} alt={recipe.name} />
      <h3>{recipe.name}</h3>
      <p>{recipe.description}</p>
    </div>
  );
};

export default RecipeCard;
