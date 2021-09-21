import React from 'react';
import "./homeScreen.scss"

function HomeScreen(props) {

  var message = props.name

  return (
    <div class="content homeScreen">
    <div class="content__container">
      <p class="content__container__text" style={{fontSize:"40%", paddingTop:"1%"}}>
        Hello, {message} !
      </p>
    </div>
  </div>
  );
}

export default HomeScreen;
