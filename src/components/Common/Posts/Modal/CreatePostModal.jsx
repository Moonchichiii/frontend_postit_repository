import React, { useState } from "react";
import { Modal, Form, Button, FormControl } from "react-bootstrap";
import { ImageInstance } from "../../../../Api/AxiosDefaults";

import { usePosts } from "../PostContext";
function CreatePostModal({ show, handleClose }) {
  const [postData, setPostData] = useState({
    title: "",
    ingredients: "",
    recipe: "",
    image: null,
    time: ""
  });

  const { title, ingredients, recipe, image, time } = postData;

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value
    });
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    console.log('Form Data:', formData);
    formData.append("title", title);

    formData.append(
   

      "content",
      `Ingredients:\n${ingredients}\n\nRecipe:\n${recipe}`
    );
    if (image) {
      formData.append("post_image", image);
    }
    formData.append("time", time);
    

    try {
      const response = await ImageInstance.post("/posts/", formData, {});

      console.log('Image Instance:', ImageInstance);


      console.log("Sucessfully created post:", response.data);
      handleClose();
    } catch (error) {
      console.log('Something went wrong creating post:', error.message, error);

      console.log("Something went wrong creating post:", error);
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
              type="number"
              name="time"
              value={time}
              onChange={handleChange}
              required
            />
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
