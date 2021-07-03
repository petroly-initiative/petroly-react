import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./RegStyle.module.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Registration() {
  const [haveAccount, setAccountSatus] = useState(true);

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          className={
            haveAccount
              ? `${styles.registrationBtn} ${styles.registrationBtnActive}`
              : `${styles.registrationBtn}`
          }
          onClick={() => setAccountSatus(true)}
        >
          تسجيل الدخول
        </Button>
        <Button
          className={
            haveAccount
              ? `${styles.registrationBtn}`
              : `${styles.registrationBtn} ${styles.registrationBtnActive}`
          }
          onClick={() => setAccountSatus(false)}
        >
          إنشاء حساب
        </Button>
      </div>
      {haveAccount ? <SignIn /> : <SignUp />}
    </div>
  );
}

export default Registration;
