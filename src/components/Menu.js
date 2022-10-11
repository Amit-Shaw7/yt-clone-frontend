import { EmojiEventsOutlined, ExploreOutlined, FlagOutlined, HelpOutlined, HistoryOutlined, HomeOutlined, LibraryMusicOutlined, LiveTvOutlined, MovieCreationOutlined, NewspaperOutlined, SettingsOutlined, SportsEsportsOutlined, SubscriptionsOutlined, VideoLibraryOutlined } from '@mui/icons-material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { customlg } from '../responsive';
import { UserContext } from '../context';
const Container = styled.div`
    flex : 1;
    background-color: ${({ theme }) => theme.bgLighter};
    height: 92.5vh;
    overflow-x: hidden;
    overflow-y : scroll;
    /* position: sticky;
    top : 0px; */
    width: 100%;
    /* background-color: blue; */
    /* padding: 10px 0px; */
    box-sizing: border-box;

    ${customlg({
  flex: 0
})}
`;
const BottomNavigaion = styled.div`
background-color: red;
  position: relative;
  top: 90%;
  display: none;
  align-items: center;
  justify-content: center;
  width:100%;
  height:60px;
  ${customlg({
  display: "flex"
})}
`;
const Wrapper = styled.div`
    padding: 5px 0px;
`;
const WrapperLg = styled.div`
    padding: 5px 0px;
`;
const Items = styled.div`
  margin: 2px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y : scroll;

`;

const Item = styled.div`
  display: flex;
  color: ${({ theme }) => theme.text};
  align-items: center;
  gap: 25px;
  padding: 9px 25px;
  transition: all 0.3s ease-in-out;
  font-size: 14px;
  font-weight: bold;
  box-sizing: border-box;

  &:hover{
    background-color: gray;
    transition: all 0.3s ease-in-out;
  }
`;
const AuthItem = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  /* align-items: center; */
  gap: 25px;
  padding: 9px 10px;
  transition: all 0.3s ease-in-out;
  font-size: 14px;
  font-weight: bold;
  cursor: default;
`;
const Text = styled.span`

`;
const Button = styled.button`
  padding: 7px 10px;
  background-color: transparent;
  color: rgb(44, 44, 255);
  border: 1px solid rgb(44, 44, 255);
  cursor: pointer;

  &:hover{
    border: 1px solid ${({ theme }) => theme.soft};
    color : ${({ theme }) => theme.text}
  }
`;
const Hr = styled.hr`
    margin: 15px 0px;
    border : 0.5px solid ${({ theme }) => theme.hr};
`

const Menu = ({ setDarkMOde, darkMode }) => {
  const { user } = useContext(UserContext);
  return (
    <Container>
      <Wrapper>
        <Items>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Item>
              <HomeOutlined />
              <Text>Home</Text>
            </Item>
          </Link>
          <Link to="/trend" style={{ textDecoration: "none" }}>
            <Item>
              <ExploreOutlined />
              <Text>Explore</Text>
            </Item>
          </Link>
          <Link to={`${user ? "/subscribed" : "/login"}`} style={{ textDecoration: "none" }}>
            <Item>
              <SubscriptionsOutlined />
              <Text>Subscription</Text>
            </Item>
          </Link>

          <Hr />
          {
            user ? "" : <Link to='/login' style={{ textDecoration: "none" }}>
              <>
                <AuthItem>
                  <Text>SignIn to take advantage of all useful feature of this app</Text>
                  <Button>SIGN IN</Button>
                </AuthItem>
                <Hr />
              </>
            </Link>
          }

          <Link to="/" style={{ textDecoration: "none" }}>
            <Item>
              <VideoLibraryOutlined />
              <Text>Library</Text>
            </Item>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Item>
              <HistoryOutlined />
              <Text>History</Text>
            </Item>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Item>
              <LibraryMusicOutlined />
              <Text>Music</Text>
            </Item>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Item>
              <EmojiEventsOutlined />
              <Text>Sports</Text>
            </Item>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Item>
              <SportsEsportsOutlined />
              <Text>Gaming</Text>
            </Item>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Item>
              <MovieCreationOutlined />
              <Text>Movie</Text>
            </Item>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Item>
              <NewspaperOutlined />
              <Text>News</Text>
            </Item>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Item>
              <LiveTvOutlined />
              <Text>Live</Text>
            </Item>
          </Link>

          <Hr />

          <Link to="/" style={{ textDecoration: "none" }}>
            <Item>
              <SettingsOutlined />
              <Text>Setting</Text>
            </Item>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Item>
              <FlagOutlined />
              <Text>Report</Text>
            </Item>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Item>
              <HelpOutlined />
              <Text>Help</Text>
            </Item>
          </Link>

          <Item onClick={() => setDarkMOde(!darkMode)}>
            <SettingsOutlined />
            <Text>{!darkMode ? "Dark Mode" : "Light Mode"}</Text>
          </Item>


        </Items>
      </Wrapper>
    </Container>
  )
}

export default Menu