import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingBar1 from './loadingbars/LoadingBar1';
import LoadingBar2 from './loadingbars/LoadingBar2';
import LoadingBar3 from './loadingbars/LoadingBar3'
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
        <Route path="/wscomment/" element={<WSComment />} />
        <Route path="/wsreport/" element={<WSReport />} />
        <Route path="/popupreport/" element={<PopUpReport />} />
        <Route path="/popupconfirm/" element={<PopUpConfirm />} />
        


      </Routes>
    </Router>
  );
};

export default App;
