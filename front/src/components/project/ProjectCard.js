import React, {useState, useContext} from "react"
import * as Api from "../../api";
import {Button, Card, Col, Row} from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import ProjectEditForm from "./ProjectEditForm";

import {ProjectContext} from "../../context/ProjectContext"


const ProjectCard = ({index, isEditable }) => {
  const {projects, dispatch} =useContext(ProjectContext)
  const [isEditForm, setIsEditForm] = useState(false)

  const handleClick = async () => {
    const MySwal = withReactContent(Swal);

    const result = await MySwal.fire({
      title: <p>해당 정보를 삭제하시겠습니까?</p>,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#0B5ED7",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      deleteHandler();
    }
  };

  const deleteHandler = async () => {
    try{
      await Api.delete("projects", projects[index].id)
      dispatch({type: 'delete-project', payload: `${projects[index].id}` })
    } catch(e){
      console.error(e)
    }
  }

  return (
    <Card className="mb-3" style={{textAlign: "left", border: "none"}} >
      <Row>
        {isEditForm ? 
          <ProjectEditForm
            index={index}
            setIsEditForm={setIsEditForm}
          /> : 
          <>
            <Col sm="11">
              <Card.Text className="mb-0" >
                {projects[index].title}
              </Card.Text>
              <Card.Text className=" mb-0 text-muted">
                {projects[index].description}
              </Card.Text>
              <Card.Text className="text-muted mb-2">
                {projects[index].from_date} ~ {projects[index].to_date}
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
                  onClick={handleClick}
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