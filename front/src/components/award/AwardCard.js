import React, { useState, useContext } from "react";
import { AwardsContext } from "./Award";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Card } from "react-bootstrap";
import * as Api from "../../api";
import AwardEditForm from "./AwardEditForm";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


function AwardCard({ id, isEditable, title, description }) {
  const [isEditing, setIsEditing] = useState(false);
  const { setAwards } = useContext(AwardsContext);

  const handleDelete = async () => {
    try {
      await Api.delete(`awards/${id}`);
      setAwards((cur) => cur.filter((award) => award.id !== id));
    } catch (err) {
      alert("삭제 실패");
      console.error(err);
    }
  };

  const handleClick = async () => {
    const MySwal = withReactContent(Swal);

    const result = await MySwal.fire({
      title: <p>해당 정보를 삭제하시겠습니까?</p>,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#0B5ED7",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      await handleDelete();
    }
  };

  return (
    <>
      {isEditing ? (
        <Row>
          <AwardEditForm
            id={id}
            setIsEditing={setIsEditing}
            _title={title}
            _description={description}
          />
        </Row>
      ) : (
        <Card.Text>
          <Row>
            <Col>
              <span>{title}</span>
              <br />
              <span className="text-muted">{description}</span>
            </Col>

            {isEditable && (
              <Col lg="1">
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            )}

            {isEditable && (
              <Col lg="1">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleClick}
                >
                  삭제
                </Button>
              </Col>
            )}
          </Row>
        </Card.Text>
      )}
    </>
  );
}

export default AwardCard;
