// General Imports
import React, { useState } from "react";
import { Routes, Route  } from "react-router-dom";
import "./App.css";
import { KEY } from "./localKey";
import { APP_ID } from "./localKey";
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages Imports
import LoginPage from "./pages/ReactLoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import SelectPlatform from "./pages/SelectPlatformPage/SelectPlatform";
import SleeperLogin from './pages/PlatformLoginPage/Sleeper/SleeperLogin'
import SelectLeagues from "./pages/SelectLeaguesPage/SelectLeagues";
// import SleeperDataProvider from "./context/SleeperDataContext";


// Component Imports
import Navbar from "./components/Header/NavBar";
import Footer from "./components/Footer/Footer";
import SideNavbar from "./components/SidebarNav/SideNavbar";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

import useAuth from "./hooks/useAuth";


// export const BASE_URL = `https://api.sleeper.app/v1/`;
// export const DB_URL = `http://127.0.0.1:8000/api/sleeper/`;

function App() {
  

  return (
    <div className="App">
      <div>
      
          <Navbar />
          <SideNavbar />
              <Routes>
                <Route
                  path='/'
                  element={
                    <PrivateRoute>
                      <HomePage />
                    </PrivateRoute>
                  }
                />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/platform-select' element={<SelectPlatform/>}/>
                <Route path='/sleeper-login' element={<SleeperLogin/>}/>
                <Route path='/select-leagues' element={<SelectLeagues/>}/>

              </Routes>
            
          <Footer />
        
      </div>
    </div>
  );
}

export default App;
