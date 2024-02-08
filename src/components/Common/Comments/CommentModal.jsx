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
      console.log(fetchComments);
    }
    sessionStorage.setItem('debugLogs', JSON.stringify({ token, comments, postId,show }));
  }, [show, postId, token]);

  const debugLogs = JSON.parse(sessionStorage.getItem('debugLogs'));
  console.log(debugLogs);

console.log(comment);

  const handleCommentSubmit = async () => {
    event.preventDefault();
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
    } catch (err) {
      console.error(err);

      if (err.response && [401, 403].includes(err.response.status)) {


        setErrorMessage("Session expired. Please log in again.");

      } else {

        setErrorMessage("An error occurred. Please try again later.");
      }
    }
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
            <li key={`${comment.profile.id}-${comment.id}`}>
              <strong>{comment.profile_username}:</strong> {comment.content}
              <div className="comment-date">{comment.created_at}</div>
            </li>
          ))}
        </ol>

      </Modal.Body>
    </Modal>
  );
}


export default CommentModal;
