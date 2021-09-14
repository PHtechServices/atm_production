import React from 'react';
import "../css/quickGlance.css";

function QuickGlance() {

  return (
    <div class="container" id="glance">
      <div class="col">
      <div class="row-12"><h6>Quick Glance of your Tasks</h6></div>
        <div class="row-12">
            <p>Tasks Assigned to You</p>
            <ol>
              <li><a href="#">Finish Physics by Friday</a></li>
              <li><a href="#">Correct Mathematics Copies by End of the Day</a></li>
              <li><a href="#">Burn 3000 Calories for Students</a></li>
              <li><a href="#">Organize CS Workshop</a></li>
          </ol>
        </div>
        <div class="row-12">
            <p>Tasks to be Approved</p>
            <ol>
              <li><a href="#">Corrected Physics Papers</a></li>
              <li><a href="#">Organize a Hackathon</a></li>
              <li><a href="#">Students Copy Rechecking</a></li>
              <li><a href="#">Approval of Budget</a></li>
          </ol>
        </div>
        <div class="row-12">
            <p>Urgent Actions to be Taken</p>
            <ol>
              <li><a href="#">Approval of Budget</a></li>
              <li><a href="#">Students Copy Rechecking</a></li>
          </ol>
        </div>
      </div></div>
  );
}

export default QuickGlance;
