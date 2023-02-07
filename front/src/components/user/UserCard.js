import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import "../../style/display.css";
import "../../style/font.css";
import UserFriendButton from "./UserFriendButton";
// import { AiFillRead } from "react-icons/ai";

function UserCard({ user, setIsEditing, isEditable, isNetwork, isFriend }) {
  const navigate = useNavigate();

  // const imgUrl = profile.filter((img) => user.id === img.id)
  return (
    <Col>
      <Card
        onClick={() => {
          if (isNetwork) navigate(`/users/${user.id}`);
        }}
        className="mb-2 ms-0"
        style={{
          width: "100%",
          margin: "0 auto",
          cursor: `${isNetwork ? "pointer" : null}`,
        }}
      >
        <Card.Body>
          <Row>
            <div className="between_top">
              <div
                style={{
                  display: "flex",
                }}
              >
                <Card.Img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                  className="mb-3"
                  src="https://bobpullbucket.s3.ap-northeast-2.amazonaws.com/language/cutePull.png"
                  alt="밥풀"
                />
                <div>
                  <Card.Text style={{ margin: "0" }}>{user?.name}</Card.Text>
                  <Card.Text className="text-muted text">
                    {user?.email}
                  </Card.Text>
                  <Card.Text className="mb-3 text">
                    {user?.description}
                  </Card.Text>
                </div>
              </div>
              {/* {isNetwork && (
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
              )} */}
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

          {!isNetwork && !isEditable && (
            <UserFriendButton user={user} isFriend={isFriend} />
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default UserCard;
