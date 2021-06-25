import React from 'react';
import { connect } from 'react-redux';
import './ViewRecipe.scss';

const ViewRecipe = ({ recipes }) => {

  const mapListItems = (arr) => arr.split('\n').map((item) => <li>{item}</li>)

  const mappedRecipes = recipes.map(({ title, type, ingredients, directions, image }) => {
    return (
      <div>
        <img src={image} alt={title} />
        <h1>Title: {title}</h1>
        <h2>Type: {type}</h2>
        <h3>Ingredients: </h3>
        <ul>
          {mapListItems(ingredients)}
        </ul>
        <h3>Directions: </h3>
        <ul>
          {mapListItems(directions)}
        </ul>
      </div>
    )
  })

  return (
    <>
      <h1>My Recipes:</h1>
      {mappedRecipes}
    </>
  )
}

const mapStateToProps = (reduxState) => {
  // const { recipes } = state;
  return {
    recipes: reduxState.recipes
  }
};

export default connect(mapStateToProps)(ViewRecipe);