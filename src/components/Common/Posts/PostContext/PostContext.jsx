import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosFormInstance, axiosPublicInstance } from "../../../../Api/AxiosDefaults";
import { useAuth } from "../../../Authentication/AuthContext";



export const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useAuth();

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      let url = `/posts/?page=${page}`;
      let filteredPosts = posts; 
      if (searchTerm) {
        url = `/posts/?q=${searchTerm}&page=${page}`;
        filteredPosts = posts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
  
      try {
        const response = await axiosPublicInstance.get(url);
        setPosts(response.data.results);
        setHasMore(response.data.next != null);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setHasMore(false);
      }
    };
  
    fetchPosts();
  }, [page, searchTerm]);


  // Axios requests with token
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  // add a new post
  const addPost = async (formData) => {
    try {
      const response = await axiosFormInstance.post(
        "/posts/",
        formData,
        axiosConfig
      );
      setPosts((prevPosts) => [...prevPosts, response.data]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const editPost = async (postId, updatedData) => {
    try {
      const response = await axiosFormInstance.put(
        `/posts/${postId}/`,
        updatedData,
        axiosConfig
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? response.data : post))
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const removePost = async (postId) => {
    try {
      await axiosFormInstance.delete(`/posts/${postId}/`, axiosConfig);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Like a post
  const addLike = async (postId, userId) => {
    try {
      const response = await axiosFormInstance.post(
        "/likes/",
        { post: postId, user: userId },
        axiosConfig
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, is_liked: true, likes_count: post.likes_count + 1 }
            : post
        )
      );
    } catch (error) {
      console.error("liking post error:", error);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        page,
        setPage,
        hasMore,
        searchTerm,
        setSearchTerm,
        addPost,
        editPost,
        removePost,
        addLike
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
