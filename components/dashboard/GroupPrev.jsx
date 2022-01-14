import { Spinner, Button, Card } from "react-bootstrap";
import styles from "../../styles/dashboard-page/groups-tab.module.scss";
import Image from "next/image";
import { MdEdit, MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { RiWhatsappFill } from "react-icons/ri";
import { FaTelegram } from "react-icons/fa";
import { SiDiscord } from "react-icons/si";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { deleteCommunity } from "../../api/mutations";
import EditGroup from "../Groups/EditGroup";
/**
 *
 * @param props: {
 * name,
 * groupPlatform (whatsapp, discord, telegram)
 * pic
 * }
 * @returns the group preview card
 */
export default function GroupPreview(props) {
  const [showEdit, setShowEdit] = useState(false);
  const typeStyler = (() => {
    let output;

    switch (props.platform) {
      case "WHATSAPP":
        output = { icon: <RiWhatsappFill />, color: "	#25D366" };
        break;
      case "TELEGRAM":
        output = { icon: <FaTelegram />, color: "#0088cc" };
        break;
      case "DISCORD":
        output = { icon: <SiDiscord />, color: "#5865F2" };
    }
    console.log("Creating div" + output);
    return (
      <div style={{ color: output.color }} className={styles["group-platfrom"]}>
        {" "}
        <span className={styles["platfrom-icon"]}>{output.icon}</span>
        {props.platform}{" "}
      </div>
    );
  })();
  const [
    deleteThisCommunity,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(deleteCommunity);

  const deleteCom = () => deleteThisCommunity({ variables: { id: props.id } }); // TODO Show a proper messeage for the user and update the group tab
  if (deleteLoading)
    return (
      <Button className={styles["loading-container"] + " shadow"} disabled>
        <Spinner
          className={styles["loading-spinner"] + " shadow"}
          animation="border"
          role="status"
        />
      </Button>
    );
  if (deleteError) {
    return (
      <div>
        <h1>{deleteError.name}</h1>
        <p>{deleteError.message}</p>
      </div>
    );
  }
  if (deleteData) return <></>; // Already checked that loading has finished and there are no errors.
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
            onClick={deleteCom}
          >
            <AiFillDelete />
          </Button>
          {/*  edit btn */}
          <Button
            onClick={() => setShowEdit(true)}
            className={[styles["edit-btn"], styles["btns"]]}
          >
            <MdEdit />
          </Button>
        </div>
      </Card>
      {/* TODO. I tried to make it show whenever edit btn is clicked, but it shows only the first time. */}
      {showEdit ? (
        <EditGroup refetch={props.refetch} show={true} id={props.id} />
      ) : (
        <></>
      )}{" "}
    </>
  );
}
