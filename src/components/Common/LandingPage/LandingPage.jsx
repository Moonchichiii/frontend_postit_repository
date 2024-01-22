import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import AuthenticationModal from '../../Authentication/Modal/AuthenticationModal'; 

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuthModalClose = () => setShowAuthModal(false);
  const handleAuthModalShow = () => setShowAuthModal(true);

  return (
    <div className="landing-page">
      <h2>LandingPage</h2>
      <Button onClick={handleAuthModalShow}>Login/Register</Button>
      {showAuthModal && (
        <AuthenticationModal
          show={showAuthModal}
          handleClose={handleAuthModalClose}
        />
      )}
    </div>
  );
};

export default LandingPage;