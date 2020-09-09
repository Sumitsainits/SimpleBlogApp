import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IntegratedLogInSignUp from './LoginComp';
import HomeScreen from './BlogContainer/homepage';
import CardContainer from './BlogContainer/blogCardContainer';

import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

interface thingsInArray {
    id:number,
    emailid: string,
    name: string,
    title: string,
    posttext: string,
    timeofpost: string
}

type props = {
    posttoshow: thingsInArray[] | undefined,
    updatePropList:React.Dispatch<React.SetStateAction<thingsInArray[] | undefined>>
}

const OuterDiv = styled.div`
    width: 100vw;
    height: 60px;
    color: white;
    background: #212121;
`;

const ListStyle = styled.ul`
    list-style: none;
    display: flex;
    gap: 20px;
    font-weight: 600;
    font-size: 18px;
    margin : 0px;
    padding-top:18px;

    & > li {
        cursor: pointer;
    }
`;

const LoginButton = styled.button`
    position: absolute;
    right: 18px;
    top: 15px;
    background: transparent;
    color: white;
    border: 1.5px solid white;
    height: 30px;
    padding: 0 15px;
    border-radius: 4px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
`;

const Header: React.FC<props> = (props) => {

    const loginStatus = useSelector((state: RootState) => state.loginLogOutRed.userLogIn);

    const [view, setView] = useState("Community");

    // if(loginStatus === true){
    //     setView("Home"); 
    // }

    const HandleClick = (event: React.MouseEvent) => {
        const input = event.target as HTMLElement;
        setView(input.innerText)
    }

    const CompToRender = () => {
        if (view === "LOG IN") return <IntegratedLogInSignUp callback={setView} />;

        if (view === "Home") return <HomeScreen callback={setView} updatePropList={props.updatePropList} listToPrint={props.posttoshow} />;

        return <CardContainer listToPrint={props.posttoshow} />;
    }

    useEffect(() => {

    }, [view]);

    return (
        <>
            <OuterDiv>
                <ListStyle>
                    {loginStatus&&<li style={{borderBottom:(view==="Home"?"1px solid white":"")}} onClick={HandleClick}>Home</li>}
                    <li style={{borderBottom:(view==="Community"?"1px solid white":"")}} onClick={HandleClick}>Community</li>
                </ListStyle>
                {!loginStatus && <LoginButton onClick={HandleClick}>LOG IN</LoginButton>}
            </OuterDiv>
            {CompToRender()}
        </>
    )
}

export default Header;