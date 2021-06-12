import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AiFillHome } from "react-icons/ai";

export default function Home() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Petroly</title>
      </Head>
      <div id="test" className={styles.container}>
        This page is for testing purposes and will become the home screen later
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
        <Modal show={show} onHide={handleClose} size="xl" centered>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>’</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div style={{ margin: 8 }}>
          <Button
            className="shadow m-3"
            style={{
              width: 70,
              height: 70,
              padding: 16,
              margin: 0,
              background: "#3edbf0",
              border: "#3edbf0",
            }}
          >
            <AiFillHome size="2em" />
          </Button>
          <Button
            className="shadow m-3"
            style={{
              width: 70,
              height: 70,
              padding: 16,
              margin: 0,
              background: "#00ead3",
              border: "#00ead3",
            }}
          >
            <AiFillHome size="2em" />
          </Button>
        </div>
        <h2
          id="header"
          style={{
            fontWeight: 700,
          }}
        >
          أهلا بالجميع
        </h2>
        <h5
          style={{
            color: "#0091E7",
            fontWeight: 600,
          }}
        >
          كتابة بلون مغاير للتركيز
        </h5>
        <p
          style={{
            color: "#52575d",
            fontSize: 18,
            fontWeight: 400,
          }}
        >
          السلام عليكم ورحمة الله وبركاته اعزائي المشاهدين
        </p>
      </div>
    </>
  );
}
