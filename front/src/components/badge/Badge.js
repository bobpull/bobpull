import React, { useState, useEffect, useRef, useContext } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { setDefaultLocale } from "react-datepicker";
import * as Api from "../../api.js";
import "../../style/display.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import BadgeLock from "./BadgeLock";
import { TallContext } from "../../context/TallContext";
import { imgUrl } from "./BadgeList";

const Skill = ({ portfolioOwnerId, isEditable }) => {

  const handleClick = async (index) => {
    const MySwal = withReactContent(Swal);

    const result = await MySwal.fire({
      title: (
        <p>
          {index < 4 ? "10" : "3"}톨입니다. <br />
          구매 할래요?
        </p>
      ),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0B5ED7",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      openBadge(index);
    }
  };

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
      <Card.Body className="cardBody">
        <Row xs="4" sm="5" md="6" lg="5" className="jusify-content-center">
          {imgUrl.map((bedge, index) => (
            <Col className="mb-3 col-center colBox">
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
                    handleClick(index.toString());
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