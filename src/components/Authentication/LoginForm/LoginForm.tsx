import { useState } from "react";

import { useAuth } from "../../../hooks/useAuth";

const LoginForm = () => {
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(name, email);
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <h1>Fetch Dogs</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input
          required
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
