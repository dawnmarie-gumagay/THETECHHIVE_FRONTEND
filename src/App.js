import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingBar2 from './loadingbars/LoadingBar2';
import WSLandingPage from './working student/WSLandingPage/WSLandingPage';
import ContactUs from './working student/WSContactUs/ContactUs';
import AboutUs from './working student/WSAboutUs/AboutUs';
import SignUpSignIn from './working student/WSSignUpSignIn/SignUpSignIn';
import SignUp from './working student/WSSignUpSignIn/SignUp';
import SuccessfullyRegistered from './working student/WSSignUpSignIn/SuccessfullyRegistered';
import SignIn from './working student/WSSignUpSignIn/SignIn';
import WSHomepage from './working student/WSHomepage/WSHomepage';
import WSComment from './working student/WSHomepage/WSComment';
import WSReport from './working student/WSReport/WSReport';
import PopUpReport from './working student/WSReport/PopUpReport';
import PopUpConfirm from './working student/WSReport/PopUpConfirm';
import PopUpSuccess from './working student/WSReport/PopUpSuccess';
import WSLeaderboards from './working student/WSLeaderboards/WSLeaderboards';
import WSProfile from './working student/WSProfile/WSProfile';
import UpdatedPopUp from './working student/WSProfile/UpdatedPopUp';
import WSLogout from './working student/WSProfile/WSLogout';
import ConfirmLogout from './working student/WSProfile/ConfirmLogout';
import AboutUs2 from './working student/WSAboutUs/AboutUs2';
import AboutUs3 from './working student/WSAboutUs/AboutUs3';
import AboutUs4 from './working student/WSAboutUs/AboutUs4';
import AboutUs5 from './working student/WSAboutUs/AboutUs5';
import ADSignIn from './admin pages/ADSignIn/SignIn';
import AdHome from './admin pages/ADHome/AdHome';
import AdEntry from './admin pages/ADEntry/AdEntry';
import AdLeaderboard from './admin pages/ADLeaderboard/AdLeaderboard';
import AdProfile from './admin pages/ADProfile/AdProfile';
import AdLogout from './admin pages/ADLogout/Logout';
import LogoutDialog from './components/LogoutDialog'; // Corrected import path

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/loadingbar2" />} />
        <Route path="/loadingbar2" element={<LoadingBar2 />} />
        <Route path="/wslandingpage" element={<WSLandingPage />} />
        <Route path="/wscontactus" element={<ContactUs />} />
        <Route path="/wsaboutus" element={<AboutUs />} />
        <Route path="/wsaboutus2" element={<AboutUs2 />} />
        <Route path="/wsaboutus3" element={<AboutUs3 />} />
        <Route path="/wsaboutus4" element={<AboutUs4 />} />
        <Route path="/wsaboutus5" element={<AboutUs5 />} />
        <Route path="/wssignupsignin" element={<SignUpSignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/successfullyregistered" element={<SuccessfullyRegistered />} />
        <Route path="/wshomepage" element={<WSHomepage />} />
        <Route path="/wscomment" element={<WSComment />} />
        <Route path="/wsreport" element={<WSReport />} />
        <Route path="/popupreport" element={<PopUpReport />} />
        <Route path="/popupconfirm" element={<PopUpConfirm />} />
        <Route path="/popupsuccess" element={<PopUpSuccess />} />
        <Route path="/wsleaderboards" element={<WSLeaderboards />} />
        <Route path="/wsprofile" element={<WSProfile />} />
        <Route path="/updatedpopup" element={<UpdatedPopUp />} />
        <Route path="/wslogout" element={<WSLogout />} />
        <Route path="/confirmlogout" element={<ConfirmLogout />} />
        <Route path="/adsignin" element={<ADSignIn />}/>
        <Route path="/adhome" element={<AdHome />}/>
        <Route path="/adentry" element={<AdEntry />}/>
        <Route path="/adleaderboard" element={<AdLeaderboard />}/>
        <Route path="/adprofile" element={<AdProfile />}/>
        <Route path="/adlogout" element={<AdLogout />}/>
        <Route path="/logoutdialog" element={<LogoutDialog />} />
      </Routes>
    </Router>
  );
};

export default App;
