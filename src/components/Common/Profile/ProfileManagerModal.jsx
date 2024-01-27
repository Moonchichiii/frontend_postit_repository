import React from "react";
import { Modal, Button } from "react-bootstrap";
import ProfileForm from "./ProfileForm";
import ChangePassword from "./ChangePassword"; // Import the ChangePassword component
import { ProfileProvider } from "./ProfileContext";

function ProfileManagerModal({ show, handleClose }) {
  return (
    <ProfileProvider>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProfileForm />
          <hr />
          <ChangePassword />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </ProfileProvider>
  );
}

export default ProfileManagerModal;
