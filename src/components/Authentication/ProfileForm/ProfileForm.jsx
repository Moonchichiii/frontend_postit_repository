 
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
export default ProfileSetup;