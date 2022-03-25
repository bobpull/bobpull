import React, { useState, useRef, useContext } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import {ProfileContext} from "../../context/ProfileContext"
import * as Api from "../../api";
import "../../style/display.css";

function UserEditForm({ user, setIsEditing, setUser }) {
  const {profile, dispatch} = useContext(ProfileContext)
  const imgRef = useRef()
  const [info, setInfo] = useState({
    name: user.name,
    email: user.email,
    description: user.description
  })
  const [image, setImage] = useState({
    id: user.id,
    url: "http://placekitten.com/200/200"
  })

  const handleChange = (e) => {
      setInfo(cur => {
        return {
          ...cur,
          [e.target.name]: e.target.value
        }
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      // userInfo
      const res = await Api.put(`users/${user.id}`, info);
      const updatedUser = res.data;
      setUser(updatedUser);
      setIsEditing(false);

      // ProfileInfo
      // await Api.put(`profile/${user.id}`,{toUpdate: image.url})
      dispatch({type: "update-profile", payload: image})
    }catch(e){
      console.log(e)
    }
  };

  const handleProfile = (e) => {
    setImage(cur => {
      const newImg = e.target.files
      return{
        ...cur, 
        url: URL.createObjectURL(newImg[0])}
    })

  }

  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
        <Card.Img
          ref={imgRef}
          style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px", cursor: "pointer" }}
          src={image.url}
          alt="프로필 사진"
          onClick={() => {imgRef.current.click()}}
        />
        <Form.Group controlId="useEditprofile" className="mb-3 ">
        <Form.Control
          style={{display: "none"}}
          type="file"            
          name="image"
          ref={imgRef}
          accept="image/jpg, image/jpeg, image/png"
          onChange={handleProfile}
        />
        </Form.Group>
        {/* 이름 변경 */}
        <Form.Group controlId="useEditName" className="mb-3">
          <Form.Control
            type="text"
            placeholder="이름"
            value={info.name}
            name="name"
            onChange={handleChange}
          />
        </Form.Group>
        {/* 이메일은 변경 안됩니다.*/}
        <Form.Group controlId="userEditEmail" className="mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="이메일"
            value={info.email}
            disabled={true}
            onChange={handleChange}
          />
        </Form.Group>
        {/* 상세설명 수정 */}
        <Form.Group controlId="userEditDescription">
          <Form.Control
            type="text"
            name="description"
            placeholder="정보, 인사말"
            value={info.description}
            onChange={handleChange}
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
