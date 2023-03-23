
// After successful login --> User routed to this page
  //? For application rough draft, get user Table will just go in the middle of page (i.e dynasty-daddy) -- Use Tabs for platforms
  // => I want my homepage.jsx to have platform buttons that once clicked, takes us to differnt page (SyncLeaguesPage)
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useContext} from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./HomePage.css"
import { Button, Container, Row, Col } from "react-bootstrap";
import NavbarData from "../../components/Header/NavbarData";
import * as MdIcons from 'react-icons/md'

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const { user } = useAuth();
  // console.log('user', user.username)
  const [token, setToken] = useState('')
  // console.log('token', token)
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token) {
      setToken(token)
    }
  })

  const handleAddLeaguesClick = () => {
    // event.preventDefault()
    navigate('/platform-select')
  }

  return (
    
    <div className="vh-100 d-flex align-items-start justify-content-center pt-5" style={{ backgroundColor: "#f8f9fa" }}>
    <Container>
      <Row className="text-center">
        <Col>
          <h2>Welcome to Fantasy<MdIcons.MdOutlineSportsFootball/>Flex</h2>
          <h6 className="text-muted">Import your Fantasy Football leagues</h6>
          <h6 className="text-muted">Track ALL your teams in one place</h6>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          {token ? (
            <Button onClick={handleAddLeaguesClick}>Add Your Leagues</Button>
          ) : (
            <p>Must be logged-in to Add a League</p>
          )}
        </Col>
      </Row>
    </Container>
  </div>
    
    
    // <div>
    //   <div className="description">
    //       <h2>Welcome to Fantasy🏈Flex</h2>
    //       <h6>Import your Fantasy Football leagues</h6>
    //       <h6>Track ALL your teams in one place</h6>
    //   </div>
    //   <div className="add-league-btn">
    //     {token ? (
    //       <Button onClick={handleAddLeaguesClick}>Add Your Leagues</Button>
    //       // <Link to='/platform-select' className='button'>Add Leagues</Link>
    //      ):( <p>Must be logged-in to Add a League</p>
    //      )}
    //   </div>
    // </div>
  );
};

  export default HomePage;

// Todo - Clean up Navbar to make just the Brand and logout button on top
  // Make the league dropdown live on sidebar
