
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SleeperDataContext from '../../context/SleeperDataContext';
import CurrentLeagueContext from '../../context/CurrentLeagueContext';
// import SelectLeagues from '../SelectLeaguesPage/SelectLeagues';
import LeagueTransactionsTab from '../../components/LeaguePageTabs/LeagueTransactionsTab';
import TrendingPlayersTab from '../../components/LeaguePageTabs/TrendingPlayersTab';
import TeamTab from '../../components/LeaguePageTabs/TeamTab';
import LeagueTab from '../../components/LeaguePageTabs/LeagueTab';
import LeagueMatchupsTab from '../../components/LeaguePageTabs/LeagueMatchupsTab';
// Bootstrap & React-icons Imports
import { Form, Button, ButtonGroup, Container, Row, Col, Card, Image } from 'react-bootstrap';


const LeaguePage = () => {
  const { leagueId } = useParams()
  const { leagueData, userData, leagueUsers, rosterData } = useContext(SleeperDataContext);
  const { currentLeague } = useContext(CurrentLeagueContext)
 
  const [activeTab, setActiveTab] = useState('team');
  const [selectedLeague, setSelectedLeague] = useState({})
  
  
  useEffect(()=> {
    if (currentLeague && currentLeague.league_id === leagueId) {
      setSelectedLeague(currentLeague);
      console.log('currentLeague', currentLeague)
      console.log('userRoster', currentLeague.userRoster)
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
    switch (activeTab) {
      case 'team':
        return selectedLeague.userRoster && selectedLeague.userRoster.starters ? (
          <TeamTab currentLeague={selectedLeague} userRoster={selectedLeague.userRoster} />
          ) : (
            <p>Loading Your Roster...</p>
          );
      case 'league':
        return <LeagueTab currentLeague={selectedLeague}/>;
      case 'transactions':
        return <LeagueTransactionsTab currentLeague={selectedLeague}/>;
      case 'trending':
        return <TrendingPlayersTab currentLeague={selectedLeague}/>;
      case 'matchups':
        return <LeagueMatchupsTab leagueId={leagueId} leagueUsers={leagueUsers} allRosters={currentLeague ? currentLeague.rosters : []}/>;
      default:
        return <TeamTab currentLeague={selectedLeague}/>;
    }
  }

  return (
    
    <div className="vh-100 d-flex align-items-start justify-content-center pt-5">
      <Container fluid>
        <Row className="mt-4">
          <Col>
          <Image src={`https://sleepercdn.com/avatars/thumbs/${selectedLeague.avatar}`}
          roundedCircle
          className="mr-2"
          />
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
              <Button variant="primary" onClick={() => setActiveTab('matchups')}>Matchups</Button>
            </ButtonGroup>
          </Col>
        </Row>
        {/* When a button/tab is clicked => this is what calls it -- Any Style changes to the rendered card should be done below */}
        <Row className="mt-3">
          <Col>
            <Card style={{maxWidth: '75%'}} className='mx-auto mb-5' >
              <Card.Body className='overflow-auto' style={{maxHeight: '70vh'}}>{renderTabContent()}</Card.Body>
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
