import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ListGroup, Card} from 'react-bootstrap'

const TrendingPlayersTab = () => {
  const [trendingPlayers, setTrendingPlayers] = useState(null);
  const [players, setPlayers]= useState(null)
  
  useEffect(() => {
  const fetchTrendingPlayers = async () => {
    try {
      const response = await axios.get('https://api.sleeper.app/v1/players/nfl/trending/add');
      setTrendingPlayers(response.data);
      console.log('trendingPlayers', response.data)
    } catch (error) {
      console.error('Error Fetching Trending Players:', error);
    }
  };
  const fetchPlayers = async () => {
    try {
      const response = await axios.get('https://api.sleeper.app/v1/players/nfl');
      setPlayers(response.data);
    } catch (error) {
      console.error('Error Fetching Players:', error);
    }
  };

  fetchTrendingPlayers();
  fetchPlayers();
}, []);
  
  const renderPlayerDetails = (playerId) => {
    const player = players[playerId];
    return player
      ? `${player.position} - ${player.first_name} ${player.last_name} ${player.team}`
      : 'Unknown Player';
  };

  if (!trendingPlayers || !players) {
    return <div>Loading Trending Players...</div>;
  }

  return ( 
    <div>
      <Card>
        <Card.Header>
          <h2>Trending Added Players</h2>
        </Card.Header>
        <ListGroup variant="flush">
          {trendingPlayers.map((player, index) => (
            <ListGroup.Item key={index}>
              {index + 1}. {renderPlayerDetails(player.player_id)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};
 
export default TrendingPlayersTab;