import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import './SignIn.css';

const ADSignIn = () => {
    const navigate = useNavigate();

    const onGroupButtonClick = useCallback(() => {
        navigate("/adhome");
    }, [navigate]);

return (
    <div className="ad-sign-in">
    <img className="bg-1-icon" alt="" src="bg1.png" />
    <main className="content">
        <div className="content-child" />
        <div className="wildcat-3-parent">
        <img
            className="wildcat-3-icon"
            loading="lazy"
            alt=""
            src="TITLE.png"
        />
        <div className="a8869046-358c-419b-8f30-09d0b6-wrapper">
            <img
            className="a8869046-358c-419b-8f30-09d0b6-icon"
            loading="lazy"
            alt=""
            src="wildcat-admin.png"
            />
        </div>
        </div>
        <div className="sign-in-form">
        <div className="sign-in-header">
            <div className="welcome-header">
            <h3 className="welcome">WELCOME!</h3>
            </div>
            <div className="instruction-header">
            <div className="instruction">
                <i className="sign-in-to">Sign in to your Account</i>
            </div>
            <form className="input-fields">
                <div className="input-labels">
                <div className="email">Email</div>
                <input className="email-input" type="text" />
                </div>
                <div className="input-labels1">
                <div className="password">Password</div>
                <input className="input-labels-child" type="text" />
                </div>
                <div className="sign-in-button">
                <button
                    className="rectangle-parent"
                    onClick={onGroupButtonClick}
                >
                    <div className="frame-child" />
                    <b className="sign-in">SIGN IN</b>
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    </main>
    </div>
);
};

export default ADSignIn;