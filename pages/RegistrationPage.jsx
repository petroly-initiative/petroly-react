import React, { useEffect } from "react";
import Image from "next/image";
import styles from "../components/Registraion/RegStyle.module.css";
import Registration from "../components/Registraion/Registration";

function RegistrationPage() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://kit.fontawesome.com/a076d05399.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className={styles.backgroundLogo}>
        <Image
          src="/images/backgroundLogo.png"
          alt="backgroundLogo"
          width={480}
          height={640}
        ></Image>
      </div>
      <div className={styles.logoContainer}>
        <Image
          src="/images/logo.png"
          alt="logo"
          layout="responsive"
          width={300}
          height={185}
        ></Image>
      </div>
      <Registration />
    </>
  );
}

export default RegistrationPage;
