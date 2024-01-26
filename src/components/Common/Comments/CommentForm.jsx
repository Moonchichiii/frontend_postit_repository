import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function CommentForm({ onCommentSubmit }) {
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.length > 200) { 
      setErrorMessage('Comment too long. 200 chars max.');
      return;
    }
    
    onCommentSubmit({ content: comment });
    setComment('');
    setErrorMessage('');
  };

  return (
    <Form onSubmit={handleSubmit}>
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
        Send
      </Button>
    </Form>
  );
}

export default CommentForm;
