import React, { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert("Registration successful");
  } else {
    alert('Registaration failed');
  }
}
  return (
    <form className="signup" onSubmit={register}>
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="email"
        placeholder="abc@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button>Sign Up</button>
    </form>
  );
}