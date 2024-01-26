import React, { createContext, useState, useEffect } from "react";
import { axiosPublicInstance } from "../../../../Api/AxiosDefaults";

export const PostListContext = createContext();

export const PostListProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const url = `/posts/?page=${page}`;
      try {
        const response = await axiosPublicInstance.get(url);
        console.log(response.data.results);
        const newPosts = response.data.results;
        setHasMore(newPosts.length > 0);
        console.log(newPosts.length > 0);
        setPosts(prev => page === 1 ? newPosts : [...prev, ...newPosts]);
        console.log(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setHasMore(false);
      }
    };

    fetchPosts();
  }, [page]);

 
  return (
    <PostListContext.Provider value={{ posts, setPosts, hasMore, setPage }}>      
      {children}
    </PostListContext.Provider>
  );
};

export default PostListProvider;
