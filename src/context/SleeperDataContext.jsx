// 
import React, { createContext, useState, useEffect } from 'react';

const SleeperDataContext = createContext();
export default SleeperDataContext

export const SleeperDataProvider = ({children}) => {
  
  const [userData, setUserData] = useState({});
  const [leagueData, setLeagueData] = useState({});
  // const [leagueIds, setLeagueIds] = useState([])
  const [rosterData, setRosterData] = useState([]);
  const [leagueUsers, setLeagueUsers] = useState([])
  
  useEffect(()=> {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const storedLeagueData = JSON.parse(localStorage.getItem('leagueData'));
    const storedRosters = JSON.parse(localStorage.getItem('rosterData'));
    const storedLeagueUsers = JSON.parse(localStorage.getItem('leagueUsers'));
    

    if (storedUserData) {
      setUserData(storedUserData)
    }
    if (storedLeagueData) {
      setLeagueData(storedLeagueData)
    }
    if (storedRosters) {
      setRosterData(storedRosters)
    }
    if (storedLeagueUsers) {
      setLeagueUsers(storedLeagueUsers)
    }
  },[])

  useEffect(()=> {
    localStorage.setItem('userData', JSON.stringify(userData))
    localStorage.setItem('leagueData', JSON.stringify(leagueData))
    localStorage.setItem('rosterData', JSON.stringify(rosterData))
    localStorage.setItem('leagueUsers', JSON.stringify(leagueUsers))
  },[userData, leagueData, rosterData, leagueUsers])

  return (
    <SleeperDataContext.Provider value={{ userData, setUserData, 
      leagueData, setLeagueData, 
      rosterData, setRosterData,
      leagueUsers, setLeagueUsers 
      }}>
      {children}
    </SleeperDataContext.Provider>
  );
}







// const SleeperDataProvider = (props) => {
//   const [user, setUser] = useState(() => {
//     const localData = localStorage.getItem("user");
//     return localData ? JSON.parse(localData) : {};
//   });

//   const [leagues, setLeagues] = useState(() => {
//     const localData = localStorage.getItem("leagues");
//     return localData ? JSON.parse(localData) : [];
//   });


// };

// export default SleeperDataProvider;
