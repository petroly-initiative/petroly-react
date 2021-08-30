import {
  InputGroup,
  Button,
  Form,
  FormControl,
  Alert,
  Spinner,
} from "react-bootstrap";
import authStyle from "../styles/Auth.module.scss";
import { UserContext } from "../state-management/user-state/UserContext";
import { MdVisibility, MdVisibilityOff, MdWarning } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";

import { Fade } from "react-awesome-reveal";
import { useMutation } from "@apollo/client";
import { tokenAuthMutation, registerMutation } from "../api/mutations";
import { T } from "../constants";

export default function SignInModal(props) {
  /**
   * TODO:
   * - Validation, and validation Error indicators
   *
   */

  const userContext = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [tab, setTab] = useState("signIn");
  const [mode, setMode] = useState("user-input");
  // other modes will be: ps-reset and acc-confirm
  const [validationError, setError] = useState({
    show: false,
    msg: "",
  });
  const [validated, setValidation] = useState(false);
  // Handling input change;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // handling creat account tab
  const [confirmPass, setConfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailInvalid, setEmailVal] = useState(false);
  const [
    tokenAuth,
    { data: dataTokenAuth, loading: loadingTokenAuth, errorTokenAuth },
  ] = useMutation(tokenAuthMutation, {
    variables: {
      username,
      password,
    },
  });
  const [
    register,
    { data: dataRegister, loading: loadingRegister, error: errorRegister },
  ] = useMutation(registerMutation, {
    variables: {
      username,
      email,
      password1: password,
      password2: password,
    },
  });

  const [isConfirmPassInvalid, setConfirmVal] = useState(false);

  const switchTab = () => {
    if (tab === "signIn") setTab("signUp");
    else setTab("signIn");
    setValidation(false);
    setError({
      show: false,
      msg: "",
    });
    setEmailVal(false);
  };

  const resetPassMode = () => {
    setError({
      show: false,
      msg: "",
    });
    setValidation(false);
    setMode("ps-reset");
  };

  const userInputMode = () => {
    setEmail("");
    setError({
      show: false,
      msg: "",
    });
    setValidation(false);
    setMode("user-input");
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setValidation(false);
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailVal(false);
    } else
      setEmailVal(
        !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
          email
        )
      );
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPass = (e) => {
    setValidation(false);
    if (e.target.value !== "") setConfirmVal(e.target.value !== password);
    setConfirmPass(e.target.value);
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

  const hideModal = () => {
    setShow(false);
    props.close();
  };
  const handleShowPwd = () => setShowPwd(!showPwd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted sign in form");
    // Send logn request
    switch (mode) {
      case "user-input":
        switch (tab) {
          case "signIn":
            if (username === "" || password === "") {
              setValidation(true);
              setError({
                show: true,
                msg: "الرجاء تعبئة الخانات المطلوبة لتسجيل الدخول",
              });
            } else {
              setError({
                show: false,
                msg: "default",
              });
              await tokenAuth();
            }
            break;
          case "signUp":
            if (
              username === "" ||
              password === "" ||
              email === "" ||
              confirmPass === ""
            ) {
              setValidation(true);
              setError({
                show: true,
                msg: "الرجاء تعبئة الخانات المطلوبة لتسجيل الدخول",
              });
            } else if (password !== confirmPass) {
              setError({
                show: true,
                msg: "الرجاء التأكد من تطابق كلمة المرور وتأكيد كلمة المرور",
              });
            }
            // ? important to prevent unnecessary queries for wrong emails
            if (
              !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
                email
              )
            ) {
              setEmailVal(true);
            }
            await register();
            break;
        }
        break;
      case "ps-reset":
        if (email === "");
        {
          setValidation(true);
          setError({
            show: true,
            msg: "الرجاء تعبئة الخانة المطلوبة لاستعادة كلمة المرور",
          });
        }
        // else {create a crazy query that gets the job done }
        setValidation(false);
        setError({show: false, msg: ""})
        setMode("ps-change");
        setPassword("");
        break;
      case "ps-change":
        if (password === "") {
          setError({
            show: true,
            msg: "الرجاء إدخال كلمة المرور المرسلة بالشكل الصحيح",
          });
        }
      // else {validate the user input}
    }
  };

  useEffect(() => {
    console.log(validationError);
  }, [validationError]);
  useEffect(() => {});

  useEffect(() => {
    if (tab === "signIn" && dataTokenAuth) {
      //  Successful login
      if (dataTokenAuth.tokenAuth.success) {
        sessionStorage.setItem("token", dataTokenAuth.tokenAuth.token);
        localStorage.setItem(
          "refreshToken",
          dataTokenAuth.tokenAuth.refreshToken
        );

        userContext.userDispatch({
          type: T.LOGIN,
          token: dataTokenAuth.tokenAuth.token,
          username: dataTokenAuth.tokenAuth.user.username,
        });
        props.close();
      }
      //  Unsuccessful login
      else {
        setValidation(true);
        setError({
          show: true,
          msg: dataTokenAuth.tokenAuth.errors.nonFieldErrors[0].message,
        });
        console.log("login", dataTokenAuth.tokenAuth.errors);
      }
    }
    if (tab === "signUp" && dataRegister) {
      //  Successful register
      if (dataRegister.register.success) {
        console.log("registred");
      } else {
        setError({ show: true, msg: dataRegister.register.errors });
        console.log("register", dataRegister.register.errors);
      }
    }
  }, [dataTokenAuth, loadingTokenAuth, loadingRegister]);

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
                width={300}
                height={660}
                src={"/images/signIn/sign-in-header.svg"}
                alt="abstract green and blue pattern"
              />
            </div>

            {mode === "user-input" && (
              <div className={authStyle["modal-footer"]}>
                <Form
                  validated={validated}
                  className={authStyle["main-form"]}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className={authStyle["text-header"]}>
                    {" "}
                    {tab === "signIn" ? " تسجيل الدخول" : "إنشاء حساب بترولي"}
                  </div>
                  {validationError.show && (
                    <Fade duration="1000">
                      <Alert className={authStyle["rules"]} variant="danger">
                        <MdWarning
                          className={authStyle["rules-icon"]}
                          size="1.4rem"
                        />
                        <div>{validationError.msg}</div>
                      </Alert>
                    </Fade>
                  )}
                  <Fade duration="1000">
                    <Form.Group>
                      <Form.Label className={authStyle["labels"]}>
                        اسم المستخدم
                      </Form.Label>
                      <InputGroup hasValidation>
                        <FormControl
                          onChange={handleUsername}
                          value={username}
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
                        <InputGroup hasValidation>
                          <FormControl
                            onChange={handleEmail}
                            value={email}
                            placeholder="Email Address"
                            type="email"
                            required
                            isInvalid={isEmailInvalid}
                          />
                          <FormControl.Feedback
                            style={{ textAlign: "right" }}
                            type="invalid"
                          >
                            الرجاء استخدام بريد إلكتروني صالح
                          </FormControl.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Fade>
                  )}
                  <Fade duration="1000">
                    <Form.Group>
                      <Form.Label className={authStyle["labels"]}>
                        كلمة المرور
                      </Form.Label>
                      <InputGroup hasValidation>
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
                            onChange={handleConfirmPass}
                            value={confirmPass}
                            placeholder="Password Confirm"
                            type={showPwd ? "text" : "password"}
                            required
                            isInvalid={isConfirmPassInvalid}
                          />
                          <InputGroup.Append>
                            <Button
                              className={authStyle["pwd-toggle"]}
                              onClick={handleShowPwd}
                            >
                              {showPwd ? <MdVisibility /> : <MdVisibilityOff />}
                            </Button>
                          </InputGroup.Append>
                          <FormControl.Feedback
                            style={{ textAlign: "right" }}
                            type="invalid"
                          >
                            الرجاء التاكد من التطابق كلمة المرور
                          </FormControl.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Fade>
                  )}

                  <div className={authStyle["submitContainer"]}>
                    {loadingTokenAuth || loadingRegister ? (
                      <Spinner animation="border" role="status" />
                    ) : (
                      <Button
                        type="submit"
                        className={authStyle["login-btn"]}
                        disabled={loadingTokenAuth}
                      >
                        {tab === "signIn" ? "تسجيل الدخول" : "إنشاء حساب"}
                      </Button>
                    )}
                    <div
                      className={authStyle.redirecter}
                      style={{ padding: 16, fontSize: 12, paddingBottom: 8 }}
                    >
                      {/** OnClick to change the tab */}
                      <div>
                        {tab === "signIn"
                          ? "ليس لديك حساب بترولي؟"
                          : "لديك حساب بترولي؟"}
                      </div>
                      <button
                        type="button"
                        onClick={switchTab}
                        className={authStyle.redirectBtn}
                      >
                        {tab === "signIn"
                          ? "أنشئ حساب بترولي"
                          : "قم بتسجيل الدخول"}{" "}
                      </button>{" "}
                    </div>
                    <div
                      className={authStyle.redirecter}
                      style={{ fontSize: 12 }}
                    >
                      {"نسيت كلمة المرور؟ "}
                      <button
                        type="button"
                        onClick={resetPassMode}
                        className={authStyle.redirectBtn}
                      >
                        {"أعد تعيين كلمة المرور"}
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            )}
            {mode === "ps-reset" && (
              <div className={authStyle["modal-footer"]}>
                <Form
                  validated={validated}
                  className={authStyle["main-form"]}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className={authStyle["text-header"]}>
                    {"إعادة تعيين كلمة المرور"}
                  </div>
                  <div className={authStyle["reset-instructions"]}>
                    الرجاء كتابة بريدك الإلكتروني لإرسال كلمة المرور الجديدة
                  </div>
                  {validationError.show && (
                    <Fade duration="1000">
                      <Alert className={authStyle["rules"]} variant="danger">
                        <MdWarning
                          className={authStyle["rules-icon"]}
                          size="1.4rem"
                        />
                        <div>{validationError.msg}</div>
                      </Alert>
                    </Fade>
                  )}
                  <InputGroup hasValidation>
                    <FormControl
                      onChange={handleEmail}
                      value={email}
                      placeholder="Email Address"
                      type="email"
                      required
                      isInvalid={isEmailInvalid}
                    />
                    <FormControl.Feedback
                      style={{ textAlign: "right" }}
                      type="invalid"
                    >
                      الرجاء استخدام بريد إلكتروني صالح
                    </FormControl.Feedback>
                  </InputGroup>
                  <div
                    className={authStyle["submitContainer"]}
                    style={{ marginTop: 16 }}
                  >
                    <Button
                      type="submit"
                      className={authStyle["login-btn"]}
                      disabled={loadingTokenAuth}
                    >
                      أرسل كلمة المرور الجديدة
                    </Button>
                    <div
                      className={authStyle.redirecter}
                      style={{ padding: 16, fontSize: 12 }}
                    >
                      {" لديك حساب بترولي؟"}
                      <button
                        type="button"
                        onClick={userInputMode}
                        className={authStyle.redirectBtn}
                      >
                        {"سجل دخولك"}
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            )}
            {mode === "ps-change" && (
              <div className={authStyle["modal-footer"]}>
                <Form
                  validated={validated}
                  className={authStyle["main-form"]}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className={authStyle["text-header"]}>
                    {"إعادة تعيين كلمة المرور"}
                  </div>
                  <div className={authStyle["reset-instructions"]}>
                    الرجاء إدخال كلمة المرور المرسلة إلى بريدك الإلكتروني
                  </div>
                  {validationError.show && (
                    <Fade duration="1000">
                      <Alert className={authStyle["rules"]} variant="danger">
                        <MdWarning
                          className={authStyle["rules-icon"]}
                          size="1.4rem"
                        />
                        <div>{validationError.msg}</div>
                      </Alert>
                    </Fade>
                  )}
                  <InputGroup hasValidation>
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
                    <div
                      className={authStyle["submitContainer"]}
                      style={{ marginTop: 16 }}
                    >
                      <Button
                        type="submit"
                        className={authStyle["login-btn"]}
                        disabled={loadingTokenAuth}
                      >
                        تسجيل الدخول
                      </Button>
                    </div>
                  </InputGroup>
                </Form>
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
