import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { ValidateEmail } from "./ValidateEmail";
import * as Api from "../../api";
import "../../style/display.css";

function RegisterForm() {
  const navigate = useNavigate();
  const confirmMessageRef = useRef();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");
  //useState로 이메일인증 상태를 생성함.
  const [authEmail, setAuthEmail] = useState({
    authNum: "",
    isAuthening: false,
    isAuth: true,
  });

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = ValidateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    isPasswordSame &&
    isNameValid &&
    authEmail.isAuth;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("user/register", {
        email,
        password,
        name,
      });
      // 로그인 페이지로 이동함.
      navigate("/login");
    } catch (err) {
      console.log("회원가입에 실패하였습니다.", err);
    }
  };

  const handleAuthEmail = async () => {
    try {
      setAuthEmail((cur) => {
        return {
          ...cur,
          isAuth: false,
          isAuthening: true,
        };
      });
      await Api.post("availablemail", { email });
      confirmMessageRef.current.innerText = `인증번호를 전송했습니다.`;
      
    } catch (e) {
      console.log(e);
    }
  };

  const handleAuthEmailNum = (e) => {
    setAuthEmail((cur) => {
      return {
        ...cur,
        authNum: e.target.value,
      };
    });
  };

  const cofirmAuthMailNum = async () => {
    const res = await Api.post("availablemail/check", {
      verificationNumber: authEmail.authNum,
    });
    if (res.status === 200) {
      confirmMessageRef.current.innerText = `인증에 성공했습니다!`;
      setAuthEmail((cur) => {
        return {
          ...cur,
          isAuth: true,
        };
      });
    } else {
      confirmMessageRef.current.innerText = `인증에 실패했습니다! 인증번호를 확인해주세요.`;
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form method="post" onSubmit={handleSubmit}>
            <Form.Group controlId="registerEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Row>
                <div className="between">
                  <Form.Control
                    type="email"
                    autoComplete="off"
                    value={email}
                    disabled={authEmail.isAuthening}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    style={{ width: "150px", marginLeft: "10px" }}
                    variant="primary"
                    onClick={handleAuthEmail}
                    disabled={authEmail.isAuthening}
                  >
                   전송
                  </Button>
                </div>
              </Row>
            </Form.Group>

            {!isEmailValid && (
              <Form.Text className="text-success">
                이메일 형식이 올바르지 않습니다.
              </Form.Text>
            )}
            <Form.Group className="mt-3" controlId="authEmail">
              <div className="between">
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="인증번호를 입력해주세요."
                  onChange={handleAuthEmailNum}
                  disabled={!authEmail.isAuthening}
                />
                <Button
                  style={{ width: "150px", marginLeft: "10px" }}
                  variant="primary"
                  onClick={cofirmAuthMailNum}
                  disabled={authEmail.isAuth}
                >
                  인증
                </Button>
              </div>
              <Form.Text
                ref={confirmMessageRef}
                className="text-success"
              ></Form.Text>
            </Form.Group>

            <Form.Group controlId="registerPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerConfirmPassword" className="mt-3">
              <Form.Label>비밀번호 재확인</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!isPasswordSame && (
                <Form.Text className="text-success">
                  비밀번호가 일치하지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="registerName" className="mt-3">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {!isNameValid && (
                <Form.Text className="text-success">
                  이름은 2글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isFormValid}
                  style={{ backgroundColor: "#514fa1", borderColor: "#514fa1" }}
                >
                  회원가입
                </Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col>
                <Button variant="light" onClick={() => navigate("/login")}>
                  로그인하기
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterForm;
