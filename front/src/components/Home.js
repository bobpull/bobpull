import React, { useContext, useState } from "react";
import "../style/Home.css";
import { useNavigate, useLocation } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../App";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userState = useContext(UserStateContext);
  const [show, setShow] = useState(true);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  return show ? (
    <div className="homeContainer">
      <h1 className="HomeTitle">밥풀(pull)</h1>
      <img
        src={`${process.env.PUBLIC_URL}/img/3talls.png`}
        style={{ width: "300px", align: "center" }}
        alt="삼톨이들"
      />

      {location.pathname === "/" && (
        <div>
          <div className="subBox">
            <p>
              밥풀이 <b>찰싹</b> 붙는 것처럼
              <br />
              원하는 곳에 <b>찰싹</b> 붙으시길! <br />
              <br />
              우리가 원하는 바를 git <b>pull</b> 해오는 것처럼
              <br />
              회사가 당신을 <b>pull</b> 해가기를!
            </p>

            <div className="ad">
              포트폴리오 관리는 <u>"밥풀(pull)"</u>이지
            </div>

            {!isLogin ? (
              <div className="alignButton">
                <div
                  className="button"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  밥풀이 되시겠어요?
                </div>
                <div
                  className="button"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  이미 밥풀이신가요?
                </div>
              </div>
            ) : (
              <div className="welcome">당신은 이미 최고의 밥풀입니다!</div>
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div></div>
  );
};

export default Home;
