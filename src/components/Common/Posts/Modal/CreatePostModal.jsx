import React, { useState } from "react";
import { Modal, Form, Button, FormControl } from "react-bootstrap";
import { axiosFormInstance } from "../../../../Api/AxiosDefaults";
import { useAuth } from "../../../Authentication/AuthContext";

function CreatePostModal({ show, handleClose }) {
  const [postData, setPostData] = useState({
    title: "",
    ingredients: "",
    recipe: "",
    image: null,
    time: ""
  });



// preset cooking time options

  const [selectedTime, setSelectedTime] = useState(10);
  const cookingTimeOptions = [
    { label: "10 minutes", value: 10 },
    { label: "15 minutes", value: 15 },
    { label: "20 minutes", value: 20 },
    { label: "25 minutes", value: 25 },
    { label: "30 minutes", value: 30 },
    { label: "40 minutes", value: 40 },
    { label: "50 minutes", value: 50 },
    { label: "1 hour", value: 60 },
    { label: "2 hour", value: 120 },
    { label: "3 hour", value: 180 },
    { label: "4 hour", value: 240 },
    { label: "4 hour or more", value: 270 }
  ];

  const { title, ingredients, recipe, image, time } = postData;

  const [imagePreview, setImagePreview] = useState(null);




  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData({
      ...postData,
      [name]: value
    });
  };

// changes the time for the recipe

  const handleChangeTime = (event) => {
    const selectedValue = parseInt(event.target.value);
    setSelectedTime(selectedValue);
  };

// changes the image for preview

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      const file = event.target.files[0];
      setPostData({
        ...postData,
        image: file
      });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const { user, token } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append(
      "content",
      `Ingredients:\n${ingredients}\n\nRecipe:\n${recipe}`
    );
    if (user && user.profile) {
      formData.append("profile", user.profile);
    }
    if (image) {
      formData.append("post_image", image);
    }
    formData.append("time", selectedTime);

    // adds token to header
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const response = await axiosFormInstance.post(
        "/posts/",
        formData,
        axiosConfig
      );
      console.log("Successfully created post:", response.data);
      handleClose();
    } catch (error) {
      console.log("Something went wrong creating post:", error.message, error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Recipe Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {imagePreview && (
            <Form.Group controlId="imagePreview">
              <Form.Label>Preview:</Form.Label>
              <div>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </div>
            </Form.Group>
          )}
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <FormControl
              type="file"
              accept="image/*"
              onChange={handleChangeImage}
            />
          </Form.Group>

          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="ingredients">
            <Form.Label>Ingredients:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="ingredients"
              value={ingredients}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="recipe">
            <Form.Label>Recipe:</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="recipe"
              value={recipe}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="time">
            <Form.Label>Cooking Time:</Form.Label>
            <Form.Control
              as="select"
              name="time"
              value={selectedTime}
              onChange={handleChangeTime}
              required
            >
              {cookingTimeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <div className="modal-footer">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Post it!
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreatePostModal;
