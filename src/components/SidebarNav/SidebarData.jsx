import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SleeperLeagueImport from './SleeperLeagueImport';

const AppNavbar = ({ userId }) => {
  const [showImportModal, setShowImportModal] = useState(false);
  const navigate = useNavigate();

  const handleImportClick = () => {
    setShowImportModal(true);
  };

  const handleImportLeagues = (selectedLeagues) => {
    // Do something with the selected leagues
    console.log(selectedLeagues);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">My App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Import Leagues" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleImportClick}>
              Select Leagues to Import
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>

      {showImportModal && (
        <SleeperLeagueImport userId={userId


//# ========================


import React, { useState } from 'react';
import AppNavbar from './AppNavbar';

const App = () => {
  const [selectedLeagues, setSelectedLeagues] = useState([]);

  const handleImportLeagues = (selectedLeagues) => {
    // Do something with the selected leagues, such as store them in state
    setSelectedLeagues(selectedLeagues);
  };

  return (
    <div>
      <AppNavbar userId="123" onImportLeagues={handleImportLeagues} />
      {/* Render the rest of the app */}
    </div>
  );
};

export default SidebarData;
