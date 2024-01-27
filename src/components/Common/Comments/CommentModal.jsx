import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { useComments } from "./CommentsContext";

function CommentModal({ postId, show, handleClose }) {
  const { comments, fetchComments, addComment, onDeleteComment } =
    useComments();

  useEffect(() => {
    if (show) {
      fetchComments(postId);
    }
  }, [show, postId, fetchComments]);

  const handleCommentSubmit = (commentText) => {
    addComment(postId, { content: commentText });
  };

  const recentComments = Array.isArray(comments) ? comments.slice(-4) : [];

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CommentForm postId={postId} onCommentSubmit={handleCommentSubmit} />
        <CommentList comments={comments} onDeleteComment={onDeleteComment} />
      </Modal.Body>
    </Modal>
  );
}

export default CommentModal;
