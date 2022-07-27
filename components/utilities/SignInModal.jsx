import {
  InputGroup,
  Button,
  Form,
  FormControl,
  Alert,
  Spinner,
} from "react-bootstrap";
import styles from "../../styles/Auth.module.scss";
import { UserContext } from "../../state-management/user-state/UserContext";
import { MdVisibility, MdVisibilityOff, MdWarning } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import translator from "../../dictionary/components/login-modal-dict";
import { Fade } from "react-awesome-reveal";
import { useMutation, useLazyQuery, useApolloClient } from "@apollo/client";
import {
  tokenAuthMutation,
  registerMutation,
  sendPasswordResetEmailMutation,
} from "../../api/mutations";
import { meQuery } from "../../api/queries";
import { T, L, M, langDirection, DEF_LANG } from "../../constants";
import { useRouter } from "next/router";

export default function SignInModal(props) {
  /**
   * TODO:
   * - Correct text alignment for English and Arabic
   *
   */
  const router = useRouter();
  const { user, userDispatch } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [tab, setTab] = useState("signIn");
  const [mode, setMode] = useState("user-input"); // user-input: FIXME: revert to original
  const client = useApolloClient();
  // client.setLink()
  // language state
  const [langState, setLang] = useState(() => translator(user.lang));
  useEffect(() => {
    setLang(() => translator(user.lang));
  }, [user.lang]);

  /**
   * ? Sign in modal modes
   * - user-input: basic sign in and create account tabs
   * - ps-reset: password reset with email input
   * - ps-cuccess: an input for the new restted password
   * - acc-confirm: a screen to advise users
   */
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
  const [fetchMe, { data: dataMe, calledMe }] = useLazyQuery(meQuery, {
    skip: true,
  });
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
  const [
    sendPasswordResetEmail,
    {
      data: dataSendPasswordResetEmail,
      loading: loadingSendPasswordResetEmail,
    },
  ] = useMutation(sendPasswordResetEmailMutation, {
    variables: { email },
  });

  const [isConfirmPassInvalid, setConfirmVal] = useState(false);

  const switchTab = (e) => {
    setTab(e.target.id);
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
    // ? blocking the window closing when in these modes
    switch (mode) {
      case "user-input":
        setShow(false);
        props.close();
        break;
      case "ps-reset":
        setShow(false);
        props.close();
        setMode("user-input");
        break;
      case "acc-confirm":
        // setShow(false);
        // props.close();
        // setMode("user-input");
        break;
      default:
    }
  };
  const handleShowPwd = () => setShowPwd(!showPwd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send login request
    switch (mode) {
      case "user-input":
        switch (tab) {
          case "signIn":
            if (username === "" || password === "") {
              setValidation(true);
              setError({
                show: true,
                msg: `${langState.emptyErr}`,
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
              // BUG: translation needed
              setValidation(true);
              setError({
                show: true,
                msg: "الرجاء تعبئة الخانات المطلوبة لتسجيل الدخول",
              });
            } else if (password !== confirmPass) {
              setError({
                show: true,
                msg: `${langState.wrongPassword}`,
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
          // BUG: translation needed
          setValidation(true);
          setError({
            show: true,
            msg: "الرجاء تعبئة الخانة المطلوبة لاستعادة كلمة المرور",
          });
        }
        // else {create a crazy query that gets the job done }
        setValidation(false);
        setError({ show: false, msg: "" });
        await sendPasswordResetEmail();
        break;
    }
  };

  useEffect(() => {
    if (tab === "signIn" && dataTokenAuth) {
      console.log(dataTokenAuth);
      //  Successful login
      if (dataTokenAuth.tokenAuth.success) {
        sessionStorage.setItem(
          "token",
          dataTokenAuth.tokenAuth.obtainPayload.token
        );
        sessionStorage.setItem(
          "exp",
          dataTokenAuth.tokenAuth.obtainPayload.payload.exp
        );
        localStorage.setItem(
          "refreshToken",
          dataTokenAuth.tokenAuth.obtainPayload.refreshToken
        );
        localStorage.setItem(
          "refreshExpiresIn",
          dataTokenAuth.tokenAuth.obtainPayload.refreshExpiresIn
        );

        userDispatch({
          type: T.LOGIN,
          token: dataTokenAuth.tokenAuth.obtainPayload.token,
          username: dataTokenAuth.tokenAuth.obtainPayload.payload.username,
        });
        props.close();
      }
      //  Unsuccessful login
      else {
        setValidation(false);
        // new API does not log in non-verified users
        // it'll return a `nonFieldErrors`
        if (
          dataTokenAuth.tokenAuth.errors.nonFieldErrors[0].code ===
          "not_verified"
        ) {
          setMode("acc-confirm");
        }
        setError({
          show: true,
          msg: dataTokenAuth.tokenAuth.errors.nonFieldErrors[0].message,
        });
      }
    }
    if (tab === "signUp" && dataRegister) {
      //  Successful register
      if (dataRegister.register.success) {
        setMode("acc-confirm");
        setTimeout(() => router.reload(), 1000);
      } else {
        const errors = dataRegister.register.errors;
        var messages = "";

        // Combine all messages
        if (errors.username)
          errors.username.map((el) => (messages += el.message + " \n"));
        if (errors.email)
          errors.email.map((el) => (messages += el.message + " \n"));
        if (errors.password2)
          errors.password2.map((el) => (messages += el.message + " \n"));
        if (errors.nonFieldErrors)
          errors.nonFieldErrors.map((el) => (messages += el.message + " \n"));

        setError({ show: true, msg: messages });
      }
    }

    if (mode === "ps-reset" && dataSendPasswordResetEmail) {
      if (dataSendPasswordResetEmail.sendPasswordResetEmail.success) {
        setMode("ps-sccuess");
        setTimeout(() => router.reload(), 1000);
      } else
       console.log (
          "Email wasn't sent",
          dataSendPasswordResetEmail.sendPasswordResetEmail.errors
        );
    }
  }, [
    loadingTokenAuth,
    loadingRegister,
    loadingSendPasswordResetEmail,
    calledMe,
  ]);

  return (
    <>
      {show ? (
        <>
          <div className={styles["modal-overlay"]} onClick={hideModal} />
          <div
            className={
              styles["modal-wrapper"] +
              ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
            }
          >
            <div className={styles["modal-bg"]} />
            <div className={styles["modal-header"]}>
              <Image
                layout="fill"
                src={"/images/signIn/sign-in-header.png"}
                alt="abstract green and blue pattern"
              />
            </div>

            {mode === "user-input" && (
              <div className={styles["modal-footer"]}>
                <Form
                  validated={validated}
                  className={styles["main-form"]}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className={styles["text-header"]}>
                    <div className={styles["nav-container"]}>
                      <Button
                        className={
                          tab === "signIn"
                            ? styles["active-tab"] +
                              ` ${
                                user.theme === M.DARK ? styles["dark-mode"] : ""
                              }`
                            : styles["tab-btns"] +
                              ` ${
                                user.theme === M.DARK ? styles["dark-mode"] : ""
                              }`
                        }
                        onClick={switchTab}
                        id="signIn"
                      >
                        {langState.switch1}
                      </Button>
                      <Button
                        className={
                          tab === "signUp"
                            ? styles["active-tab"] +
                              ` ${
                                user.theme === M.DARK ? styles["dark-mode"] : ""
                              }`
                            : styles["tab-btns"] +
                              ` ${
                                user.theme === M.DARK ? styles["dark-mode"] : ""
                              }`
                        }
                        onClick={switchTab}
                        id="signUp"
                      >
                        {langState.switch2}
                      </Button>
                    </div>
                  </div>
                  {validationError.show && (
                    <Fade duration="1000">
                      <Alert
                        dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                        className={styles["rules"]}
                        variant="danger"
                      >
                        <MdWarning
                          className={styles["rules-icon"]}
                          size="1.4rem"
                        />
                        <div>{validationError.msg}</div>
                      </Alert>
                    </Fade>
                  )}
                  <Fade duration="1000">
                    <Form.Group>
                      <Form.Label
                        className={
                          user.lang === L.AR_SA
                            ? styles["labels-ar"]
                            : styles["labels-en"]
                        }
                      >
                        {langState.textField1}
                      </Form.Label>
                      <InputGroup
                        className={styles["input-groups"]}
                        hasValidation
                      >
                        <FormControl
                          id="username-input"
                          className={`${
                            user.theme === M.DARK
                              ? styles["dark-mode-input"]
                              : ""
                          }`}
                          dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                          onChange={handleUsername}
                          value={username}
                          placeholder={langState.textField1}
                          type="text"
                          required
                        />
                      </InputGroup>
                    </Form.Group>
                  </Fade>
                  {tab === "signUp" && (
                    <Fade duration="1000">
                      <Form.Group>
                        <Form.Label
                          className={
                            user.lang === L.AR_SA
                              ? styles["labels-ar"]
                              : styles["labels-en"]
                          }
                        >
                          {langState.textField2}
                        </Form.Label>
                        <InputGroup
                          className={styles["input-groups"]}
                          hasValidation
                        >
                          <FormControl
                            className={`${
                              user.theme === M.DARK
                                ? styles["dark-mode-input"]
                                : ""
                            }`}
                            dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                            onChange={handleEmail}
                            value={email}
                            placeholder={langState.textField2}
                            type="email"
                            required
                            isInvalid={isEmailInvalid}
                          />
                          <FormControl.Feedback
                            style={{ textAlign: "right" }}
                            type="invalid"
                          >
                            {langState.emailErr}
                          </FormControl.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Fade>
                  )}
                  <Fade duration="1000">
                    <Form.Group>
                      <Form.Label
                        className={
                          user.lang === L.AR_SA
                            ? styles["labels-ar"]
                            : styles["labels-en"]
                        }
                      >
                        {langState.passField1}
                      </Form.Label>
                      <InputGroup
                        className={styles["input-groups"]}
                        hasValidation
                      >
                        <FormControl
                          id="pass-input"
                          className={`${
                            user.theme === M.DARK
                              ? styles["dark-mode-input"]
                              : ""
                          }`}
                          dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                          onChange={handlePassword}
                          value={password}
                          placeholder={langState.passField1}
                          type={showPwd ? "text" : "password"}
                          required
                        />

                        <Button
                          className={styles["pwd-toggle"]}
                          onClick={handleShowPwd}
                        >
                          {showPwd ? <MdVisibility /> : <MdVisibilityOff />}
                        </Button>
                      </InputGroup>
                    </Form.Group>
                  </Fade>
                  {tab === "signUp" && (
                    <Fade duration="1000">
                      <Form.Group>
                        <Form.Label
                          className={
                            user.lang === L.AR_SA
                              ? styles["labels-ar"]
                              : styles["labels-en"]
                          }
                        >
                          {langState.passField2}
                        </Form.Label>
                        <InputGroup className={styles["input-groups"]}>
                          <FormControl
                            className={`${
                              user.theme === M.DARK
                                ? styles["dark-mode-input"]
                                : ""
                            }`}
                            dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                            onChange={handleConfirmPass}
                            value={confirmPass}
                            placeholder={`${langState.passField2}`}
                            type={showPwd ? "text" : "password"}
                            required
                            isInvalid={isConfirmPassInvalid}
                          />

                          <Button
                            className={styles["pwd-toggle"]}
                            onClick={handleShowPwd}
                          >
                            {showPwd ? <MdVisibility /> : <MdVisibilityOff />}
                          </Button>

                          <FormControl.Feedback
                            style={{ textAlign: "right" }}
                            type="invalid"
                          >
                            langState.doublePass
                          </FormControl.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Fade>
                  )}

                  <div className={styles["submitContainer"]}>
                    {loadingTokenAuth || loadingRegister ? (
                      <Spinner animation="border" role="status" />
                    ) : (
                      <Button
                        id="submit-btn"
                        type="submit"
                        className={styles["login-btn"]}
                        disabled={loadingTokenAuth}
                      >
                        {tab === "signIn"
                          ? `${langState.switch1}`
                          : `${langState.switch2}`}
                      </Button>
                    )}

                    <div
                      className={styles.redirecter}
                      style={{
                        fontSize: 12,
                        direction: `${user.lang === L.EN_US ? "ltr" : "rtl"}`,
                        margin: 8,
                      }}
                    >
                      {langState.forgetPassword}
                      <button
                        type="button"
                        onClick={resetPassMode}
                        className={styles.redirectBtn}
                        style={{ marginLeft: 5 }}
                      >
                        {langState.replacePass}
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            )}
            {mode === "ps-reset" && (
              <div className={styles["modal-footer"]}>
                <Form
                  validated={validated}
                  className={styles["main-form"]}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <Fade duration="1000">
                    <div className={styles["text-header"]}>
                      {langState.replacePassHeader}
                    </div>
                  </Fade>
                  <div
                    dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                    className={
                      styles["reset-instructions"] +
                      ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`
                    }
                    style={langDirection(user.lang)}
                  >
                    {langState.replacePassHelper}
                  </div>
                  {validationError.show && (
                    <Fade duration="1000">
                      <Alert
                        dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                        className={styles["rules"]}
                        variant="danger"
                      >
                        <MdWarning
                          className={styles["rules-icon"]}
                          size="1.4rem"
                        />
                        <div>{validationError.msg}</div>
                      </Alert>
                    </Fade>
                  )}
                  <InputGroup className={styles["input-groups"]} hasValidation>
                    <FormControl
                      className={`${
                        user.theme === M.DARK ? styles["dark-mode-input"] : ""
                      }`}
                      dir={`${user.lang === L.AR_SA ? "rtl" : "ltr"}`}
                      onChange={handleEmail}
                      value={email}
                      placeholder={langState.textField2}
                      type="email"
                      required
                      isInvalid={isEmailInvalid}
                    />
                    <FormControl.Feedback
                      style={langDirection(user.lang)}
                      type="invalid"
                    >
                      {langState.emailErr}{" "}
                    </FormControl.Feedback>
                  </InputGroup>
                  <div
                    className={styles["submitContainer"]}
                    style={{ marginTop: 16 }}
                  >
                    {loadingSendPasswordResetEmail ? (
                      <Spinner animation="border" role="status" />
                    ) : (
                      <Button
                        id="submit-btn"
                        type="submit"
                        className={styles["login-btn"]}
                        disabled={loadingTokenAuth}
                      >
                        {langState.sendPass}
                      </Button>
                    )}
                    <div
                      dir={`${user.lang === L.EN_US ? "ltr" : "rtl"}`}
                      className={styles.redirecter}
                      style={Object.assign(
                        { padding: 16, fontSize: 12 },
                        langDirection(user.lang)
                      )}
                    >
                      {langState.alreadyAcc}
                      <button
                        style={langDirection(user.lang)}
                        type="button"
                        onClick={userInputMode}
                        className={styles.redirectBtn}
                      >
                        {langState.alreadySignIn}
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            )}
            {mode === "ps-sccuess" && (
              <div className={styles["modal-footer"]}>
                <p>{langState.checkMail}</p>
              </div>
            )}
            {mode === "acc-confirm" && (
              <div className={styles["main-form"]}>
                {" "}
                <div className={styles["text-header"]}>
                  {langState.confirmer}
                </div>
                <div
                  className={
                    styles["reset-instructions"] +
                    ` ${user.theme === M.DARK ? styles["dark-txt"] : ""}`
                  }
                >
                  {langState.checker}
                </div>
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
