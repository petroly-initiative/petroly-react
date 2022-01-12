import styles from "../../styles/home-page/service-card.module.scss";
import { Card } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../../state-management/user-state/UserContext";
import { langDirection } from "../../constants";
import { useEffect } from "react";

export default function ServiceCard(props){

  const {user} = useContext(UserContext);


    return (
      <>
        <Link href="/instructors">
          <Card className={[styles["md-card"], "shadow"]}>
            <div style={langDirection(user.lang)} className={styles["card-title"]}>
              {props.title}
            </div>
            <div className={styles["card-header"]}>
              <Image
                alt="service image"
                src={props.header}
                width={90}
                height={90}
              />
            </div>
          </Card>
        </Link>
      </>
    );
}