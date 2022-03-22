import { useNavigate } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";

function MemberEdit() {
  const navigate = useNavigate();
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Button
          variant="primary"
          className="mb-3"
          onClick={() => navigate("/edit/password")}
        >
          비밀번호 변경
        </Button>
        <Button variant="primary" className="mb-3">
          회원 탈퇴
        </Button>
      </Row>
    </Container>
  );
}

export default MemberEdit;
