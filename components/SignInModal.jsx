import { InputGroup, Button, Form, FormControl } from "react-bootstrap";
import authStyle from "../styles/Auth.module.scss";
import { userContext } from "../state-management/user-state/userContext";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

export default function SignInModal(props) {
  /**
   * TODO: Validation, and validation Error indicators
   */

  const userInfo = useContext(userContext);
  const [show, setShow] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [tab, setTab] = useState("signIn");
  // Handling input change;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const switchTab = () => {
    if (tab === "signIn") setTab("signUp");
    else setTab("signIn");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    setShow(props.visible);
  }, [props.visible]);

  useEffect(() => {
    var forms = [...document.getElementsByClassName("form-control")];
    forms.forEach((element) => {
      element.addEventListener("invalid", (e) => {
        e.preventDefault();
      });
    });
  }, [tab]);

  const showModal = () => setShow(true);
  const hideModal = () => {
    setShow(false);
    props.close();
  };
  const handleShowPwd = () => setShowPwd(!showPwd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted sign in form");

    /**
     * !WARNING: The following is just a practical demo
     * - The username should be fetched from the server, and should not be the password
     * - The profilePic attribute should also be fetched from the server
     */
    await userInfo.userDispatch({
      type: "sign-in",
      credentials: {
        logged: true,
        username: password,
        email: email,
      },
    });
  };

  useEffect(() => {
    console.log(userInfo.status);
    if (userInfo.status.logged === true) props.close();
  }, [userInfo.status]);

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
                width={200}
                height={560}
                src={"/images/signIn/sign-in-header.svg"}
                alt="abstract green and blue pattern"
              />
            </div>

            <div className={authStyle["modal-footer"]}>
              <Form className={authStyle["main-form"]} onSubmit={handleSubmit}>
                <div className={authStyle["text-header"]}>
                  {" "}
                  {tab === "signIn" ? " تسجيل الدخول" : "إنشاء حساب بترولي"}
                </div>
                <Fade duration="1000">
                  <Form.Group>
                    <Form.Label className={authStyle["labels"]}>
                      اسم المستخدم
                    </Form.Label>
                    <InputGroup>
                      <FormControl
                        onChange={handleEmail}
                        value={email}
                        placeholder="Username"
                        type="text"
                        required
                      />
                    </InputGroup>
                  </Form.Group>
                </Fade>
                {tab === "signUp" && (
                  <Fade duration="1000">
                    <Form.Group>
                      <Form.Label className={authStyle["labels"]}>
                        البريد الإلكتروني
                      </Form.Label>
                      <InputGroup>
                        <FormControl
                          onChange={handlePassword}
                          value={password}
                          placeholder="Email Address"
                          type="text"
                          required
                        />
                      </InputGroup>
                    </Form.Group>
                  </Fade>
                )}
                <Fade duration="1000">
                  <Form.Group>
                    <Form.Label className={authStyle["labels"]}>
                      كلمة المرور
                    </Form.Label>
                    <InputGroup>
                      <FormControl
                        onChange={handlePassword}
                        value={password}
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
                </Fade>
                {tab === "signUp" && (
                  <Fade duration="1000">
                    <Form.Group>
                      <Form.Label className={authStyle["labels"]}>
                        تأكيد كلمة المرور
                      </Form.Label>
                      <InputGroup>
                        <FormControl
                          onChange={handlePassword}
                          value={password}
                          placeholder="Password Confirm"
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
                  </Fade>
                )}

                <div className={authStyle["submitContainer"]}>
                  <Button type="submit" className={authStyle["login-btn"]}>
                    {tab === "signIn" ? "تسجيل الدخول" : "إنشاء حساب"}
                  </Button>
                  <div
                    className={authStyle.redirecter}
                    style={{ padding: 16, fontSize: 12 }}
                  >
                    {/** OnClick to change the tab */}
                    {tab === "signIn"
                      ? "ليس لديك حساب بترولي؟"
                      : "لديك حساب بترولي؟"}
                    <button type="button"
                      onClick={switchTab}
                      className={authStyle.redirectBtn}
                    >
                      {tab === "signIn"
                        ? "أنشئ حساب بترولي"
                        : "قم بتسجيل الدخول"}{" "}
                    </button>{" "}
                  </div>
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

