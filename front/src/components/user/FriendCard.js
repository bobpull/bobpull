import { useNavigate } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import "../../style/display.css";
import "../../style/font.css";
// import * as Api from "../../api";

import { AiFillRead } from "react-icons/ai";

function FriendCard({ id, name, email, description, profilePath }) {
  const navigate = useNavigate();

  // const handleClick = () => {
  //   Api.get("friends", id).then((res) => console.log(res));
  // }

  return (
    <Col>
      <Card className="mb-2 ms-0" style={{ width: "100%", margin: "0 auto" }}>
        <Card.Body>
          <Row>
            <div className="between_top">
              <div
                style={{
                  display: "flex",
                }}
              >
                <Card.Img
                  style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
                  className="mb-3"
                  src="https://bobpullbucket.s3.ap-northeast-2.amazonaws.com/language/cutePull.png"
                  
                  alt="밥풀"
                />
                <div>
                  <Card.Title className="title">{name}</Card.Title>
                  <Card.Subtitle className="text-muted text">{email}</Card.Subtitle>
                  <Card.Text className="mb-3 text">{description}</Card.Text>
                </div>
              </div>

              <Card.Link
                className="mt-3"
                href="#"
                onClick={() => navigate(`/users/${id}`)}
                style={{
                  color: "black",
                }}
              >
                <AiFillRead size={30} />
              </Card.Link>
            </div>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default FriendCard;
