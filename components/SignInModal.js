import { InputGroup, Button, Form, FormControl } from "react-bootstrap";
import authStyle from "../styles/Auth.module.scss";
import { userContext } from "../state-management/user-state/userContext";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";

export default function SignInModal(props) {
  /**
   * TODO: Another Tab for create account interface (bootstrap tabs are recommended)
   */

  const userInfo = useContext(userContext);
  const [show, setShow] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  // Handling input change;
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    setShow(props.visible);
  }, [props.visible]);

  

  const showModal = () => setShow(true);
  const hideModal = () => {
    setShow(false)
    props.close()
  };
  const handleShowPwd = () => setShowPwd(!showPwd);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted sign in form");
    console.log(userInfo.status);
    /**
     * !WARNING: The following is just a practical demo
     * - The username should be fetched from the server
     * - The profilePic attribute should also be fetched from the server
     */
    await userInfo.userDispatch({
      type: "sign-in",
      credentials: {
        logged: true,
        username: password,
        email: email
      }
    })
    console.log(userInfo.status, password, email)
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
                    <FormControl onChange={handleEmail} value={email} placeholder="KFUPM Email" type="text" required/>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label className={authStyle["labels"]}>
                    كلمة المرور
                  </Form.Label>
                  <InputGroup>
                    <FormControl
                    onChange={handlePassword}
                    value = {password}
                      placeholder="Password"
                      type={showPwd ? "text" : "password"}
                      required
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
