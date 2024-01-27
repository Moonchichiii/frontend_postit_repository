import React, { createContext, useContext, useState } from "react";
import { axiosFormInstance } from "../../../../Api/AxiosDefaults";
import { useAuth } from "../../../Authentication/AuthContext";

export const PostsContext = createContext();

export const usePosts = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);

  //  Setting the token in the header of the axios instance, included in each function call.
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  //  Functions for adding, editing, removing posts from the API. (Fetching posts is handled by PostListContext)

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

  //  like posts function

  const addLike = async (postId) => {
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
      console.error("liking post error : ", error);
    }
  };

  return (
    <PostsContext.Provider
      value={{ posts, addPost, editPost, removePost, addLike }}
    >
      {children}
    </PostsContext.Provider>
  );
};
