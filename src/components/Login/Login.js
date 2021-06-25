import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateUsername } from '../../store/reducer';
import './Login.scss';

const Login = (props) => {
  const [authInfo, setAuthInfo] = useState({ username: '', password: '' }); // useReducer -
  const dispatch = useDispatch();

  const handleChange = e => {
    setAuthInfo({
      ...authInfo,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post('/auth/login', authInfo)
      .then((response) => {
        console.log(response);

        dispatch(updateUsername(authInfo.username))

        // dispatch({
        //   type: 'UPDATE_USERNAME',
        //   payload: authInfo.username
        // })


        props.history.push('/new');
      })

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" name="username" onChange={handleChange} />
        <input placeholder="Password" name="password" onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login;
