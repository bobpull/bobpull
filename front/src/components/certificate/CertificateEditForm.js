import { Container, Col, Row, Form, Button } from "react-bootstrap";

function CertificateEditForm() {
  const handleSubmit = () => {};

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="certificateName">
              <Form.Control
                type="text"
                placeholder="자격증 제목"
                className="mt-3"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="certificateDetail">
              <Form.Control
                type="text"
                placeholder="상세내역"
                className="mt-3"
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="certificateDate">
              <Form.Control
                type="date"
                className="mt-3"
                formatter="yyyy/MM/dd"
                value={Date.now()}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CertificateEditForm;
