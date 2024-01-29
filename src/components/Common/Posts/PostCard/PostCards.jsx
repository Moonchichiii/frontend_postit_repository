import React, { useState, useCallback } from "react";
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
import EditPostModal from "../EditPostModal/EditPostModal";

function Postcard({ post }) {
  const { user, token } = useAuth();
  const { addLike, removePost } = usePosts();
  const isOwner = user && post.user === user.id;

  const [showEditModal, setShowEditModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const handleEdit = useCallback(() => setShowEditModal(true), []);
  const handleDelete = useCallback(
    async () => await removePost(post.id),
    [post.id, removePost]
  );
  const handleLike = useCallback(
    () => !post.isLiked && addLike(post.id),
    [post.isLiked, post.id, addLike]
  );

  if (!post) return <div className="text-center">Loading...</div>;

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
        {isOwner && (
          <>
            <Button variant="btn-sm outline-secondary" onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>
            <Button variant="btn-sm outline-danger" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          </>
        )}
        {token && (
          <Button
            variant="btn-sm outline-primary"
            onClick={() => setShowCommentModal(true)}
          >
            <FontAwesomeIcon icon={faCommentDots} /> Comments
          </Button>
        )}
        <div>
          <button variant="btn-sm outline-primary" onClick={handleLike}>
            <FontAwesomeIcon
              icon={faHeart}
              className={post.isLiked ? "text-danger" : ""}
            />{" "}
            {post.likesCount} Likes
          </button>
        </div>
      </Card.Footer>
      {showEditModal && (
        <EditPostModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          postToEdit={post}
        />
      )}
      {showCommentModal && (
        <CommentsProvider>
          <CommentModal
            postId={post.id}
            show={showCommentModal}
            handleClose={() => setShowCommentModal(false)}
          />
        </CommentsProvider>
      )}
    </Card>
  );
}

export default Postcard;
