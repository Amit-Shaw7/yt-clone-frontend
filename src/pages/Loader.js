import { CircularProgress } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Loading = styled.img`
    object-fit: contain;
    height: 50px;
    width: 50%;
`;
const Loader = () => {
  return (
    <Container>
         <CircularProgress />
    </Container>
  )
}

export default Loader