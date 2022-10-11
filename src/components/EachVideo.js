import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HOST from '../host';
import { md, sm } from '../responsive';
import { format } from 'timeago.js';
import { MoreVertOutlined } from '@mui/icons-material';
import { useContext } from 'react';
import { UserContext } from '../context';
import UpdateModal from './UpdateModal';
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
    background-color : gray;
    flex: ${(props) => props.type === "sm" && "2"};//check
`;
const Details = styled.div`
    display: flex;
    /* background-color: red; */
    gap: 12px;
    margin-top: ${(props) => props.type !== "sm" && "16px"};
    flex: 1;
    position: relative;
`;
const ChannelLogo = styled.img`
    height: 36px;
    width: 36px;
    border-radius: 50%;
    background-color : gray;
    display: ${(props) => props.type === "sm" ? "none" : "block"};
`;

const Title = styled.span`
    font-weight: 700;
    /* padding-right: 5px; */
    width: 70px;
    /* background-color: red; */
    font-size: 14px;
    color: ${({ theme }) => theme.text};
    background-color : ${({ props }) => props?.data === "true" && "gray"};
`;
const ChannelName = styled.div`
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.textSoft};
    margin-top: 9px;
    background-color : ${({ props }) => props?.data === "true" && "gray"};
`;
const Info = styled.div`
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.textSoft};
    background-color : ${({ props }) => props?.data === "true" && "gray"};

`;
const Texts = styled.div`
    /* background-color: blue; */
    width: 75%;
    position: relative;
`;
const AdminOpt = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    
    &:hover{
        background-color: #D8D9CF;
        color: white;
        border-radius: 50%;
        transition: all 0.3s ease-in-out;
    }
`;
const AdminOptModal = styled.div`
    height: 60px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    background-color : ${({ theme }) => theme.hr};
    /* z-index: 2; */
    position: absolute;
    top: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    right: 30px;
    padding: 3px;
    `;
const Item = styled.div`
    height: 40%;
    border-radius: 3px;
    width: 100%;
    /* background-color: transparent; */
    padding: 2px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease-in-out;
    
    &:hover{
        background-color: ${({ theme }) => theme.bg};
        transition: all 0.3s ease-in-out;
    }
`;



const EachVideo = ({ type, video }) => {
    const [channel, setChannel] = useState({});
    const [open, setOpen] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const { user } = useContext(UserContext);
    const token = localStorage.getItem("accessToken");

    const handleView = async () => {
        const url = `${HOST}/videos/view/${video?._id}`
        const res = await axios.put(url, { withCredentials: true });
    }

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleDelete = async () => {
        console.log("Running");
        if (video.userId === user._id) {
            const url = `${HOST}/videos/${video._id}`;
            const res = await axios.delete(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res.status === 200) {
                alert("Video Deleted Succesfully");
            }
            window.location.reload();

        } else {
            alert("You can only delete your videos");
        }
    }
    const handleUpdate = async () => {
        setOpenUpdateModal(true);
    }

    useEffect(() => {
        const fetchChannel = async () => {
            const url = `${HOST}/users//find/${video.userId}`;
            const res = await axios.get(url, { withCredentials: true });
            // console.log(res.data)
            setChannel(res.data.user);
        }
        fetchChannel();
    }, [video.userId])

    return (
        <>
            <Container type={type}>
                <Link onClick={handleView} to={`/videos/${video?._id}`} style={{ textDecoration: "none" }}>
                    <Thumbnail src={video?.imgUrl} type={type} />
                </Link>
                <Details type={type}>
                    <Link to={`/channel/${channel?._id}`}><ChannelLogo type={type} src={channel?.img} /></Link>
                    <Texts type={type}>
                        <Title data={video?.title ? "true" : "false"}>{video?.title}</Title>
                        <ChannelName data={channel?.name ? "true" : "false"}>{channel?.name}</ChannelName>
                        <Info data={video?.createdAt ? "true" : "false"}>{format(video?.createdAt)} . {video?.views} views</Info>
                    </Texts>
                    {(type === "channel" && user?._id === video?.userId) && <AdminOpt onClick={handleOpen}><MoreVertOutlined sx={{ color: "gray" }} /></AdminOpt>}
                    {
                        open && <AdminOptModal>
                            <Item onClick={handleUpdate}>Update</Item>
                            <Item onClick={handleDelete}>Delete</Item>
                        </AdminOptModal>
                    }
                </Details>
            </Container>
            {
                openUpdateModal && <UpdateModal video={video} openUpdateModal={openUpdateModal} setOpenUpdateModal={setOpenUpdateModal}/>
            }
        </>
    )
}

export default EachVideo