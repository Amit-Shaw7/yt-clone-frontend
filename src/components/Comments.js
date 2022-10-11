import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'timeago.js';
import HOST from '../host';

const Container = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0px;
    
`;
const Avatar = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: gray;
    cursor: pointer;
    outline: none;
    border: none;
`;
const CommentDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const Name = styled.span`
    font-size: 13px;
    font-weight: 500;
`;
const Date = styled.span`
    font-size: 12px;
    font-weight: 400;
    margin-left: 5px;
    color: ${({ theme }) => theme.textSoft};
`;
const Comment = styled.p`
    font-size: 14px;
    font-weight: 500;
`;

const Comments = ({ comment }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const getUser = async () => {
            const url = `${HOST}/users/find/${comment.userId}`;
            const res = await axios.get(url);
            // console.log(res.data);
            setUser(res.data.user);
        }
        getUser();
    },[comment.userId]);

    return (
        <Container>
            <Avatar src={user?.img}/>
            <CommentDetails>
                <Name>{user?.name} <Date>{format(comment?.createdAt)}</Date></Name>
                <Comment>{comment?.desc}</Comment>
            </CommentDetails>
        </Container>
    )
}

export default Comments