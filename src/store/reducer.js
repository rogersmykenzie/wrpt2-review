// initial state
const initialState = {
  recipes: [],
  username: '',
};

// action types
const SET_RECIPES = 'SET_RECIPES';

const ADD_RECIPE = 'ADD_RECIPE';
const UPDATE_RECIPE = 'UPDATE_RECIPE';
const DELETE_RECIPE = 'DELETE_RECIPE';

const UPDATE_USERNAME = 'UPDATE_USERNAME';

// action creator
export const addRecipe = (recipe) => {
  return {
    type: ADD_RECIPE,
    payload: recipe
  }
}

export const setRecipes = (recipes) => {
  return {
    type: SET_RECIPES,
    payload: recipes,
  }
}

export const updateUsername = (username) => ({ type: UPDATE_USERNAME, payload: username })

// reducer
const reducer = (state=initialState, action) => {
  switch(action.type) {
    case ADD_RECIPE: {
      const newRecipes = [...state.recipes, action.payload];
      return {
        ...state,
        recipes: newRecipes
      }
    }
    
    case SET_RECIPES: {
      return {
        ...state,
        recipes: action.payload,
      }
    }

    case UPDATE_USERNAME: {
      return {
        ...state,
        username: action.payload
      }
    }
    default: return state;
  }
}

export default reducer;