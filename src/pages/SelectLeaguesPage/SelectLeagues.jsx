// FixMe: League list still disappears even after setting my DataContext to localStorage --> 
  // Possible Solution: Store and parse through leagueData through this page 
// FixMe: Initial leagueData works but when saving the selected/imported leagues/rosters only 1 ends up saving
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
import LeaguePage from '../LeaguePage/LeaguePage';

const SelectLeagues = () => {
  const { userData, setLeagueData, leagueData, rosterData, setRosterData, leagueUsers, setLeagueUsers } = useContext(SleeperDataContext);
  const [fetchedLeagues, setFetchedLeagues] = useState([]);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [rosters, setRosters] = useState([])
  const [userRoster, setUsersRoster] = useState(null)
  const [users, setUsers] = useState([])

  const navigate = useNavigate()
  //CodeLogic: Render ALL user's leagues upon new userData being passed to SelectLeaguesPage & 
   //  set those leagues to state(leagues) and context(leagueData)
  useEffect(() => {
    const fetchLeagues = async () => {
     
      const userId = userData.user_id;
      try {
        const response = await axios.get(
        `https://api.sleeper.app/v1/user/${userId}/leagues/nfl/2022`
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

  const fetchSelectedLeagues = async (league) => {
    try {
      const response = await axios.get(
        `https://api.sleeper.app/v1/league/${league.league_id}`
        );
      console.log('fetched-leagues', response.data)
      const additionalLeagueData = await fetchRostersAndUsers(league);
      setLeagueData((prevLeagueData)=>[
        ...prevLeagueData,
        {
          ...response.data,
          rosters: additionalLeagueData.rosters,
          users: additionalLeagueData.users,
          userRoster: additionalLeagueData.userRoster
        },
      ]);
      return response.data
    } catch (error) {
      console.error('Selected League sync Failed', error)
    }
  };


  const handleImportLeagues = async () => {
    const syncedLeagues = await Promise.all(
      selectedLeagues.map((league)=>fetchSelectedLeagues(league))
    );
    // setLeagueData(syncedLeagues);
    const rosterAndUserData = await Promise.all(
      syncedLeagues.map((league)=> fetchRostersAndUsers(league))
    );
    
    const updatedLeagueData = [...leagueData];
    const updatedRosterData = [...rosterData];
    const updatedLeagueUsers = [...leagueUsers];
  
    rosterAndUserData.forEach((data, index) => {
      const leagueInfo = syncedLeagues[index];
      const existingLeagueIndex = leagueData.findIndex(
        (league) => league.league_id === leagueInfo.league_id
      );
  
    const combinedLeagueData = {
      ...leagueInfo,
      rosters: data.rosters,
      users: data.users,
      userRoster: data.userRoster,
    };

    if (existingLeagueIndex > -1) {
      updatedLeagueData[existingLeagueIndex] = combinedLeagueData;
      updatedRosterData[existingLeagueIndex] = data.rosters;
      updatedLeagueUsers[existingLeagueIndex] = data.users;
    } else {
      updatedLeagueData.push(combinedLeagueData);
      updatedRosterData.push(data.rosters);
      updatedLeagueUsers.push(data.users);
    }
  });
  
    setLeagueData(updatedLeagueData);
    setRosterData(updatedRosterData);
    setLeagueUsers(updatedLeagueUsers);
    navigate('/');
  };
  //   const extractedRosterData = rosterAndUserData.map((data)=> data.rosters)
  //   const extractedLeagueUsers = rosterAndUserData.map((data)=> data.users)
  //   setRosterData(extractedRosterData);
  //   setLeagueUsers(extractedLeagueUsers);
  //   navigate('/')
  // };

  return (
    <div className="vh-100 d-flex align-items-start justify-content-center pt-5">
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
        <Button onClick={handleImportLeagues} disabled={selectedLeagues.length === 0}>Import Selected Leagues</Button>
      </Container>
    </div>
  )



}

export default SelectLeagues;



 