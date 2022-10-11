import { ArrowDropDown, ArrowDropUp, ArrowUpward } from '@mui/icons-material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context';
import HOST from '../host';
import { sm } from '../responsive';
import Comments from './Comments';
axios.defaults.withCredentials = true;

const Container = styled.div`
    padding: 0px 20px;
    height: ${(props) => props.hideComments && "200px"};
    overflow-y: ${(props) => props.hideComments === true ? "hidden" : "scroll"}; 
    // overflow: hidden;
    box-sizing: border-box;
    
    /* background-color: blue; */
`;
const AddComment = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    ${sm({
    width: "100%",
    gap: "5px"

})};
`;

const Avatar = styled.img`
    height: 50px;
    width: 60px;
    border-radius: 100%;
    background-color: gray;
    cursor: pointer;
    outline: none;
    border: none;
    ${sm({
    width: "70px",
})};
`;
const Input = styled.input`
    background-color: transparent;
    outline: none;
    border: none;
    border-bottom: 0.5px solid ${({ theme }) => theme.hr};
    padding: 5px ;
    width: 100%;
    color: ${({ theme }) => theme.text};
`;


const Comment = () => {
    const { user, currVideo } = useContext(UserContext);
    const [text, setText] = useState("");
    const [hideComments, setHideComments] = useState(true);
    const [comments, setComments] = useState(null);
    const handleHide = () => {
        setHideComments(false);
        // console.log(hideComments)
    }
    const handleShow = () => {
        // console.log(hideComments)
        setHideComments(true);
    }
    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            const token = localStorage.getItem("accessToken");
            const url = `${HOST}/comments/`;
            const res = await axios.post(url, { videoId: currVideo._id, desc: text }, { headers: { Authorization: `Bearer ${token}`, withCredentials: true } });
            // console.log(res);
            setText("");
            window.location.reload();
        }
    }

    useEffect(() => {

        const fetchComents = async () => {
            const commentURL = `${HOST}/comments/find/${currVideo?._id}`;
            const commentRes = await axios.get(commentURL);
            // console.log(commentRes.data);
            setComments(commentRes.data.comments);
        }
        fetchComents();
    }, [currVideo?._id])
    return (
        <Container hideComments={hideComments}>
            {
                user && <AddComment>
                    <Avatar src={user?.img} />
                    <Input onKeyDown={(e) => handleKeyDown(e)} placeholder='Add a comment...' onChange={(e) => setText(e.target.value)} />
                    {hideComments ? <ArrowDropUp onClick={handleHide} /> : <ArrowDropDown onClick={handleShow} />}
                </AddComment>
            }

            {
                comments && comments?.map((comment, idx) => (
                    <Comments key={idx} comment={comment} />
                ))
            }
        </Container>
    )
}

export default Comment