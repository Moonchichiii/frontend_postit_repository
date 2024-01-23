import React, { createContext, useContext, useState } from "react";
import ImageInstance from "../../../Api/AxiosDefaults";










//  Fetching posts from the api and storing them in state. 

export const fetchPosts = async (searchQuery = "", page = 1) => {
  try {
    const response = await ImageInstance.get(
      `posts/?search=${searchQuery}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { results: [], next: null };
  }
};


//  creating a context for the posts 
export const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  return (
    <PostsContext.Provider
      value={{ posts, setPosts, searchTerm, setSearchTerm }}
    >
      {children}
    </PostsContext.Provider>
  );
};



