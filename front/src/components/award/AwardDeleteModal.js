import React, { useContext } from "react";
import { AwardsContext } from "./Award";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import * as Api from "../../api";

function AwardDeleteModal({ show, onHide, id }) {
  const { setAwards } = useContext(AwardsContext);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await Api.delete(`awards/${id}`);
      setAwards((cur) => cur.filter((award) => award.id !== id));
    } catch (err) {
      alert('삭제 실패');
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>선택하신 정보를 삭제하시겠습니까?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          아니오
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          네
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AwardDeleteModal;
