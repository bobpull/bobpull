import { Form, Row, Col, Button } from 'react-bootstrap';

const AddProject = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="projectId">
        <Form.Control type="text" placeholder="프로젝트명"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="projectDescription">
        <Form.Control as="textarea" placeholder="상세설명"/>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="시작일">
      <Col sm>
        <Form.Control type="date" placeholder="시작일"/>
      </Col>
      <Col sm>
        <Form.Control type="date" placeholder="끝"/>
      </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
            <Col sm>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary">
                취소
              </Button>
            </Col>
          </Form.Group>
    </Form>
  )
}

export default AddProject