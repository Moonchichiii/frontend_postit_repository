import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from "../../Authentication/AuthContext";
import { axiosFormInstance } from "../../../Api/AxiosDefaults";




const FollowerContext = createContext();

// user follower data hook to the modal. 
export const useFollowerData = () => useContext(FollowerContext);


// getting list of followers & following. 
const getFollowers = async (userId, axiosConfig) => {
    const response = await axiosFormInstance.get(`/api/followers/`, {        
        params: { user_id: userId } 
    });
    return response.data;
};
// fetching popular profiles
const getPopularProfiles = async (axiosConfig) => {
    const response = await axiosFormInstance.get('/api/profiles/popular/', axiosConfig); 
    return response.data;
};


// following function
const followUser = async (userId, axiosConfig) => {
    const response = await axiosFormInstance.post(`/follow/`, { user_id: userId }, axiosConfig);
    return response.data;
};

// unfollowing function
const unfollowUser = async (followerId, axiosConfig) => {
    await axiosFormInstance.delete(`/unfollow/${followerId}/`, axiosConfig);
};


// Provider & followers context

export const FollowerProvider = ({ children }) => {
    const { token } = useAuth();
    const [followers, setFollowers] = useState([]);

    const [popularProfiles, setPopularProfiles] = useState([]);
    const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };


//   Effect hook to fetching followers for the modal when mounted 

useEffect(() => {
    const fetchFollowers = async () => {
        const response = await getFollowers(axiosConfig);
        setFollowers(response.results || []);
    };


        // fetching popular profiles 
        const fetchPopularProfiles = async () => {
            const response = await getPopularProfiles(axiosConfig);
            setPopularProfiles(response.results || []);
        };

        if (token) {
            fetchFollowers();
            fetchPopularProfiles();
        }
    }, [token]);

//  Handler for following

    const handleFollow = async (userId) => {
        await followUser(userId, axiosConfig);
        
    };

// handler for unfollowing

    const handleUnfollow = async (followerId) => {
        await unfollowUser(followerId, axiosConfig);
        
    };

    return (
        <FollowerContext.Provider value={{ followers, popularProfiles, handleFollow, handleUnfollow }}>
            {children}
        </FollowerContext.Provider>
    );
};