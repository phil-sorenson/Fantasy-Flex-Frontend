// ToDo: Make the sleeper button the Sleeper logo
// ToDo: Make sure the navigate is working

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

const SelectPlatform = () => {
  
  const navigate = useNavigate();

  const goToSleeperLogin = () => {
    navigate('/sleeper-login')
  }

  return (
    <div className="vh-100 d-flex align-items-start justify-content-center pt-5">
      <Container className="text-center">
        <Row>
          <Col>
            <h2>Select Platform</h2>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <Button onClick={goToSleeperLogin}>Sleeper</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SelectPlatform;