// App.js
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from 'react-router-dom';
import './App.css';
import recipesData from './data/recipes.json'; // Ensure the path is correct

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load the recipes from JSON
    setRecipes(recipesData);
  }, []);

  const categories = [
    'All',
    'Vegan',
    'Meaty',
    'Cakes',
    'Salads',
    'Gluten-Free',
    'Seafood',
    'Breakfast',
  ];

  const filteredRecipes =
    selectedCategory === 'All'
      ? recipes
      : recipes.filter((recipe) =>
          Array.isArray(recipe.category)
            ? recipe.category.includes(selectedCategory)
            : recipe.category === selectedCategory
        );

  return (
    <Router>
      <div className="App">
        {/* Sidebar */}
        <aside className="sidebar">
          <header className="sidebar-header">
            <img src="/logo.png" alt="Cooking Recipes Logo" className="logo" />
          </header>
          <nav>
            <ul className="categories">
              {categories.map((category) => (
                <li
                  key={category}
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="main-content">
          <header className="App-header">
            <h1>Cooking Recipes</h1>
            <p>Find your next favorite dish by category!</p>
          </header>

          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <main className="recipe-grid">
                  {filteredRecipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="recipe-image"
                      />
                      <h2>{recipe.title}</h2>
                      <p>{recipe.description}</p>
                      <Link to={`/recipe/${recipe.id}`} className="see-more">
                        See more
                      </Link>
                    </div>
                  ))}
                </main>
              }
            />

            {/* Recipe Details */}
            <Route
              path="/recipe/:id"
              element={<RecipeDetails recipes={recipes} />}
            />
          </Routes>

          {/* Footer */}
          <footer>
            <p>Happy Cooking! &copy; 2024</p>
          </footer>
        </div>
      </div>
    </Router>
  );
}

function RecipeDetails({ recipes }) {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === parseInt(id, 10));

  if (!recipe) {
    return <div>Recipe not found!</div>;
  }

  return (
    <div className="recipe-details">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="recipe-detail-image"
      />
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <h3>Ingredients:</h3>
      <p>{recipe.recipe}</p>
      <Link to="/" className="back-button">
        Back to Recipes
      </Link>
    </div>
  );
}

export default App;
