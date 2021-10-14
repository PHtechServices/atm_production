import "./chatBar.scss"
import React from 'react';

function ChatBar() {
  return (
<div class="container-fluid">
  <div class="people-list" id="people-list">
    <div class="search" style={{border:"black", borderWidth:"10px"}}>
      <input type="text" placeholder="search"/>
      <i class="fa fa-search"></i>
    </div>
    <ul class="list people">
      <li class="clearfix person" data-chat="person1">
        <img class="img-circle" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
        <div class="about">
          <div class="name">Vincent Porter</div>
          <div class="status">
            <i class="fa fa-circle online"></i> online
          </div>
        </div>
      </li>

      <li class="clearfix person" data-chat="person2">
        <img class="img-circle" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_02.jpg" alt="avatar" />
        <div class="about">
          <div class="name">Aiden Chavez</div>
          <div class="status">
            <i class="fa fa-circle offline"></i> left 7 mins ago
          </div>
        </div>
      </li>

      <li class="clearfix person" data-chat="person3">
        <img class="img-circle" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_03.jpg" alt="avatar" />
        <div class="about">
          <div class="name">Mike Thomas</div>
          <div class="status">
            <i class="fa fa-circle online"></i> online
          </div>
        </div>
      </li>

      <li class="clearfix person" data-chat="person4">
        <img class="img-circle" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_04.jpg" alt="avatar" />
        <div class="about">
          <div class="name">Erica Hughes</div>
          <div class="status">
            <i class="fa fa-circle online"></i> online
          </div>
        </div>
      </li>


    </ul>
  </div>
</div>
);
}

export default ChatBar;