// import styles from "../styles/groups-page/groups-list.module";
import GroupDisplay from "../components/Groups/GroupDisplay";

export default function (props) {
  const group = {
    name: "CS Nerds",
    platform: "discord",
    type: "educational",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita laborum ipsa est at cupiditate ut consectetur corporis, harum in voluptatum, ab exercitationem aliquid perferendis odio. Odio, voluptas. Molestias, sint nostrum.",
  };
  return <GroupDisplay group={group}></GroupDisplay>;
}
