import "./notices.css"
import React from 'react';

function Notices() {
  return (
    <div class="col-sm noticess">
    <h6 style={{width:"100%", fontSize:"15px", marginLeft:"-30%", textDecoration:"underline"}}>Notices and Announcements</h6>
    <div class="notice info"><p>This is a an info notice, it provides feedback of a neutral nature to the user.</p></div>
    <div class="notice info"><p>This is a an info notice, it provides feedback of a neutral nature to the user.</p></div>
    <div class="notice info"><p>This is a an info notice, it provides feedback of a neutral nature to the user.</p></div>
</div>
  );
}

export default Notices;
