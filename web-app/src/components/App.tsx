import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from './nav_header';
import Footer from './footer';

import { createGlobalStyle } from 'styled-components';
import allActions from '../actions';

interface thingsInArray {
  id: number,
  emailid: string,
  name: string,
  title: string,
  posttext: string,
  timeofpost: string
}

const GlobalStyle = createGlobalStyle`
  #root {
    margin:0px;
    padding:0px;
  }

  html ,body{
    margin:0px;
    padding:0px;
    font-family: Roboto;
    background: #e2e1e0;
    position : relative;     
    overflow-x: hidden;   
  }

`;

function App() {

  const dispatch = useDispatch();

  const [proplist, setproplist] = useState<thingsInArray[] | undefined>();

  useEffect(() => {
    dispatch(allActions.currentUser.setUsername(localStorage.getItem('username') || ""));
    dispatch(allActions.currentUser.setEmail(localStorage.getItem('email') || ""));
    dispatch(allActions.userAction.logIn(localStorage.getItem('logIn') === 'true' ? true : false));
    dispatch(allActions.userAction.logOut(localStorage.getItem('logOut') === 'true' ? true : false));
    fetch('http://localhost:5000/getallposts').then(res => res.json()
    ).then(json => {
      console.log(json);
      setproplist(json.reverse());
    })
  }, [dispatch]);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>

      <GlobalStyle />
      <Header updatePropList={setproplist} posttoshow={proplist} />
      <Footer />
    </div>
  );
}

export default App;
