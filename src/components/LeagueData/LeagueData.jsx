// // Code from previous project ==> Imported to I could refer to it - Did not work exactly as i liked


// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import DataContext from '../../context/SleeperDataContext';
// import { Form, Button, FormCheck } from 'react-bootstrap';
// import RosterFetcher from './RosterFetcher';

// function SelectLeagues() {
//   const { userData, leagueData, setLeagueData, setLeagueIds } = useContext(DataContext);
//   const [selectedLeagues, setSelectedLeagues] = useState([]);
//   const [leagues, setLeagues] = useState([]);
//   const [selectedLeagueData, setSelectedLeagueData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLeagues = async () => {
//       const userId = userData.user_id;
//       const response = await axios.get(
//         `https://api.sleeper.app/v1/user/${userId}/leagues/nfl/2023`
//       );
//       const leagues = response.data;
//       setLeagues(leagues);
//     };

//     fetchLeagues();
//   }, [userData]);

//   const handleLeagueSelection = async (event) => {
//     const leagueId = event.target.value;
//     const isChecked = event.target.checked;
//     if (isChecked) {
//       setSelectedLeagues([...selectedLeagues, leagueId]);
//     } else {
//       setSelectedLeagues(selectedLeagues.filter((id) => id !== leagueId));
//     }
//     setSelectedLeagueData(null);
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}`);
//       const leagueData = {
//         ...response.data,
//         user_roster: response.data.rosters.find((roster) => roster.owner_id === userData.user_id),
//       };
//       setSelectedLeagueData(leagueData);
//     } catch (error) {
//       setError(error.message);
//     }
//     setLoading(false);
//   };

//   const handleImportLeagues = async () => {
//     try {
//       const leagueIds = [];
//       for (const leagueId of selectedLeagues) {
//         const response = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}`);
//         const leagueData = {
//           ...response.data,
//           user_roster: response.data.rosters.find((roster) => roster.owner_id === userData.user_id),
//         };
//         setLeagueData(leagueId, leagueData);
//         leagueIds.push(leagueId);
//       }
//       setLeagueIds(leagueIds);
//     } catch (error) {
//       console.log(error.message);
//     }
//     setSelectedLeagues([]);
//   };

//   return (
//     <>
//     <div>
//       <h5>League Info: {selectedLeagueData.name}</h5>
//       <p>Commissioner: {selectedLeagueData.settings.commissioner_type === 'user' ? selectedLeagueData.settings.commissioner_id : 'Unknown'}</p>
//       <p>Number of Teams: {selectedLeagueData.settings.num_teams}</p>
//       <p>Current Week: {selectedLeagueData.settings.week_start}</p>
//       <h6>Your Roster:</h6>
//       {selectedLeagueData.user_roster && (
//         <ul>
//           {selectedLeagueData.user_roster.players.map((player) => (
//             <li key={player.player_id}>{player.first_name} {player.last_name} ({player.position})</li>
//           ))}
//         </ul>
//       )}
//       <h6>Your Matchups:</h6>
//       {selectedLeagueData.matchups && (
//         <ul>
//           {selectedLeagueData.matchups.filter((matchup) => matchup.matchup_period <= selectedLeagueData.settings.week_start).map((matchup) => (
//             <li key={matchup.matchup_id}>
//               Week {matchup.matchup_period}: {matchup.rosters.find((roster) => roster.owner_id === userData.user_id).players.map((player) => player.first_name).join(', ')}
//               {' vs '}
//               {matchup.rosters.find((roster) => roster.owner_id !== userData.user_id).players.map((player) => player.first_name).join(', ')}
//             </li>
//           ))}
//         </ul>
//       )}
//       <h6>League Standings:</h6>
//       {selectedLeagueData.standings && (
//         <ol>
//           {selectedLeagueData.standings.map((team) => (
//             <li key={team.user_id}>
//               {team.team_name} ({team.wins}-{team.losses}-{team.ties})
//             </li>
//           ))}
//         </ol>
//       )}
//     </div>
//   </>
//    );
// }
// export default SelectLeagues;
