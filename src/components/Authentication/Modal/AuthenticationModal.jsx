import React, { useState, Suspense, lazy, useContext,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../AuthContext";

const LoginForm = lazy(() => import("../LoginForm/LoginForm"));
const RegistrationForm = lazy(() =>
  import("../RegistrationForm/RegistrationForm")
);

function AuthenticationModal({ show, handleClose }) {
  const { token } = useContext(AuthContext);
  const [activeForm, setActiveForm] = useState("login");


  const toggleForm = () => {
    setActiveForm((prevForm) => (prevForm === "login" ? "register" : "login"));
  };

  useEffect(() => {
    console.log("Token in modal useEffect:", token);
    if (token) {
      handleClose();
    }
  }, [token, handleClose]);


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
          {activeForm === "login" ? "Login" : "Sign Up"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Suspense fallback={<div>Loading...</div>}>
          {activeForm === "login" && <LoginForm />}
          {activeForm === "register" && <RegistrationForm />}
        </Suspense>

        {!token ? (
          <div className="mt-3 text-center">
            <button className="btn" onClick={toggleForm}>
              {activeForm === "login"
                ? "Don't have an account?"
                : "Have an account?"}
            </button>
          </div>
        ) : null}
      </Modal.Body>
    </Modal>
  );
}

export default AuthenticationModal;
