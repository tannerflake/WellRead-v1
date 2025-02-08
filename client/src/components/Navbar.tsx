import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  // State to track the login status
  const [loginCheck, setLoginCheck] = useState(false);

  // Function to check if the user is logged in using auth.loggedIn() method
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);  // Set loginCheck to true if user is logged in
    }
  };

  // useEffect hook to run checkLogin() on component mount and when loginCheck state changes
  useEffect(() => {
    checkLogin();  // Call checkLogin() function to update loginCheck state
  }, [loginCheck]);  // Dependency array ensures useEffect runs when loginCheck changes

  return (
    <div className="navbar">
      <div className="nav-links-left nav-links">
        <Link to="/Search">Search</Link>
        <Link to="/Shelf">Shelf</Link>
        <Link to="/WantToRead">Want To Read</Link>
        <Link to="/Recommendations">Recs</Link>
      </div>
      <div className="nav-links-right nav-links">
        <Link to="/Login">Login</Link>
        {
          // Conditional rendering based on loginCheck state
          loginCheck && (
            // Render logout button if user is logged in
            <button className="logout-button" type='button' onClick={() => {
              auth.logout();  // Call logout() method from auth utility on button click
            }}>Logout</button>
          )
        }
      </div>
    </div>
  );
}

export default Navbar;