import React from "react"
import {Card, Row, Col} from "react-bootstrap";

import { AiFillEdit } from "react-icons/ai";
const Skill = () => {
  return <Card className="mb-3">
    <Card.Body>
      <Row >
        <Col>
          <Card.Subtitle>주요 기술</Card.Subtitle>
        </Col>
        <Col xs="2">
        <Card.Subtitle>
          <AiFillEdit/>
          </Card.Subtitle>
          
        </Col>
      </Row>
      
    </Card.Body>
  </Card>
}

export default Skill