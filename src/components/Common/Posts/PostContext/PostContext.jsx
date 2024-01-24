import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosPublicInstance } from "../../../../Api/AxiosDefaults";

// Fetching posts 
export const fetchPosts = async (searchQuery = "", page = 1) => {
  try {
    const response = await axiosPublicInstance.get(
      `posts/?search=${searchQuery}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    
    return { results: [], next: null };
  }
};

// context for posts
export const PostsContext = createContext();


export const usePosts = () => useContext(PostsContext);


export const PostsProvider = ({ children }) => {
  
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  useEffect(() => {
    
    const fetchAndUpdatePosts = async () => {
      const fetchedPosts = await fetchPosts(searchTerm);
      setPosts(fetchedPosts.results); 
    };

    fetchAndUpdatePosts();
  }, [searchTerm]); 


  return (
    <PostsContext.Provider
      value={{ posts, setPosts, searchTerm, setSearchTerm }}
    >
      {children}
    </PostsContext.Provider>
  );
};
