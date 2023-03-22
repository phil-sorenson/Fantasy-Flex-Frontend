
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SleeperDataContext from '../../context/SleeperDataContext';
// Bootstrap & React-icons Imports
import { Form, Button, FormCheck, Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import SelectLeagues from '../SelectLeaguesPage/SelectLeagues';
import LeagueTransactions from '../../components/Platforms/Sleeper/LeagueTransactions/LeagueTransactions';


const LeaguePage = () => {
  const { leagueId } = useParams()
  const {leagueData, userData, leagueUsers, userRoster, rosterData} = useContext(SleeperDataContext)
  const [selectedLeague, setSelectedLeague] = useState(null)

  useEffect(()=> {
    const currentLeague = leagueData.find((league)=> league.league_id === leagueId )
    setSelectedLeague(currentLeague)
    console.log('currentLeague', currentLeague)
  }, [leagueId, leagueData])

  if (!selectedLeague) {
    return <div>Loading...</div>;
  }


  return (
    
    <div className="vh-100 d-flex align-items-start justify-content-center pt-5">
      <Container>
        <h1>{selectedLeague.name} Dashboard</h1>
        <Tabs defaultActiveKey="roster" id="league-dashboard-tabs">
          <Tab eventKey="roster" title="Roster" usersRoster={userRoster} rosters={rosterData} leagueUsers={leagueUsers}>
            
          </Tab>
          <Tab eventKey="transactions" title="League Transactions">
              <LeagueTransactions currentLeague={selectedLeague}/>
          </Tab>
          <Tab eventKey="standings" title="Standings">
            {/* Standings tab content */}
          </Tab>
          <Tab eventKey="waiver" title="Waiver Wire">
            {/* Waiver Wire tab content */}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default LeaguePage;
