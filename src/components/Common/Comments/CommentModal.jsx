import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { axiosFormInstance } from "../../../Api/AxiosDefaults";
import { useAuth } from "../../Authentication/AuthContext";

function CommentModal({ postId, show, handleClose }) {
  const { token } = useAuth();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (show) {
      const fetchComments = async () => {
        try {
          const response = await axiosFormInstance.get(
            `/posts/${postId}/comments/`,
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
          setComments(response.data.results);
        } catch (err) {}
      };
      fetchComments();
    }
  }, [show, postId, token]);




  const handleCommentSubmit = async () => {
    if (comment.length > 200) {
      setErrorMessage("Comment too long. 200 characters max.");
      return;
    }

    try {
      const response = await axiosFormInstance.post(
        `/posts/${postId}/comments/`,
        { content: comment },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setComments([...comments, response.data]);
      setComment("");
      setErrorMessage("");
    } catch (err) {}
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>



        <Form onSubmit={handleCommentSubmit}>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form.Group controlId="comment">
            <Form.Control
              as="textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Say something nice..."
            />


          </Form.Group>
          <Button variant="primary" type="submit">

            Add Comment

          </Button>
        </Form>

        <hr />

        <h3>Comments</h3>

        <ol>
          {comments.map((comment) => (
            <li key={`${comment.profile.id}-${comment.id}`}
            >
              <strong>{comment.profile_username}:</strong> {comment.content}
            </li>
          ))}
        </ol>
      </Modal.Body>
    </Modal>
  );
}

export default CommentModal;
