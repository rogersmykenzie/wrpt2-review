import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Nav.scss';

const Nav = (props) => {

  const username = useSelector((reduxState) => reduxState.username);

  const guestLinks = (
    <>
      <Link to="/login"><li>Login</li></Link>
      <Link to="/register"><li>Register</li></Link>
    </>
  )

  return (
    <nav className="nav__container">
      <ul className="nav__container--link">
        <Link to="/"><li>Home</li></Link>
        {!username ? guestLinks : <Link><li>Logout</li></Link>}
        <Link to="/new"><li>New</li></Link>
        <Link to="/view"><li>View</li></Link>
      </ul>
    </nav>
  );
}

export default Nav;