import React, {useState, useEffect, useRef} from "react"
import {Card, Row, Col, Badge} from "react-bootstrap";
import * as Api from "../../api.js"
import "../../style/display.css"

import BadgeLock from "./BadgeLock"

const imgUrl = [
  {
    url: `${process.env.PUBLIC_URL}/img/clean-code.png`,
    name: "clean-code",
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
    url: `${process.env.PUBLIC_URL}/img/Graph_QL.png`,
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
    url: `${process.env.PUBLIC_URL}/img/Nest_JS.png`,
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
    url: `${process.env.PUBLIC_URL}/img/React_Native.png`,
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
  // setBadges([...imgUrl])
  console.log(badges)

  // useEffect(() => {
  //   const fetchAPI = async () => {
  //     const res = await Api.get("badgelist", portfolioOwnerId)
  //     setBadges(res.data)
  //   }
  //   fetchAPI()
  // }, [portfolioOwnerId])

  const openBadge = async (bedge) => {
  }

  return <Card className="mb-3">
    <Card.Body>
      <Row xs="4" sm="5" md="6" lg="5" className="jusify-content-center">
        {imgUrl.map((bedge, index) => (
          <Col className="mb-3 col-center colBox"  onClick={openBadge}>
            <Card.Img
              className={bedge.isOpen ? "cardImg spinAni" : "cardImg opacity"}
              src={bedge.url}
              ref={imgRef}
             
            />
            {!bedge.isOpen && <BadgeLock/>}
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