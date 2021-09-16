import React from 'react';
import "./homeScreen.css"

function HomeScreen(props) {

  var message = props.name

  return (
    <div id="homeScreen">
        <p id="welcomeText">{message}</p>
    </div>
  );
}

export default HomeScreen;
