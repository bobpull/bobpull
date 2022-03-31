import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { ValidateEmail } from "./ValidateEmail";

import * as Api from "../../api";
import "../../style/display.css";

const FindPwForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const isEmailValid = ValidateEmail(email);
  const confirmRef = useRef();

  useEffect(() => {
    if (!isEmailValid) {
      confirmRef.current.innerText = "이메일 형식이 올바르지 않습니다.";
      confirmRef.current.classList.add("text-danger");
    } else confirmRef.current.innerText = "";
  }, [email]);

  const submithandler = async (e) => {
    e.preventDefault();
    const res = await Api.post("resetpw", { email });
    if (res.status === 200) {
      confirmRef.current.innerText = "임시 비밀번호를 전송했습니다!";
      confirmRef.current.classList.add("text-success");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form onSubmit={submithandler}>
            <Form.Group controlId="loginEmail">
              <Form.Label>임시 비밀번호 발급</Form.Label>
              <div className="between">
                <Form.Control
                  type="email"
                  placeholder="임시 비밀번호를 받을 이메일을 입력해주세요"
                  onChange={(e) => setEmail((cur) => e.target.value)}
                />
                <Button
                  style={{
                    width: "150px",
                    marginLeft: "10px",
                    backgroundColor: "#514fa1",
                    borderColor: "#514fa1",
                  }}
                  type="submit"
                  variant="primary"
                  disabled={!isEmailValid}
                >
                  전송
                </Button>
              </div>
              <Form.Text ref={confirmRef}></Form.Text>
            </Form.Group>
            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" onClick={() => navigate("/login")}>
                  확인
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FindPwForm;
