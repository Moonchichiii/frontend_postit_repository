import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEdit,
  faTrash,
  faCommentDots
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../../Authentication/AuthContext";
import { usePosts } from "../../Posts/PostContext/PostContext";

import { CommentsProvider } from "../../Comments/CommentsContext";
import CommentModal from "../../Comments/CommentModal";

function Postcard({ post }) {
  const { token } = useAuth();

  const { addLike } = usePosts();
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isLiked, setIsLiked] = useState(post.isLiked);

  const handleLike = () => {
    if (!isLiked) {
      addLike(post.id);
      setLikesCount(likesCount + 1);
      setIsLiked(true);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  if (!post) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={post.image} className="card-img-top" />
      <Card.Body className="d-flex flex-column p-4">
        <Card.Title>{post.title}</Card.Title>
        <div className="d-flex justify-content-center">
          <div className="col">{post.content}</div>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        {post.profile_username && (
          <div className="mb-4">
            <Card.Text>
              Posted by: {post.profile_username} - {post.created_at}{" "}
            </Card.Text>
            {post.profile_image && (
              <Card.Img
                variant="top"
                src={post.profile_image}
                alt={`${post.profile_username}'s Profile`}
                style={{ maxWidth: "70px" }}
              />
            )}
          </div>
        )}
        <div className="mt-auto">
          {token && (
            <>
              <Button variant="btn-sm outline-secondary" className="mb-2">
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
              <Button variant="btn-sm outline-secondary" className="mb-2">
                <FontAwesomeIcon icon={faTrash} /> Delete
              </Button>
              <Button
                variant="btn-sm outline-secondary"
                className="mb-2"
                onClick={handleShow}
              >
                <FontAwesomeIcon icon={faCommentDots} /> View Comments
              </Button>
              <div className="mb-2">
                {isLiked ? (
                  <FontAwesomeIcon icon={faHeart} className="text-danger" />
                ) : (
                  <button onClick={handleLike}>
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                )}
                <span className="ml-2">{likesCount} Likes</span>
              </div>
            </>
          )}
        </div>
        {token && (
          <CommentsProvider>
            <CommentModal
              postId={post.id}
              show={showModal}
              handleClose={handleClose}
            />
          </CommentsProvider>
        )}
      </Card.Footer>
    </Card>
  );
}

export default Postcard;
