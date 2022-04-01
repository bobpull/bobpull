import React, { useState, useContext } from "react";
import * as Api from "../../api";
import { Button, Card, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import ProjectEditForm from "./ProjectEditForm";

import { ProjectContext } from "../../context/ProjectContext";

const ProjectCard = ({ project, isEditable }) => {
  const { dispatch } = useContext(ProjectContext);
  const [isEditForm, setIsEditForm] = useState(false);

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
    try {
      await Api.delete("projects", project.id);
      dispatch({ type: "delete-project", payload: `${project.id}` });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card className="mb-3" style={{ textAlign: "left", border: "none" }}>
      <Row className="justify-content-lg-around">
        {isEditForm ? (
          <ProjectEditForm project={project} setIsEditForm={setIsEditForm} />
        ) : (
          <>
            <Col className="col-sm-9 col-md-9 col-lg-9 col-xl-9">
              <Card.Text className="mb-0">{project.title}</Card.Text>
              <Card.Text className=" mb-0 text-muted">
                {project.description}
              </Card.Text>
              <Card.Text className=" mb-0 text-muted">
                <a
                  href={"//" + project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#6c757d" }}
                >
                  {project.url}
                </a>
              </Card.Text>
              <Card.Text className="text-muted mb-2">
                {project.from_date.toString().substr(0, 10)} ~{" "}
                {project.to_date.toString().substr(0, 10)}
              </Card.Text>
            </Col>
            <Col className="p-0 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-center">
              {isEditable && (
                <>
                  <Button
                    className="mx-3"
                    variant="outline-info"
                    size="sm"
                    onClick={() => setIsEditForm(true)}
                  >
                    편집
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleClick}
                  >
                    삭제
                  </Button>
                </>
              )}
            </Col>
          </>
        )}
      </Row>
    </Card>
  );
};

export default ProjectCard;
