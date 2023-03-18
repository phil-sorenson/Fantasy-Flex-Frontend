import React, { useContext } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SleeperDataContext  from '../../context/SleeperDataContext'

const SideNavbar = () => {
  const { userData, leagueData } = useContext(SleeperDataContext);

  return (
      <Navbar bg="light" expand="lg">
        {/* <Navbar.Brand href="/">Fantasy App</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {leagueData.length > 0 && (
              <NavDropdown title="Leagues" id="basic-nav-dropdown">
                {leagueData.map((league) => (
                  <NavDropdown.Item key={league.league_id} href={`/league/${league.league_id}`}>
                    {league.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

export default SideNavbar;



    // <Navbar bg="light" expand="lg">
    //   {/* <Navbar.Brand as={Link} to="/">My App</Navbar.Brand> */}
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav className="mr-auto">
    //       <Nav.Item>
    //         <Nav.Link as={Link} to="/">Home</Nav.Link>
    //       </Nav.Item>
    //       {Object.entries(leagueData).map(([leagueId, league]) => (
    //         <Nav.Item key={leagueId}>
    //           <Nav.Link as={Link} to={`/league/${leagueId}`}>
    //             <Image src={userData.avatar} roundedCircle className="mr-2" style={{ width: '20px', height: '20px' }} />
    //             {league.name}
    //             <div>{league.user_roster ? league.user_roster.metadata.team_name : ''}</div>
    //           </Nav.Link>
    //         </Nav.Item>
    //       ))}
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
