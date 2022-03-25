import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import * as Api from "../../api";
import FriendCard from "./FriendCard";
import { UserStateContext } from "../../App";
import { FriendListContext } from "../../context/FriendListContext";

function FriendList() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);

  const { friendList } = useContext(FriendListContext);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  // friendList에서 친구의 id만 뽑아낸 배열
  const friendIdList = friendList.map((f) => f.friend_id);
  // users에서 friendList의 id를 포함한 객체들 가져오기
  const friendInUsers = users.filter((user) => friendIdList.includes(user.id));

  return (
    <Container fluid>
      {friendInUsers.length > 0 ? (
        <Row xs="1" md="2" lg="3" className="jusify-content-center">
          {friendInUsers.map((f) => (
            <FriendCard
              key={f.id}
              id={f.id}
              name={f.name}
              email={f.email}
              description={f.description}
              isNetwork
            />
          ))}
        </Row>
      ) : (
        <Row className="jusify-content-center align-items-center text-center">
          <h2>아직 친구 추가를 하지 않았습니다.</h2>
          <h3>마음에 드는 친구를 추가해보세요!</h3>
        </Row>
      )}
    </Container>
  );
}

export default FriendList;
