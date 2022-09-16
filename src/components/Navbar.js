import { Menu, SearchOutlined, UploadFileOutlined, VideoCallOutlined, YouTube } from '@mui/icons-material';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../context';
import { md } from '../responsive';
import Upload from './Upload';

// const handleSidebar = () => {
//   setOpenedSidebar(!openedSidebar);
// }

const Container = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    align-items: center;
    justify-content: center;
    height: 56px;
    width: 100%;
    background-color: ${({ theme }) => theme.bgLighter};
`;
const Wrapper = styled.div`
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    ${md({
  display: "none"
})}
`;
const WrapperSMd = styled.div`
    padding: 5px 10px;
    display: none;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    ${md({
  display: "flex"
})}

`;

const LogoCont = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items : center;
  gap:15px;
  
`;
const SearchCont = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  width: 40%;
  align-items: center;
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
`;
const ACtionsCont = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  gap: 30px;
  ${md({
  gap: "5px"
})}
`;

const Input = styled.input`
  position: absolute;
  width:100%;
  height:95%;
  padding: 5px;
  border-radius: 5px;
  background-color: transparent;
  color : ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.text};
  
`;
const Button = styled.button`
  padding: 7px 10px;
  background-color: transparent;
  color: rgb(44, 44, 255);
  border: 1px solid rgb(44, 44, 255);
`;
const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: contain;
  background-color: ${({ theme }) => theme.bg};
  cursor: pointer;
`;
const LogoutModal = styled.div`
  height: 40px;
  width: 100px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  position: absolute;
  border: 1px solid ${({ theme }) => theme.text};
  right: 20px;
  display: ${(props) => props.open === true ? "flex" : "none"};
  cursor: pointer;
  z-index: 50;
`;
const Text = styled.span`
  height: 70%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg};

`;

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const navigate = useNavigate();
  const openLogoutModal = () => {
    console.log(open);
    setOpen(!open);
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  }
  return (
    <>
      <Container>
        {/* For Laptop */}
        <Wrapper>
          <LogoCont>
            <Menu fontSize='medium' sx={{ cursor: "pointer" }} />
            <Link to='/' style={{ textDecoration: "none" }}>
              <YouTube fontSize='large' sx={{ color: 'red' }} />
            </Link>
            <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
              ConnecTube
            </Link>

          </LogoCont>

          <SearchCont>
            <Input placeholder='Search' />
            <SearchOutlined fontSize='medium' color="inherit" />
          </SearchCont>

          <ACtionsCont>
            <VideoCallOutlined onClick={() => setOpenUpload(true)} sx={{cursor : "pointer"}} fontSize='medium' />
            {
              user ? <Avatar src={user.img} onClick={openLogoutModal}/> : <Link to="/login" style={{ textDecoration: "none" }}><Button>SIGN IN</Button></Link>
            }
          </ACtionsCont>
        </Wrapper>
        {/* For Laptop */}
        {/* For Mobile and Tablet */}
        <WrapperSMd>
          <LogoCont>
            <Link to='/' style={{ textDecoration: "none" }}>
              <YouTube fontSize='large' sx={{ color: 'red' }} />
            </Link>
            <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
              ConnecTube
            </Link>
          </LogoCont>
          <ACtionsCont>
            <SearchOutlined fontSize='medium' color="inherit" />
            <VideoCallOutlined onClick={() => setOpenUpload(true)} fontSize='medium' sx={{cursor:"pointer"}}/>
            {
              user ? <Avatar src={user.img} onClick={openLogoutModal}/> : <Link to="/login" style={{ textDecoration: "none" }}><Button>SIGN IN</Button></Link>
            }
          </ACtionsCont>
        </WrapperSMd>

        {/* For Mobile and Tablet */}
      </Container>
      <LogoutModal onClick={handleLogout} open={open}>
        <Text>Logout</Text>
      </LogoutModal>
      {
        openUpload && <Upload setOpen={setOpenUpload} />
      }
    </>
  )
}

export default Navbar