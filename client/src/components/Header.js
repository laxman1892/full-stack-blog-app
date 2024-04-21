import React, { useContext, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext);
  // ! fetching user data from '/profile' endpoint when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      method: "GET",
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        //  TODO update the username with the fetched username
        setUserInfo(userInfo);
      });
    });
    // eslint-disable-next-line
  }, []);

  // ? sending post request to the '/logout' endpoint to handle user logout
  function logout() {
    fetch("http://localhost:4000/logout", { 
      method: "POST",
      credentials: 'include',
     });
     setUserInfo(null);
  } 

  const username =  userInfo?.username;

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
