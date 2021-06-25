import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';
import routes from "./routes";
import { setRecipes, updateUsername } from './store/reducer';
import "./App.css";
import Nav from "./components/Nav/Nav";

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('/api/recipes')
      .then(response => props.setRecipes(response.data))

    axios
      .get('/auth/user')
      .then(response => dispatch(updateUsername(response.data)))
  }, []);

  return (
    <div className="App">
      <Nav />
      {routes}
    </div>
  );
}

const mapDispatchToProps = {
  setRecipes,
}

export default connect(undefined, mapDispatchToProps)(App);

// redux
// express-session
// build and serving from back end
