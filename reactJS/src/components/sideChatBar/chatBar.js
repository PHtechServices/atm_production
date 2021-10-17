import "./chatBar.scss"
import React from 'react';
import ReactDOM from 'react-dom';
import MyProfile from "../profile/profile";

function ChatBar(props) {
  const viewProfile = (e) => {
    ReactDOM.render(
      <React.StrictMode>
        <MyProfile dd={props.name} mail={props.mail} classTeacher={props.classTeacher} rmEmail={props.rmEmail} 
        rmName={props.rmName} subjects={props.subjects}/>
      </React.StrictMode>,
      document.getElementById('dLogin'));
      ReactDOM.render(
      <React.StrictMode>
      </React.StrictMode>,
      document.getElementById('sideb'));
  }
  return (
    <div>
      <div class="feed-identity-module
    feed-identity-module--with-reflow artdeco-card overflow-hidden mb2" style={{marginTop:"12%", marginLeft:"-25%"}}>

        <div class="feed-identity-module__actor-meta profile-rail-card__actor-meta break-words">
          <div class="feed-identity-module__default-bg profile-rail-card__default-bg
        feed-identity-module__member-bg-image profile-rail-card__member-bg-image
         feed-identity-module__member-bg-image--with-reflow
        ">
          </div>

          <a href="/in/himanshu-singh-2264a350/" id="ember151" class="ember-view block">

            <img style={{ width: "200px", height: "160px" }} src="http://bootdey.com/img/Content/avatar/avatar6.png" loading="lazy" alt="Photo of Himanshu Singh" id="ember152" class="feed-identity-module__member-photo profile-rail-card__member-photo EntityPhoto-circle-5 lazy-image ember-view" />

            <div class="profile-rail-card__actor-link t-16 t-black t-bold" style={{ color: "rgb(0, 0, 0)", textAlign:"center"}}>
              Himanshu Singh
            </div>
          </a>

          <p class="identity-headline t-12 t-black--light t-normal mt1" style={{ color: "#9c9b9b", fontSize:"12px", textAlign:"center"}}>
            Vice President - Srishti World Schools
          </p>
        </div>
        <div class="feed-identity-module__widgets mv3" style={{ marginTop: "2%"}}>
          <div id="ember153" class="feed-identity-module__entity-list entity-list-wrapper ember-view">
                <div id="ember216" class="entity-item ember-view">  <a href="/me/profile-views/" id="ember217" class="ember-view full-width">
                  <div class="display-flex align-items-baseline">
                    <div class="text-align-left">
                      <div id="ember218" class="ember-view t-12 t-black--light t-bold mr2" style={{ color: "rgb(0, 0, 0)"}}>
                      <span>Tasks Completed till now:</span>&nbsp;&nbsp;<span class="feed-identity-widget-item__stat" style={{ color: "#9c9b9b"}}>
                        10
                      </span>  </div>
                    </div>
                  </div>
                </a>
                </div>
                <div id="ember219" class="entity-item ember-view">  <a href="/in/himanshu-singh-2264a350/detail/recent-activity/shares/" id="ember220" class="ember-view full-width">
                  <div class="display-flex align-items-baseline">
                    <div class="text-align-left">
                      <div id="ember221" class="ember-view t-12 t-black--light t-bold mr2" style={{ color: "rgb(0, 0, 0)"}}>
                        <span>Taks to be Completed:</span>&nbsp;&nbsp;<span class="feed-identity-widget-item__stat" style={{ color: "#9c9b9b"}}>
                       15
                      </span>  </div>
                    </div>
                  </div>
                </a>
                </div>
                
          </div>
        </div>
      </div>
      <button class="draw meet overall" style={{ width: "100%", maxHeight: "15%", marginTop: "5%", marginLeft: "-10%", position:"relative"}} onClick={viewProfile}>View Complete Profile</button>
    </div>
  );
}

export default ChatBar;