
// LeagueTab.js
import React, {useState} from 'react';
import { ListGroup, Card , Image} from 'react-bootstrap';

const LeagueTab = ({ currentLeague }) => {
  const { users, settings, scoring_settings } = currentLeague;
  const [selectedUserRoster, setSelectedUserRoster] = useState(null);
  const [players, setPlayers] = useState(null);


  const fetchLeagueUserRoster = (userId) => {
    const selectedUser = currentLeague.rosters.find((roster)=> roster.owner_id === userId);
    setSelectedUserRoster(selectedUser)
  }
  
  const renderPlayerDetails = (playerId) => {
    const player = players[playerId];
    return player ? `${player.position} - ${player.first_name} ${player.last_name} ${player.team}` : `Unknown Player`
  }
  const renderNonStarters = () => {
    if (!selectedUserRoster) return null;
    return selectedUserRoster.players.filter((playerId)=> !selectedUserRoster.starters.includes(playerId)).map((playerId, index)=>(
      <ListGroup.Item key={index}>
        {index +1}. {renderPlayerDetails(playerId)}
      </ListGroup.Item>
    ));
  };
  
  
  return (
    <div>
      <Card className="mb-3">
        <Card.Header>
          <h2>League Users</h2>
        </Card.Header>
        <ListGroup variant="flush">
          {users.map((user, index) => (
            <ListGroup.Item key={index} className='league-users' onClick={()=> fetchLeagueUserRoster(user.user_id)}>
              <Image src={`https://sleepercdn.com/avatars/thumbs/${user.avatar}`}
                roundedCircle
                className="mr-6"
                width={25}
                height={25}
                alt='avatar'
              />
              {user.display_name || user.username}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
        {/* START OF LEAGUEUSER ROSTER CODE */}
      {selectedUserRoster && (
        <div>
          <h3>
            {currentLeague.leagueUsers.find((user) => user.user_id === selectedUserRoster.owner_id).display_name}
            's Roster
          </h3>
          <ListGroup>
            {selectedUserRoster.players.map((playerId, index) => (
              <ListGroup.Item key={index}>
                {index + 1}. {renderPlayerDetails(playerId)}
              </ListGroup.Item>
            ))}
            <Card>
              <Card.Header>
                    <h2>Non-Starters</h2>
              </Card.Header>
              <ListGroup variant="flush">{renderNonStarters()}</ListGroup>
            </Card>
          </ListGroup>
        </div>
      )}
              {/* END OF LEAGUEUSER ROSTER CODE */}
      <Card className="mb-3">
        <Card.Header>
          <h2>League Settings</h2>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Number of teams: {settings.num_teams}</ListGroup.Item>
          <ListGroup.Item>Waivers clear: {settings.waiver_clear_days}</ListGroup.Item>
          <ListGroup.Item>Trade deadline: Week {settings.trade_deadline}</ListGroup.Item>
        </ListGroup>
      </Card>

      <Card>
        <Card.Header>
          <h2>Scoring Settings</h2>
        </Card.Header>
        <ListGroup variant="flush">
          {Object.entries(scoring_settings).map(([key, value]) => (
            <ListGroup.Item key={key}>
              {key}: {value}
              {/* Edit how this looks -- Want to render specific items instead of everything */}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default LeagueTab;
