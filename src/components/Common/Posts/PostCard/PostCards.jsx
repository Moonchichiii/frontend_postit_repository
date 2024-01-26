import React from "react";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fontawesome/react-font-awesome";
import { faHeart, faEdit, faTrash } from "@fontawesome/free-solid-svg-icons";
import { useAuth } from "../../../Authentication/AuthContext";

import { CommentsProvider } from "../../Comments/CommentsContext";
import CommentAccordion from "../../Comments/CommentAccordion";

function Postcard({ post }) {
  const { token } = useAuth();

  if (!post) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={post.image} className="card-img-top" />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.content}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {post.profile_username && (
          <div>
            <Card.Text>Posted by: {post.profile_username}</Card.Text>
            {post.profile_image && (
              <Card.Img
                variant="top"
                src={post.profile_image}
                alt={`${post.profile_username}'s Profile`}
                style={{ maxWidth: "50px" }}
              />
            )}
          </div>
        )}
        <div className="mt-auto">
          {token && (
            <>
              <Button variant="outline-secondary" className="mr-2">
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
              <Button variant="outline-danger">
                <FontAwesomeIcon icon={faTrash} /> Delete
              </Button>
            </>
          )}

          {token && (
            <CommentsProvider>
              <CommentAccordion postId={post.id} />
            </CommentsProvider>
          )}
        </div>
        <div>
          <FontAwesomeIcon icon={faHeart} /> <span>Likes</span>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default Postcard;
