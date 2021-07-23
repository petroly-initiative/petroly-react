import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Test.module.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiFillHome } from "react-icons/ai";
import Navbar from "../components/navbar";
import SignInModal from "../components/SignInModal";

export default function Test() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        ></meta>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Petroly</title>
      </Head>
      <Navbar />
      <div id="test" className={styles.container}>
        This page is for testing purposes and will become the home screen later
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
        
      </div>
      <SignInModal visible={show} close={handleClose}/>
    </>
  );
}
