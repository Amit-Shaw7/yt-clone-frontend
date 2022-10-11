import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import EachVideo from '../components/EachVideo';
import { customlg, sm } from '../responsive';
import HOST from '../host';
import axios from 'axios';
import Loader from './Loader';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ExploreOutlined, HistoryOutlined, HomeOutlined, SettingsOutlined, SubscriptionsOutlined } from '@mui/icons-material';
import { UserContext } from '../context';

axios.defaults.withCredentials = true

const Container = styled.div`
    display: flex;
    padding: 15px 10px 50px 10px;
    flex-wrap: wrap;
    overflow-y: scroll;
    justify-content: space-around;
    box-sizing: border-box;
    gap: 25px;
    ${sm({
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 0px 50px 15px",
    boxSizing: "border-box",
    gap: "0px"
})}
`;
// For Menu
const Text = styled.span`
    ${customlg({
    fontSize: "10px"
})}
`;
const WrapperLg = styled.div`
    padding: 5px 0px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    background-color: ${({ theme }) => theme.bgLighter};
`;
const Items = styled.div`
    margin: 2px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  align-items: center;
  /* gap: 25px; */
  padding: 9px 25px;
  transition: all 0.3s ease-in-out;
  font-size: 14px;
  font-weight: bold;
  box-sizing: border-box;
  ${customlg({
    padding: "9px 5px"
})}

  &:hover{
    background-color: gray;
    transition: all 0.3s ease-in-out;
  }
`;
const BottomNavigaion = styled.div`
box-sizing: border-box;
    padding: 2rem 0px;
    position: fixed;
    top: calc(100vh - 60px);
    display: none;
    align-items: center;
    justify-content: center;
    width:100%;
    height:60px;
    ${customlg({
    display: "flex"
})}
`;

const NoContent = styled.div`
    height: calc(100vh - 60px);
    width: 100%;
    color: ${({ theme }) => theme.text};
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Home = ({ type, setDarkMOde, darkMode }) => {
    const [videos, setVideos] = useState(null);
    const { user } = useContext(UserContext);

    const params = useParams();
    const search = params?.search;
    const title = search?.replaceAll(" ", "&");

    const accessToken = localStorage.getItem("accessToken");
    useEffect(() => {
        const fetchVideos = async () => {
            const url = `${HOST}/videos/${type}`;
            const res = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setVideos(res.data.videos);
        }
        const fetchSearchVideos = async () => {
            const url = `${HOST}/videos/search/title?title=${title}`;
            const res = await axios.get(url, {
                withCredentials: true
            });

            if (res.status === 200) {
                setVideos(res.data.videos);
            }
        }
        type && fetchVideos();
        !type && fetchSearchVideos();
    }, [type, title]);
    return (
        <>
            {
                videos

                    ?

                    videos.length === 0
                    ?
                    <NoContent>No videos Found</NoContent>
                    :

                    <Container>
                        {
                            videos.length !== 0 && videos.map((video) => (
                                <EachVideo key={video._id} video={video} />
                            ))
                        }

                        <BottomNavigaion>
                            <WrapperLg>
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

                                    <Link to="/" style={{ textDecoration: "none" }}>
                                        <Item>
                                            <HistoryOutlined />
                                            <Text>History</Text>
                                        </Item>
                                    </Link>
                                    <Item onClick={() => setDarkMOde(!darkMode)}>
                                        <SettingsOutlined />
                                        <Text>{!darkMode ? "Dark Mode" : "Light Mode"}</Text>
                                    </Item>


                                </Items>
                            </WrapperLg>
                        </BottomNavigaion>
                    </Container>

                    :

            <Loader />
            }
        </>
    )
}

export default Home;

// onClick={() => setDarkMOde(!darkMode)}