import React, {useState, useEffect, useReducer} from "react";
import * as Api from "../../api";

import AddProject from "./AddProject"
import ProjectCard from "./ProjectCard"

import {Button, Row, Col, Card} from "react-bootstrap";


const reducer = (state, action) => {
  switch(action.type){
    case 'update-project':
      return [...action.payload]
    case 'add-project':
      return [...state, action.payload]
    case 'delete-project':
      return state.filter((project) => project.id !== action.payload)
    case 'put-project': {
      console.log(action.payload)
      const id = action.payload.id
      const index = state.findIndex(x => x.id === id)
      state[index] = action.payload
      return [...state]
    }
      
    default:
      return state
  }

}

const initialState = []


const Project = ({portfolioOwnerId, isEditable}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [projects, dispatch] = useReducer(reducer,initialState)

  
 
  
  useEffect(() => {
    const fetchAPI = async () => {
      try{
        const res = await Api.get("projectlist", portfolioOwnerId)
        dispatch({type: "update-project", payload: res.data})
        console.log(projects)
        
      } catch(e){
        console.log(e)
      }
    }
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
                key={item.id}
                item={item}
                dispatch={dispatch}
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
                dispatch={dispatch}
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