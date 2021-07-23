import { InputGroup, Button, Form, FormControl } from "react-bootstrap";
import authStyle from "../styles/Auth.module.scss";
import { FaSignInAlt } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SignInModal(props) {
  /**
   * TODO: Another Tab for create account interface (bootstrap tabs are recommended)
   */

  
  const [show, setShow] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    setShow(props.visible);
  }, [props.visible]);

  

  const showModal = () => setShow(true);
  const hideModal = () => {
    setShow(false)
    props.close()
  };
  const handleShowPwd = () => setShowPwd(!showPwd);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted sign in form");
  };

  return (
    <>

      {show ? (
        <>
          <div className={authStyle["modal-overlay"]} onClick={hideModal} />
          <div className={authStyle["modal-wrapper"]}>
            <div className={authStyle["modal-bg"]} />
            <div className={authStyle["modal-header"]}>
              <Image
                layout="fixed"
                width={100}
                height={360}
                src="/images/21022889.jpg"
                alt=""
              />
            </div>

            <div className={authStyle["modal-footer"]}>
              <Form onSubmit={handleSubmit}>
                <div className={authStyle["text-header"]}>تسجيل الدخول</div>
                <Form.Group>
                  <Form.Label className={authStyle["labels"]}>
                    اسم المستخدم
                  </Form.Label>
                  <InputGroup>
                    <FormControl placeholder="KFUPM Email" type="text" />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label className={authStyle["labels"]}>
                    كلمة المرور
                  </Form.Label>
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
                <div
                  className={authStyle.redirecter}
                  style={{ padding: 16, fontSize: 12 }}
                >
                  <button className={authStyle.redirectBtn}>
                    أنشئ حساب جديد
                  </button>{" "}
                  ليس لديك حساب بترولي؟
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
