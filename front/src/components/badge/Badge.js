import React, { useState, useEffect, useRef, useContext } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { setDefaultLocale } from "react-datepicker";
import * as Api from "../../api.js";
import "../../style/display.css";

import BadgeLock from "./BadgeLock";
import { TallContext } from "../../context/TallContext";

import {imgUrl} from "./BadgeList"

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
