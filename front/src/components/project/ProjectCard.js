import React, {useState} from "react"
import {Button, Card, Col, Row} from "react-bootstrap";


import ProjectEditForm from "./ProjectEditForm";


const ProjectCard = ({item, projects, setProjects, isEditable, fetchAPI }) => {
  const [isEditForm, setIsEditForm] = useState(false)
  
  return (
    <Card className="mb-3" style={{textAlign: "left", border: "none"}} >
      <Row>
        {isEditForm ? 
          <ProjectEditForm
            item={item}
            projects={projects}
            setIsEditForm={setIsEditForm}
            setProjects={setProjects}
            fetchAPI={fetchAPI}
          /> : 
          <>
            <Col sm="11">
              <Card.Text className="mb-0" >
                {item.title}
              </Card.Text>
              <Card.Text className=" mb-0 text-muted">
                {item.description}
              </Card.Text>
              <Card.Text className="text-muted mb-2">
                {item.from_date.toString().substr(0,10)} ~ {item.to_date.toString().substr(0,10)}
              </Card.Text>
            </Col>
            <Col className="p-0 text-center">
            { isEditable && <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditForm(true)}
            >편집</Button>}
            </Col>
          </>
        }
      </Row>
    </Card>
  )
}

export default ProjectCard