import { useState, useContext } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { CertificatesContext } from "./Certificate";
import * as Api from "../../api";

function CertificateAddForm({ setAddCertificate }) {
  const { certificates, setCertificates } = useContext(CertificatesContext);

  // 자격증 추가 시 오늘 날짜를 defaultDate로 설정합니다.
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = today.getMonth() + 1;
  const dd = today.getDate();
  const defaultDate = `${yyyy}-${mm < 10 ? "0" : ""}${mm}-${dd}`;

  // useState로 title 상태를 생성함.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(defaultDate);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "certificate/create" 엔드포인트로 POST 요청함.
      const res = await Api.post("certificate/create", {
        title: title,
        description: description,
        when_date: date,
      });
      setCertificates([...certificates, res.data]);
    } catch (err) {
      console.log(err);
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
