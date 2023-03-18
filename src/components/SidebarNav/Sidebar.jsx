// import React, { useContext } from 'react';
// import DataContext from '../../context/SleeperDataContext';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// // import SelectLeagues from '../../pages/SelectLeaguesPage/SelectLeagues';

// const Sidebar = () => {
//   const { leagueData } = useContext(DataContext);
//   const [click, setClick] = useState(false);

//   const handleClick = () => setClick(!click);

//   return (
//     <>
//       <nav className='sidebar'>   
//         <div className="sidebar-container">
//           <h2>Selected Leagues:</h2>
//           <select>
//             {selectedLeagues.map((league) => (
//               <option key={league.league_id} value={league.league_id}>
//                 {league.metadata.team_name} ({league.metadata.platform})
//                 <br />
//                 {league.name} - {league.settings.num_teams} teams - {league.scoring_settings.scoring_type.rec}
//               </option>
//             ))}
//           </select>
//         </div>
//       </nav>
//     </> 
//   );

  

// };

// export default Sidebar;




























// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';


//  const SideBar = ({ jwt }) => {
//   return (
//     <nav>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li>
//           <div className="dropdown">
//             <button className="dropbtn">Fantasy League Sync</button>
//             <div className="dropdown-content">
//               <Link to="/sync-leagues">Sync Leagues</Link>
//             </div>
//           </div>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default SideBar;
