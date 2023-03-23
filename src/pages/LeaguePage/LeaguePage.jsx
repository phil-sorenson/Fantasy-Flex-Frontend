
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SleeperDataContext from '../../context/SleeperDataContext';
import CurrentLeagueContext from '../../context/CurrentLeagueContext';
// import SelectLeagues from '../SelectLeaguesPage/SelectLeagues';
import LeagueTransactions from '../../components/Platforms/Sleeper/LeagueTransactions/LeagueTransactions';
import TrendingPlayersTab from '../../components/LeaguePageTabs/TrendingPlayersTab';
import TeamTab from '../../components/LeaguePageTabs/TeamTab';
import LeagueTab from '../../components/LeaguePageTabs/LeagueTab';
// Bootstrap & React-icons Imports
import { Form, Button, ButtonGroup, Container, Row, Col, Card } from 'react-bootstrap';


const LeaguePage = () => {
  const { leagueId } = useParams()
  const { leagueData, userData, leagueUsers, userRoster, rosterData } = useContext(SleeperDataContext);
  const { currentLeague } = useContext(CurrentLeagueContext)
 
  const [activeTab, setActiveTab] = useState('team');
  const [selectedLeague, setSelectedLeague] = useState(null)
  
  
  useEffect(()=> {
    if (currentLeague && currentLeague.league_id === leagueId) {
      setSelectedLeague(currentLeague);
      console.log('currentLeague', currentLeague)
    } else {
      const foundLeague = leagueData.find((league) => league.league_id === leagueId);
      setSelectedLeague(foundLeague);
    }
    // console.log('leagueData:', leagueData);
    // console.log('league_id from useParams:', leagueId);
    // const currentLeague = leagueData.find((league) => String(league.league_id) === String(leagueId));
    // console.log('currentLeague:', currentLeague);
    // setSelectedLeague(currentLeague);
  }, [leagueId, leagueData, currentLeague]);

  if (!selectedLeague) return null;
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'team':
        return <TeamTab currentLeague={selectedLeague}/>;
      case 'league':
        return <LeagueTab currentLeague={selectedLeague}/>;
      case 'transactions':
        return <LeagueTransactions currentLeague={selectedLeague}/>;
      case 'trending':
        return <TrendingPlayersTab currentLeague={selectedLeague}/>;
      default:
        return <TeamTab currentLeague={selectedLeague}/>;
    }
  }

  return (
    
    <div className="vh-100 d-flex align-items-start justify-content-center pt-5">
      <Container fluid>
        <Row className="mt-4">
          <Col>
            <h1>{selectedLeague.name}</h1>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <ButtonGroup>
              <Button variant="primary" onClick={() => setActiveTab('team')}>Team</Button>
              <Button variant="primary" onClick={() => setActiveTab('league')}>League</Button>
              <Button variant="primary" onClick={() => setActiveTab('transactions')}>League Transactions</Button>
              <Button variant="primary" onClick={() => setActiveTab('trending')}>Trending Players</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Card>
              <Card.Body>{renderTabContent()}</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>



    // <div className="vh-100 d-flex align-items-start justify-content-center pt-5">
    //   <Container>
    //     <h1>{currentLeague.name} Dashboard</h1>
    //     <Tabs defaultActiveKey="roster" id="league-dashboard-tabs">
    //       <Tab eventKey="roster" title="Roster" usersRoster={userRoster} rosters={rosterData} leagueUsers={leagueUsers}>  
    //       </Tab>
    //       <Tab eventKey="transactions" title="League Transactions">
    //           <LeagueTransactions selectedLeague={currentLeague}/>
    //       </Tab>
    //       <Tab eventKey="standings" title="Standings">
    //         {/* Standings tab content */}
    //       </Tab>
    //       <Tab eventKey="waiver" title="Waiver Wire">
    //         {/* Waiver Wire tab content */}
    //       </Tab>
    //     </Tabs>
    //   </Container>
    // </div>
  );
};

export default LeaguePage;
