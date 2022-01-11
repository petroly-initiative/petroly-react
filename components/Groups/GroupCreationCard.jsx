import React, { useRef, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Col, Row, Form, Button, InputGroup, Spinner } from "react-bootstrap";
import { BsCardImage } from "react-icons/bs";
import { FaTelegramPlane, FaGraduationCap, FaDiscord } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdGames } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaIdCard, FaListUl } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { BiCube } from "react-icons/bi";
import { AiFillFileAdd } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import styles from "../../styles/groups-page/group-creation.module.scss";
import { createCommunnityMutation } from "../../api/mutations";
import { useMutation, useQuery } from "@apollo/client";
import CreatedGroup from "./CreatedCard";

function GroupCreationCard() {
  const [modalShow, setModalShow] = useState(false);
  const [submittedForm, setSubmitted] = useState(false);
  const [type, setType] = useState("");
  const [platform, setPlatform] = useState("");
  const course = useRef();
  const image = useRef();
  const description = useRef();
  const link = useRef();
  const name = useRef();
  const [invalidCourse, validateCourse] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const [createCommunnity, { data, loading, error }] = useMutation(
    createCommunnityMutation
  );

  const createGroup = (e) => {
    // TODO validate the form
    e.preventDefault();

    const groupName = name.current.value;
    const groupLink = link.current.value;
    const groupDesc = description.current.value;
    const groupSection = course.current.value;

    if (type == "SECTION")
      createCommunnity({
        variables: {
          name: groupName,
          link: groupLink,
          platform: platform,
          category: type,
          description: groupDesc,
          section: groupSection,
        },
      });
    else
      createCommunnity({
        variables: {
          name: groupName,
          link: groupLink,
          platform: platform,
          category: type,
          description: groupDesc,
          section: "", //  this empty string is a must
        },
      });
  };

  const selectPlatform = (e) => {
    setPlatform(e.target.value);
  };

  const selectType = (e) => {
    if (e.target.id !== "course-input") setType(e.target.value);
    else {
      if (course.current.value.length !== 0) {
        validateCourse(!/^[a-zA-Z]{2,4}[0-9]{3}$/g.test(e.target.value));
      }
    }
  };

  // handle load and error status.
  useEffect(() => {
    if (loading) {
      setWaiting(true);
    } else if (data) {
      setWaiting(false);
      setModalShow(false);
      setSubmitted(true);
      if (data.communityCreate.ok) {
        setWaiting(false);
      } else {
        // this error belongs to API itself, user does not care about it
        console.log(error);
        // TODO we need help from front dev to map these errors mesages
        // or ignore if there are enough validation, i.e., regex
        console.log(data.communityCreate.errors);
      }
    }
  }, [data, loading]);

  return (
    <div>
      <Modal
        contentClassName={styles.layout}
        onHide={() => setModalShow(false)}
        show={modalShow}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header>
          <Modal.Title
            className={styles.title}
            id="contained-modal-title-vcenter"
          >
            إنشاء مجتمع{" "}
            <AiOutlineUsergroupAdd color="#00ead3" className={styles.icons} />
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={createGroup} className={styles.formStyle} noValidate>
          <Modal.Body className={"show-grid " + styles["modal-body"]}>
            <InputGroup hasValidation as={Row} className={styles.group}>
              <Form.Label className={styles.label} column xs="12">
                <FaIdCard className={styles.icons} />
                <span> الاسم</span>
              </Form.Label>
              <Col>
                <Form.Control
                  ref={name}
                  required
                  className={styles.input}
                  type="text"
                  placeholder="ادخل اسم المجموعة"
                />
              </Col>
            </InputGroup>

            <InputGroup hasValidation as={Row} className={styles.group}>
              <Form.Label className={styles.label} column xs="12">
                <BsCardImage className={styles.icons} />
                <span>صورة العرض</span>
              </Form.Label>
              <Col>
                <Form.Control
                  ref={image}
                  className={styles.input}
                  type="file"
                  placeholder="اختر صورة العرض"
                />
              </Col>
            </InputGroup>

            <InputGroup hasValidation as={Row} className={styles.group}>
              <Form.Label className={styles.label} column xs="12">
                <FaListUl className={styles.icons} /> <span>نوع المجموعة</span>
              </Form.Label>
              <Col>
                <Form onChange={selectType} noValidate>
                  <Form.Check
                    className={styles.radio}
                    type={"radio"}
                    value="EDU"
                    label={
                      <div>
                        <div className={styles["label-header"]}>
                          <FaGraduationCap color="#FFB830" size="1.1rem" />
                          <span>تعليمي</span>
                        </div>
                        <div className={styles["label-content"]}>
                          لتجمعات طلاب المواد الدراسية والاهتمامات العلمية
                          المشتركة
                        </div>
                      </div>
                    }
                    id="1"
                    name="platform"
                  />
                  <Form.Check
                    className={styles.radio}
                    type={"radio"}
                    value="ENTERTAINING"
                    label={
                      <div>
                        <div className={styles["label-header"]}>
                          <MdGames color="#F037A5" size="1.1rem" />
                          <span>ترفيهي</span>
                        </div>
                        <div className={styles["label-content"]}>
                          للأنشطة الغير أكاديمية, كالرياضات البدنية
                          والإلكترونية, والهوايات المتعددة
                        </div>
                      </div>
                    }
                    id="1"
                    name="platform"
                  />
                  <Form.Check
                    className={styles.radio + " " + styles["course-container"]}
                    type={"radio"}
                    value="SECTION"
                    label={
                      <div>
                        <div className={styles["label-header"]}>
                          <RiBook2Fill color="#622edb" size="1.1rem" />
                          <span>شعبة</span>
                        </div>
                        <div className={styles["label-content"]}>
                          لطلاب الشعبة الدراسية الواحدة
                        </div>
                        <InputGroup
                          hasValidation
                          style={{
                            maxHeight: type === "SECTION" ? 60 : 0,
                            opacity: type === "SECTION" ? "1" : "0",
                            transition: "150ms ease",
                            marginTop: type === "SECTION" ? 12 : 0,
                          }}
                        >
                          <Form.Control
                            isInvalid={invalidCourse}
                            ref={course}
                            className={styles["course-input"]}
                            style={{ fontSize: 12 }}
                            id="course-input"
                            type="text"
                            // disabled={!types.Section.find}
                            placeholder={"المادة الدراسية"}
                          />
                          <Form.Text
                            style={{
                              fontSize: 12,
                              width: "100%",
                              marginBottom: 6,
                            }}
                            id="passwordHelpBlock"
                            muted
                          >
                            الرجاء استخدام صيغة ABCDXXX
                          </Form.Text>
                        </InputGroup>
                      </div>
                    }
                    id="1"
                    name="platform"
                  />
                </Form>
              </Col>
            </InputGroup>

            <InputGroup hasValidation as={Row} className={styles.group}>
              <Form.Label className={styles.label} column xs="12">
                <BiCube className={styles.icons} />
                <span> المنصة</span>
              </Form.Label>
              <Col>
                <Form onChange={selectPlatform} noValidate>
                  <Form.Check
                    className={styles.radio}
                    type={"radio"}
                    value="WHATSAPP"
                    label={
                      <div>
                        <IoLogoWhatsapp color="#25D366" size="1.1rem" />{" "}
                        <span>واتساب</span>
                      </div>
                    }
                    id="1"
                    name="type"
                  />
                  <Form.Check
                    className={styles.radio}
                    type={"radio"}
                    value="TELEGRAM"
                    label={
                      <div>
                        <FaTelegramPlane color="#0088cc" size="1.1rem" />{" "}
                        <span>تيليقرام</span>
                      </div>
                    }
                    id="2"
                    name="type"
                  />
                  <Form.Check
                    className={styles.radio}
                    type={"radio"}
                    value="DISCORD"
                    label={
                      <div>
                        <FaDiscord color="#5865F2" size="1.1rem" />{" "}
                        <span>ديسكورد</span>
                      </div>
                    }
                    id="3"
                    name="type"
                  />
                </Form>
              </Col>
            </InputGroup>

            <InputGroup hasValidation as={Row} className={styles.group}>
              <Form.Label className={styles.label} column sm="12">
                <MdDescription className={styles.icons} />
                <span> الوصف</span>
              </Form.Label>
              {/* <FloatingLabel label="Comments"> */}
              <Col>
                <Form.Control
                  ref={description}
                  required
                  className={`${styles.input} ${styles.description}`}
                  as="textarea"
                  placeholder="اكتب وصفًا للمجموعة"
                  style={{ height: "100px" }}
                  maxLength="500"
                />
                <Form.Text
                  style={{ fontSize: 12 }}
                  id="passwordHelpBlock"
                  muted
                >
                  الحد الأقصى للوصف هو 500 حرف
                </Form.Text>
              </Col>
            </InputGroup>

            <InputGroup hasValidation as={Row} className={styles.group}>
              <Form.Label className={styles.label} column sm="12">
                <FiLink className={styles.icons} />
                <span> الرابط</span>
              </Form.Label>
              <Col>
                <Form.Control
                  required
                  ref={link}
                  className={`${styles.input} ${styles.link}`}
                  type="text"
                  placeholder="ادخل رابط المجموعة"
                />
              </Col>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer className={styles.footer}>
            {waiting ? (
              <Button
                className={styles["loading-container"] + " shadow"}
                disabled
              >
                <Spinner
                  className={styles["loading-spinner"]}
                  as="div"
                  animation="grow"
                  size="xl"
                  role="status"
                  aria-hidden="true"
                />
              </Button>
            ) : (
              <Button
                className={styles.createButton}
                type="submit"
                // onClick={() => setModalShow(false)}
              >
                أنشئ المجموعة
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
      <>
        <Button
          className={styles.modalButton}
          variant="primary"
          onClick={() => setModalShow(true)}
        >
          <AiFillFileAdd size={32} />
        </Button>
      </>
      {submittedForm ? (
        <CreatedGroup success={data.communityCreate.ok} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default GroupCreationCard;
