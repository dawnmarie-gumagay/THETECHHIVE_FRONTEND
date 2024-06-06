import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingBar1 from './loadingbars/LoadingBar1';
import LoadingBar2 from './loadingbars/LoadingBar2';
import LoadingBar3 from './loadingbars/LoadingBar3';
import WSLandingPage from './working student/WSLandingPage/WSLandingPage';
import ContactUs from './working student/WSContactUs/ContactUs';
import AboutUs from './working student/WSAboutUs/AboutUs';
import SignUpSignIn from './working student/WSSignUpSignIn/SignUpSignIn';
import SignUp from './working student/WSSignUpSignIn/SignUp';
import SuccessfullyRegistered from './working student/WSSignUpSignIn/SuccessfullyRegistered';
import SignIn from './working student/WSSignUpSignIn/SignIn';
import WSHomepage from './working student/WSHomepage/WSHomepage';
import ADSignIn from './admin pages/ADSignIn/SignIn';
import AdHome from './admin pages/ADHome/AdHome';
import AdEntry from './admin pages/ADEntry/AdEntry';
import AdLeaderboard from './admin pages/ADLeaderboard/AdLeaderboard';
import AdProfile from './admin pages/ADProfile/AdProfile';
import AdLogout from './admin pages/ADLogout/Logout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/wslandingpage" />} />
        <Route path="/loadingbar1" element={<LoadingBar1 />} />
        <Route path="/loadingbar2" element={<LoadingBar2 />} />
        <Route path="/loadingbar3" element={<LoadingBar3 />} />
        
        <Route path="/wslandingpage/" element={<WSLandingPage />} />
        <Route path="/wscontactus/" element={<ContactUs />} />
        <Route path="/wsaboutus/" element={<AboutUs />} />
        <Route path="/wssignupsignin/" element={<SignUpSignIn />} />
        <Route path="/signup/" element={<SignUp />} />
        <Route path="/signin/" element={<SignIn />} />
        <Route path="/successfullyregistered/" element={<SuccessfullyRegistered />} />
        <Route path="/wshomepage/" element={<WSHomepage />} />

        <Route path="/adsignin/" element={<ADSignIn />}/>
        <Route path="/adhome/" element={<AdHome />}/>
        <Route path="/adentry/" element={<AdEntry />}/>
        <Route path="/adleaderboard/" element={<AdLeaderboard />}/>
        <Route path="/adprofile/" element={<AdProfile />}/>
        <Route path="/adlogout/" element={<AdLogout />}/>

      </Routes>
    </Router>
  );
};

export default App;
