import { Alert } from "react-bootstrap";

export default function infoPopUp(props) {
  const [show, setShow] = useState(true);
 
  return (
    <>
      <Alert show={show}>
        <h3>{props.header}</h3>
        <p>{props}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            أغلق النافذة
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  );
}
