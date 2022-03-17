import { useState, useContext } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { CertificatesContext } from "./Certificate";
import * as Api from "../../api";

function CertificateEditForm({ certificate, setIsEditing }) {
  const { certificates, setCertificates } = useContext(CertificatesContext);
  // useState로 title 상태를 생성함.
  const _id = certificate._id;
  const [title, setTitle] = useState(certificate.title);
  const [description, setDescription] = useState(certificate.description);
  const [date, setDate] = useState(certificate.when_date);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "certificate/:_id" 엔드포인트로 POST 요청함.
      const res = await Api.put("certificates/" + _id, {
        title: title,
        description: description,
        when_date: date,
      });

      const newCertificates = [...certificates].map((v) => {
        if (v._id === _id) return res.data;
        else return v;
      });

      setCertificates(newCertificates);
    } catch (err) {
      console.log(err);
    }

    setIsEditing(false);
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
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="certificateEditDetail">
              <Form.Control
                type="text"
                placeholder="상세내역"
                className="mt-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="certificateEditDate">
              <Form.Control
                type="date"
                className="mt-3"
                value={date}
                onChange={(e) => setDate(e.target.value)}
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
