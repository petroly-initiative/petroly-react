import {
  InputGroup,
  Button,
  Form,
  FormControl,
  Alert,
  Spinner,
  Fade,
} from "react-bootstrap";
import { MdVisibility, MdVisibilityOff, MdWarning } from "react-icons/md";
import authStyle from "../styles/Auth.module.scss";
import { useEffect } from "react";
import Image from "next/image";

import { useMutation } from "@apollo/client";
import { verifyAccountMutation } from "../api/mutations";
import { useState } from "react";

export default function ConfirmAccount(props) {
  const [msg, setMsg] = useState({ message: "", show: false, type: "" });

  const [verifyAccount, { data, loading, error }] = useMutation(
    verifyAccountMutation,
    {
      variables: {
        token: props.token,
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await verifyAccount();
  };

  useEffect(() => {
    if (data) {
      if (data.verifyAccount.success) {
        setMsg({
          message: "You account is confirmed, you'll redirect home shortly.",
          show: true,
          type: "success",
        });
        setTimeout(() => location.assign("/"), 1200);
      } else {
        setMsg({
          message: data.verifyAccount.errors.nonFieldErrors[0].message,
          show: true,
          type: "danger",
        });
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
            src={"/images/signIn/sign-in-header.png"}
            alt="abstract green and blue pattern"
          />
        </div>
        <div className={authStyle["modal-footer"]}>
          <Form className={authStyle["main-form"]} onSubmit={handleSubmit}>
            <div className={authStyle["text-header"]}>Account Confirmation</div>

            {msg.show && (
              <Fade duration="1000">
                <Alert className={authStyle["rules"]} variant={msg.type}>
                  <MdWarning
                    className={authStyle["rules-icon"]}
                    size="1.4rem"
                  />
                  <div>{msg.message}</div>
                </Alert>
              </Fade>
            )}

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
                  👍 Confirm my account
                </Button>
              </div>
            )}
          </Form>
        </div>
      </div>
    </>
  );
}
