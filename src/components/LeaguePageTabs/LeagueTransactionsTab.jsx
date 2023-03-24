import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import SleeperDataContext from '../../context/SleeperDataContext';
import { Table, ListGroup, Card } from 'react-bootstrap';
// import nflPlayers from '../data/nflPlayers';


const LeagueTransactionsTab =({ currentLeague }) => {
  console.log('currentLeague.league_id', currentLeague.league_id)
  const { leagueData, leagueUsers, rosterData } = useContext(SleeperDataContext)
  // console.log('leagueData', leagueData)
  const [transactions, setTransactions] = useState([]);
  const [players, setPlayers] = useState(null);

  useEffect(()=> {

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `https://api.sleeper.app/v1/league/${currentLeague.league_id}/transactions/2`
          );
        console.log('API Response',response)
        setTransactions(response.data)
        // console.log('transactions', transactions)
      } catch (error) {
        console.error('Error loading transactions')
      }
    }
    if (currentLeague.league_id) {
      fetchTransactions();
    }

    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`https://api.sleeper.app/v1/players/nfl`);
        setPlayers(response.data)
      } catch (error) {
        console.error('Error fetching players...', error)
      }
    };
    fetchPlayers();
  },[currentLeague.league_id])

  if (!players) {
    return <div>Loading Players...</div>;
  }

  
  const getPlayerDetails = (playerId) => {
    const player = players[playerId];
    return player ? `${player.position} - ${player.first_name} ${player.last_name} ${player.team}` : `Unknown Player`;
  }

  const getUserDetails = (userId) => {
    const user = leagueUsers.find((user) => user.user_id === userId);
    return user ? `${user.display_name || user.username}` : `Unknown User`;
  };

  // Note: leagueUsers roster_id(s) (# 1-12) needs to match the roster_id(s) inside of the transaction 
  // Note:  "adds": {
      // "2315": 1   => => player_id 2315 added to roster_id 1
  // Note: transaction_id also may help to identify details
  const renderTransactionDetails = (transaction) => {
  
    switch (transaction.type) {
      case 'trade':
        const tradedPlayers = transaction.trade && Array.isArray(transaction.trade) ? transaction.trade.map((playerId) => 
          getPlayerDetails(playerId)).join('.') : 'No Traded players';
        const involvedUsers = transaction.trade && Array.isArray(transaction.trade) ? transaction.trade.map((playerId) => 
          getUserDetails(transaction.metadata[`${playerId}_to_user_id`])).join('.') : 'No Users';
        return `Trade: ${tradedPlayers} | Involved Users: ${involvedUsers}`;
      case 'free_agent':
        const addedPlayer = getPlayerDetails(transaction.adds)
        const addedUser = getUserDetails(transaction.owner_id)
        return `Free Agent: ${addedPlayer} | User: ${addedUser}`;
      case 'waiver':
        const waiverPlayer = getPlayerDetails(transaction.added);
        const waiverUser = getUserDetails(transaction.owner_id);
        return `Waiver: ${waiverPlayer} | User: ${waiverUser}`;                        
      default:
        return `Unknown transaction Type`
    }                                                                                              
  }

  const trades = transactions.filter((transaction) => transaction.type === 'trade');
  const waivers = transactions.filter((transaction) => transaction.type === 'waiver');
  const freeAgents = transactions.filter((transaction) => transaction.type === 'free_agent');

  return (
    <div>
      <div>
      <h2>League Transactions</h2>
      <Card>
        <Card.Header>
          <b>Trades</b>
        </Card.Header>
        <ListGroup variant="flush">
          {trades.map((transaction, index) => (
            <ListGroup.Item key={index}>
              {new Date(transaction.created).toLocaleDateString()} - {renderTransactionDetails(transaction)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Card>
        <Card.Header>
          <b>Free Agents</b>
        </Card.Header>
        <ListGroup variant="flush">
          {freeAgents.map((transaction, index) => (
            <ListGroup.Item key={index}>
              {new Date(transaction.created).toLocaleDateString()} - {renderTransactionDetails(transaction)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
      <Card>
      <Card.Header>
        <b>Waivers</b>
      </Card.Header>
      <ListGroup variant="flush">
        {waivers.map((transaction, index) => (
          <ListGroup.Item key={index}>
            {new Date(transaction.created).toLocaleDateString()} - {renderTransactionDetails(transaction)}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
      </div>
    </div>
  );
};

export default LeagueTransactionsTab;