import React, {useState, useEffect} from "react";
import * as Api from "../../api";

import AddProject from "./AddProject"
import ProjectCard from "./ProjectCard"

import {Button, Row, Col, Card} from "react-bootstrap";




const Project = ({portfolioOwnerId, isEditable}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [projects, setProjects] = useState([])

  // projects가 다른 파일에서 props로 전달되어 업데이트 됐을 때 호출하면 컴포넌트 렌더링 가능
  const fetchAPI = async () => {
    try{
      const res = await Api.get("projectlist", portfolioOwnerId)
      setProjects(res.data)
    } catch(e){
      // setProjects([])
    }
    
  }
  // get projects data
  useEffect(() => {
      fetchAPI()
  },[portfolioOwnerId])

  return (
<>
  <Row>
    <Col>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title style={{textAlign: "left"}}>Project</Card.Title>

          {/* 프로젝트가 추가 되었을 때, 편집 화면과 추가 내용 */}
            {projects && projects.map((item, index) => 
              <ProjectCard
                item={item}
                projects={projects}
                setProjects={setProjects}
                isEditable={isEditable}
                fetchAPI={fetchAPI}
              />
            )}
            {/* 포트폴리오 주인이 아니면 수정이 불가 */}
            {isEditable &&
             <Button
                onClick={() => setIsEditing(true)}
                variant="primary"
                className="mb-3"
             >추가</Button>
            }
            {isEditing &&
              <AddProject
                setIsEditing={setIsEditing}
                projects={projects}
                setProjects={setProjects}
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