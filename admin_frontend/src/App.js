import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ADSignIn from './admin pages/ADSignIn/SignIn';
import AdHome from './admin pages/ADHome/AdHome';
import AdEntry from './admin pages/ADEntry/AdEntry';
import AdLeaderboard from './admin pages/ADLeaderboard/AdLeaderboard';
import AdProfile from './admin pages/ADProfile/AdProfile';
import AdLogout from './admin pages/ADLogout/Logout';
import LogoutDialog from './components/LogoutDialog'; // Corrected import path

const App = () => {
  const handleClose = () => {
    console.log('Pop-up closed');
  };

  return (
    <Router>
      <Routes>
        <Route path="/adsignin" element={<ADSignIn />} />
        <Route path="/adhome" element={<AdHome />} />
        <Route path="/adentry" element={<AdEntry />} />
        <Route path="/adleaderboard" element={<AdLeaderboard />} />
        <Route path="/adprofile" element={<AdProfile />} />
        <Route path="/adlogout" element={<AdLogout />} />
        <Route path="/logoutdialog" element={<LogoutDialog />} />
      </Routes>
    </Router>
  );
};

export default App;
