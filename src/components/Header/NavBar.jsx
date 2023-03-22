import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {SideBarData} from './NavbarData'
import  SleeperDataContext  from "../../context/SleeperDataContext";
// react-icons & bootstrap Imports
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

// Styles Imports
import './NavBar.css';

const Navigation = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {leagueData, leagueUsers, rosterData, usersRoster, userData} = useContext(SleeperDataContext)
  
  
  
  
  
  return (

    <Navbar expand='lg' className="custom-navbar">
      <Nav className="mr-auto">
        <NavDropdown title="Leagues" id="basic-nav-dropdown">
          {leagueData.map((league) => (
            <NavDropdown.Item as={Link} key={league.league_id} to={`/league/${league.league_id}`}>
              {league.name}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav>
      <Navbar.Brand className="mx-auto">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <h3><b>Fantasy🏈Flex</b></h3>
          <h6><b>Multi-League Tracker</b></h6>
        </Link>
      </Navbar.Brand>
      <Nav className="navbar-log">
      {user ? (
        <Button onClick={logoutUser}>Logout</Button>
      ) : (
        <Button onClick={() => navigate("/login")}>Login</Button>
      )}
      </Nav>
    </Navbar>
    // <div className="navBar">
    //   <ul>
    //     <div >
    //       <li className="brand">
    //         <Link to="/" style={{ textDecoration: "none", color: "white" }}>
    //           <h3><b>Fantasy🏈Flex</b></h3>
    //           <h6><b>Multi-League Tracker</b></h6>
    //         </Link>
    //       </li>
    //     </div>
    //     <li>
    //       {user ? (
    //         <button onClick={logoutUser}>Logout</button>
    //       ) : (
    //         <button onClick={() => navigate("/login")}>Login</button>
    //       )}
    //     </li>
    //   </ul>
    // </div>
  );
};

export default Navigation;


//* Note: Yt tutorial  

// const Navbar = () => {
  
//   const [sidebar, setSideBar] = useState(false);

   
//   const showSidebar = () => setSideBar(!sidebar);
//     // showSidebar essentially works as a toggle (!sidebar) is the opposite of the 'false' state  => Input into the 'FaBars' since that is what we want to expand
//   return (
//     <>
//     <IconContext.Provider value={{color: '#fff'}}>
//       {/*//* IconText.Provider => Allows us to style ALL icons at one time as opposed to one at a time */}
//         <div className='navbar'>
//           <Link to='#' className='menu-bars'>
//             <FaIcons.FaBars onClick={showSidebar}/>
//           </Link>
//         </div>
//         <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
//           <ul className='nav-menu-items' onClick={showSidebar}>
//             <li className="navbar-toggle">
//               <Link to='#' className='menu-bars'>
//                 <AiIcons.AiOutlineClose />
//               </Link>
//             </li>
//             {SideBarData.map((item, index) => {
//               return (
//                 <li key={index} className={item.className}>
//                   <Link to={item.path}>
//                     {item.icon}
//                     <span>{item.title}</span>
//                   </Link>
//                 </li>
//               )
//             })}
//           </ul>
//         </nav>
//       </IconContext.Provider>
//     </>  
//   )
// }

// export default Navbar;