import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const axios = require("axios");

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let result = await axios.post("/login", user);
    console.log(result.data);
    if (result.data) {
      navigate("/dashboard");
    }
  }

  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          name="username"
          value={user.username}
          type="text"
        />
        <br />
        <input
          onChange={handleChange}
          name="password"
          value={user.password}
          type="text"
        />
        <br />
        <input onClick={handleSubmit} value="Login" type="submit" />
      </form>
    </div>
  );
};

export default Login;
