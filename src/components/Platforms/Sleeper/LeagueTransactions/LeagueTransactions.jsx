import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import SleeperDataContext from '../../../../context/SleeperDataContext';
import { Table } from 'react-bootstrap';
// import nflPlayers from '../data/nflPlayers';


const LeagueTransactions =({ currentLeague }) => {
  console.log('currentLeague.league_id', currentLeague.league_id)
  const { leagueData, leagueUsers, rosterData } = useContext(SleeperDataContext)
  console.log('leagueData', leagueData)
  const [transactions, setTransactions] = useState([])

  useEffect(()=> {

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`https://api.sleeper.app/v1/league/${currentLeague.league_id}/transactions/2`)
        console.log('API Response',response)
        setTransactions(response.data)
        console.log('transactions', transactions)
      } catch (error) {
        console.error('Error loading transactions')
      }
    }
    if (currentLeague.league_id) {
      fetchTransactions();
    }
  },[currentLeague.league_id])


  const getPlayerName = (playerId) => {
    const player = leagueUsers.find((user)=> user.player_id === playerId);
    return player ? `${player.first_name} ${player.last_name}` : `Unknown Player`;
  }


  const renderTransactionDetails = (transaction) => {
    switch (transaction.type) {
      case 'trade':
        const tradedPlayers = transaction.trade && Array.isArray(transaction.trade) ? transaction.trade.map((playerId) => getPlayerName(playerId)).join('.') : 'No Traded players';
        return `Trade: ${tradedPlayers}`
      case 'free_agent':
        const addedPlayer = getPlayerName(transaction)
        return `Free Agent: ${transaction.free_agent}`
      case 'waiver':
        return `Waiver: ${transaction.waiver}`
      default:
        return `Unknown transaction Type`
    }
  }

  return (
    <>
      <div>
      <h2>League Transactions</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transaction_id}>
              <td>{new Date(transaction.created).toLocaleDateString()}</td>
              <td>{transaction.type}</td>
              <td>{renderTransactionDetails(transaction)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </>
  );
};

export default LeagueTransactions;