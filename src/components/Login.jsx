import { useState } from 'react';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Add login logic here
  };

  const handleLinkedInLogin = () => {
    // Redirect to LinkedIn OAuth endpoint
    window.location.href = 'http://localhost:3000/auth/linkedin';
  };

  return (
    <div className="container flex">
      <div className="resume-page flex">
        <div className="text">
          <h1>Inno CV</h1>
          <p>Build your own resume</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="link">
            <button type="submit" className="Elogin">Login</button>
            <a href="#" className="forgot">Forgot password?</a>
          </div>
          <div className="button">
            <a href="/signup">Create new account</a>
          </div>
        </form>

        {/* LinkedIn Login Button */}
        <div className="linkedin-login">
          <button onClick={handleLinkedInLogin} className="linkedin-btn">
            <img src="/assets/linkedin.png" alt="LinkedIn" />
            Sign in with LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
