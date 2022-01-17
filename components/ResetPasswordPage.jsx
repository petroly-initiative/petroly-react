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
import { useRouter } from "next/router";
import Image from "next/image";

import { Fade } from "react-awesome-reveal";
import { useMutation } from "@apollo/client";
import { passwordResetMutation } from "../api/mutations";
import { T } from "../constants";

export default function ResetPasswordPage(props) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [isConfirmPassInvalid, setConfirmVal] = useState(false);
  const [validated, setValidation] = useState(false);

  const [passwordReset, { data, loading, error }] = useMutation(
    passwordResetMutation,
    {
      variables: {
        token: props.token,
        newPassword1: password,
        newPassword2: password,
      },
    }
  );

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPass = (e) => {
    setValidation(false);
    if (e.target.value !== "") setConfirmVal(e.target.value !== password);
    setConfirmPass(e.target.value);
  };

  const handleShowPwd = () => setShowPwd(!showPwd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await passwordReset();
  };

  useEffect(() => {
    if (data) {
      if (data.passwordReset.success) {
        setTimeout(() => location.assign("/"), 1200);
      } else {
        console.log("setting new password error");
        console.log(data.passwordReset.errors);
      }
    }
  }, [loading]);

  return (
    <>
      <div className={authStyle["modal-overlay"]} />
      <div className={authStyle["modal-wrapper"]}>
        <div className={authStyle["modal-bg"]} />
        <div className={authStyle["modal-header"]}>
          <Image
            layout="fill"
            src={"/images/signIn/sign-in-header.svg"}
            alt="abstract green and blue pattern"
          />
        </div>
        <div className={authStyle["modal-footer"]}>
          <Form
            validated={validated}
            className={authStyle["main-form"]}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={authStyle["text-header"]}>تغيير كلمة المرور</div>
            <Fade damping="0.5" duration="1000">
              <Form.Group>
                <Form.Label className={authStyle["labels"]}>
                  كلمة المرور الجديدة
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

            {loading ? (
              <Spinner animation="border" role="status" />
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{ marginTop: 16 }}
                  type="submit"
                  className={authStyle["login-btn"]}
                >
                  تأكيد تغيير كلمة المرور
                </Button>
              </div>
            )}
          </Form>
        </div>
      </div>
    </>
  );
}
