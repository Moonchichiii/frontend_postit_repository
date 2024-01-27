import React, { useState, useContext, useRef } from "react";
import { ProfileContext } from "../Profile/ProfileContext";
import { Button, Form } from "react-bootstrap";

function ProfileForm() {
  const { updateProfile } = useContext(ProfileContext);
  const imageFile = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImage;
    if (imageFile.current.files[0]) {
      profileImage = imageFile.current.files[0];
    }
    await updateProfile({ profileImage });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Profile Image</Form.Label>
        <Form.Control type="file" ref={imageFile} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update Profile Image
      </Button>
    </Form>
  );
}

export default ProfileForm;
