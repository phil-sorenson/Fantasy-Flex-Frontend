import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import DataContext from '../../context/SleeperDataContext';

function RosterFetcher({ leagueIds }) {
  const { userData, setLeagueData }= useContext(DataContext)
  const [rosters, setRosters] = useState([])
  
  useEffect(() => {
    const fetchRosters = async () => {
      try {
        const rosters = [];
        for (const leagueId of leagueIds) {
          const response = await axios.get(`https://api.sleeper.app/v1/league/${leagueId}/rosters`);
          const leagueData = {
            ...response.data.metadata,
            rosters: response.data.rosters.map((roster) => ({
              ...roster,
              is_user_roster: roster.owner_id === userData.user_id,
            })),
          };
          setLeagueData(leagueId, leagueData);
          rosters.push(...leagueData.rosters);
        }
        setRosters(rosters);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRosters();
  }, [leagueIds]);

  return (
    <div>
      <h5>Rosters</h5>
      {rosters && rosters.map((roster) => (
        <div key={roster.roster_id}>
          <p>{roster.players[0]}</p>
        </div>
      ))}
    </div>
  );
}

export default RosterFetcher;
