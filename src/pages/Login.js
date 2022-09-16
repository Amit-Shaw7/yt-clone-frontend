import { Google } from '@mui/icons-material';
import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { customlg, md, sm } from '../responsive';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import HOST from '../host';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context';

const Container = styled.div`
    height: calc(100vh - 56px);
    overflow-y: scroll;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: red; */
`;

const Wrapper = styled.div`
    padding: 10px;
`;
const Box = styled.div`
    width: 25vw;
    height: 40vh;
    background-color: ${({ theme }) => theme.bgLighter};  
    border-radius: 10px;
    ${customlg({
    width: "40vw",
})}
${md({
    width: "60vw",
})}
${sm({
    width: "80vw",
})}
`;
const Form = styled.form`
    height: 100%;
    width:100%;
    padding: 20px 0px;
    /* background-color: red; */
`;
const SignIn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 35%;
`;
const SignUp = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    height: 45%;
`;
const Inputs = styled.div`
    padding: 5px;
    background-color: transparent;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    width: 80%;
    color: ${({ theme }) => theme.text};
    height: 60%;
`;
const Input = styled.input`
    width: 100%;
    padding: 7px 5px;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.text};
    outline: none;
    color: ${({ theme }) => theme.text};
    border-radius: 5px;
`;
const Button = styled.button`
    padding: 10px 0px;
    display: flex;
    width: 60%;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.bgLighter};
    color: ${({ theme }) => theme.text};
    border: 1px solid ${({ theme }) => theme.soft};
    font-size: 1rem;
    &:hover{
        background-color: ${({ theme }) => theme.soft};
    }
`;
const H1 = styled.h2`
    color: ${({ theme }) => theme.text};
    text-align: center;
`;
const Login = () => {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [])
    const signInWithGoogle = async (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider).then((result) => {
            axios.post(`${HOST}/auths/google`, {
                name: result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL
            }).then((res) => {
                console.log(res);
                if (res.data.token) {
                    localStorage.setItem("accessToken", res.data.token);
                    setUser(res.data.user);
                }
                navigate("/");
            })
        }).catch((error) => {
            console.log(error.message);
        })
    }

    return (
        <Container>
            <Wrapper>
                <Box>
                    <Form>
                        <H1>Continue WIth Google</H1>
                        <SignIn>
                            <Button onClick={signInWithGoogle}><Google sx={{ margin: "0px 10px" }} />Google</Button>
                        </SignIn>
                    </Form>
                </Box>
            </Wrapper>
        </Container>
    )
}

export default Login