import { useState, useContext } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import CertificateEditForm from "./CertificateEditForm";
import { CertificatesContext } from "./Certificate";
import * as Api from "../../api";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function CertificateCard({ certificate, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const { setCertificates } = useContext(CertificatesContext);

  async function handleDelete() {
    try {
      await Api.delete("certificates/" + certificate.id);
      setCertificates((cur) => cur.filter((v) => v.id !== certificate.id));
    } catch (err) {
      console.log(err);
      alert("자격증 삭제를 실패하였습니다.");
    }
  }

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
      handleDelete();
    }
  };

  return (
    <>
      {!isEditing ? (
        <>
          <Card.Text>
            <Row className="justify-content-lg-around">
              <Col className="col-sm-9 col-md-9 col-lg-9 col-xl-9">
                {certificate.title}
                <br />
                <span className="text-muted">{certificate.description}</span>
                <br />
                <span className="text-muted">{certificate.issued_at}</span>
              </Col>
              <Col className="p-0 col-sm-3 col-md-3 col-lg-3 col-xl-3 text-center">
                {isEditable && (
                  <>
                    <Button
                      className="mx-3"
                      variant="outline-info"
                      size="sm"
                      onClick={() => {
                        setIsEditing(true);
                      }}
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
