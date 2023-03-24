import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Card } from 'react-bootstrap';

const LeagueUserRoster = ({ selectedUserRoster, user }) => {
  const [players, setPlayers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null)
  
  useEffect(()=> {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`https://api.sleeper.app/v1/players/nfl`);
        setPlayers(response.data)
        // console.log('leagueUserRoster', response)
      } catch (error) {
        console.error('Error Fetching Players:', error);
      }
    };
    fetchPlayers()
  },[])

  if (!players || !selectedUserRoster) {
    return <div>Loading Players...</div>;
  }


  const renderPlayerDetails = (playerId) => {
    const player = players[playerId];
    return player ? `${player.position} - ${player.first_name} ${player.last_name} ${player.team}` : `Unknown Player`
  };

  const nonStarters = selectedUserRoster.players.filter(playerId => !selectedUserRoster.starters.includes(playerId)); 
  const taxi = selectedUserRoster.taxi || [];
  const reserve = selectedUserRoster.reserve || [];
  

  return ( 
    <div>
      <Card>
        <Card.Title className='m-3'>
          <b>Starters</b>
        </Card.Title>
        <ListGroup variant='flush'>
          {selectedUserRoster.starters.map((playerId, index)=>(
            <ListGroup.Item key={index}>
              {index + 1}. {renderPlayerDetails(playerId)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      {/* Bench, IR, & Taxi Squad */}
      <Card>
        <Card.Title className='m-3'>
          <b>Bench</b>
        </Card.Title>
        <ListGroup variant='flush'>
          {nonStarters.map((playerId, index)=>(
            <ListGroup.Item key={index}>
              {index + 1}. {renderPlayerDetails(playerId)}
            </ListGroup.Item>
          ))}
       
        
        <Card.Title className='m-3'><b>Taxi Squad</b></Card.Title>
          {taxi.map((playerId, index)=>(
            <ListGroup.Item key={index}>
              {renderPlayerDetails(playerId)}
            </ListGroup.Item>
          ))}
        <Card.Title className='m-3'><b>Injured Reserve</b></Card.Title>
          {reserve.map((playerId, index)=>(
            <ListGroup.Item key={index}>
              {renderPlayerDetails(playerId)}
            </ListGroup.Item>
          ))} 
        </ListGroup>
      </Card>
    </div>

   );
}
 
export default LeagueUserRoster;