import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";

import { AiFillRead } from "react-icons/ai";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();

  return (
    <Col>
    <Card className="mb-2 ms-0" style={{ width: "100%", margin: "0 auto" }}>
      <Card.Body>
        <Row>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
          }}>
            <div style={{
              display: "flex",
            }}>
            <Card.Img
              style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
              className="mb-3"
              src="http://placekitten.com/200/200"
              alt="고양이 사진"
            />
            <div>
              <Card.Title style={{
                fontSize: "1rem",
              }}>{user?.name}</Card.Title>
              <Card.Subtitle style={{
                fontSize: "0.9rem"
              }} className="text-muted">{user?.email}</Card.Subtitle>
              <Card.Text
                className="mb-3"
               style={{
                fontSize: "0.9rem",
              }}
              >{user?.description}</Card.Text>
            </div>
            </div>
            {isNetwork && (
              <Card.Link
                className="mt-3"
                href="#"
                onClick={() => navigate(`/users/${user.id}`)}
                style={{
                  color: "black",
                }}
              >
                <AiFillRead size={30}/>
              </Card.Link>
              )}
          </div>
          {isNetwork && (
            <Card.Img
              style={{ width: "70%", height: "auto", margin: "0 auto" }}
              className="mb-3"
              src="http://placekitten.com/200/200"
              alt="고양이 사진"
            />
          )}
          

        </Row>
        

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        
      </Card.Body>
    </Card>
    </Col>
  );
}

export default UserCard;
