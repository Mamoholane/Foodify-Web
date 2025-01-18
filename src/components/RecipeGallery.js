import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FilterBar from './FilterBar';
import recipesData from './data/recipes.json';
import logo from './assets/logo.png';

const RecipeGallery = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Meaty', 'Vegan', 'Cakes'];

  const filteredRecipes = filter === 'All'
    ? recipesData
    : recipesData.filter(recipe => recipe.category === filter);

  return (
    <div>
      <div className="header">
        <img src={logo} alt="Foodify Logo" className="logo" />
        <h1>Foodify</h1>
        <h4>Unleashing the Chef in You</h4>
      </div>
      <FilterBar categories={categories} setFilter={setFilter} />
      <div className="recipe-gallery">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipes/${recipe.id}`}>
              <h2>{recipe.title}</h2>
              {recipe.image && <img src={recipe.image} alt={recipe.title} className="gallery-image" />}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeGallery;
