// FixMe: League list still disappears even after setting my DataContext to localStorage --> 
  // Possible Solution: Store and parse through leagueData through this page 
// FixMe: Initial leagueData works but when saving the selcted/imported leagues/rosters only 1 ends up saving
//-ToDo: Import Leagues button leads to nothing
//-ToDo: Render each of the user's specific {selectedLeagues} as opposed to just the rosters
// Note: 'leagues' renders all leagues just fine, leagueData renders a singular league_ID, & rosters renders only one league's rosters

// import React, { useState, useEffect, useContext} from 'react'
// import DataContext from '../../context/SleeperDataContext';
// import axios from 'axios';
// import { Form, Button, FormCheck } from 'react-bootstrap';


// function SelectLeagues() {
//   const{userData, leagueData, setLeagueData} = useContext(DataContext);
//   const [selectedLeagues, setSelectedLeagues] = useState([]);
//   const [leagues, setLeagues] = useState([]);

//   useEffect(() => {
//     const fetchLeagues = async () => {
//       if(!userData) {
//         return;
//       }
//       const userId = userData.user_id
//       const response = await axios.get(
//         `https://api.sleeper.app/v1/user/${userId}/leagues/nfl/2023`
//       );
//       const leagues = response.data
//       setLeagueData(leagues);
//       setLeagues(leagues);
//       console.log('sleeperLeagues', leagues)
//       localStorage.setItem('leagues', JSON.stringify(leagues));
//     };
//     // const storedLeagueData = localStorage.getItem('leagueData');
//     // if (storedLeagueData){
//     //   setLeagueData(JSON.parse(storedLeagueData));
//     //   setLeagues(JSON.parse(storedLeagueData));
//     // } else {
//       fetchLeagues();
//     // }
//   }, [userData]);



//   const handleLeagueSelection = (event) => {
//     const leagueId = event.target.value;
//     const isChecked = event.target.checked;
//     if (isChecked) {
//       setSelectedLeagues ([...selectedLeagues, leagueId]);
//       console.log('selected', selectedLeagues)
//     } else {
//       setSelectedLeagues(selectedLeagues.filter(id => id !== leagueId));
//       console.log('updated-selected', selectedLeagues)
//     }
//   }

//   const handleImportLeagues = async () => {
//     try {
//       for (const leagueId of selectedLeagues) {
//         const response = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/rosters`);
//         const leagueData ={
//           ...response.data,
//           league_id: leagueId,
//           user_roster: response.data.find(roster => roster.owner_id === userData.user_id)
//         };
//         setLeagueData(leagueId, leagueData);
//         console.log('user-rosters', leagueData);
//         localStorage.setItem(`rosters`, JSON.stringify(leagueData));
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//     setSelectedLeagues([])
//   }


//   return (
//     <>
//     <h4>Select Leagues to Import!</h4>
//     <Form>
//       {leagues && leagues.map((league) =>(
//         <div key={league.league_id}>
//           <label>
//             <FormCheck
//             type='checkbox'
//             id={league.league_id}
//             label={league.name}
//             value={league.league_id}
//             onChange={handleLeagueSelection}
//             checked={league.selected}//league.league_id in leagueData}
//             />
//           </label>
//         </div>
//       ))}
//       <Button variant='primary' onClick={handleImportLeagues} disabled={selectedLeagues.length === 0}>Import Selected Leagues</Button>
//     </Form>
//     </>
//   )
// }

// export default SelectLeagues;

// Note: using `localStorage` to store the `leagueData` object, both when we first fetch it from the API and when we update it with the roster data for each league.

// Note:  When the component mounts, we first try to retrieve the `leagueData` object from `localStorage`. If it exists, we use it to set the initial state of the `leagueData` and `leagues` variables. If it doesn't exist, we fetch the `leagueData` from sleeper API again, and then store it in `localStorage`.

// When we update the `leagueData` with roster data for each league, we also store the updated `leagueData` for that league in `localStorage`, using the league ID as the key.

// By storing the `leagueData` in `localStorage`, we can ensure that it persists when page refreshes, and that the imported leagues are still available after the page is refreshed.
// FixMe: LOCALSTORAGE & CONTEXT issues:
  //FixMe: userData, LeagueIds, and leagueData ALL erased after refresh 
  // FixMe: leagueData DID NOT show in local storage upon SelectLeaguePage rendering (userData DID)
  // LeagueIds saved to localStorage upon import 👌
  // leagueData still only shows 1 league ID after import but leagues shows ALL leagues even after import

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import DataContext from '../../context/SleeperDataContext';
import { Form, Button, FormCheck } from 'react-bootstrap';
import RosterFetcher from './GetRosters';

function SelectLeagues() {
  const { userData, leagueData, setLeagueData, setLeagueIds } = useContext(DataContext);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [leagues, setLeagues] = useState([]);

  //CodeLogic: Render ALL user's leagues upon new userData being passed to SelectLeaguesPage & 
   //  set those leagues to state(leagues) and context(leagueData)
  useEffect(() => {
    const fetchLeagues = async () => {
      if(!userData) {
        return;
      }
      const userId = userData.user_id;
      const response = await axios.get(
        `https://api.sleeper.app/v1/user/${userId}/leagues/nfl/2023`
      );
      const fetchedLeagues = response.data;
      // const mergedLeagues = [...leagueData, ...fetchedLeagues]
      setLeagueData(fetchedLeagues)
      setLeagues(fetchedLeagues);
      console.log('users-leagues', fetchedLeagues)
    };

    fetchLeagues();
  }, [userData]);



  const handleLeagueSelection = (event) => {
    const leagueId = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedLeagues([...selectedLeagues, leagueId]);
    } else {
      setSelectedLeagues(selectedLeagues.filter((id) => id !== leagueId));
    }
  };

  const handleImportLeagues = async () => {
    try {
      const leagueIds = [];
      for (const leagueId of selectedLeagues) {
        const response = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}`);
        const leagueData = {
          ...response.data,
          // user_: response.data.rosters.find((roster) => roster.owner_id === userData.user_id),
        };
        setLeagueData((prevLeagueData)=> ({
          ...prevLeagueData, [leagueId]: leagueData
        }))
        leagueIds.push(leagueId);
      }
      setLeagueIds(leagueIds);
    } catch (error) {
      console.log(error.message);
    }
    setSelectedLeagues([]);
  };

  return (
    <>
      <h4>Select Leagues to Import!</h4>
      <Form>
        {leagues.map((league) => (
          <div key={league.league_id}>
            <label>
              <FormCheck
                type="checkbox"
                id={league.league_id}
                label={league.name}
                value={league.league_id}
                onChange={handleLeagueSelection}
                checked={selectedLeagues.includes(league.league_id)}
              />
            </label>
          </div>
        ))}
        <Button variant="primary" onClick={handleImportLeagues} disabled={selectedLeagues.length === 0}>
          Import Selected Leagues
        </Button>
      </Form>
      {/* {selectedLeagues.length > 0 && <RosterFetcher leagueIds={selectedLeagues} />} */}
    </>
  );
}

export default SelectLeagues;



