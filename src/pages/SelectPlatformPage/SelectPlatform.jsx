// ToDo: Make the sleeper button the Sleeper logo
// ToDo: Make sure the navigate is working

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const SelectPlatform = () => {
  
  const navigate = useNavigate();

  const goToSleeperLogin = () => {
    navigate('/sleeper-login')
  }

  return (
    <div>
      <h2>Select Platform</h2>
      <Button onClick={goToSleeperLogin}>Sleeper</Button>
      
      {/* <Link to='/mfl-login'>MFL</Link> */}
      {/* <button onClick={()=> handlePlatformSelection('MFL')}>
        MFL
      </button> */}
    </div>
  );
};

export default SelectPlatform;