import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import * as Api from "../../api";

function EducationDeleteModal({ show, onHide, id, educations, setEducations }) {
  const handleDelete = (e) => {
    e.preventDefault();

    try {
      Api.delete(`educations/${id}`);
      setEducations(educations.filter((education) => education._id !== id));
    } catch (err) {
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

export default EducationDeleteModal;
