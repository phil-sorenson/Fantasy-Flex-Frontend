// Dropdown component example

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const LeagueDropdown = ({ leagues }) => {
  const history = useHistory();

  const handleLeagueClick = (leagueName) => {
    history.push(`/league/${leagueName}`);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select a league
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {leagues.map((league) => (
          <Dropdown.Item
            key={league.league_id}
            onClick={() => handleLeagueClick(league.name)}
          >
            {league.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LeagueDropdown;
