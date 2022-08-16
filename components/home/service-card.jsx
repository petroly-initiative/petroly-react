import styles from "../../styles/home-page/service-card.module.scss";
import { Card } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../../state-management/user-state/UserContext";
import { L, langDirection, M } from "../../constants";
import { FiArrowUpRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
export default function ServiceCard(props) {
  const { user } = useContext(UserContext);
  const [direction, setDirection] = useState(() => langDirection(user.lang));
  useEffect(() => {
    setDirection(() => langDirection(user.lang));
  }, [user.lang]);

  const router = useRouter();

  return (
    <>
      <div className={styles["card-wrapper"]}>
        <Card
          className={[
            styles["md-card"],
            "shadow",
            ` ${user.theme === M.DARK ? styles["dark-mode"] : ""}`,
          ]}
        >
          <Card.Header className={styles["card-header"]}>
            <div className={styles["images-aligner"]}>
              <motion.div
                className={styles["hovered-img"]}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ type: "spring", delay: 0.8, duration: 3 }}
                // viewport={{ once: true }}
              >
                <Image
                  width={150}
                  height={150}
                  src={props.imgVisible}
                  alt={props.alt}
                />
              </motion.div>
              <div className={styles["init-img"]}>
                <Image
                  width={150}
                  height={150}
                  src={props.imgInit}
                  alt={props.alt}
                />
              </div>
            </div>
          </Card.Header>
          <Card.Body className={styles["card-body"]}>
            <Card.Title className={styles["title"]}>
              <motion.div
                initial={{ color: "#cacaca" }}
                whileInView={{ color: "#00ead3" }}
                transition={{ type: "spring", delay: 0.8, duration: 1.5 }}
              >
                {props.title}
              </motion.div>
            </Card.Title>
            <p className={styles["card-content"]}>{props.content}</p>
            <button
              onClick={() => {
                router.push(props.link);
              }}
              className={styles["nav-buttons"]}
            >{props.btnText} <FiArrowUpRight className={styles["btn-icons"]} />
            </button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
