import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function Header() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUsername(userInfo.username);
      });
    });
  }, []);

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
          {/* tomorrow's work: displaying these links after login, now not working */}
          {username && (
            <>
              <Link to="/create">Create new posts</Link>
              <a href onClick={logout}>Logout</a>
            </>
          )}
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
