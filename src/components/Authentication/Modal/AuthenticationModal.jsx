import React, { useState, Suspense, lazy, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../AuthContext"; // Adjust the path as necessary

const LoginForm = lazy(() => import("../LoginForm/LoginForm"));
const RegistrationForm = lazy(() =>
  import("../RegistrationForm/RegistrationForm")
);
console.log("RegistrationForm:", RegistrationForm);
const ProfileForm = lazy(() => import("../ProfileForm/ProfileForm"));

function AuthenticationModal({ show, handleClose }) {
  const [activeForm, setActiveForm] = useState("login");

  const { token } = useContext(AuthContext);

  const toggleForm = () =>
    setActiveForm((prevForm) => (prevForm === "login" ? "register" : "login"));
  console.log("toggleForm:", toggleForm);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {token
            ? "Profile Setup"
            : activeForm === "login"
            ? "Login"
            : "Sign Up"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Suspense fallback={<div>Loading...</div>}>
          {!token && activeForm === "login" && <LoginForm />}

          {!token && activeForm === "register" && <RegistrationForm />}

          {token && <ProfileForm />}
        </Suspense>

        {!token && (
          <div className="mt-3 text-center">
            {activeForm === "login" ? (
              <Button variant="link" onClick={toggleForm}>
                Don't have an account?
              </Button>
            ) : (
              <Button variant="link" onClick={toggleForm}>
                Have an account?
              </Button>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default AuthenticationModal;
