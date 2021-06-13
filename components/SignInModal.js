import { InputGroup, Button, Modal, Form, FormControl } from "react-bootstrap";
import authStyle from "../styles/Auth.module.scss";
import { FaSignInAlt } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

export default function SignInModal() {
  const [show, setShow] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  const handleShowPwd = () => setShowPwd(!showPwd);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted sign in form");
  };

  return (
    <>
      <Button className={authStyle["modal-btn"]} onClick={showModal}>
        <FaSignInAlt />
        <span>تسجيل</span>
      </Button>

      <Modal show={show} onHide={hideModal}>
        <Modal.Header style={{ justifyContent: "center" }}>
          <Modal.Title className={authStyle["modal-title"]}>
            <img src="/petroly-logo.svg" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>KFUPM Email</Form.Label>
              <InputGroup>
                <FormControl placeholder="KFUPM Email" type="text" />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <FormControl
                  placeholder="Password"
                  type={showPwd ? "text" : "password"}
                />
                <InputGroup.Append>
                  <Button
                    className={authStyle["pwd-toggle"]}
                    onClick={handleShowPwd}
                  >
                    {showPwd ? <MdVisibility /> : <MdVisibilityOff />}
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
            <div style={{ display: "flex", direction: "rtl" }}>
              <Button type="submit" className={authStyle["login-btn"]}>
                تسجيل الدخول
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
