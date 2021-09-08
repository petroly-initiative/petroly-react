import { Button, Card } from "react-bootstrap";
import styles from "../../styles/dashboard-page/groups-tab.module.scss";
import Image from "next/image";
import { MdEdit, MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { RiWhatsappFill } from "react-icons/ri";
export default function GroupPreview(props) {
  return (
    <>
      <Card className={styles["card-body"]}>
        {/* pic container */}

        <div className={styles["pic-container"]}>
          <div className={styles["pic-border"] + " shadow"}>
            <Image
              width="50"
              height="50"
              className={styles["profile-pic"]}
              src="/images/muhabpower.png"
            />
          </div>
        </div>
        {/* text info container */}
        <div className={styles["txt-container"]}>
          <div className={styles["group-name"]}>
            CS Nerds nerdsnerds nerds nerds
          </div>
          {/* Styling and icon will be conditional */}
          <div style={{
              color: "green"
          }} className={styles["group-type"]}>
            {" "}
            <span className={styles["type-icon"]}>
              <RiWhatsappFill />
            </span>{" "}
            Whats app group
          </div>
        </div>
        {/*  btns container */}
        <div className={styles["btns-container"]}>
          {/* delete btn */}
          <Button className={[styles["delete-btn"], styles["btns"]]}>
            <AiFillDelete />
          </Button>
          {/*  edit btn */}
          <Button className={[styles["edit-btn"], styles["btns"]]}>
            <MdEdit size={"1rem"} />
          </Button>
        </div>
      </Card>
    </>
  );
}
