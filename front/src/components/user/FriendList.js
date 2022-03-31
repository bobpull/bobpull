import React, { useEffect, useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import * as Api from "../../api";
import FriendCard from "./FriendCard";
import {UserContext} from "../../context/UserContext"
import { FriendListContext } from "../../context/FriendListContext";

function FriendList() {
  const navigate = useNavigate();
  const {userState} = useContext(UserContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);

  const { friendList, setFriendList } = useContext(FriendListContext);

  useMemo(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    const fetchAPI = async () => {
      const res = await Api.get("userlist")
      setUsers(res.data)
      const fres = await Api.get("friendlist", userState.user.id)
      setFriendList(fres.data)
    }
    fetchAPI()
  }, [userState, navigate]);

  // friendList에서 친구의 id만 뽑아낸 배열
  
  const friendIdList = friendList.map((f) => f.friend_id);
  // users에서 friendList의 id를 포함한 객체들 가져오기
  const friendInUsers = users.filter((user) => friendIdList.includes(user.id));
  
  return (
    <Container fluid style={{ minHeight: `calc(100vh - 175px)` }}>
      {friendInUsers.length > 0 ? (
        <Row xs="1" md="2" lg="3" className="jusify-content-center">
          {friendInUsers.map((f) => (
            <FriendCard
              key={f.id}
              id={f.id}
              name={f.name}
              email={f.email}
              description={f.description}
              profilePath={f.profilePath}
              isNetwork
            />
          ))}
        </Row>
      ) : (
        <Row className="jusify-content-center align-items-center text-center">
          <h4>아직 추가된 친구가 존재하지 않습니다.</h4>
          <h5>마음에 드는 친구를 추가해보세요😊</h5>
        </Row>
      )}
    </Container>
  );
}

export default FriendList;
