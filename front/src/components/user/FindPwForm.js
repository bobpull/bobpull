import React, {useState, useRef, useEffect} from "react"
import { useNavigate } from "react-router-dom";

import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { ValidateEmail } from "./ValidateEmail";

import * as Api from "../../api";
import "../../style/display.css"

const FindPwForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const isEmailValid = ValidateEmail(email);
  const errorRef = useRef()

  useEffect(() => {
    if(!isEmailValid) errorRef.current.innerText = '이메일 형식이 올바르지 않습니다.'
    else errorRef.current.innerText = ''
  }, [email])

  const submithandler = async (e) => {
    e.preventDefault()
    // await Api.post("", email)
    
  }

  return(
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
                onChange={(e) => setEmail(cur => e.target.value)}
              /> 
              <Button 
                style={{width: "150px", marginLeft: "10px"}}
                type="submit"
                variant="primary" 
                disabled={!isEmailValid}
              >전송</Button>
            </div>
            <Form.Text ref={errorRef} className="text-success"></Form.Text>
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
)
}

export default FindPwForm