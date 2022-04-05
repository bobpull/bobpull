import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav, Dropdown, Navbar } from "react-bootstrap";
import {UserContext} from "../context/UserContext";
import styled from "../style/header.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FriendListContext } from "../context/FriendListContext";

import { TallContext } from "../context/TallContext";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const {userState, userDispatch} = useContext(UserContext)
  const { tall, setTall } = useContext(TallContext);

  const { setFriendList } = useContext(FriendListContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  useEffect(() => {
    if (userState.user) {
      setTall(userState.user.tall);
    }
  }, [userState]);

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    userDispatch({ type: "LOGOUT" });
    // 로그아웃 하면 현재 유저의 friendList를 빈 배열로 초기화
    setFriendList([]);
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  const handleClick = async () => {
    const MySwal = withReactContent(Swal);

    const result = await MySwal.fire({
      title: <p>로그아웃 하시겠습니까?</p>,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#514fa1",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      await logout();
      MySwal.fire({
        title: <p>로그아웃 되었습니다!</p>,
        html: <div>서비스를 이용하려면 다시 로그인 해주세요.</div>,
        icon: "success",
        confirmButtonColor: "#514fa1",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <div id={styled.headerWrap}>
    <Nav
      activeKey={location.pathname}
      className={styled.nav}
    >
      <Navbar.Brand as="div" >
        <Nav.Link
          onClick={() => navigate("/")}
          className={styled.between}
          style={{display: "flex"}}
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/pull.png`}
            style={{ width: "80px", height: "70px" }}
            alt="밥풀"
          />
          <p>밥풀(pull)</p>
        </Nav.Link>
      </Navbar.Brand>
      {isLogin && (
        <div className={styled.between}>
          <Nav.Item>
            <div className={styled.between}>
              <img
                src={`${process.env.PUBLIC_URL}/img/tall.png`}
                style={{ width: "23px", marginRight: "3px" }}
                alt="톨"
              />
              <p>{tall} 톨</p>
            </div>
          </Nav.Item>
          <Nav.Item style={{ marginLeft: "14px" }}>
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-autoclose-true"
                variant="secondary"
                className={styled.myMenu}
              >
                Menu
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Header>User</Dropdown.Header>
                <Dropdown.Item eventKey="1" onClick={() => navigate("/edit")}>
                  회원정보
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => navigate("/mypage")}>
                  나의 페이지
                </Dropdown.Item>
                <Dropdown.Header>Social</Dropdown.Header>
                <Dropdown.Item
                  eventKey="3"
                  onClick={() => navigate("/network")}
                >
                  네트워크
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="4"
                  onClick={() => navigate("/friendlist")}
                >
                  내 친구들
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="5" onClick={handleClick}>
                  로그아웃
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
        </div>
      )}
    </Nav>
    </div>
  );
}

export default Header;
