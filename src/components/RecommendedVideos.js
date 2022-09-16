import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'timeago.js';
import HOST from '../host';
import {lg, md } from '../responsive';
axios.defaults.withCredentials = true;


const Container = styled.div`
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    gap: 10px;
    box-sizing: border-box;
    ${lg({
      width: "290px",
      height:"292px",
      flexDirection:"column",
      padding:"10px 10px",
      flexWrap : "wrap"
    })}
    
`;

const Thumbnail = styled.img`
    height: 120px;
    width: 100%;
    background-color : ${({ theme }) => theme.bg};
    object-fit: contain;
    flex: 2;//check
    ${lg({
      width: "100%",
      height:"70%"
    })};
    ${md({
      width: "100%",
      height: "150px"
    })};
`;
const Details = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 16px;
    flex: 1;
    ${lg({
       padding:"0px 10px"
    })}
`;
const ChannelLogo = styled.div`
    height: 36px;
    width: 36px;
    border-radius: 50%;
    background-color: gray;
    display: none;
    ${lg({
       display : "block",
    })}
`;

const Title = styled.span`
    font-weight: 700;
    font-size: 14px;
    color: ${({ theme }) => theme.text};
    
`;
const ChannelName = styled.div`
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.textSoft};
    margin-top: 9px;
`;
const Info = styled.div`
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.textSoft};
`;
const Texts = styled.div``;




const ReccomendedVideos = ({video}) => {
    const [channel, setChannel] = useState({});
    const handleView = async () => {
        const url = `${HOST}/videos/view/${video?._id}`
        const res = await axios.put(url , )
    }
    useEffect(() => {
        const fetchChannel = async () => {
            const url = `${HOST}/users/find/${video.userId}`;
            const res = await axios.get(url);
            setChannel(res.data.user);
        }
        fetchChannel();
    },[video.userId])
    return (
        <Link onClick={handleView} to={`/videos/${video._id}`} style={{textDecoration:"none"}}>
            <Container>
                <Thumbnail src={video.imgUrl}/>
                <Details>
                    <ChannelLogo />
                    <Texts>
                        <Title>{video?.title}</Title>
                        <ChannelName>{channel?.name}</ChannelName>
                        <Info>{format(video?.createdAt)} . {video?.views} views</Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    )
}

export default ReccomendedVideos