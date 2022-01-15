import { useContext } from "react"
import { Container } from "react-bootstrap";
import { L, M } from "../constants";
import { UserContext } from "../state-management/user-state/UserContext"
import { MdSignalWifiOff } from "react-icons/md";
export default function offlinePage(){

    const {user} = useContext(UserContext);

    return (
      <>
        <Container>
          <div
            className={`${styles["content"]} ${user.theme === M.DARK ? styles["dark-mode"] : ""}`}
            style={{
              textAlign: "center",
              color: "white",
              flexDirection: "column",
            }}
          >
            <MdSignalWifiOff size={"50px"} />
            {user.lang === L.EN_US
              ? "Please connect to the internet"
              : "الرجاء تفقد شبكة الاتصال"}
          </div>
        </Container>
      </>
    );
}