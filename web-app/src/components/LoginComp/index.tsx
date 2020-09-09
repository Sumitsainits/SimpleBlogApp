import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginForm from './login';
import SignUp from './signup';
import Popup from 'reactjs-popup';

type callback = {
    callback: React.Dispatch<React.SetStateAction<string>>
}

const FormSelector = styled.div`
    position: absolute;
    top:100px;
    height: 250px;
    background: #87969c;
    width:100%;
    padding:20px;
    z-index:1;
    border-radius:6px;
    margin:0px auto;
`;

const AuthWrapper = styled.div`
    position: relative;
    width: 63%;
    margin: 0 auto;
`;

const StyledButton = styled.button`
    background: transparent;
    color: white;
    border: 1.5px solid white;
    height: 40px;
    padding: 0 30px;
    border-radius: 4px;
    font-weight: 700;
    font-size: 16px;
    font-family: inherit;
    cursor: pointer;    
    margin-top: 80px;
`;

const formType = {
    Login: {
        text: "Have an account?",
        details: "Login in your account to create your post.",
        buttonText: "LOG IN"
    },
    SignUp: {
        text: "Don't have an account?",
        details: "Don't worry create your account here. It's free.",
        buttonText: "SIGN UP"
    }
}

const IntegratedLogInSignUp: React.FC<callback> = (props) => {
    const [flag, setFlag] = useState(true);
    const [showPopup, setShowPopup] = useState('');

    const handleClick = (): void => {
        setFlag(!flag)
    }

    useEffect(() => { }, [flag, showPopup]);

    return (
        <div style={{ position: 'relative',height:'calc(100vh - 120px)' }}>
            <AuthWrapper>
                <FormSelector>
                    <h1>{!flag ? formType.Login.text : formType.SignUp.text}</h1>
                    <p>{!flag ? formType.Login.details : formType.SignUp.details}</p>
                    <StyledButton onClick={handleClick}>{!flag ? formType.Login.buttonText : formType.SignUp.buttonText}</StyledButton>
                </FormSelector>
                {flag ? <LoginForm callback={props.callback} /> : <SignUp flag={flag} changeForm={setFlag} callback={setShowPopup} />}
                {showPopup && <Popup
                    open
                    modal
                    closeOnDocumentClick
                    position="center center"
                    contentStyle={
                        {
                            background: 'white',
                            padding: '20px',
                            borderRadius: '6px',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
                        }
                    }
                    overlayStyle={{
                        background: 'rgba(0,0,0,0.5)'
                    }}
                >
                    {showPopup}
                </Popup>}
            </AuthWrapper>
        </div>
    )
}

export default IntegratedLogInSignUp;