import React , { useContext, useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './utils/Theme';
import './App.css';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Video from './pages/Video';
import HOST from './host';
import { UserContext, UserProvider } from './context';



const Container = styled.div`
    height: 100vh;
    overflow: hidden;
    /* padding-bottom: 5rem; */
`;
const Main = styled.div`
  flex: 6;
  height: 92.5vh;
  background-color: ${({ theme }) => theme.bg};
  overflow-y: scroll;
  /* padding-bottom: 10px; */
`;
const Wrapper = styled.div`
  display: flex;
`;

function App() {
  const [darkMode, setDarkMOde] = useState(true);
  

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <UserProvider>
        <Container>
          <BrowserRouter>
            <Navbar />
            <Wrapper>
              <Menu darkMode={darkMode} setDarkMOde={setDarkMOde}/>
              <Main>
                <Routes>
                  <Route exact path='/' element={<Home type="random" />} />
                  <Route exact path='/trend' element={<Home type="trend" />} />
                  <Route exact path='/subscribed' element={<Home type="subscribed" />} />
                  <Route exact path='/videos/:id' element={<Video />} />
                  <Route exact path='/login' element={<Login />} />
                </Routes>
              </Main>
            </Wrapper>
          </BrowserRouter>
        </Container>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
