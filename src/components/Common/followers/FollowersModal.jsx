import React, { useEffect } from "react";
import { Button, Modal, Spinner, Alert } from "react-bootstrap";
import { useFollowerData } from "./FollowersContext";
import { useAuth } from "../../Authentication/AuthContext";

function FollowersModal({ show, handleClose }) {
  const { token } = useAuth();
  const {
    followers,
    popularProfiles,
    handleFollow,
    handleUnfollow,
    isLoading,
    error
  } = useFollowerData();

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>Followers & Popular Profiles</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <h5>Following</h5>
            {followers.length > 0 ? (
              followers.map((follower) => {
                const profileImageUrl =
                  follower.followed_profile?.profile_image_url ||
                  "/path/to/default/image";
                return (
                  <div
                    key={follower.id}
                    className="d-flex align-items-center mb-3"
                  >
                    <img
                      src={profileImageUrl}
                      alt="Profile"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%"
                      }}
                    />
                    <div className="ms-3">
                      <p className="mb-0">
                        {follower.followed_profile?.user || "Unknown User"}
                      </p>
                      <Button
                        size="sm"
                        onClick={() => handleUnfollow(follower.id)}
                      >
                        Unfollow
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>You're not following anyone!</p>
            )}
            <hr />
            <h5>Popular Profiles to follow</h5>
            {popularProfiles.length > 0 ? (
              popularProfiles.map((profile) => {
                const isFollowing = followers.some(
                  (follower) => follower.followed_profile?.id === profile.id
                );
                return (
                  <div
                    key={profile.id}
                    className="d-flex align-items-center mb-3"
                  >
                    <img
                      src={
                        profile.profile_image_url || "/path/to/default/image"
                      }
                      alt="Profile"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%"
                      }}
                    />
                    <div className="ms-3">
                      <p className="mb-0">{profile.user}</p>
                      {isFollowing ? (
                        <Button
                          size="sm"
                          onClick={() => handleUnfollow(profile.id)}
                        >
                          Unfollow
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleFollow(profile.id)}
                        >
                          Follow
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No popular profiles found.</p>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FollowersModal;
