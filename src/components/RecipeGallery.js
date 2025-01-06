import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import recipes from '../data/recipes.json';

const RecipeGallery = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Meaty', 'Vegan', 'Cakes'];

  const filteredRecipes = filter === 'All' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === filter);

  return (
    <div>
      <h1>Recipe Gallery</h1>
      <FilterBar categories={categories} setFilter={setFilter} />
      <div className="recipe-gallery">
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeGallery;
