import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import allActions from '../../actions';

type Inputs = {
    email: string,
    pass: string,
};

type props = {
    callback: React.Dispatch<React.SetStateAction<string>>
}

const LoginContainer = styled.div`
    width: 35%;
    background: #2c303a;
    margin: 20px auto;
    color: white;
    padding: 20px;
    border-radius: 3px;
    height: 400px;
    z-index:10;
    position:relative;
    left:200px;
    top:0px;   
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`;

const LoginHeader = styled.div`
    color: white;
`;
const LoginBody = styled.form`
    color: #9b9dad;

    & label {
        display: block;        
        margin-top: 20px;
    }

    & input {
        width:90%;
        font-size: 1.3rem;
        padding: 8px 12px;
        display:block;
        outline: 0;
        background: #d5d7de;
        border: 1px solid #d5d7de;
        border-radius: 3px
    }

    & input[type=submit]{
        font-family: inherit;
        width: 98%;
        margin-top: 30px;
        color: white;
        background: #2fb45a;
        border: 1px solid #2fb45a;
        cursor:pointer;
    }

    & span {
        font-size: 12px;
        color:hotpink;
    }
`;


const LoginForm: React.FC<props> = (props: props) => {

    const dispatch = useDispatch();
    const [loginError, setloginError] = useState<boolean>(false);

    useEffect(() => {

    }, [loginError]);

    const { register, handleSubmit, errors } = useForm<Inputs>();
    const onSubmit = (data: Inputs) => {
        console.log(data);
        fetch('http://localhost:5000/login',
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        ).then(res => res.json()
        ).then(json => {
            console.log(json);
            if (json.error!=="") setloginError(true);
            if (json.error === "") {
                dispatch(allActions.currentUser.setUsername(json.name));
                dispatch(allActions.currentUser.setEmail(json.emailid));
                dispatch(allActions.userAction.logIn(true));
                dispatch(allActions.userAction.logOut(false));
                localStorage.setItem('username', json.name);
                localStorage.setItem('email', json.emailid);
                localStorage.setItem('logIn', "true");
                localStorage.setItem('logOut', 'false');
                props.callback("Home")
            }
        })
    }

    return (
        <LoginContainer>
            <LoginHeader><h1>Log In</h1></LoginHeader>
            <hr />
            <LoginBody onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="login-email-field">Username or Email</label>
                <input type="text" name="email" ref={register({ required: true })} id="login-email-field" />
                {errors.email && <span>This field is required</span>}
                <label htmlFor="login-pass-field">Password</label>
                <input type="password" ref={register({ required: true })} name="pass" id="login-pass-field" />
                {errors.pass && <span>This field is required</span>}
                <input type='submit' value="Log In" />
                {loginError && <span>Login failed! Username and password didn't match</span>}
            </LoginBody>
        </LoginContainer>
    )
}

export default LoginForm;