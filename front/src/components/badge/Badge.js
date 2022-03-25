import React, {useState, useEffect, useRef} from "react"
import {Card, Row, Col, Badge} from "react-bootstrap";
import * as Api from "../../api.js"
import "../../style/display.css"

import BadgeLock from "./BadgeLock"

const imgUrl = [
  {
    url: "img/clean-code.png",
    name: "clean-code",
  },
  {
    url: "img/css3.png",
    name: "css3",
  },
  {
    url: "img/dj.png",
    name: "dj",
  },
  {
    url: "img/es6.png",
    name: "es6",
  },
  {
    url:"img/Graph_QL.png",
    name: "Graph_QL",
  },
  {
    url: "img/grid.png",
    name: "grid",
  },
  {
    url: "img/html5.png",
    name: "html5",
  },
  {
    url: "img/JS.png",
    name: "JS",
  },
  {
    url: "img/MongoDB.png",
    name: "MongoDB",
  },
  {
    url: "img/Nest_JS.png",
    name: "Nest_JS",
  },
  {
    url: "img/nodejs.png",
    name: "nodejs",
  },
  {
    url: "img/Pug.png",
    name: "Pug",
  },
  {
    url: "img/python.png",
    name: "python",
  },
  {
    url: "img/React_Native.png",
    name: "clean-React_Native",
  },
  {
    url: "img/React.png",
    name: "React",
  },
  {
    url: "img/socketio.png",
    name: "socketio",
  },
  {
    url: "img/typescript.png",
    name: "typescript",
  },
  {
    url: "img/websockets.png",
    name: "websockets",
  },
]

const Skill = ({portfolioOwnerId, isEditable}) => {
  const imgRef = useRef()
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const res = await Api.get("badgelist", portfolioOwnerId)
      setBadges(res.data)
      
    }
    fetchAPI()
  }, [portfolioOwnerId])

  const openBadge = async (e) => {
    /*
    const res = await Api.post("bedge/create", {
      user_id: portfolioOwnerId
      title: e.target.name,
      price: 3 or 10,
      have: true,
    })
    
     */
  }

  return <Card className="mb-3">
    <Card.Body>
      <Row xs="4" sm="5" md="6" lg="5" className="jusify-content-center">
        {imgUrl.map((bedge, index) => (
          <Col className="mb-3 col-center colBox">
            <Card.Img
              className={badges.isOpen ? "cardImg" : "cardImg opacity"}
              src={bedge.url}
              ref={imgRef}
              isClick={openBadge}
            />
            {!badges.isOpen && <BadgeLock/>}
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