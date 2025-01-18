import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import recipesData from './data/recipes.json';
import logo from './assets/logo.png';

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
        <img src={logo} alt="Foodify Logo" className="logo" />
        <h1>Foodify</h1>
        <h4>Unleashing the Chef in You</h4>
      </div>
      <div className="menu">
        <ul>
          <li>
            <Link to="/">HOME</Link>
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

export default RecipeDetail;
