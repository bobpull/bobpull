import { Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import { useContext } from "react";
import { FriendListContext } from "../../context/FriendListContext";

function UserFriendButton({ user, isFriend }) {
  const { friendList, setFriendList } = useContext(FriendListContext);

  console.log('friendList: ', friendList);

  return (
    <>
      {!isFriend ? (
        <Col>
          <Row className="mt-3 text-center text-info">
            <Col sm={{ span: 20 }}>
              <Button
                variant="outline-warning"
                size="sm"
                onClick={async () => {
                  try {
                    const res = await Api.post(`friend/${user.id}`);
                    setFriendList((cur) => [...cur, res.data]);
                  } catch(err) {
                    console.error(err);
                  }
                }}
              >
                친구추가
              </Button>
            </Col>
          </Row>
        </Col>
      ) : (
        <Col>
          <Row className="mt-3 text-center text-info">
            <Col sm={{ span: 20 }}>
              <Button
                variant="outline-warning"
                size="sm"
                onClick={async () => {
                  try {
                    await Api.delete(`friends/${isFriend.id}`);
                    setFriendList((cur) => cur.filter((el) => el.id !== isFriend.id));
                  } catch(err) {
                    console.error(err);
                  }
                }}
              >
                팔로우 끊기
              </Button>
            </Col>
          </Row>
        </Col>
      )}
    </>
  );
}

export default UserFriendButton;
