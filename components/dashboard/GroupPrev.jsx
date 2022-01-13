import { Button, Card } from "react-bootstrap";
import styles from "../../styles/dashboard-page/groups-tab.module.scss";
import Image from "next/image";
import { MdEdit, MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { RiWhatsappFill } from "react-icons/ri";
import { FaTelegram } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";
import { useEffect, useContext } from "react";
import { UserContext } from "../../state-management/user-state/UserContext";
import { M } from "../../constants";

/**
 *
 * @param props: {
 * name,
 * groupType (whatsapp, discord, telegram)
 * pic
 * }
 * @returns the group preview card
 */

export default function GroupPreview(props) {
  const { user } = useContext(UserContext);

  const typeStyler = (() => {
    let output;

    switch (props.type) {
      case "Whatsapp":
        output = { icon: <RiWhatsappFill />, color: "	#25D366" };
        break;
      case "Telegram":
        output = { icon: <FaTelegram />, color: "#0088cc" };
        break;
      case "Discord":
        output = { icon: <SiDiscord />, color: "#5865F2" };
    }
    return (
      <div style={{ color: output.color }} className={styles["group-type"]}>
        {" "}
        <span className={styles["type-icon"]}>{output.icon}</span>
        {props.type}{" "}
      </div>
    );
  })();

  return (
    <>
      <Card
        className={
          styles["card-body"] +
          ` ${user.theme === M.DARK ? styles["dark-card"] : ""}`
        }
      >
        {/* pic container */}

        <div className={styles["pic-container"]}>
          <div className={styles["pic-border"] + " shadow"}>
            <Image
              width="50"
              height="50"
              className={styles["profile-pic"]}
              src={props.pic}
            />
          </div>
        </div>
        {/* text info container */}
        <div className={styles["txt-container"]}>
          <div className={styles["group-name"]}>{props.name}</div>
          {/* Styling and icon will be conditional */}
          {typeStyler}
        </div>
        {/*  btns container */}
        <div className={styles["btns-container"]}>
          {/* delete btn */}
          <Button
            style={{ marginRight: 2 }}
            className={[styles["delete-btn"], styles["btns"]]}
          >
            <AiFillDelete />
          </Button>
          {/*  edit btn */}
          <Button className={[styles["edit-btn"], styles["btns"]]}>
            <MdEdit />
          </Button>
        </div>
      </Card>
    </>
  );
}
