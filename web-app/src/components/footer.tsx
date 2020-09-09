import React from 'react';
import styled from 'styled-components';

const BottomFooter = styled.footer`
    position: relative;
    bottom : 0px;
    left:0px;
    width : 100%;
    height:40px; 
    background: #764abc;
    color: white;
    text-align: center;

    & a {
        text-decoration : none;
        color: white ;
        line-height: 2.5; 
    }
`; 

const Footer:React.FC<{}> = () => {
    return (
        <BottomFooter>
            <a href='mailto:name@email.com'>Contact us</a>
        </BottomFooter>
    )
}

export default Footer;