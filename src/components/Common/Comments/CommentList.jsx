import React from "react";
import { ListGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";

function CommentList({ comments, onDeleteComment }) {
  if (!Array.isArray(comments)) {
    return <div>Loading comments...</div>;
  }

  return (
    <ListGroup variant="flush">
      {comments.map((comment) => {
        console.log("Comment data:", comment);
        return (
          <ListGroup.Item key={comment.id}>
          {post.id}  {post.id.comment.profile_username} - {comment.content}
            <br />
            <small>
              Comment : {new Date(comment.created_at).toLocaleString()}
            </small>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                console.log("Deleting comment with ID:", comment.id);
                onDeleteComment(comment.id);
              }}
            >
              Delete
            </Button>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
export default CommentList;
