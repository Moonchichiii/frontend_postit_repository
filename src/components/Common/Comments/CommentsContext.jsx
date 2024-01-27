import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect
} from "react";
import { axiosFormInstance } from "../../../Api/AxiosDefaults";
import { useAuth } from "../../Authentication/AuthContext";

const CommentsContext = createContext();

export const useComments = () => useContext(CommentsContext);

export const CommentsProvider = ({ children }) => {
  const { token } = useAuth();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  const axiosConfig = useMemo(
    () => ({
      headers: { Authorization: `Bearer ${token}` }
    }),
    [token]
  );

  const fetchComments = useCallback(
    async (postId) => {
      try {
        const { data } = await axiosFormInstance.get(
          `/posts/${postId}/comments/`,
          axiosConfig
        );
        setComments((prevComments) => [
          ...new Set([...prevComments, ...data.results])
        ]);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    },
    [axiosConfig]
  );

  const addComment = useCallback(
    async (postId, commentData) => {
      try {
        const { data } = await axiosFormInstance.post(
          `/posts/${postId}/comments/`,
          commentData,
          axiosConfig
        );
        setComments((prevComments) => [...prevComments, data]);
      } catch (err) {
        console.error("Error adding a comment:", err);
      }
    },
    [axiosConfig]
  );

  const editComment = useCallback(
    async (postId, commentId, commentData) => {
      try {
        const { data } = await axiosFormInstance.put(
          `/posts/${postId}/comments/${commentId}/`,
          commentData,
          axiosConfig
        );
        setComments((currentComments) =>
          currentComments.map((comment) =>
            comment.id === commentId ? data : comment
          )
        );
      } catch (err) {
        console.error("Error editing a comment:", err);
      }
    },
    [axiosConfig]
  );

  const deleteComment = useCallback(
    async (postId, commentId) => {
      try {
        await axiosFormInstance.delete(
          `/posts/${postId}/comments/${commentId}/`,
          axiosConfig
        );
        setComments((currentComments) =>
          currentComments.filter((comment) => comment.id !== commentId)
        );
      } catch (err) {
        console.error("Error deleting a comment:", err);
      }
    },
    [axiosConfig]
  );

  return (
    <CommentsContext.Provider
      value={{
        comments,
        fetchComments,
        addComment,
        editComment,
        deleteComment,
        onDeleteComment: deleteComment
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
