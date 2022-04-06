import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({ user, imageSrc, setImageSrc, setIsEditing, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  
  //이미지 불러오기
  const getOneImage = async () => {
    const container = document.getElementById("img-container");
    try {
      const response = await fetch("http://localhost:5000/profileimg", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      });

      console.log(response);
      const blobImg = await response.blob();
      console.log(blobImg);

      const imgUrl = URL.createObjectURL(blobImg);
      console.log(imgUrl);
      setImageSrc(imgUrl);
    } catch (e) {
      container.innerHTML = e.message;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    //input으로 들어온 imgFile이 변했을 때 서버로 이미지를 업로드함.
    const FormInput = document.getElementById("userEditImg");
    const fileBlob = FormInput.files[0];

    const formData = new FormData();
    formData.append("myImg", fileBlob);
    const response = await fetch("http://localhost:5000/profileimg", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
      body: formData,
    });
    const jsonResult = await response.json();
    console.log(jsonResult);
    getOneImage();
    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  //이미지 blob을 base64로 인코딩한 문자열을 img url로 사용 가능!
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    //readAsDataURL함수는 File 또는 Blob을 읽은 뒤 base64로 인코딩한 문자열을 FileReader 인스턴스의 result라는 속성에 담아준다.
    //FileReader.onload는 FileReader가 성공적으로 파일을 읽었을때 트리거 되는 이벤트 핸들러이다.
    reader.readAsDataURL(fileBlob);

    reader.onload = () => {
      console.log(reader.result);
      setImageSrc(reader.result);
    };
  };

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription" className="mb-3">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <div className="preview text-center mb-4">
            {imageSrc && (
              <img
                style={{ width: "10rem", height: "8rem" }}
                src={imageSrc}
                alt="이미지 미리보기"
              />
            )}
          </div>
          <Form.Group controlId="userEditImg">
            <Form.Control
              name="myImg"
              type="file"
              accept="image/*"
              onChange={(e) => {
                //handleProfileImageChange(e.target.files[0]);
                //e.target.files를 사용하면 파일들을 가져올 수 있다.

                encodeFileToBase64(e.target.files[0]);
              }}
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
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;