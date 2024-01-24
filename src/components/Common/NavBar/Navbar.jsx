import React, { Suspense, useState, useContext } from "react";

import { Button, Container, Navbar, Nav, Offcanvas } from "react-bootstrap";

import { useAuth } from "../../Authentication/AuthContext";
import AuthenticationModal from "../../Authentication/Modal/AuthenticationModal";

import CreatePostModal from "../Posts/CreatePostModal/CreatePostModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faHeart,
  faPlusSquare,
  faUserCircle,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

function Navigation() {
  const { token, logOut } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);

  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  // No show OffCanvas

  const [showOffCanvas, setShowOffCanvas] = useState(false);

  // Toggle OffCanvas
  const toggleOffCanvas = () => setShowOffCanvas(!showOffCanvas);
  const handleOffCanvasClose = () => setShowOffCanvas(false);

  const handleLogout = () => {
    handleOffCanvasClose();
    logOut();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3">
      <Container fluid>
        <Navbar.Brand className="navbar-brand" href="/">
          <strong>Recipe Repository</strong>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          onClick={toggleOffCanvas}
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={showOffCanvas}
          onHide={handleOffCanvasClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {!token && (
                <>
                  <Nav.Link to="/home">
                    <FontAwesomeIcon icon={faHome} className="me-1" />
                    Home
                  </Nav.Link>

                  <Nav.Link to="/about">About</Nav.Link>

                  <Nav.Link to="/contact">Contact</Nav.Link>
                </>
              )}

              {token && (
                <>
                  <Nav.Link to="/liked">
                    <FontAwesomeIcon icon={faHeart} className="me-1" />
                    Liked
                  </Nav.Link>
                               


                  <Nav.Link >
                    {/* onClick={() => setShowEditPostModal(true)} */}
                    <FontAwesomeIcon icon={faList} className="me-1" />                    
                    Edit Posts
                  </Nav.Link>

                  <Nav.Link onClick={() => setShowCreatePostModal(true)}>
                    <FontAwesomeIcon icon={faPlusSquare} className="me-1" />
                    Add Post
                  </Nav.Link>

                  <Nav.Link to="/profile">
                    <FontAwesomeIcon icon={faUserCircle} className="me-1" />
                    Profile
                  </Nav.Link>
                </>
              )}
            </Nav>

            {token ? (
              <Nav.Link className="accounts-link" to="/" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Sign out
              </Nav.Link>
            ) : (
              <Nav.Link
                onClick={() => setShowAuthModal(true)}
                className="accounts-link"
              >
                <FontAwesomeIcon icon={faUserCircle} className="me-1" />{" "}
                Accounts
              </Nav.Link>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>

      <Suspense fallback={<div>Loading...</div>}>
        {showAuthModal && (
          <AuthenticationModal
            show={showAuthModal}
            handleClose={() => setShowAuthModal(false)}
          />
        )}
        {showCreatePostModal && (
         <CreatePostModal show={showCreatePostModal} handleClose={() => setShowCreatePostModal(false)} />
        )}
      </Suspense>
    </Navbar>
  );
}

export default Navigation;
