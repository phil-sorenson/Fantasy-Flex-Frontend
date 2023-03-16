import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <div >
          <li className="brand">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <h3><b>Fantasy🏈Flex</b></h3>
              <h6><b>Multi-League Tracker</b></h6>
            </Link>
          </li>
        </div>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
