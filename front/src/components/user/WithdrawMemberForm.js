import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Row, Button } from "react-bootstrap";
import {UserContext} from "../../context/UserContext"
import * as Api from "../../api";

const targetSentence = "저는 밥풀(pull)에서 탈퇴하고 싶습니다.";

function WithdrawMember() {
  const navigate = useNavigate();

  const {userState, userDispatch} = useContext(UserContext);
  
  const id = userState.user.id;

  const [sentence, setSentence] = useState("");
  const isCorrect = targetSentence === sentence;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await Api.delete("users/" + id);
      alert("탈퇴하셨습니다.");
      navigate("/login");
      userDispatch({ type: "LOGOUT" });
      sessionStorage.removeItem("userToken");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container style={{ maxWidth: "700px", border: "1px solid gray" }}>
      <Row className="m-5" style={{ fontSize: "25px", fontWeight: "bold" }}>
        회원 탈퇴
        <Row
          className="mt-3"
          style={{ fontSize: "18px", fontWeight: "normal" }}
        >
          포트폴리오 공유 서비스 밥풀(pull)에서 회원 탈퇴합니다. <br />
          탈퇴한 이후에는 서비스 이용시 제한이 발생합니다. <br /> 본 서비스에서
          탈퇴하시려면 다음 문장을 동일하게 작성해주시기 바랍니다.
        </Row>
        <Row className="mt-3" style={{ fontSize: "18px", fontWeight: "bold" }}>
          {targetSentence}
        </Row>
      </Row>
      <Row className="justify-content-md-center m-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="currentPassword" className="mb-3">
            <Form.Control
              type="text"
              autoComplete="off"
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              placeholder="여기에 입력해주세요."
              style={{ height: "43px" }}
            />
          </Form.Group>
          <Form.Group as={Row} style={{ margin: "0px" }} className="mt-5">
            <Button
              variant="primary"
              type="submit"
              className="mb-2"
              disabled={!isCorrect}
              style={{ backgroundColor: "#514fa1", borderColor: "#514fa1" }}
            >
              확인
            </Button>
            <Button
              variant="secondary"
              type="submit"
              className="mb-2"
              onClick={() => {
                navigate("/edit");
              }}
            >
              취소
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}

export default WithdrawMember;
