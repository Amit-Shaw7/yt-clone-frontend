import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context';
import HOST from '../host';

const Container = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000a7;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
    height: 400px;
    width: 400px;
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 20px;
    z-index: 5;
    border-radius: 5px;
    justify-content: center;
`;
const Title = styled.h1`
    color: ${({ theme }) => theme.text};
    text-align: center;
`;
const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    color: ${({ theme }) => theme.text};
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
    border-radius: 50%;
`;
const Hr = styled.hr`
    border : 0.5px solid ${({ theme }) => theme.hr};
`;

const Input = styled.input`
    border: 1px solid  ${({ theme }) => theme.soft} ;
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`;
const Desc = styled.textarea`
    border: 1px solid  ${({ theme }) => theme.soft} ;
    color: ${({ theme }) => theme.text};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
    resize: none;
`;
const Button = styled.button`
    border-radius: 3px;
    border: none;
    padding: 10px 20px;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({ theme }) => theme.soft};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.bgLighter};
    transition: all 0.3s ease;
    letter-spacing: 2px;
    
    &:hover{
        border: 1px solid ${({ theme }) => theme.soft};
        transition: all 0.5s ease;
        background-color: transparent;
    }
`;

const UpdateModal = ({ video, openUpdateModal, setOpenUpdateModal }) => {
    const {user} = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const token = localStorage.getItem("accessToken");

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleDescChange = (e) => {
        setDesc(e.target.value);
    }

    const handleUpload = async () => {
        if(user._id === video.userId){
            const url = `${HOST}/videos/${video._id}`;
            const res = await axios.put(url , {title , desc} ,{
                headers : {
                    "Authorization" : `Bearer ${token}`,
                }
            });
            if(res.status === 200){
                alert("Video Updated Succesfully");
                window.location.reload();
            }
        }else{
            alert("You can only edit your videos")
        }
    }

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpenUpdateModal(false)}>X</Close>
                <Title>Update your video</Title>
                <Hr />


                <Input onChange={(e) => handleTitleChange(e)} name="title" type="filetext" placeholder='Title' />
                <Desc onChange={(e) => handleDescChange(e)} name="desc" placeholder='descriptions' rows={8} />

                <Button onClick={handleUpload}>UPLOAD</Button>
            </Wrapper>
        </Container>
    )
}

export default UpdateModal