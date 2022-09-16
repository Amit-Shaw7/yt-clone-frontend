import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HOST from '../host';
import { lg, md } from '../responsive';
import ReccomendedVideos from './RecommendedVideos';

const Container = styled.div`
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: 10px 0px;
    /* background-color:red; */
    ${lg({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  gap: "10px",
  flexWrap: "wrap"
})}
`;
const Hr = styled.hr`
    margin: 15px 0px;
    border : 0.5px solid ${({ theme }) => theme.hr};
`;
const Recommendation = ({ tags }) => {
  const [recommendedVid, setRecommendedVid] = useState([]);
  // console.log(tags);

  useEffect(() => {
    const fetchReccomendation = async () => {
      const reccomURL = `${HOST}/videos/search/tags?tags=${tags}`;
      const reccomRes = await axios.get(reccomURL);
      setRecommendedVid(reccomRes.data.videos);
      // console.log(reccomRes?.data.videos)
    }
    fetchReccomendation();
  }, [tags])
  return (
    <>
      <Hr />
      <Container>
        {
          recommendedVid && recommendedVid?.map((video , idx) => (
            <ReccomendedVideos video={video} key={idx} />
          ))
        }
      </Container>
    </>
  )
}

export default Recommendation

/* ${lg({
    })} */