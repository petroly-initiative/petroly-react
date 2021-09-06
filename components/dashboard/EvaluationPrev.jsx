import { Col, Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";


/**
 * 
 * ? Evaluation preview setup
 * - Each card will trigger the previously created signInModal with populated parameters
 * - the edit icon will show up at the edge but users can click the whole card to edit 
 */

export default function EvaluationPreview(props){
    return (<>
    <Col>
    <Card>
        {/* img + name + dept container */}
        <div></div>
        {/* eval stars container */}
        <div></div>
    </Card>
    </Col>
    </>)
}