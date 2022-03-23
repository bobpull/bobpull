import { useState, useContext } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { CertificatesContext } from "./Certificate";
import * as Api from "../../api";
import getDate from "../../today/TodayDate";

const TodayDate = getDate();

function CertificateAddForm({ setAddCertificate }) {
  const { setCertificates } = useContext(CertificatesContext);

  // useState로 title 상태를 생성함.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(TodayDate);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "certificate/create" 엔드포인트로 POST 요청함.
      const res = await Api.post("certificate/create", {
        title: title,
        description: description,
        issued_at: date,
      });
      setCertificates((cur) => [...cur, res.data]);
    } catch (err) {
      console.log(err);
      alert("이미 존재하는 내용입니다. 다른 자격증을 추가해주세요.");
    }

    setAddCertificate(false);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="certificateEditTitle">
              <Form.Control
                type="text"
                placeholder="자격증 제목"
                className="mt-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="certificateEditDetail">
              <Form.Control
                type="text"
                placeholder="상세내역"
                className="mt-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="certificateEditDate">
              <Form.Control
                type="date"
                className="mt-3"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min="1900-01-01"
                max={TodayDate}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit" className="me-3">
                  확인
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setAddCertificate(false)}
                >
                  취소
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CertificateAddForm;
