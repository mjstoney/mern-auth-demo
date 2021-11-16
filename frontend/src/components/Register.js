import React, { useState } from "react";
const axios = require("axios").default;

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
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
    const newUser = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    try {
      let result = await axios.post("/register", newUser);

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form>
        <label htmlFor="username">Username: </label>
        <input
          onChange={handleChange}
          type="text"
          name="username"
          value={user.username}
        />
        <br />

        <label htmlFor="email">E-mail: </label>
        <input
          onChange={handleChange}
          type="text"
          name="email"
          value={user.email}
        />
        <br />

        <label htmlFor="password">Password: </label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          value={user.password}
        />
        <br />

        <input onClick={handleSubmit} type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
