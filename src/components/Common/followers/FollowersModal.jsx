import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useFollowerData } from "./FollowersContext";

function FollowersModal({ show, handleClose }) {
  const { followers, handleFollow, handleUnfollow } = useFollowerData();



  // link to context and endpont  profiles/popular !!!!
  const [popularProfiles, setPopularProfiles] = useState([]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Followers and Following</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Followers and Following</h5>
        <ul>
          {Array.isArray(followers) &&
            followers.map((follower) => (
              <li key={follower.id}>
                {follower.followed_username} follows {follower.profile_username}
                {follower.is_following ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleUnfollow(follower.id)}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleFollow(follower.profile)}
                  >
                    Follow
                  </Button>
                )}
              </li>
            ))}
        </ul>
        <hr />

        <h5>Popular Users</h5>
        <ul>
          {Array.isArray(popularProfiles) &&
            popularProfiles.map((profile) => <li key={profile.id}></li>)}
        </ul>
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
