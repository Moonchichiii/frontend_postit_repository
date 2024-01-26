import React from 'react';
import { ListGroup } from 'react-bootstrap';

function CommentList({ comments }) {
  
  if (!Array.isArray(comments)) {
    return <div>Loading comments...</div>;
  }

  return (
    <ListGroup variant="flush">
      {comments.map((comment) => (
        <ListGroup.Item key={comment.id}>
          {comment.content} - {comment.profile}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default CommentList;