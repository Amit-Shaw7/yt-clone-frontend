import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import HOST from "./host";
const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [currVideo, setCurrVideo] = useState(null);
    const [currChannel, setCurrChannel] = useState(null);
    const [subscribed, setSubscribed] = useState(false)
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        const checkSubscribed = () => {
            if (user?.subscribedUsers.includes(currChannel?._id)){
                setSubscribed(true);
            } else {
                setSubscribed(false);
            }
        }
        const checkLiked = () => {
            if(currVideo?.likes.includes(user?._id)){
                setLiked(true);
            }
        }
        checkLiked();
        checkSubscribed();
    }, [currChannel?._id]);

    // console.log("User from Context : " , user);
    useEffect(() => {
        const isLoggedIn = async () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const url = `${HOST}/auths/isLoggedIn`;
                const jsonRes = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`, // notice the Bearer before your token
                    },
                });
                const res = await jsonRes.json();
                setUser(res.user);
            }
        }
        isLoggedIn();
    }, []);

    return (
        <UserContext.Provider value={{ liked , setLiked ,subscribed,setSubscribed, user, setUser, currVideo, setCurrVideo, currChannel, setCurrChannel }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };