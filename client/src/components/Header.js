import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function Header() {
  const [username, setUsername] = useState(null);
  // ! fetching user data from '/profile' endpoint when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        //  TODO update the username with the fetched usename
        setUsername(userInfo.username);
      });
    });
  }, []);

  // ? sending post request to the '/logout' endpoint to handle user logout
  function logout() {
    fetch("http://localhost:4000/logout", { 
      method: "POST",
      credentials: 'include',
     });
     setUsername(null);
  } 

  return (
    <>
      <header>
        <Link to="/" className="logo">
          BlogApp
        </Link>
        <nav>
          {/* display links based on user authentication */}
          {/* 👇 if user is logged in */}
          {username && (
            <>
              <Link to="/create">Create new posts</Link>
              <a href onClick={logout}>Logout</a>
            </>
          )}
          {/* 👇 if user is not logged in */}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
