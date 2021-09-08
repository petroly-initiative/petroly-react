import { Button, Card } from "react-bootstrap";
import styles from "../../styles/dashboard-page/groups-tab.module.scss";
import Image from "next/image";
export default function GroupPreview(props){

    return (<>
    <Card>
        {/* pic container */}
        <div>
            <div className={styles["pic-container"]}>
                <div className= {styles["pic-border"]}></div>
            </div>
        </div>
        {/* text info container */}
        <div className={styles["txt-container"]}>
            <div className={styles["group-name"]}></div>
            <div className={styles["group-type"]}></div>
        </div>
        {/*  btns container */}
        <div>
            {/* delete btn */}
            <Button className = {styles["delete-btn"]}>delete</Button>
            {/*  edit btn */}
            <Button className={styles["edit-btn"]}>edit</Button>
        </div>
    <div></div>
    </Card>
    </>)
}