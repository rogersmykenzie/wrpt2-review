import React, { useState } from 'react';
import axios from 'axios';

const Register = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const handleConfirmPasswordChange = e => setConfirmPassword(e.target.value);
  
  const handleSubmit = e => {
    e.preventDefault();

    if (password === confirmPassword) {
      axios
        .post('/auth/register', { username, password })
        .then((response) => {
          console.log(response);
          props.history.push('/new');
        })
    } else {
      setError('One of your passwords does not match');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" onChange={handleUsernameChange} />
        <input placeholder="Password" onChange={handlePasswordChange} />
        <input placeholder="Confirm Password" onChange={handleConfirmPasswordChange} />
        <button>Submit</button>
      </form>
      <h1>{error}</h1>
    </div>
  )
}

export default Register;