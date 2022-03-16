import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import CertificateEditForm from "./CertificateEditForm";
import CertificateCard from "./CertificateCard";
import * as Api from "../../api";

function Certificate({ portfolioOwnerId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [addCertificate, setAddCertificate] = useState(false);
  const [certificates, setCertificates] = useState([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
    Api.get("certificatelist", portfolioOwnerId).then((res) =>
      setCertificates(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card className="ml-2">
      <Card.Body>
        <Card.Title>자격증</Card.Title>

        {certificates.map((v) => (
          <CertificateCard certificate={v} setIsEditing={setIsEditing} />
        ))}

        <Button
          onClick={() => {
            setAddCertificate(true);
          }}
        >
          +
        </Button>

        {addCertificate && (
          <CertificateEditForm
            user={user}
            setAddCertificate={setAddCertificate}
            setIsEditing={setIsEditing}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificate;
