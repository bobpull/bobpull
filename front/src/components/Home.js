import React from 'react'
import "../style/Home.css"

const Home = () => {
  return (
    <div className="homeContainer">
        <div className="homeBox">
          <h1 className="HomeTitle">웹 서비스 팀 프로젝트</h1>
          <div className="subBox">
            <p className="subTitle">밥풀(pull)</p>
            <img className="tall" src={`${process.env.PUBLIC_URL}/img/tall.png`} alt="톨"/>
          </div>
          <div className="imgBox">
            <img src={`${process.env.PUBLIC_URL}/img/pull.png`} alt="밥풀이"/>
            <img src={`${process.env.PUBLIC_URL}/img/egg.png`} alt="에그밥풀이"/>
            <img src={`${process.env.PUBLIC_URL}/img/spam.png`} alt="스팸밥풀이"/>
          </div>
        </div>
    </div>
  )
}

export default Home
