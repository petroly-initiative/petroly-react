import { Button, Form } from "react-bootstrap";
import React from "react";
import styles from "./RegStyle.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";

function SignUp() {
  return (
    <>
      <Form className={styles.formReg}>
        <h3
          className={`${styles.registrationLabel} ${styles.h3}`}
          style={{ textAlign: "center" }}
        >
          !انضم إلى مجتمع بترولي
        </h3>
        <Form.Label className={`${styles.registrationLabel} ${styles.arabic}`}>
          <h5 className={styles.h5}>
            <i className="fas fa-user-alt"></i> اسم المستخدم
          </h5>
        </Form.Label>
        <Form.Group>
          <Form.Control
            className={styles.arabic}
            type="text"
            placeholder="أدخل اسم المستخدم"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className={styles.registrationLabel}>
            <h5 className={styles.h5}>
              الإيميل <span style={{ fontWeight: "bold" }}>@</span>
            </h5>
          </Form.Label>
          <Form.Control
            className={styles.arabic}
            type="email"
            placeholder="أدخل الإيميل"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className={styles.registrationLabel}>
            <h5 className={styles.h5}>
              الرقم السري للحساب <i className="fas fa-unlock-alt"></i>
            </h5>
          </Form.Label>
          <Form.Control
            className={styles.arabic}
            type="password"
            placeholder="أدخل الرقم السري"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className={styles.registrationLabel}>
            <h5 className={styles.h5}>
              تأكيد الرقم السري <i className="fas fa-unlock-alt"></i>
            </h5>
          </Form.Label>
          <Form.Control
            className={styles.arabic}
            type="password"
            placeholder="أدخل الرقم السري مرة أخرى"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className={styles.registrationLabel}>
            <h5 className={styles.h5}>
              القسم <i className="fa fa-book"></i>
            </h5>
          </Form.Label>
          <Form.Control as="select" required className={styles.arabic}>
            <option value="AF">Accounting &amp; Finance</option>
            <option value="AE">Aerospace Engineering</option>
            <option value="ARE">Architectural Engineering</option>
            <option value="ARC">Architecture</option>
            <option value="CE">Civil &amp; Environmental Engg</option>
            <option value="CEM">Construction Engg &amp; Management</option>
            <option value="CHE">Chemical Engineering</option>
            <option value="CHEM">Chemistry</option>
            <option value="COE">Computer Engineering</option>
            <option value="CPG">CPG</option>
            <option value="CRP">City &amp; Regional Planning</option>
            <option value="ERTH">Earth Sciences</option>
            <option value="EE">Electrical Engineering</option>
            <option value="ELI">English Language Inst. (Prep)</option>
            <option value="ELD">English Language Department</option>
            <option value="FIN">Finance</option>
            <option value="ISOM">Info. Systems &amp; Operations Mgt</option>
            <option value="GS">Global &amp; Social Studies</option>
            <option value="IAS">Islamic &amp; Arabic Studies</option>
            <option value="ICS">Information &amp; Computer Science</option>
            <option value="LS">Life Sciences</option>
            <option value="MATH">Mathematics &amp; Statistics</option>
            <option value="MBA">Business Administration</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="MGT">Management &amp; Marketing</option>
            <option value="PE">Physical Education</option>
            <option value="PETE">Petroleum Engineering</option>
            <option value="PHYS">Physics</option>
            <option value="PSE">Prep Science &amp; Engineering</option>
            <option value="SE">Systems Engineering</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className={styles.registrationLabel}>
            <h5 className={styles.h5}>
              السنة الأكاديمية <i className="fa fa-calendar"></i>
            </h5>
          </Form.Label>
          <Form.Control as="select" required className={styles.arabic}>
            <option>أوريا</option>
            <option>فرشمن</option>
            <option>سفمور</option>
            <option>جونيور</option>
            <option>سينيور</option>
          </Form.Control>
        </Form.Group>

        <Button className={styles.submitBtn} type="submit" block>
          !إنشاء حساب
        </Button>
      </Form>
    </>
  );
}

export default SignUp;
