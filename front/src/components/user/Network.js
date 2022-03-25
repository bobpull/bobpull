import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import SearchForm from "./SearchForm";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  useEffect(() => {
    setSearch("");
  }, [location.path]);

  return (
    <>
      <Container fluid style={{ width: "365px" }} className="mb-3">
        <SearchForm search={search} setSearch={setSearch} />
      </Container>
      <Container fluid style={{ clear: "both" }}>
        <Row xs="1" md="2" lg="3" className="jusify-content-center">
          {search
            ? users
                .filter((user) => user.name.includes(search))
                .map((user) => <UserCard key={user.id} user={user} isNetwork />)
            : users.map((user) => (
                <UserCard key={user.id} user={user} isNetwork />
              ))}
        </Row>
      </Container>
    </>
  );
}

export default Network;
