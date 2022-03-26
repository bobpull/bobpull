import { useNavigate } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";
import "../../style/button.css";

function MemberEdit() {
  const navigate = useNavigate();

  return (
    <Container style={{ maxWidth: "700px" }}>
      <Row
        className="m-3 mt-5"
        style={{ fontSize: "30px", fontWeight: "bold" }}
      >
        회원 정보
        <Row style={{ fontSize: "20px", fontWeight: "normal" }}>
          밥풀(pull)에서의 회원 정보를 수정할 수 있습니다.
        </Row>
      </Row>
      <Row className="justify-content-md-center m-5">
        <Button
          variant="primary"
          className="mb-3"
          onClick={() => navigate("/edit/password")}
        >
          비밀번호 변경
        </Button>
        <Button
          variant="primary"
          className="mb-3"
          onClick={() => navigate("/edit/withdraw")}
        >
          회원 탈퇴
        </Button>
      </Row>
    </Container>
  );
}

export default MemberEdit;
