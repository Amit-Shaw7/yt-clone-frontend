import { SearchOutlined } from '@mui/icons-material';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.bg};
  position: fixed;
  top: 0;
  z-index: 1;
`;
const Wrapper = styled.div``;
const SearchCont = styled.div`
  height: 60px;
  width: 100%;
  background-color: ${({ theme }) => theme.bgLighter};
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const SearchBar = styled.input`
  width: 80%;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.text};
  outline: none;
  height: 60%;
  border-radius: 2px;
  font-size: 1rem;
`;
const Button = styled.button`
    background-color: gray;
    border-radius: 2px;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.text};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px;

    &:hover{
      background-color: ${({ theme }) => theme.bgLighter};
      border: 1px solid ${({ theme }) => theme.hr};;
    }
`;

const Search = ({ searchText, setSearchText, handleSearchText, handleSearch }) => {


  return (
    <Container>
      <Wrapper>
        <SearchCont>
          <SearchBar value={searchText} onChange={(e) => { handleSearchText(e) }} placeholder='Search' />
          <Link to={`/search/title/${searchText}`}><Button onClick={handleSearch}><SearchOutlined /></Button></Link>
        </SearchCont>
      </Wrapper>
    </Container>
  )
}

export default Search