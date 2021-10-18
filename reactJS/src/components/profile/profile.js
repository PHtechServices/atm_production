import React, { useState } from 'react';
import "./profile.css"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';



function MyProfile(props) {



	return (
		<div id="user-profile-2" class="user-profile" style={{ marginLeft: "-100%" }}>
			<div class="tabbable">
				<div class="tab-content no-border padding-24">
					<div id="home" class="tab-pane in active">
						<div class="row">


							<div class="col-xs-12 col-sm-9">
								<h4 class="blue" style={{ marginLeft: "40%" }}>
									<span class="middle">{props.dd}</span>
								</h4>

								<div class="profile-user-info" style={{ marginLeft: "10%" }}>
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

						<div class="row">


							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									'& > :not(style)': {
										m: 1,
										width: 200,
										height: 200,
										marginLeft: 2,
										marginTop: 5
									},
								}}
							>
								<Paper elevation={3}>
									<Typography variant="button" display="block" gutterBottom>
										Class Teacher
									</Typography> 
									<Typography variant="h6" gutterBottom component="div" sx={{marginTop:"30px", fontSize:"50px"}}>
									{props.classTeacher}
									</Typography>
									</Paper>
								<Paper elevation={3}> 
								<Typography variant="button" display="block" gutterBottom>
										Class Strength
									</Typography> 
									<Typography variant="h6" gutterBottom component="div" sx={{marginTop:"30px", fontSize:"50px"}}>
										25
									</Typography></Paper>
								<Paper elevation={3}> 
								<Typography variant="button" display="block" gutterBottom>
										Reporting To
									</Typography> 
									<Typography variant="h6" gutterBottom component="div" sx={{marginTop:"45px", fontSize:"35px"}}>
									{props.rmName}
									</Typography></Paper>
							</Box>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}

export default MyProfile;
