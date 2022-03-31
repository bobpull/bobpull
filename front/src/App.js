import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import * as Api from "./api";
import {UserContext} from "./context/UserContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginForm from "./components/user/LoginForm";
import FindPwForm from "./components/user/FindPwForm";
import Network from "./components/user/Network";
import RegisterForm from "./components/user/RegisterForm";
import Portfolio from "./components/Portfolio";
import MemberEdit from "./components/user/MemberInfoEdit";
import PasswordEdit from "./components/user/EditPwForm";
import WithdrawMember from "./components/user/WithdrawMemberForm";
import FriendList from "./components/user/FriendList";
import Home from "./components/Home";

import styled from "./style/App.module.css"

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const {userState, userDispatch} = useContext(UserContext)

  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("user/current");
      const currentUser = res.data;

      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      userDispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });

      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  // useEffect는 App 컴포넌트가 렌더 될 때마다 실행됨 그럴 이유가 있어? useMemo callback을 쓰는 방법을 알아보자.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return <>bobpull 굴러가요</>
  }

  return (
    // User와 dispatch를 나눠서 관리할 필요가 있을까.
        <Router>
          <Header />
          <div className={styled.container}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/resetpw" element={<FindPwForm />} />
            <Route path="/mypage" element={<Portfolio />} />
            <Route path="/users/:userId" element={<Portfolio />} />
            <Route path="/network" element={<Network />} />
            <Route path="/edit" element={<MemberEdit />} />
            <Route path="/edit/password" element={<PasswordEdit />} />
            <Route path="/edit/withdraw" element={<WithdrawMember />} />
            <Route path="/friendlist" element={<FriendList />} />
          </Routes>
          </div>
          <Footer />
        </Router>
  );
}

export default App;
