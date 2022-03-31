import React, {useState} from "react"
import {Card, Row, Col} from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import AddSkillForm from "./AddSkillForm.js"

const Skill = ({isEditable}) => {
  const [show, setShow] = useState(false)
  return <Card className="mb-3">
    <Card.Body>
      <Row >
        <Col
         className="mb-2"
         style={{
          display: "flex",
          justifyContent: "space-between",
        }}>
          <Card.Subtitle>주요 기술</Card.Subtitle>
          <Card.Subtitle>
            {!!isEditable && 
              <AiFillEdit 
              style={{
              cursor: "pointer",
              }}
              onClick={() => setShow(true)}
              />
            }
          
        </Card.Subtitle>
        </Col>
        {show && 
         <AddSkillForm
         show={show}
         setShow={setShow}
         />
        }
        
        
      </Row>
      
    </Card.Body>
  </Card>
}

export default Skill