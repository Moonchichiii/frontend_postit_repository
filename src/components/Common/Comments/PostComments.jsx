import React, { useEffect, useState } from "react";

function PostComments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getCommentsForPost = async (postId) => {
      try {
        const response = await axios.get(`/api/posts/${postId}/comments/`);
        const comments = response.data;
        setComments(comments);
      } catch (error) {
        console.error("Error retrieving comments:", error);
      }
    };

    getCommentsForPost(postId);
  }, [postId]);

  return (
    <div>
      <h3>Comments:</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.content} - {comment.profile.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostComments;
