
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import SleeperDataContext  from '../../../context/SleeperDataContext';
import useAuth from '../../../hooks/useAuth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SleeperLogin = () => {
  const {token} = useAuth()
  const [username, setUsername] = useState('');
  const {setUserData} = useContext(SleeperDataContext)
  const [error, setError] = useState('')
  const navigate = useNavigate();



  // const handleUsernameChange = (event) => {
  //   // event.preventDefault()
  //   setUsername(event.target.value);
  //   // setUserData(event.target.value);
  //   console.log('username', username)
  // };

  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
        const response = await axios.get(
          `https://api.sleeper.app/v1/user/${username}`, {
            headers: {
              Authorization: "Bearer " + token } 
          });
      const sleeperUser = response.data;
      setUserData(sleeperUser)
      localStorage.setItem('userData', JSON.stringify(sleeperUser));
      console.log('submitted username', username)
      console.log('userData', sleeperUser)
      navigate('/select-leagues');
    } catch (error) {
      console.error(error);
      setError('Invalid username, Try Again.')
    }
  };


  return (
    <div className="vh-100 d-flex align-items-start justify-content-center pt-5">
      <Form onSubmit={handleLogin}>
        <h2>Keep Track of all your Sleeper Leagues!</h2>
        <h4>Enter your Sleeper Username to start</h4>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Sleeper Username</Form.Label>
          <Form.Control size='sm' type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Sleeper Username" />
          <Form.Text className="text-muted">
            Must be Username -- Email will NOT work! 
          </Form.Text>
          {error && <p>error</p>}
        </Form.Group>
      
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SleeperLogin;
