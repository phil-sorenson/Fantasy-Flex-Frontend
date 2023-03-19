// 
import React, { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

//Note: leagueUsers && rosterData ==> Returning the same thing : All of the necessary information combined from selected leagues
// FixMe: leagueData 

const SleeperDataContext = createContext();
export default SleeperDataContext;

export const SleeperDataProvider = ({ children }) => {
  const [userData, setUserData] = useLocalStorage('userData', {});
  const [leagueData, setLeagueData] = useLocalStorage('leagueData', []);
  const [rosterData, setRosterData] = useLocalStorage('rosterData', []);
  const [usersRosters, setUsersRosters] = useLocalStorage('usersRosters', [])
  const [leagueUsers, setLeagueUsers] = useLocalStorage('leagueUsers', []);

  return (
    <SleeperDataContext.Provider
      value={{
        userData,
        setUserData,
        leagueData,
        setLeagueData,
        rosterData,
        setRosterData,
        usersRosters,
        setUsersRosters,
        leagueUsers,
        setLeagueUsers,
      }}
    >
      {children}
    </SleeperDataContext.Provider>
  );
};





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
