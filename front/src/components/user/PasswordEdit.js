import { useState } from "react";
import { Container, Form, Row, Button } from "react-bootstrap";

function PasswordEdit() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPW, setConfirmNewPW] = useState("");

  return (
    <Container style={{ maxWidth: "700px" }}>
      <Row className="m-5" style={{ fontSize: "25px", fontWeight: "bold" }}>
        비밀번호 변경
        <Row
          className="mt-3"
          style={{ fontSize: "18px", fontWeight: "normal" }}
        >
          안전한 비밀번호로 회원정보를 보호하세요.
        </Row>
      </Row>
      <Row className="justify-content-md-center m-5">
        <Form>
          <Form.Group controlId="currentPassword" className="mb-3">
            <Form.Control
              type="password"
              autoComplete="off"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="현재 비밀번호"
              style={{ height: "43px" }}
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Control
              type="password"
              autoComplete="off"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호"
              style={{ height: "43px" }}
            />
          </Form.Group>
          <Form.Group controlId="confirmNewPassword">
            <Form.Control
              type="password"
              autoComplete="off"
              value={confirmNewPW}
              onChange={(e) => setConfirmNewPW(e.target.value)}
              placeholder="새 비밀번호 확인"
              style={{ height: "43px" }}
            />
          </Form.Group>
          <Form.Group as={Row} style={{ margin: "0px" }} className="mt-5">
            <Button variant="primary" type="submit" className="mb-2">
              확인
            </Button>
            <Button variant="secondary" type="submit" className="mb-2">
              취소
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}

export default PasswordEdit;
