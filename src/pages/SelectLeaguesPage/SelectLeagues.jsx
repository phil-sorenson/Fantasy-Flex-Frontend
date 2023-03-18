// FixMe: League list still disappears even after setting my DataContext to localStorage --> 
  // Possible Solution: Store and parse through leagueData through this page 
// FixMe: Initial leagueData works but when saving the selcted/imported leagues/rosters only 1 ends up saving
//-ToDo: Import Leagues button leads to nothing
//-ToDo: Render each of the user's specific {selectedLeagues} as opposed to just the rosters
// Note: 'leagues' renders all leagues just fine, leagueData renders a singular league_ID, & rosters renders only one league's rosters

// Note: using `localStorage` to store the `leagueData` object, both when we first fetch it from the API and when we update it with the roster data for each league.

// Note:  When the component mounts, we first try to retrieve the `leagueData` object from `localStorage`. If it exists, we use it to set the initial state of the `leagueData` and `leagues` variables. If it doesn't exist, we fetch the `leagueData` from sleeper API again, and then store it in `localStorage`.

// When we update the `leagueData` with roster data for each league, we also store the updated `leagueData` for that league in `localStorage`, using the league ID as the key.

// By storing the `leagueData` in `localStorage`, we can ensure that it persists when page refreshes, and that the imported leagues are still available after the page is refreshed.
// FixMe: LOCAL STORAGE & CONTEXT issues:
  //FixMe: userData, LeagueIds, and leagueData ALL erased after refresh 
  // FixMe: leagueData DID NOT show in local storage upon SelectLeaguePage rendering (userData DID)
  // LeagueIds saved to localStorage upon import 👌
  // leagueData still only shows 1 league ID after import but leagues shows ALL leagues even after import

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SleeperDataContext from '../../context/SleeperDataContext';
import { Form, Button, FormCheck, Container, Row, Col } from 'react-bootstrap';
// import RosterFetcher from './GetRosters';

const SelectLeagues = () => {
  const { userData, setLeagueData, setRosterData, setLeagueUsers } = useContext(SleeperDataContext);
  const [fetchedLeagues, setFetchedLeagues] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [rosters, setRosters] = useState([])
  const [userRoster, setUsersRoster] = useState(null)
  const [users, setUsers] = useState([])
  // const [leagues, setLeagues] = useState([])
  const navigate = useNavigate()
  //CodeLogic: Render ALL user's leagues upon new userData being passed to SelectLeaguesPage & 
   //  set those leagues to state(leagues) and context(leagueData)
  useEffect(() => {
    const fetchLeagues = async () => {
     
      const userId = userData.user_id;
      try {
        const response = await axios.get(
        `https://api.sleeper.app/v1/user/${userId}/leagues/nfl/2023`
      );
      const checkedLeagues = response.data.map((league)=>({...league, isChecked: false}));
      setFetchedLeagues(checkedLeagues);
      console.log('users-leagues', response.data)
      } catch(error) {
        console.error('Error fetching Leagues')
      }
    };

    if (userData.user_id) {
      fetchLeagues();
    }
  }, [userData]);


  const handleLeagueSelection = (selectedLeague) => {
    const updatedLeague = {...selectedLeague, isChecked: !selectedLeague.isChecked};
    setFetchedLeagues((prevLeagues) => 
      prevLeagues.map((league)=> (league.league_id === updatedLeague.league_id ? updatedLeague : league))
    );
    // const updatedLeagues = fetchedLeagues.map((item) =>
    //   item.league_id === league.league_id ? updatedLeague: item);
    if (updatedLeague.isChecked) {
      setSelectedLeagues((prevSelectedLeagues)=>[...prevSelectedLeagues, updatedLeague]);
      console.log('checked league', selectedLeagues)
    } else {
      setSelectedLeagues((prevSelectedLeagues)=> prevSelectedLeagues.filter((league)=> league.league_id !== updatedLeague.league_id));
      // setSelectedLeagues(selectedLeagues.filter((item)=> item.league_id !== updatedLeague.league_id));
    }
  };

  const fetchSelectedLeagues = async (league) => {
    try {
      const response = await axios.get(
        `https://api.sleeper.app/v1/league/${league.league_id}`
        );
      
      setLeagueData(response.data);
      console.log('fetched-leagues', response.data)
      return response.data
    } catch (error) {
      console.error('Selected League sync Failed', error)
    }
  };

  const fetchRostersAndUsers = async (league) => {
    try {
      const rosterResponse = await axios.get(
        `https://api.sleeper.app/v1/league/${league.league_id}/rosters`
      ); 
      const fetchedRosters = rosterResponse.data;
      console.log('rosters Data', fetchedRosters);
      
      const userRoster = fetchedRosters.find((roster) => roster.owner_id === userData.user_id);
      const usersResponse = await axios.get(
        `https://api.sleeper.app/v1/league/${league.league_id}/users`
      );
      
      const fetchedUsers = usersResponse.data;
      setRosters(fetchedRosters);
      setUsersRoster(userRoster);
      setUsers(fetchedUsers)

      
      console.log('all users data', fetchedUsers);
      console.log('users roster', userRoster);

      return {
        ...league,
        rosters: fetchedRosters,
        users: fetchedUsers,
        userRoster
      }
    } catch (error) {
      console.error('Error fetching rosters & users', error)
      return league;
    }
  }

  const handleImportLeagues = async () => {
    const syncedLeagues = await Promise.all(
      selectedLeagues.map((league)=>fetchSelectedLeagues(league))
    );
    const rosterAndUserData = await Promise.all(
      syncedLeagues.map((league)=> fetchRostersAndUsers(league))
    );
    setRosterData(rosterAndUserData);
    setLeagueUsers(rosterAndUserData);
    navigate('/')
  };

  return (
    <>
      <Container>
        <h2>Select Leagues to Sync</h2>
        <Row>
          {fetchedLeagues && fetchedLeagues.map((league)=>(
            <Col key={league.league_id} sm={6}>
              <Form.Check
                type='checkbox'
                label={league.name}
                checked={league.isChecked}
                onChange={()=>handleLeagueSelection(league)}
              />
            </Col>
          ))}
        </Row>
        <br/>
        <Button onClick={handleImportLeagues}>Import Selected Leagues</Button>
      </Container>
    </>
  )


  // return (
  //   <>
  //     <h4>Select Leagues to Import!</h4>
  //     <Form>
  //       {leagues.map((league) => (
  //         <div key={league.league_id}>
  //           <label>
  //             <FormCheck
  //               type="checkbox"
  //               id={league.league_id}
  //               label={league.name}
  //               value={league.league_id}
  //               onChange={handleLeagueSelection}
  //               checked={selectedLeagues.includes(league.league_id)}
  //             />
  //           </label>
  //         </div>
  //       ))}
  //       <Button variant="primary" onClick={handleImportLeagues} disabled={selectedLeagues.length === 0}>
  //         Import Selected Leagues
  //       </Button>
  //     </Form>
  //     {/* {selectedLeagues.length > 0 && <RosterFetcher leagueIds={selectedLeagues} />} */}
  //   </>
  // );
}

export default SelectLeagues;



