import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import  { SleeperDataProvider }  from "./context/SleeperDataContext";
import {CurrentLeagueProvider} from "./context/CurrentLeagueContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';

// 'root' element configuration -- vite 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <CurrentLeagueProvider>
        <SleeperDataProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </SleeperDataProvider>
      </CurrentLeagueProvider>
    </Router>
  </React.StrictMode>
)