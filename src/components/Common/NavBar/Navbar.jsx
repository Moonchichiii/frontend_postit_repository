import React, { Suspense, useState, useContext } from "react";

import { Button, Container, Navbar, Nav, Offcanvas } from "react-bootstrap";

import { useAuth } from "../../Authentication/AuthContext";
import AuthenticationModal from "../../Authentication/Modal/AuthenticationModal";

import CreatePostModal from "../Posts/CreatePostModal/CreatePostModal";

import ProfileManagerModal from "../Profile/ProfileManagerModal";

import FollowersModal from "../followers/FollowersModal";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons/faPlusSquare";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons/faUserCircle";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { PostsContext } from "../Posts/PostContext/PostContext";

function Navigation() {
  const { token, logOut } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);

  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const [showProfileManagerModal, setShowProfileManagerModal] = useState(false);

  const [showFollowersModal, setShowFollowersModal] = useState(false);

  const handleShowFollowers = () => setShowFollowersModal(true);
  const handleCloseFollowers = () => setShowFollowersModal(false);

  // No show OffCanvas

  const [showOffCanvas, setShowOffCanvas] = useState(false);

  // Toggle OffCanvas
  const toggleOffCanvas = () => setShowOffCanvas(!showOffCanvas);
  const handleOffCanvasClose = () => setShowOffCanvas(false);

  const handleLogout = () => {
    handleOffCanvasClose();
    logOut();
  };

  // updating the feed
  const { resetPage } = useContext(PostsContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3 sticky-top">
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
                </>
              )}

              {token && (
                <>
                 <Nav.Link onClick={handleShowFollowers}>
            <FontAwesomeIcon icon={faPlus} className="me-1" />
            Follow
          </Nav.Link>

                  

                  <Nav.Link onClick={() => resetPage()}>
                    <FontAwesomeIcon icon={faList} className="me-1" />
                    Feed
                  </Nav.Link>
                  <Nav.Link to="/liked">
                    <FontAwesomeIcon icon={faHeart} className="me-1" />
                    Liked Posts
                  </Nav.Link>

                  <Nav.Link onClick={() => setShowCreatePostModal(true)}>
                    <FontAwesomeIcon icon={faPlusSquare} className="me-1" />
                    Add Post
                  </Nav.Link>

                  <Nav.Link onClick={() => setShowProfileManagerModal(true)}>
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
          <CreatePostModal
            show={showCreatePostModal}
            handleClose={() => setShowCreatePostModal(false)}
          />
        )}
                 {showProfileManagerModal && (
          <ProfileManagerModal
            show={showProfileManagerModal}
            handleClose={() => setShowProfileManagerModal(false)}
          />
          
         
        )}
        <FollowersModal show={showFollowersModal} handleClose={handleCloseFollowers} />
      </Suspense>
    </Navbar>
  );
}

export default Navigation;
