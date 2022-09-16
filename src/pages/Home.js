import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EachVideo from '../components/EachVideo';
import { sm } from '../responsive';
import HOST from '../host';
import axios from 'axios';
axios.defaults.withCredentials = true

const Container = styled.div`
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
    gap: "0px"
})}
`;

const Home = ({type}) => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetchVideos = async () => {
            const url = `${HOST}/videos/${type}`;
            const res = await axios.get(url);
            setVideos(res.data.videos);
        }
        fetchVideos();
    }, [type]);
    return (
        <Container>
            {
                videos.length !== 0 && videos.map((video) => (
                    <EachVideo key={video._id} video={video}/>
                ))
            }
        </Container>
    )
}

export default Home