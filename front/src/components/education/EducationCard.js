import React, { useState, useContext } from "react";
import { EducationsContext } from "./Education";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Card } from "react-bootstrap";
import * as Api from "../../api";
import EducationEditForm from "./EducationEditForm";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function EducationCard({ id, isEditable, school, major, degree }) {
  const [isEditing, setIsEditing] = useState(false);
  const { setEducations } = useContext(EducationsContext);

  const handleDelete = async () => {
    try {
      await Api.delete(`educations/${id}`);
      setEducations((cur) => cur.filter((education) => education.id !== id));
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
          <EducationEditForm
            id={id}
            setIsEditing={setIsEditing}
            _school={school}
            _major={major}
            _degree={degree}
          />
        </Row>
      ) : (
        <Card.Text>
          <Row className="justify-content-lg-around">
            <Col className="col-sm-9 col-md-9 col-lg-9 col-xl-9">
              <span>{school}</span>
              <br />
              <span className="text-muted">
                {major} ({degree})
              </span>
            </Col>

            <Col className="p-0 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-center">
              {isEditable && (
                <>
                  <Button
                    className="mx-3"
                    variant="outline-info"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    편집
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleClick}
                  >
                    삭제
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Card.Text>
      )}
    </>
  );
}

export default EducationCard;
