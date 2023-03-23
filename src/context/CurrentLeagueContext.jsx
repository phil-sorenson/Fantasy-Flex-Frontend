import React, { useState, useEffect, useContext, createContext } from 'react';


const CurrentLeagueContext = createContext();

const CurrentLeagueProvider = ({ children }) => {
  
  const [currentLeague, setCurrentLeague] = useState(null);


  return(
    <CurrentLeagueContext.Provider value={{currentLeague, setCurrentLeague}}>
      {children}
    </CurrentLeagueContext.Provider>
  );
};

export {CurrentLeagueProvider}
export default CurrentLeagueContext

// const CurrentLeagueContext = createContext({
//   currentLeague: null,
//   setCurrentLeague: () => {}
// })


// export default CurrentLeagueContext;