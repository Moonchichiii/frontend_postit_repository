import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../../../Authentication/AuthContext";

import updateProfile from "./ProfileContext";

function ProfileForm({ onProfileUpdate }) {
  const { user, token, setUser } = useContext(AuthContext);
  const defaultImageUrl = import.meta.env.VITE_DEFAULT_IMG_URL;
  const [profileImage, setProfileImage] = useState(null);
  const [bio, setBio] = useState("");
  const [profileImagePreview, setProfileImagePreview] =
    useState(defaultImageUrl);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected image file:", file);
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting profile form with data:", formData);
    const formData = new FormData();
    formData.append("bio", bio);
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }

    try {
      await updateProfile(user.id, formData, token);
      onProfileUpdate();
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="profile-setup-container">
      {profileImagePreview && (
        <img
          src={profileImagePreview}
          alt="Profile Preview"
          style={{ width: "100px", height: "100px" }}
        />
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="profileImage">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Save Profile
        </Button>
      </Form>
    </div>
  );
}

export default ProfileForm;
