import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context';
import { md, sm } from '../responsive';
import BannerImg from "../assets/Banner.png";
import { useEffect } from 'react';
import HOST from '../host';
import { useState } from 'react';
import EachVideo from '../components/EachVideo';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  height: 200px;
  width: 100%;
  background-color: gray;
`;

const Banner = styled.img`
  height: 200px;
  width: 100%;
  object-fit: cover;

  ${md({
  display: "block"
})}
`;

const ChannelLogo = styled.img`
  height: 150px;
  width : 150px;
  object-fit: cover;
  border-radius: 50%;
  padding: 2px;
  position: relative;
  left: calc(50% - 75px);
  top: -75px;
  border : 1px solid ${({ theme }) => theme.hr};
`;

const ChannelDetails = styled.div`
    margin-top: 7rem;
    height: 100px;
    /* background-color: red; */
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 200px;
`;

const Button = styled.button`
  padding: 7px 15px;
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  border-radius: 2px;
  background-color: transparent;
  border: 1px solid red;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  
  &:hover{
    background-color: red;
    transition: all 0.3s ease-in-out;
    color: white;

  }
`;

const Hr = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.soft};
  margin: 15px 0px;
`
const Text = styled.h1`
  color: ${({ theme }) => theme.text};
  padding: 0px 10px;
  text-align: center;
`;
const Span = styled.span`
font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  padding: 0px 10px;
  text-align: center;
`;
const Details = styled.span`
  color: ${({ theme }) => theme.text};
`;

const Videos = styled.div`
  height: auto;
  width: 100%;
  margin-bottom: 100px;
  margin-top: 50px;
  /* background-color: red; */
`;
const VideoCont = styled.div`
display: flex;
    padding: 20px 10px;
    flex-wrap: wrap;
    overflow-y: scroll;
    justify-content: space-around;
    box-sizing: border-box;
    gap: 10px;
    ${sm({
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 0px 20px 15px",
  boxSizing: "border-box",
  gap: "0px",
})}
`;
const Channel = () => {

  const [user, setUser] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const [totalviews, setTotalViews] = useState(0);

  const params = useParams();
  /* console.log(params.id) */

  const getUserVideos = async () => {
    const url = `${HOST}/videos/all/${params?.id}`;
    const res = await fetch(url);
    const json = await res.json();

    if (res.status === 200) {
      setUserVideos(json.videos);
    }
  }

  const getTotalViews = async () => {
    const url = `${HOST}/videos/totalviews/${params?.id}`;
    const res = await axios.get(url);
    if (res.status === 200) {
      setTotalViews(res.data.views);
    }
  }

  useEffect(() => {
    getUserVideos();
    getTotalViews();
  }, [user]);

  useEffect(() => {
    const getUser = async () => {
      const url = `${HOST}/users/find/${params?.id}`;
      const res = await axios.get(url);
      if (res.status === 200) {
        setUser(res.data.user);
      }
    }
    getUser();
  }, [params?.id])
  return (
    <Container>
      <Info>
        <Banner src={BannerImg} />
        <ChannelLogo src={user?.img} />
      </Info>
      <ChannelDetails>
        <Details>{user?.subscribers} Subscriber</Details>
        <Details>{userVideos?.length} videos</Details>
        <Details>{totalviews} views</Details>
      </ChannelDetails>
      <Videos>
        <Text>Videos</Text>
        <Hr />
        <VideoCont>
          {
            userVideos?.map((video) => (
              <EachVideo type="channel" key={video?._id} video={video} />
            ))
          }
        </VideoCont>
      </Videos>
    </Container>
  )
}

export default Channel