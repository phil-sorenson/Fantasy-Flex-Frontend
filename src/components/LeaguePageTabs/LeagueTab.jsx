
// LeagueTab.jsx
  // This tab Shows all leagueUsers, specific league settings, and scoring_settings
  // users will can click on a specific leagueUser and see their entire roster
import React, {useState} from 'react';
import { ListGroup, Card , Image, Modal, Button, Accordion} from 'react-bootstrap';
import LeagueUserRoster from '../LeagueData/LeagueUserRoster';


const LeagueTab = ({ currentLeague }) => {
  const { users, settings, scoring_settings } = currentLeague;
  const [selectedUserRoster, setSelectedUserRoster] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setSelectedUserRoster(null)
  }
  const fetchLeagueUserRoster = (userId) => {
    const selectedUser = users.find((user)=> user.user_id === userId)
    const selectedUserRoster = currentLeague.rosters.find((roster)=> roster.owner_id === userId);
    setSelectedUserRoster(selectedUserRoster)
    setSelectedUser(selectedUser)
    setShowModal(true);
  }
  
  
  return (
    <div>
      <Card className="mb-3">
        <Card.Header>
          <h2>League Users</h2>
        </Card.Header>
        <ListGroup variant="flush">
          {users.map((user, index) => (
            <ListGroup.Item key={index} className='league-users clickable' onClick={()=> fetchLeagueUserRoster(user.user_id)}>
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
      {/* render any LeagueUser's roster modal */}
      <Modal show={showModal} onHide={handleClose} size='sm' style={{maxHeight: '80vh'}}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>{selectedUser ? (selectedUser.display_name || selectedUser.username) : '' }'s Roster</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LeagueUserRoster selectedUserRoster={selectedUserRoster}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
};

export default LeagueTab;
