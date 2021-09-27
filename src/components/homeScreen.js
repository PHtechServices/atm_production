import React from 'react';
import "./homeScreen.scss"

function HomeScreen(props) {

  var message = props.name


  return (
    <div class="content homeScreen">
 <div class="wrapper"> 

  <main>
    <div class="wrapper">
      <div class="block">
        <h1>Hello, {message}.</h1>
        <h3>Good Morning!</h3><br/>
        <p>Quote of the Day</p>
        <p class="intro">Teachers have three loves: love of learning, love of learners, and the love of bringing the first two loves together. – Bob Talbert</p>
        <p>Let's see what's in your To-Do List Today</p>
        <a href="/" class="button">View Tasks</a>
      </div>
      <div class="block">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/48935/hello.jpg" alt="An illustration of me in profile" />
      </div>
    </div>
  </main>
</div>
    </div>
  );
}

export default HomeScreen;
