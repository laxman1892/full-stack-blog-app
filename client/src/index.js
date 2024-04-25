import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import ErrorPage from './error-page';
import Page from './components/pages/Page';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import CreatePost from './components/pages/CreatePost';
import PostPage from './components/pages/PostPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Page />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "create",
        element: <CreatePost />,
      }, 
      {
        path: "post/:id",
        element: <PostPage />,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* rendering browser router  */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
