import React from "react";
import "../App.css";

export default function Post() {
  return (
    <>
      <div className="post">
        <div className="image">
          <img
            src="https://api.duniagames.co.id/api/content/upload/file/12663861181697455835.jpg"
            alt=""
          />
        </div>
        <div className="texts">
          <h2>Heading </h2>
          <p className="info">
            <a href className="author">Laxman Rijal</a>
            <time>2023-12-16 11:55</time>
          </p>
          <p className="summary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod molestie imperdiet. Vestibulum dapibus risus vel velit dignissim faucibus. Vestibulum interdum nisl at mattis luctus. Suspendisse volutpat arcu ante, eget vestibulum sapien tincidunt vel.</p>
        </div>
      </div>
    </>
  );
}
