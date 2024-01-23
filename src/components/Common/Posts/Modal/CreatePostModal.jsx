import React, { useState } from "react";
import { Modal, Form, Button} from "react-bootstrap";
import { ImageInstance } from "../../../../Api/AxiosDefaults";


function CreatePostModal({ show, handleClose }) {
    
    // const [postData, setPostData] = useState({
    //     title: "",
    //     content: "",
    //     image: "",
    //   });
    
    //   const { title, content, image } = postData;    

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create a New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
             <Form.Group className="mb-3" controlId="for">
          
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Post it!
          </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreatePostModal;
