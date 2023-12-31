import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const LoginPageContainer = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: #e9e2d0; /* Set background color to the desired color */
  box-shadow: 10px 0 10px rgba(0, 0, 0, 0.1); /* Add a shadow */
  border-radius: 8px; /* Optional: Add border-radius for rounded corners */
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

const InputField = styled.input`
margin-bottom: 10px;
// padding: 8px;
// font-size: 16px;
border: 2px solid #e8e8e8;
padding: 15px;
border-radius: 10px;
background-color: #212121;
font-size: small;
font-weight: bold;
text-align: center;
}

&:focus {
outline-color: white;
background-color: #212121;
color: #e8e8e8;
box-shadow: 5px 5px #888888;
}
`;

const SubmitButton = styled.button`
--color: #ff41ed;
margin-bottom: 5px;
padding: 0.8em 1.7em;
background-color: transparent;
border-radius: .3em;
position: relative;
overflow: hidden;
cursor: pointer;
transition: .5s;
font-weight: 400;
font-size: 17px;
border: 1px solid;
font-family: inherit;
text-transform: uppercase;
color: var(--color);
z-index: 1;

&::before,
&::after {
  content: '';
  display: block;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);
  position: absolute;
  border-radius: 50%;
  z-index: -1;
  background-color: var(--color);
  transition: 1s ease;
}

&::before {
  top: -1em;
  left: -1em;
}

&::after {
  left: calc(100% + 1em);
  top: calc(100% + 1em);
}

&:hover::before,
&:hover::after {
  height: 410px;
  width: 410px;
}

&:hover {
  color: rgb(10, 25, 30);
}

&:active {
  filter: brightness(.8);
}
`;

const  Signup = () => {
  const [Email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate=useNavigate()
  const siggnedup =async () => {
    navigate('/Logins');
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    console.log('Logging in with:', username, password);
    try {
      const response = await axios.post('http://localhost:4000/apis/user', {
        Email,
        username,
        password,
      });
      console.log('Signup successful:', response.data);
    } catch (error) {
      console.error('Error during signup:', error.message);
      // Handle error, show an error message, etc.
    }
  };

  return (
    <LoginPageContainer>
      <Header>Signup</Header>
          <LoginForm onSubmit={handleLogin}>
          <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit" onClick={siggnedup}>Signup</SubmitButton>
      </LoginForm>
    </LoginPageContainer>
  );
};

export default Signup;
