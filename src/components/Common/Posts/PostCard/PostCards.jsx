import React, { useState, useCallback, useEffect } from "react";
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

import CommentModal from "../../Comments/CommentModal";


import EditPostModal from "../EditPostModal/EditPostModal";

function Postcard({ post }) {
  const { user, token } = useAuth();

  const { addLike, removePost } = usePosts();

  const [likesCount, setLikesCount] = useState(post.likes_count || 0);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const handleEdit = useCallback(() => setShowEditModal(true), []);
  const handleDelete = useCallback(async () => {
    if (user && post && user.profile.id === post.profile.id) {
      await removePost(post.id);
    }
  }, [user, post, removePost]);

  // triggering the like response.
  const handleLike = useCallback(async () => {
    try {
      await addLike(post.id);
    } catch (error) {
      console.error("Error", error);
    }
  }, [post.id, addLike]);

  useEffect(() => {
    if (!post) return;
    post.likes_count = likesCount;
  }, [likesCount, post]);

  if (!post) return <div className="text-center">Loading...</div>;

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={post.image} className="card-img-top" />

      <Card.Body className="d-flex flex-column p-4">
        <Card.Title>{post.title}</Card.Title>

        {post.ingredients && (
          <div className="ingredients-section">
            <h6>Ingredients</h6>
            <Card.Text className="flex-grow-1">{post.ingredients}</Card.Text>
          </div>
        )}

        {post.recipe && (
          <div className="recipe-section">
            <h6>Recipe</h6>
            <Card.Text className="flex-grow-1">{post.recipe}</Card.Text>
          </div>
        )}
      </Card.Body>

      <Card.Footer className="text-muted">
        {post.profile_username && (
          <div className="mb-4">
            <Card.Text>
              Posted by:{post.profile_username}
              on:{""}
              {new Date(post.created_at).toLocaleDateString()}
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
        {user && user.profile_id === post.profile.id ? (
          <>
            <Button variant="btn-sm outline-secondary" onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>
            <Button variant="btn-sm outline-danger" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          </>
        ) : null}

        {token && (
          <>
            <Button
              variant="btn-sm outline-primary"
              onClick={() => setShowCommentModal(true)}
            >
              <FontAwesomeIcon icon={faCommentDots} /> Comments
            </Button>

            <div>
              <button
                onClick={() => {
                  handleLike();
                }}
                className="btn btn-sm outline-primary"
              >
                <FontAwesomeIcon icon={faHeart} /> {post.likes_count || 0} Likes
              </button>
            </div>
          </>
        )}

        {!token && (
          <div>
            <FontAwesomeIcon icon={faHeart} /> {post.likes_count || 0} Likes
          </div>
        )}
      </Card.Footer>

      {showEditModal && (
        <EditPostModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          postToEdit={post}
        />
      )}
      {showCommentModal && (
        
          <CommentModal
            postId={post.id}
            show={showCommentModal}
            handleClose={() => setShowCommentModal(false)}
            posts={[post]}
          />
        
      )}
    </Card>
  );
}

export default Postcard;
