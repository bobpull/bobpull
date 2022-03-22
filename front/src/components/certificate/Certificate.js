import { useState, useEffect, createContext } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import CertificateAddForm from "./CertificateAddForm";
import CertificateCard from "./CertificateCard";
import * as Api from "../../api";

export const CertificatesContext = createContext(null);

function Certificate({ portfolioOwnerId, isEditable }) {
  const [addCertificate, setAddCertificate] = useState(false);
  const [certificates, setCertificates] = useState([]);

  const Certificates = { certificates, setCertificates };

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("certificatelist", portfolioOwnerId)
      .then((res) => {
        setCertificates(res.data);
      })
      .catch((err) => {
        setCertificates([]);
      });
  }, [portfolioOwnerId]);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>자격증</Card.Title>

        <CertificatesContext.Provider value={Certificates}>
          {certificates.map((v) => (
            <CertificateCard
              key={v.id}
              certificate={v}
              isEditable={isEditable}
            />
          ))}

          {isEditable && (
            <Row className="mt-3 mb-3 text-center">
              <Col>
                <Button
                  className="btn-primary"
                  onClick={() => {
                    setAddCertificate(true);
                  }}
                >
                  +
                </Button>
              </Col>
            </Row>
          )}

          {addCertificate && (
            <CertificateAddForm setAddCertificate={setAddCertificate} />
          )}
        </CertificatesContext.Provider>
      </Card.Body>
    </Card>
  );
}

export default Certificate;
