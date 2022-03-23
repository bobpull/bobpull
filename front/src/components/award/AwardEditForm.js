import React, { useState, useContext } from "react";
import { AwardsContext } from "./Award";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Form } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ id, setIsEditing, _title, _description }) {
  const [title, setTitle] = useState(_title);
  const [description, setDescription] = useState(_description);
  const { setAwards } = useContext(AwardsContext);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Api.put(`awards/${id}`, {
        id,
        title,
        description,
      });
      setAwards((cur) =>
        cur.map((award) => award.id === id ? { ...award, title, description } : award)
      );
      setIsEditing(false);
    } catch (err) {
      alert('동일한 수상 이력을 중복으로 등록할 수 없습니다.');
      console.error(err);
    }
  };

  return (
    <>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <Form.Group controlId="useEditTitle" className="mb-3">
          <Form.Control
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="userEditDescription" className="mb-3">
          <Form.Control
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </Form.Group>

        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm>
            <Button variant="primary" type="submit" className="me-3">
              확인
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}

export default AwardEditForm;
