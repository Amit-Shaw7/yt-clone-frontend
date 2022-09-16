import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import storage from '../firebase';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true
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
    height: 600px;
    width: 600px;
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

const Label = styled.label`
    font-size: 14px;
    color: ${({ theme }) => theme.text};

`;
const Upload = ({ setOpen }) => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});

    const [img, setImg] = useState(null);
    const [video, setVideo] = useState(null);
    const [imgPercentage, setImgPercentage] = useState(0);
    const [videoPercentage, setVidPercentage] = useState(0);

    const [tags, setTags] = useState([]);

    const handleTags = (e) => {
        setTags(e.target.value.split(","));
    }

    const handleChange = (e) => {
        setInputs((prev) => {
            // console.log("Prev when input", prev)
            return { ...prev, [e.target.name]: e.target.value }
        });
    }

    const uploadFile = (file, urlType) => {
        const fileName = new Date().getTime() + file.name;

        if (!file) { return; }

        const storageRef = ref(storage, 'images/' + fileName);

        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on('state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                urlType === "imgUrl" ? setImgPercentage(Math.round(progress)) : setVidPercentage(Math.round(progress));
                switch (snapshot.state) {
                    case 'paused':
                        // console.log('Upload is paused');
                        break;
                    case 'running':
                        // console.log('Upload is running');
                        break;

                    default:
                        break;
                }
            },
            (error) => { console.log(error) },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        // console.log(downloadURL)
                        return { ...prev, [urlType]: downloadURL }
                    })
                });
            }
        );

    }

    useEffect(() => {
        video && uploadFile(video, "videoUrl");
    }, [video]);

    useEffect(() => {

        img && uploadFile(img, "imgUrl");
    }, [img]);

    const handleUpload = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${HOST}/videos`, { ...inputs, tags }, { withCredentials: true });
        setOpen(false);
        if (res.status === 200) {
            navigate(`videos/${res.data.data._id}`);
        }

    }

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload a video</Title>
                <Hr />
                <Label>Video : </Label>
                {
                    videoPercentage > 0 ?
                        (`Uploading : ${videoPercentage} %`) :
                        (<Input type="file" accept='video/*' onChange={(e) => setVideo(e.target.files[0])} />)
                }

                <Input onChange={handleChange} name="title" type="filetext" placeholder='Title' />
                <Desc onChange={handleChange} name="desc" placeholder='descriptions' rows={8} />
                <Input onChange={handleTags} type="filetext" placeholder='Seperate tags with comma ( , )' />

                <Label>Thumbnail : </Label>
                {
                    imgPercentage > 0 ?
                        (`Uploading : ${imgPercentage} %`) :
                        (<Input type="file" accept='image/*' onChange={(e) => setImg(e.target.files[0])} />)
                }
                <Button onClick={handleUpload}>UPLOAD</Button>
            </Wrapper>
        </Container>
    )
}

export default Upload