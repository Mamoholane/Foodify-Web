import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import './App.css';
import recipesData from './data/recipes.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = recipesData.find((r) => r.id === parseInt(id));
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment.trim()]);
      setComment('');
    }
  };

  if (!recipe) {
    return <h2>Recipe not found</h2>;
  }

  return (
    <div>
      <div className="header">
        <h1>Foodify</h1>
        <h4>Unleashing the Chef in You</h4>
      </div>
      <div className="menu">
        <ul>
          <li>
           
            <a href="/">Home</a>

          </li>
        </ul>
      </div>
      <div className="recipe-detail">
        <h1>{recipe.title}</h1>
        {recipe.image && <img src={recipe.image} alt={recipe.title} className="detail-image" />}
        {recipe.ingredients && (
          <>
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </>
        )}
        {recipe.steps && (
          <>
            <h2>Steps</h2>
            <ol className="steps-list">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </>
        )}
        <div className="ratings-comments">
          <h2>Rate this Recipe</h2>
          <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
            <option value={0}>Rate...</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>

          <h2>Comments</h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Leave a comment..."
          />
          <button onClick={handleCommentSubmit}>Submit</button>

          <ul className="comments-list">
            {comments.map((c, index) => (
              <li key={index}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer">&copy; 2024 Foodify. All Rights Reserved.</div>
    </div>
  );
};

const App = () => {
  const [filter, setFilter] = useState('All Recipes');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipesData.filter((recipe) => {
    const category = typeof recipe.category === 'string' ? recipe.category.toLowerCase() : '';
    const categoryMatch = filter === 'All Recipes' || category === filter.toLowerCase();
    const titleMatch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && titleMatch;
  });

  const filters = [
    'All Recipes',
    'Breakfast',
    'Sweet',
    'Cocktails',
    'Vegan',
    'Meaty',
    'Salads',
    'Gluten-Free',
    'Seafood',
  ];

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="header">
                <h1>Foodify</h1>
                <h4>Unleashing the Chef in You</h4>
              </div>
              <div className="slider"></div>
              <div className="menu">
                <ul>
                  {filters.map((f) => (
                    <li
                      key={f}
                      className={filter === f ? 'active-filter' : ''}
                      onClick={() => setFilter(f)}
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="container">
                <h2>{filter}</h2>
                <input
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-box"
                />
                <div>
                  {filteredRecipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                      <img src={recipe.image} alt={recipe.title} className="card-image" />
                      <div>
                        <h3>{recipe.title}</h3>
                        <p>Description: {recipe.description}</p>
                        <Link to={`/recipes/${recipe.id}`}>
                          <button className="view-recipe-button">View Recipe</button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="footer">&copy; 2024 Foodify. All Rights Reserved.</div>
            </div>
          }
        />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
