import React, { useContext, useEffect, useState } from 'react';
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
import Channel from './pages/Channel';
import Search from './pages/Search';



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
  const [searchText, setSearchText] = useState('');

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  }

  const handleSearch = () => {
    console.log(searchText)
  }


  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <UserProvider>
        <Container>
          <BrowserRouter>
            <Navbar handleSearch={handleSearch} handleSearchText={handleSearchText} searchText={searchText} setSearchText={setSearchText} />
            <Wrapper>
              <Menu darkMode={darkMode} setDarkMOde={setDarkMOde} />
              <Main>
                <Routes>
                  <Route exact path={`/search/title/:search`} element={<Home darkMode={darkMode} setDarkMOde={setDarkMOde}/>} />
                  <Route exact path='/' element={<Home darkMode={darkMode} setDarkMOde={setDarkMOde} type="random" />} />
                  <Route exact path='/trend' element={<Home darkMode={darkMode} setDarkMOde={setDarkMOde} type="trend" />} />
                  <Route exact path='/subscribed' element={<Home darkMode={darkMode} setDarkMOde={setDarkMOde} type="subscribed" />} />
                  <Route exact path='/videos/:id' element={<Video />} />
                  <Route exact path='/login' element={<Login />} />
                  <Route exact path='/channel/:id' element={<Channel admin={"true"}/>} />
                  {/* <Route exact path='/channel/:id' element={<Search />} /> */}
                  <Route exact path='/search' element={<Search handleSearch={handleSearch} handleSearchText={handleSearchText} searchText={searchText} setSearchText={setSearchText} />} />

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
