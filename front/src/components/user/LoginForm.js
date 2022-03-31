import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import Home from "../Home";

import "../../style/display.css";

import { ValidateEmail } from "./ValidateEmail";
import * as Api from "../../api";
import {UserContext} from "../../context/UserContext"

function LoginForm() {
  const navigate = useNavigate();
  const {userDispatch} = useContext(UserContext);

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");

  const [errorText, setErrorText] = useState("");

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = ValidateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("user/login", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      userDispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      setErrorText("");

      navigate("/", { replace: true });
      alert("만우절 이벤트 진행 중, 톨 드릴테니 구매할 수 있으면 해보셈")
    } catch (err) {
      setErrorText("이메일, 비밀번호가 일치하지 않습니다.");
      console.log("로그인에 실패하였습니다.\n", err);
    }
  };

  return (
    <Container>
      <Home />
      <Row className="justify-content-md-center">
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <Row align="center">
              <Form.Text
                style={{
                  color: "#FF0000",
                  fontWeight: "bold",
                }}
              >
                {errorText}
              </Form.Text>
            </Row>
            <Form.Group controlId="loginEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="loginPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Text
                onClick={() => navigate("/resetpw")}
                className="forgetPw"
              >
                비밀번호를 까먹었니?
              </Form.Text>
              <Form.Control
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상입니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="primary"
                  style={{ backgroundColor: "#514fa1", borderColor: "#514fa1" }}
                  type="submit"
                  disabled={!isFormValid}
                >
                  로그인
                </Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="light" onClick={() => navigate("/register")}>
                  회원가입하기
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
