
// After successful login --> User routed to this page
  //? For application rough draft, get user Table will just go in the middle of page (i.e dynasty-daddy) -- Use Tabs for platforms
  // => I want my homepage.jsx to have platform buttons that once clicked, takes us to differnt page (SyncLeaguesPage)
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useContext} from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./HomePage.css"
// import AddLeagueButton from '../../components/AddLeagueButton';


const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const { user } = useAuth();
  // console.log('user', user.username)
  const [token, setToken] = useState('')
  console.log('token', token)
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token) {
      setToken(token)
    }
  })

  const handleAddLeagueCLick = () => {
    navigate('/platform-select')
  }

  return (
    <div>
      <div>
          <h2>Welcome to Fantasy🏈Flex </h2>
          <h6>Import your Fantasy Football leagues</h6>
          <h6>Track ALL your teams in one place</h6>
          {/* <text>Flex on your competition and win some hardware!</text> */}
      </div>
      <div>
        {token ? (
          <Link to='/platform-select' className='button'>Add Leagues</Link>
         ):( <p>Must be logged-in to Add a League</p>
         )}
      </div>
    </div>
  );
};

  export default HomePage;
