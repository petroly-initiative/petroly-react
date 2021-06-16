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

      {show ? (
        <>
          <div className={authStyle["modal-overlay"]} onClick={hideModal} />
          <div className={authStyle["modal-wrapper"]}>
            <div className={authStyle["modal-bg"]} />
            <div className={authStyle["modal-header"]}>
              <img src="images/21022889.jpg" alt="" />
            </div>
            <div className={authStyle["modal-footer"]}>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>اسم المستخدم</Form.Label>
                  <InputGroup>
                    <FormControl placeholder="KFUPM Email" type="text" />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>كلمة المرور</Form.Label>
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
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
