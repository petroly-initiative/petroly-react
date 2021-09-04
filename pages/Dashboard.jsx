import { Col, Row, Container, Card } from "react-bootstrap";
import EvaluationsTab from "../components/evaluation/dashboard/EvalsTab";
import ProfileTab from "../components/evaluation/dashboard/ProfileTab";
/**
 * 
 * ? Dasboard page setup:
 * -  Custom components for each tab to avoid a clutter of state management
 * - all components will share the same style file for uniform look
 * - the page will contain two modals:
 *  *Create group modal
 *  *Edit an evaluation
 */

// ? SSR Setup
// export const getStaticProps = async() => {

//     return({
//         props: "needed information",
//         revalidate: 1
//     })
// }

export default function Dashboard(props) {
  return (
    <>
      <Container>
          {/* It will be responsible for the main shadow drop */}
        <Row>
          
        </Row>
      </Container>
    </>
  );
}
