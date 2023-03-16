// ToDo: Make the sleeper button the Sleeper logo
// ToDo: Make sure the navigate is working

import React from "react";
import { Link, useNavigate } from "react-router-dom";


const SelectPlatform = () => {
  // const navigate = useNavigate();

  // const handlePlatformSelection = (platform) => {
  //   navigate(`/sync?platform=${platform}`);
  // };

  return (
    <div>
      <h2>SELECT A PLATFORM</h2>

      <Link to='/sleeper-login'>Sleeper</Link>
      <Link to='/mfl-login'>MFL</Link>
      {/* <button onClick={()=> handlePlatformSelection('MFL')}>
        MFL
      </button> */}
    </div>
  );
};

export default SelectPlatform;