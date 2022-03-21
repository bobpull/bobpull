import React, {useState} from "react"
import * as Api from "../../api";
import {Button, Card, Col, Row} from "react-bootstrap";


import ProjectEditForm from "./ProjectEditForm";


const ProjectCard = ({item, dispatch, isEditable }) => {
  const [isEditForm, setIsEditForm] = useState(false)

  const deleteHandler = async () => {
    try{
      await Api.delete("projects", item.id)
      dispatch({type: 'delete-project', payload: `${item.id}` })
    } catch(e){
      console.error(e)
    }
  }
  return (
    <Card className="mb-3" style={{textAlign: "left", border: "none"}} >
      <Row>
        {isEditForm ? 
          <ProjectEditForm
            item={item}
            setIsEditForm={setIsEditForm}
            dispatch={dispatch}
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
                {item.from_date} ~ {item.to_date}
              </Card.Text>
            </Col>

            <Col className="p-0 text-center">
            { isEditable && 
              <Col>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditForm(true)}
                >편집</Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={deleteHandler}
                >삭제</Button>
              </Col>
            }
            </Col>
          </>
        }
      </Row>
    </Card>
  )
}

export default ProjectCard