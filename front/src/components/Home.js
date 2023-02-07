import React, { useContext } from "react";
import styled from "../style/Home.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userState } = useContext(UserContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  return (
    <div className={styled.homeContainer}>
      {/* <h1 className={styled.HomeTitle}>밥풀(pull)</h1> */}
      <img
        src="https://bobpullbucket.s3.ap-northeast-2.amazonaws.com/language/cutePull.png"
        style={{ width: "300px", align: "center" }}
        alt="삼톨이들"
      />
      {location.pathname === "/" && (
        <div>
          <div className={styled.subBox}>
            <p className={styled.welcome}>
              밥풀이 <b>찰싹</b> 붙는 것처럼
              <br />
              원하는 곳에 <b>찰싹</b> 붙으시길!
            </p>
            <p className={styled.welcome}>
              우리가 원하는 바를 git <b>pull</b> 해오는 것처럼
              <br />
              회사가 당신을 <b>pull</b> 해가기를!
            </p>
            <div className={styled.ad}>
              포트폴리오 관리는 <u>"밥풀(pull)"</u>이지
            </div>

            {!isLogin ? (
              <div className={styled.alignButton}>
                <div
                  className={styled.button}
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  밥풀이 되시겠어요?
                </div>
                <div
                  className={styled.button}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  이미 밥풀이신가요?
                </div>
              </div>
            ) : (
              <div className={styled.hello}>당신은 이미 최고의 밥풀입니다!</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
