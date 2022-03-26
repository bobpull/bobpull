import React, { useState, useEffect, useRef, useContext } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { setDefaultLocale } from "react-datepicker";
import * as Api from "../../api.js";
import "../../style/display.css";

import BadgeLock from "./BadgeLock";
import { TallContext } from "../../context/TallContext";

const imgUrl = [
  {
    url: `${process.env.PUBLIC_URL}/img/pull.png`,
    name: "pull",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/bowl.png`,
    name: "bowl",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/egg.png`,
    name: "egg",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/spam.png`,
    name: "spam",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/cleanCode.png`,
    name: "cleanCode",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/css3.png`,
    name: "css3",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/dj.png`,
    name: "dj",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/es6.png`,
    name: "es6",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/GraphQL.png`,
    name: "Graph_QL",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/grid.png`,
    name: "grid",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/html5.png`,
    name: "html5",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/JS.png`,
    name: "JS",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/MongoDB.png`,
    name: "MongoDB",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/NestJS.png`,
    name: "Nest_JS",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/nodejs.png`,
    name: "nodejs",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/Pug.png`,
    name: "Pug",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/python.png`,
    name: "python",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/ReactNative.png`,
    name: "clean-React_Native",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/React.png`,
    name: "React",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/socketio.png`,
    name: "socketio",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/typescript.png`,
    name: "typescript",
  },
  {
    url: `${process.env.PUBLIC_URL}/img/websockets.png`,
    name: "websockets",
  },
];

const Skill = ({ portfolioOwnerId, isEditable }) => {
  const imgRef = useRef();
  const [badges, setBadges] = useState([]);
  const { setTall } = useContext(TallContext);
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await Api.get("badgelist", portfolioOwnerId);
      setBadges(res.data.map((item) => item.id));
    };
    fetchAPI();
  }, [portfolioOwnerId]);

  const openBadge = async (index) => {
    try {
      const res = await Api.post(`badge/${index}`);
      setBadges((cur) => {
        return [...cur, index];
      });
      setTall(res.data[1]);
    } catch (e) {}
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row xs="4" sm="5" md="6" lg="5" className="jusify-content-center">
          {imgUrl.map((bedge, index) => (
            <Col className="mb-3 col-center colBox" onClick={openBadge}>
              <Card.Img
                key={index}
                className={
                  badges.includes(index.toString())
                    ? "cardImg spinAni"
                    : "cardImg opacity"
                }
                src={bedge.url}
                ref={imgRef}
                onClick={() => {
                  if (isEditable && !badges.includes(index.toString())) {
                    openBadge(index.toString());
                  } else return;
                }}
              />
              {!badges.includes(index.toString()) && <BadgeLock />}
              <Badge pill bg="light" text="dark">
                {bedge.name}
              </Badge>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Skill;
