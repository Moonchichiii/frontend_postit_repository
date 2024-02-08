import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../../Authentication/AuthContext";
import { axiosFormInstance } from "../../../Api/AxiosDefaults";

const FollowerContext = createContext();

export const useFollowerData = () => useContext(FollowerContext);

export const FollowerProvider = ({ children }) => {
  const { token } = useAuth();
  const [followers, setFollowers] = useState([]);
  const [popularProfiles, setPopularProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAxiosConfig = () => ({
    headers: { Authorization: `Bearer ${token}` }
  });

  useEffect(() => {
    const fetchFollowersAndProfiles = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const followersResponse = await axiosFormInstance.get(
          "/api/followers/",
          getAxiosConfig()
        );
        setFollowers(followersResponse.data.results || []);
        const profilesResponse = await axiosFormInstance.get(
          "/api/profiles/",
          getAxiosConfig()
        );
        setPopularProfiles(profilesResponse.data.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowersAndProfiles();
  }, [token]);

  const handleFollow = async (profileId) => {
    setIsLoading(true);
    try {
      await axiosFormInstance.post(
        "/api/followers/",
        { followed_profile: profileId },
        getAxiosConfig()
      );
      await fetchFollowers();
    } catch (error) {
      setError("Failed to follow");
    } finally {
      setIsLoading(false);
    }
    useEffect(() => {
      fetchFollowers();
      fetchPopularProfiles();
    }, [token]);
  };

  const handleUnfollow = async (profileId) => {
    setIsLoading(true);
    try {
      await axiosFormInstance.delete(
        `/api/followers/${profileId}/`,
        getAxiosConfig()
      );
      await fetchFollowers();
    } catch (error) {
      setError("Failed to unfollow");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FollowerContext.Provider
      value={{
        followers,
        popularProfiles,
        handleFollow,
        handleUnfollow,
        isLoading,
        error
      }}
    >
      {children}
    </FollowerContext.Provider>
  );
};
