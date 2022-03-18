import { useState } from "react";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import CertificateEditForm from "./CertificateEditForm";
import * as Api from "../../api";

function CheckModal({ show, setShow, _id }) {
  async function handleDelete() {
    try {
      await Api.delete("certificates/" + _id);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>삭제하시겠습니까?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            해당 자격증을 삭제하시겠습니까? 삭제 후의 동작은 되돌릴 수 없습니다.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShow(false);
              handleDelete();
            }}
          >
            삭제
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}

function CertificateCard({ certificate, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  // modal 창을 관리하기 위한 상태를 useState로 정의
  const [show, setShow] = useState(false);

  return (
    <>
      {!isEditing ? (
        <>
          <Card.Text>
            <Row className="align-itmes-center">
              <Col>
                {certificate.title}
                <br />
                <span className="text-muted">{certificate.description}</span>
                <br />
                <span className="text-muted">{certificate.when_date}</span>
              </Col>
              {isEditable && (
                <>
                  <Col className="col-lg-1">
                    <Button
                      className="mr-3"
                      variant="outline-info"
                      size="sm"
                      onClick={() => {
                        setIsEditing(true);
                      }}
                    >
                      편집
                    </Button>
                  </Col>
                  <Col className="col-lg-1">
                    <Button
                      className="mr-3"
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        setShow(true);
                      }}
                    >
                      삭제
                    </Button>
                  </Col>
                </>
              )}
            </Row>
          </Card.Text>
          <CheckModal show={show} setShow={setShow} _id={certificate._id} />
        </>
      ) : (
        <CertificateEditForm
          certificate={certificate}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

export default CertificateCard;
