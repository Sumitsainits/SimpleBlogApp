import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

type Inputs = {
    name: string,
    email: string,
    pass: string
}

type Props ={
    flag :boolean,
    changeForm:React.Dispatch<React.SetStateAction<boolean>>
    callback:React.Dispatch<React.SetStateAction<string>>
}

const SignUpContainer = styled.div`
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

const SignUpHeader = styled.div`
    color: white;
`;
const SignUpBody = styled.form`
    color: #9b9dad;

    & label {
        display: block;        
        margin-top: 20px;
    }

    & input {
        width:90%;
        font-size: 1.3rem;
        padding: 6px 20px 6px 6px;
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

const SignUp: React.FC<Props> = (props) => {

    const [popupOpen ,setPopupOpen] = useState('');

    const { register, handleSubmit, errors } = useForm<Inputs>();
    const onSubmit = (data: Inputs) => {
        console.log(data)
        fetch('http://localhost:5000/register',
            {
                method: "POST",
                body: JSON.stringify(data)
            }
        ).then(res => res.json()
        ).then(json => {
            console.log(json);
            setPopupOpen(json.data);
            props.changeForm(!props.flag);
            props.callback(json.data);
        })
    };

    useEffect(()=>{},[popupOpen])


    return (
        <SignUpContainer>
            <SignUpHeader><h1>Sign Up</h1></SignUpHeader>
            <hr />
            <SignUpBody onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="SignUp-name-field">Name</label>
                <input type="text" ref={register({ required: true })} name="name" id="SignUp-name-field" />
                {errors.name && <span>This field is required</span>}
                <label htmlFor="SignUp-email-field">Email</label>
                <input type="text" ref={register({
                    required: 'Enter your email Address',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Enter a valid e-mail address",
                    },
                })} name="email" id="SignUp-email-field" />
                {errors.email && <span>{errors.email.message}</span>}
                <label htmlFor="SignUp-pass-field">Password</label>
                <input type="text" ref={register({ required: true })}
                    name="pass" id="SignUp-pass-field" />
                {errors.pass && <span>This field is required</span>}
                <input type='submit' value="Sign Up" />
            </SignUpBody>
            
        </SignUpContainer>
    )
}

export default SignUp;