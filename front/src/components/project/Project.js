import React, {useState, useEffect, useContext} from "react";
import * as Api from "../../api";

import AddProject from "./AddProject"
import ProjectCard from "./ProjectCard"
import {ProjectContext} from "../../context/ProjectContext"

import {Button, Row, Col, Card} from "react-bootstrap";

const Project = ({portfolioOwnerId, isEditable}) => {
  const [isEditing, setIsEditing] = useState(false)
  const {projects, dispatch} = useContext(ProjectContext)

  useEffect(() => {
    const fetchAPI = async () => {
      try{
        const res = await Api.get("projectlist", portfolioOwnerId)
        dispatch({type: "update-project", payload: res.data})
      } catch(e){
        console.log(e)
      }
    }
      fetchAPI()
  },[portfolioOwnerId] )

  const projectFilterUserId = projects.filter((project) => project.user_id === portfolioOwnerId)

  return (
<>
  <Row>
    <Col>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title style={{textAlign: "left"}}>프로젝트</Card.Title>

          {/* 프로젝트가 추가 되었을 때, 편집 화면과 추가 내용 */}
            {projectFilterUserId && projectFilterUserId.map((item, index) => 
              <ProjectCard
                key={item.id}
                index={index}
                isEditable={isEditable}
              />
            )}
            {/* 포트폴리오 주인이 아니면 수정이 불가 */}
            {isEditable &&
            <Row className="mt-3 mb-3 text-center">
              <Col>
                <Button
                    onClick={() => setIsEditing(true)}
                    variant="primary"  
                >+</Button>
              </Col>
             </Row>
            }
            {isEditing &&
              <AddProject
                setIsEditing={setIsEditing}
              />
          }
        </Card.Body>
      </Card>
    </Col>
  </Row>
</>
  );
}

export default Project