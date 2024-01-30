import React, { useState, useEffect, useContext } from 'react';
import { Modal, Form, Button, FormControl, Alert } from 'react-bootstrap';
import { PostsContext } from '../PostContext/PostContext';

function EditPostModal({ show, handleClose, postToEdit }) {
    const { editPost } = useContext(PostsContext);
    const [postData, setPostData] = useState({
        title: '',
        ingredients: '',
        recipe: '',
        image: null,
        time: ''
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');
    const [selectedTime, setSelectedTime] = useState(10)
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

    const handleChangeTime = (event) => {
        const selectedValue = parseInt(event.target.value);
        setSelectedTime(selectedValue);
    };

    useEffect(() => {
        if (postToEdit) {
            setPostData({
                ...postToEdit,
                ingredients: postToEdit.ingredients,
                recipe: postToEdit.recipe
            });
            setSelectedTime(postToEdit.time);
            if (postToEdit.image) {
                setImagePreview(postToEdit.image);
            }
        }
    }, [postToEdit]);

    if (!postToEdit) {
        return null;
    }

    const { title, ingredients, recipe } = postData;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPostData({ ...postData, [name]: value });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            const file = event.target.files[0];
            setPostData({ ...postData, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.entries(postData).forEach(([key, value]) => {
            if (key === 'image' && typeof value === 'object') {
                formData.append('post_image', value);
            } else {
                formData.append(key, value);
            }
        });

        try {
            await editPost(postData.id, formData);
            handleClose();
        } catch (e) {
            setError(e.response?.data?.message || 'Error occurred while updating post.');
        }
    };
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Post</Modal.Title>
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
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </div>
                    {error && <Alert variant="danger">{error}</Alert>}
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditPostModal;
