import React, {useState, useEffect, useContext} from "react";
import * as Api from "../../api";

import AddProject from "./AddProject"
import ProjectCard from "./ProjectCard"
import {ProjectContext} from "../../context/ProjectContext"

import {Button, Row, Col, Card, OverlayTrigger, Tooltip} from "react-bootstrap";
import { AiFillQuestionCircle } from "react-icons/ai";

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
          <Card.Title style={{textAlign: "left"}}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>프로젝트</span>
              {isEditable && (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="award-tooltip">
                      지원하는 직무와 관련 있는 프로젝트를 작성해주세요.
                    </Tooltip>
                  }
                >
                  <span style={{ color: "#bfbfbf", marginLeft: 8 }}>
                    <AiFillQuestionCircle size={22} />
                  </span>
                </OverlayTrigger>
              )}
            </div>
          </Card.Title>

          {/* 프로젝트가 추가 되었을 때, 편집 화면과 추가 내용 */}
            {projectFilterUserId && projectFilterUserId.map((item, index) => 
              <ProjectCard
                key={item.id}
                project={item}
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