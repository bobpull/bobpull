import { Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import { useContext } from "react";
import { FriendListContext } from "../../context/FriendListContext";


function UserFriendButton({ user, isFriend }) {
  const { friendList, setFriendList } = useContext(FriendListContext);
  
  const addFriend = async () => {
    try {
      const res = await Api.post(`friend/${user.id}`);
      setFriendList((cur) => [...cur, res.data]);
    } catch(err) {
      console.error(err);
    }
  }
  console.log(isFriend)

  const deleteFriend = async () => {
    try {
      await Api.delete("friends", isFriend.id);
      setFriendList((cur) => cur.filter((el) => el.id !== isFriend.id));
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <>
      {!isFriend ? (
        <Col>
          <Row className="mt-3 text-center text-info">
            <Col sm={{ span: 20 }}>
              <Button
                variant="outline-warning"
                size="sm"
                onClick={addFriend}
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
                onClick={deleteFriend}
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
