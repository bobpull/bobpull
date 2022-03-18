import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Form } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({
  id,
  setIsEditing,
  _title,
  _description,
  awards,
  setAwards,
}) {
  const [title, setTitle] = useState(_title);
  const [description, setDescription] = useState(_description);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      Api.put(`awards/${id}`, {
        id,
        title,
        description,
      });
      setAwards(awards.map((award) => award._id === id ? { ...award, title, description } : award ));
      setIsEditing(false);
    } catch (err) {
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
          />
        </Form.Group>

        <Form.Group controlId="userEditDescription" className="mb-3">
          <Form.Control
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>

        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
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