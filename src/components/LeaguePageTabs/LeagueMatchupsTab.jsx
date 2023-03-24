import React, { useState, useEffect } from "react";
import { ListGroup, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

const MatchupsTab = ({ leagueId, leagueUsers, allRosters}) => {
  const [week, setWeek] = useState(1);
  const [matchups, setMatchups] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${week}`)
      .then((response) => {
        setMatchups(response.data);
      })
      .catch((error) => {
        console.error("Error fetching matchups data:", error);
      });
  }, [leagueId, week]);

  const getUsernameFromRosterId = (rosterId) => {
    const roster = allRosters.find((roster) => roster.roster_id === rosterId);
    if (!roster) {
      return "Unknown User";
    }
  
    const owner_id = roster.owner_id;
    const user = leagueUsers.find((user) => user.user_id === owner_id);
    return user ? user.display_name : "Unknown User";
  };
  

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <Form.Control
            as="select"
            value={week}
            onChange={(e) => setWeek(parseInt(e.target.value))}
          >
            {[...Array(18)].map((_, index) => (
              <option key={index} value={index + 1}>
                Week {index + 1}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Row>
      <ListGroup>
        {matchups.map((matchup, index) => {
          const user1 = getUsernameFromRosterId(matchup.roster_id);
          const user2 = index + 1 < matchups.length ? getUsernameFromRosterId(matchups[index + 1].roster_id) : null;

          if (user2) {
            const points1 = matchup.points.toFixed(2);
            const points2 = matchups[index + 1].points.toFixed(2);
            index++;

            return (
              <ListGroup.Item key={index - 1}>
                {user1} ({points1}) vs. {user2} ({points2})
              </ListGroup.Item>
            );
          }

          return (
            <ListGroup.Item key={index}>
              {user1} ({matchup.points.toFixed(2)}) - No opponent
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default MatchupsTab;
