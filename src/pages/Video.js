import { AddTaskOutlined, ReplyOutlined, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Comment from '../components/Comment';
import Recommendation from '../components/Recommendation';
import HOST from '../host';
import { lg, md, sm } from '../responsive';
import { format } from 'timeago.js';
import { UserContext } from '../context';
axios.defaults.withCredentials = true;

const Container = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    padding: 10px 0px;
    color: ${({ theme }) => theme.text};
    justify-content: space-between;
    box-sizing: border-box;
    ${lg({
  flexDirection: "column",
})};
`;
const Content = styled.div`
    /* height: fit-content; */
    /* background-color: red; */
    box-sizing: border-box;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    flex: 5;
    /* padding: 0px 10px; */
    /*  */
`;
const Hr = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.soft};
  margin: 15px 0px;
`
const VideoCont = styled.div`
    margin: 10px 10px;
    /* height: 90%; */
    background-color: ${({ theme }) => theme.bgLighter};
`;
const VideoFrame = styled.video`
    /* max-height: 500px; */
    max-height: 500px;
    width: 100%;
    object-fit: cover;
    ${sm({
  height: "0px",
})}
    ${lg({
  height: "400px"
})}
    ${md({
  height: "350px"
})}
`;
const ReccomendedVideos = styled.div`
    height: fit-content;
    flex: 2;
    padding: 10px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${lg({
  width: "95vw",
  marginTop: "20px",
})}
`;

const Title = styled.h1`
    font-size: 18px;
    margin: 20px 20px 10px 20px;
    font-weight: 400;
    color: ${({ theme }) => theme.text};
    ${sm({
  fontSize: "12px",
})}
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 10px;
  ${sm({
  flexDirection: "column",
  //   justifyContent : "flex-start"
  alignItems: "start",
  gap: "10px"
})}
`;
const Info = styled.div`
  font-size: 14px;
  width:100%;
  color: ${({ theme }) => theme.textSoft};
  padding: 0px 10px;
  ${sm({
  fontSize: "10px",
})}
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  /* background-color: red; */
  width: 100%;
  gap: 20px;
  margin-left: 20px;
  ${lg({
  width: "90%"
})}
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  ${sm({
  flexDirection: "column"
})}
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const ChannelLogo = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: gray;
  cursor: pointer;
  
`
const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color:  ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight:500;
  ${sm({
  fontSize: "12px",
})}
`;
const ChannelSubscriber = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color:  ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;
const ChannelDesc = styled.p`
  font-size: 14px;
  color:  ${({ theme }) => theme.text};
`;
const Subscribe = styled.button`
    padding: 10px 20px;
    font-weight: 500;
    height: max-content;
    background-color: ${({ subscribed }) => subscribed ? "gray" : "#cc1a00"} ;
    color: white;
    border: 1px solid ${({ subscribed }) => subscribed ? "gray" : "#cc1a00"};
    border-radius: 3px;
    cursor: pointer;
`

const Video = () => {
  // const [currVideo, setCurrVideo] = useState(null);
  // const [currChannel, setCurrChannel] = useState(null);
  const { currChannel, setCurrChannel, currVideo, setCurrVideo, subscribed, setSubscribed, liked, setLiked } = useContext(UserContext);
  const [like, setLike] = useState(0);
  const [subscribers, setSubscribers] = useState(0);
  const { user } = useContext(UserContext);
  const params = useParams();
  const videoId = params.id;
  const navigate = useNavigate();
  let likeFlag = false;
  // console.log(videoId);

  const handleLike = async () => {
    const token = localStorage.getItem("accessToken");
    if (user) {
      if (liked) {
        const url = `${HOST}/videos/dislike/${currVideo._id}`;
        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json",
          }
        });
        const json = await res.json();
        // console.log(json);
        if (res.status === 200) {
          setLiked(!liked);
          setLike(like - 1);
        }
      } else {
        const url = `${HOST}/videos/like/${currVideo._id}`;
        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json",
          }
        });
        const json = await res.json();
        // console.log(json);
        if (res.status === 200) {
          setLiked(!liked);
          setLike(like + 1);
        }
      }
    } else {
      navigate('/login');
    }
  }
  const handleSubscribe = async () => {
    const token = localStorage.getItem("accessToken");
    if (user) {
      if (subscribed) {
        const url = `${HOST}/users/unsub/${currChannel._id}`;
        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json",
          }
        });
        const json = await res.json();
        // console.log(json);
        setSubscribed(!subscribed);
      } else {
        const url = `${HOST}/users/sub/${currChannel._id}`;
        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json",
          }
        });
        const json = await res.json();
        // console.log(json);
        setSubscribed(!subscribed);
      }
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    const fetchCurrVideo = async () => {
      const videoURL = `${HOST}/videos/find/${videoId}`;
      const VideoRes = await axios.get(videoURL);
      const ChannelURL = `${HOST}/users/find/${VideoRes?.data.video.userId}`;
      const ChannelResponse = await axios.get(ChannelURL);
      setCurrVideo(VideoRes.data.video);
      setLike(VideoRes.data.video.likes.length);
      setCurrChannel(ChannelResponse.data.user);
      setSubscribers(ChannelResponse.data.user.subscribers);

      // console.log(VideoRes.data.video);
      // console.log(ChannelResponse.data.user);
    }

    fetchCurrVideo();
  }, [videoId])

  return (
    <Container>
      <Content>
        <VideoCont>
          <VideoFrame
            muted={false}
            controls
            src={currVideo?.videoUrl}
          />
        </VideoCont>
        <Title>{currVideo?.title}</Title>
        <Details>
          <Info>{currVideo?.views} views . {format(currVideo?.createdAt)} </Info>
          <Buttons>
            <Button> {liked ? <ThumbUp sx={{ fontSize: { xs: "16px", md: "20px" } }} /> : <ThumbUpOutlined sx={{ fontSize: { xs: "16px", md: "20px" } }} onClick={handleLike} />}{like} </Button>
            <Button>  {liked ? <ThumbDownOutlined onClick={handleLike} sx={{ fontSize: { xs: "16px", md: "20px" } }} /> : <ThumbDown sx={{ fontSize: { xs: "16px", md: "20px" } }} />} </Button>
            <Button sx={{ fontSize: { xs: "16px" } }}><ReplyOutlined sx={{ fontSize: { xs: "16px", md: "20px" } }} /> Share</Button>
            <Button sx={{ fontSize: { xs: "16px" } }}><AddTaskOutlined sx={{ fontSize: { xs: "16px", md: "20px" } }} /> Save</Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <ChannelLogo src={currChannel?.img ? currChannel?.img : ""} />
            <ChannelDetail>
              <ChannelName>{currChannel?.name}</ChannelName>
              <ChannelSubscriber>{subscribers} Subscribers</ChannelSubscriber>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe subscribed={subscribed} onClick={handleSubscribe}>{subscribed ? "SUBSCRIBED" : "SUBSCRIBE"}</Subscribe>
        </Channel>
        <Hr />
        <Comment />
      </Content>
      <ReccomendedVideos>
        <Recommendation tags={currVideo?.tags} />
      </ReccomendedVideos>
    </Container>
  )
}

export default Video