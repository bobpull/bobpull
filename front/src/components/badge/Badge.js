import React, {useState, useEffect, useRef} from "react"
import {Card, Row, Col, Badge} from "react-bootstrap";
import * as Api from "../../api.js"
import "../../style/display.css"

import BadgeLock from "./BadgeLock"

// const badgeName = ["pull", "bowl", "egg", "spam", "cleanCode", "css3", "dj", "es6", "GraphQL", "grid", "html5", "JS", "MongoDB", "NestJS", "nodejs", "Pug", "python", "ReactNative", "React", "socketio", "typescript", "websockets"];

// const badgeUrlList = ["pull.png", "bowl.png", "egg.png", "spam.png", "cleanCode.png", "css3.png", "dj.png", "es6.png", "GraphQL.png", "grid.png", "html5.png", "JS.png",  "MongoDB.png", "NestJS.png", "nodejs.png", "Pug.png", "python.png", "ReactNative.png", "React.png", "socketio.png", "typescript.png", "websockets.png"];

//일단 인덱스를 저장해

const imgUrl = [
  {
    url: `${process.env.PUBLIC_URL}/img/pull.png`,
    name: "pull",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/bowl.png`,
    name: "bowl",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/egg.png`,
    name: "egg",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/spam.png`,
    name: "spam",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/cleanCode.png`,
    name: "cleanCode",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/css3.png`,
    name: "css3",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/dj.png`,
    name: "dj",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/es6.png`,
    name: "es6",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/GraphQL.png`,
    name: "Graph_QL",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/grid.png`,
    name: "grid",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/html5.png`,
    name: "html5",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/JS.png`,
    name: "JS",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/MongoDB.png`,
    name: "MongoDB",
    isOpen: true
  },
  {
    url: `${process.env.PUBLIC_URL}/img/NestJS.png`,
    name: "Nest_JS",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/nodejs.png`,
    name: "nodejs",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/Pug.png`,
    name: "Pug",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/python.png`,
    name: "python",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/ReactNative.png`,
    name: "clean-React_Native",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/React.png`,
    name: "React",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/socketio.png`,
    name: "socketio",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/typescript.png`,
    name: "typescript",
    isOpen: false
  },
  {
    url: `${process.env.PUBLIC_URL}/img/websockets.png`,
    name: "websockets",
    isOpen: false
  },
]
const Skill = ({portfolioOwnerId, isEditable}) => {

  const imgRef = useRef()
  const [badges, setBadges] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await Api.get("badgelist", portfolioOwnerId)
      console.log(res.data)
      setBadges(res.data.map(item => item.id))
    }
    fetchAPI()
  }, [portfolioOwnerId])
  /*
  BadgeRouter.post("/badge/:id",
  BadgeRouter.get("/badges/:id",
  BadgeRouter.get("/badgelist/:user_id",
  */

  const openBadge = async (index) => {
    try {
       await Api.post(`badge/${index}`)
      setBadges(cur => {
          return [
            ...cur,
            index
          ]
      })
    }catch(e){
      
    }
  }

  return <Card className="mb-3">
    <Card.Body>
      <Row xs="4" sm="5" md="6" lg="5" className="jusify-content-center">
        {imgUrl.map((bedge, index) => (
          <Col className="mb-3 col-center colBox"  onClick={openBadge}>
            <Card.Img
              key={index}
              className={badges.includes(index.toString()) ? "cardImg spinAni" : "cardImg opacity"}
              src={bedge.url}
              ref={imgRef}
              onClick={() => {
                if(isEditable && !badges.includes(index.toString())){
                  openBadge(index.toString())
                }
                else return
              }}
            />
            {!badges.includes(index.toString()) && <BadgeLock/>}
            <Badge pill bg="light" text="dark">
              {bedge.name}
            </Badge>
          </Col>
          
        ))}
      </Row>
      
    </Card.Body>
  </Card>
}

export default Skill