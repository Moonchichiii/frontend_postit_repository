import React, { useState, useContext } from "react";
import { Modal, Button, Accordion, Form } from "react-bootstrap";
import { ProfileContext } from "./ProfileContext";

function ProfileManagerModal({ show, handleClose }) {
  const { profile, updateImg, changePass } = useContext(ProfileContext);

  const [password, setPassword] = useState({ new1: "", new2: "" });
  const [imageFile, setImageFile] = useState(null);

  const initialPreview = profile
    ? profile.profileImage
    : import.meta.env.VITE_DEFAULT_IMG_URL;
  const [preview, setPreview] = useState(initialPreview);

  const handlePassChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      console.log("file:", file);
      reader.readAsDataURL(file);
    } else {
      setPreview(import.meta.env.VITE_DEFAULT_IMG_URL);
    }
  };

  const submitPass = async (e) => {
    e.preventDefault();
    if (password.new1 === password.new2) {
      await changePass({ new_password: password.new1 });
    } else {
      console.log("Passwords do not match!");
    }
  };

  const handleUpdateImage = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("profileImage", imageFile);
      await updateImg(formData);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Profile Update</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Profile Image</Accordion.Header>
            <Accordion.Body>
              <div className="profile-image-square">
                <img
                  src={preview}
                  alt="Profile"
                  className="profile-image"
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </div>
              <Form.Group>
                <Form.Label>Upload Profile Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />
                <Button
                  variant="primary"
                  onClick={handleUpdateImage}
                  disabled={!imageFile}
                >
                  Update Image
                </Button>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Change Password</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={submitPass}>
                <Form.Group>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="new1"
                    value={password.new1}
                    onChange={handlePassChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="new2"
                    value={password.new2}
                    onChange={handlePassChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update Password
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileManagerModal;
