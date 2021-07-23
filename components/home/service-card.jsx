import styles from "../../styles/home-page/service-card.module.scss";
import { Card } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

export default function ServiceCard(props){
    return (
      <>
        <Link href="/instructors">
          <Card className={[styles["md-card"], "shadow"]}>
            <div className={styles["card-title"]}>{props.title}</div>
            <div className={styles["card-header"]}>
              <Image src={props.header} width={90} height={90} />
            </div>
          </Card>
        </Link>
      </>
    );
}