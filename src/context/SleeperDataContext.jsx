// 
import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext();
export default DataContext

export const DataContextProvider = ({children}) => {
  
  const [userData, setUserData] = useState({});
  const [leagueData, setLeagueData] = useState({});
  const [leagueIds, setLeagueIds] = useState([])
  const [importedLeagues, setImportedLeagues] = useState({})
  useEffect(()=> {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const storedLeagueData = JSON.parse(localStorage.getItem('leagueData'));
    const storedLeagueIds = JSON.parse(localStorage.getItem('leagueIds'));
    

    if (storedUserData) {
      setUserData(storedUserData)
    }
    if (storedLeagueData) {
      setLeagueData(storedLeagueData)
    }
    if (storedLeagueIds) {
      setLeagueIds(storedLeagueIds)
    }
  },[])

  useEffect(()=> {
    localStorage.setItem('userData', JSON.stringify(userData))
    localStorage.setItem('leagueData', JSON.stringify(leagueData))
    localStorage.setItem('leagueIds', JSON.stringify(leagueIds))
  },[userData, leagueData, leagueIds])

  return (
    <DataContext.Provider value={{ userData, setUserData, leagueData, setLeagueData, leagueIds, setLeagueIds }}>
      {children}
    </DataContext.Provider>
  );
}



// import React, { createContext, useState } from "react";


// export const SleeperContext = createContext();


// export const UserContextProvider = ({ children }) => {
//   // const userData = localStorage.getItem({
//   //   username: 'username',
//   //   userId: 'user_id',
//   //   displayName: 'display_name',
//   //   avatar: 'avatar'
//   // })
//   // const [data, setData] = useState(userData);
//   const [sleeperData, setSleeperData] = useState({
//     username: 'username',
//     user_id: 'user_id',
//     display_name: 'display_name',
//     avatar: 'avatar'
//   })



//   return (
//     <UserContext.Provider value={{ sleeperData, setSleeperData }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContextProvider;
