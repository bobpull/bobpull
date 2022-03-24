import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav, Dropdown } from "react-bootstrap";
import { UserStateContext, DispatchContext } from "../App";
import "../style/menu.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const [show, setShow] = useState(false);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  const handleClick = async () => {
    const MySwal = withReactContent(Swal);

    const result = await MySwal.fire({
      title: <p>로그아웃 하시겠습니까?</p>,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0B5ED7",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      await logout();
      MySwal.fire({
        title: <p>로그아웃 되었습니다!</p>,
        html: <div>서비스를 이용하려면 다시 로그인 해주세요.</div>,
        icon: "success",
        confirmButtonColor: "#0B5ED7",
        confirmButtonText: "확인",
      });
    }
  };

  return (
    <Nav activeKey={location.pathname}>
      <Nav.Item className="me-auto mb-5">
        <Nav.Link disabled>안녕하세요, 포트폴리오 공유 서비스입니다.</Nav.Link>
      </Nav.Item>
      {isLogin && (
        <>
          <Nav.Item>
            <Dropdown
              style={{ margin: "20px 120px 0 0" }}
              onMouseOver={() => {
                setShow(true);
              }}
              onMouseLeave={() => {
                setShow(false);
              }}
            >
              <Dropdown.Toggle
                id="dropdown-autoclose-true"
                variant="secondary"
                className="myMenu"
              >
                Menu
              </Dropdown.Toggle>
              <Dropdown.Menu show={show}>
                <Dropdown.Header>User</Dropdown.Header>
                <Dropdown.Item eventKey="1" onClick={() => navigate("/edit")}>
                  회원정보
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => navigate("/")}>
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
        </>
      )}
    </Nav>
  );
}

export default Header;
