import { useState, useContext } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { CertificatesContext } from "./Certificate";
import * as Api from "../../api";
import getDate from "../../today/TodayDate";

const TodayDate = getDate();

function CertificateEditForm({ certificate, setIsEditing }) {
  const { setCertificates } = useContext(CertificatesContext);
  // useState로 title 상태를 생성함.
  const id = certificate.id;
  const [title, setTitle] = useState(certificate.title);
  const [description, setDescription] = useState(certificate.description);
  const [date, setDate] = useState(certificate.issued_at);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "certificate/:id" 엔드포인트로 PUT 요청함.
      const res = await Api.put("certificates/" + id, {
        title: title,
        description: description,
        issued_at: date,
      });

      setCertificates((cur) => cur.map((v) => (v.id === id ? res.data : v)));
    } catch (err) {
      console.log(err);
      alert("해당 변경사항을 적용할 수 없습니다.");
    }

    setIsEditing(false);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mb-3">
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
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
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

export default CertificateEditForm;
