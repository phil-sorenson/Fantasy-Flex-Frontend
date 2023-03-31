
// TeamTab.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup, Card, Container, Row, Col} from 'react-bootstrap';
import CurrentLeagueContext from '../../context/CurrentLeagueContext'; 

const TeamTab = ({ userRoster }) => {
  // const { currentLeague } = useContext(CurrentLeagueContext);
  // const userRoster = currentLeague.userRoster ? currentLeague.userRoster : null;
  // console.log('team tab userRoster', currentLeague.userRoster)
  const [players, setPlayers] = useState(null);

  // useEffect(()=> {
  //   if (userRoster) {
  //     setLoading(false);
  //   }
  // },[userRoster])

  // if(loading) {
  //   return <div>Loading Roster...</div>
  // }
 
  useEffect(() => {
    const fetchPlayers = async () => { 
      try {
        const response = await axios.get('https://api.sleeper.app/v1/players/nfl');
        setPlayers(response.data);
        // console.log('players', response)
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    fetchPlayers();
  }, []);
  
  if (!players) {
    return <div>Loading Players...</div>;
  }

  if (!userRoster) {
    return <div>Loading Roster...</div>;
  }

  const renderPlayerDetails = (playerId) => {
    const player = players[playerId];
    return player ? `${player.position} - ${player.first_name} ${player.last_name} ${player.team}` : `Unknown Player`
  }
  
  const nonStarters = userRoster.players.filter(playerId => !userRoster.starters.includes(playerId));
  
  return (
    <div>
      
        <Card>
          <Card.Header>
            <h2> Roster</h2>
          </Card.Header>
          <ListGroup variant="flush">
            <Card.Title className='m-3'><b>Starters</b></Card.Title>
            {userRoster.starters.map((playerId, index) => (
              <ListGroup.Item key={index}>
                {index + 1}. {renderPlayerDetails(playerId)}
              </ListGroup.Item>
            ))}
            <Card.Title className="m-3"><b>Bench</b></Card.Title>
            {nonStarters.map((playerId, index)=> (
              <ListGroup.Item key={index}>
                {index + 1}. {renderPlayerDetails(playerId)}
              </ListGroup.Item>
            ))}
            <Card.Title className='m-3'><b>Taxi Squad</b></Card.Title>
              {userRoster.taxi.map((playerId, index)=>(
                <ListGroup.Item key={index}>
                  {renderPlayerDetails(playerId)}
                </ListGroup.Item>
              ))}
            <Card.Title className='m-3'><b>Injured Reserve</b></Card.Title>
              {userRoster.reserve.map((playerId, index)=>(
                <ListGroup.Item key={index}>
                  {renderPlayerDetails(playerId)}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card>
      
    </div>
  );
};

export default TeamTab;
