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
        console.log(err);
      });
  }, [portfolioOwnerId]);

  return (
    <Card className="ml-2">
      <Card.Body>
        <Card.Title>자격증</Card.Title>

        <CertificatesContext.Provider value={Certificates}>
          {certificates.map((v) => (
            <CertificateCard certificate={v} isEditable={isEditable} />
          ))}
        </CertificatesContext.Provider>

        {isEditable && (
          <Row className="mt-3 mb-4 text-center">
            <Col className="col-sm-20">
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

        <CertificatesContext.Provider value={Certificates}>
          {addCertificate && (
            <CertificateAddForm setAddCertificate={setAddCertificate} />
          )}
        </CertificatesContext.Provider>
      </Card.Body>
    </Card>
  );
}

export default Certificate;
