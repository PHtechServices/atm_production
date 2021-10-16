import React, { useState } from 'react';
import "./profile.css"



function MyProfile(props) {



    return (
        <div id="user-profile-2" class="user-profile" style={{marginLeft:"-100%"}}>
		<div class="tabbable">
			<div class="tab-content no-border padding-24">
				<div id="home" class="tab-pane in active">
					<div class="row">
						<div class="col-xs-12 col-sm-3 center">
							<span class="profile-picture">
								<img class="editable img-responsive" alt=" Avatar" id="avatar2"  src="http://bootdey.com/img/Content/avatar/avatar6.png"/>
							</span>

							<div class="space space-4"></div>
{/* 
							<a href="#" class="btn btn-sm btn-block btn-success" style={{marginTop:"5%"}}>
								<i class="ace-icon fa fa-plus-circle bigger-120"></i>
								<span class="bigger-110">Add as a friend</span>
							</a>

							<a href="#" class="btn btn-sm btn-block btn-primary" style={{marginBottom:"5%"}}>
								<i class="ace-icon fa fa-envelope-o bigger-110"></i>
								<span class="bigger-110">Send a message</span>
							</a> */}
						</div>

						<div class="col-xs-12 col-sm-9">
							<h4 class="blue" style={{marginLeft:"-15%"}}>
								<span class="middle">{props.dd}</span>
							</h4>

							<div class="profile-user-info"style={{marginLeft:"6%"}}>
								<div class="profile-info-row">
									<div class="profile-info-name"> Username</div>

									<div class="profile-info-value">
										<span>{props.mail}</span>
									</div>
								</div>

								<div class="profile-info-row">
									<div class="profile-info-name"> C-Teacher </div>

									<div class="profile-info-value">
										<i class="fa fa-map-marker light-orange bigger-110"></i>
										<span>{props.classTeacher}</span>
									</div>
								</div>

								<div class="profile-info-row">
									<div class="profile-info-name"> Subjects </div>

									<div class="profile-info-value">
										<span>{props.subjects}</span>
									</div>
								</div>

								<div class="profile-info-row">
									<div class="profile-info-name"> Reporting To </div>

									<div class="profile-info-value">
										<span>{props.rmName}</span>
									</div>
								</div>

								<div class="profile-info-row">
									<div class="profile-info-name"> Manager Email </div>

									<div class="profile-info-value">
										<span>{props.rmEmail}</span>
									</div>
								</div>
							</div>

							<div class="hr hr-8 dotted"></div>

				
						</div>
					</div>

					<div class="space-20"></div>

					<div class="row" style={{marginTop:"2%"}}>
						<div class="col-xs-12 col-sm-6">
							<div class="widget-box transparent">
								<div class="widget-header widget-header-small">
									<h4 class="widget-title smaller">
										<i class="ace-icon fa fa-check-square-o bigger-110"></i>
										About Me
									</h4>
								</div>

								<div class="widget-body">
									<div class="widget-main">
										<p>
											My job is mostly lorem ipsuming and dolor sit ameting as long as consectetur adipiscing elit.
										</p>
										<p>
											Sometimes quisque commodo massa gets in the way and sed ipsum porttitor facilisis.
										</p>
										<p>
											The best thing about my job is that vestibulum id ligula porta felis euismod and nullam quis risus eget urna mollis ornare.
										</p>
										<p>
											Thanks for visiting my profile.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
    );
}

export default MyProfile;
