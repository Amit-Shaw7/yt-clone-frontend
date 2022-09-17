import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HOST from '../host';
import { md, sm } from '../responsive';
import {format} from 'timeago.js';
axios.defaults.withCredentials = true;

const Container = styled.div`
    width: ${(props) => props.type !== "sm" && "290px"};
    margin-bottom: ${(props) => props.type === "sm" ? "10px" : "50px"};
    cursor: pointer;
    display: ${(props) => props.type === "sm" && "flex"};
    gap: 10px;
    ${sm({
    width: "90vw",
})}
    
`;

const Thumbnail = styled.img`
    height: ${(props) => props.type === "sm" ? "120px" : "202px"};
    width: 100%;
    background-color : ${({ theme }) => theme.bg};
    flex: ${(props) => props.type === "sm" && "2"};//check
`;
const Details = styled.div`
    display: flex;
    gap: 12px;
    margin-top: ${(props) => props.type !== "sm" && "16px"};
    flex: 1;
`;
const ChannelLogo = styled.img`
    height: 36px;
    width: 36px;
    border-radius: 50%;
    background-color: gray;
    display: ${(props) => props.type === "sm" ? "none" : "block"};
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



const EachVideo = ({ type, video }) => {
    const [channel, setChannel] = useState({});

    const handleView = async () => {
        const url = `${HOST}/videos/view/${video?._id}`
        const res = await axios.put(url , { withCredentials: true })
    }

    useEffect(() => {
        const fetchChannel = async () => {
            const url = `${HOST}/users//find/${video.userId}`;
            const res = await axios.get(url , { withCredentials: true });
            console.log(res.data)
            setChannel(res.data.user);
        }
        fetchChannel();
    }, [video.userId])

    return (
        <Link onClick={handleView} to={`/videos/${video?._id}`} style={{ textDecoration: "none" }}>
            <Container type={type}>
                <Thumbnail src={video?.imgUrl} type={type} />
                <Details type={type}>
                    <ChannelLogo type={type} src={channel?.img}/>
                    <Texts type={type}>
                        <Title>{video?.title}</Title>
                        <ChannelName>{channel?.name}</ChannelName>
                        <Info>{format(video?.createdAt)} . {video?.views} views</Info>
                    </Texts>
                </Details>
            </Container>
        </Link>
    )
}

export default EachVideo