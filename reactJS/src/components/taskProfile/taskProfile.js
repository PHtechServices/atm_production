import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import PendingIcon from '@mui/icons-material/Pending';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@mui/material/Typography';



export default function TaskProfile() {
    const statusList = ["toStart", "update", "completed", "approved", "rejected"]
    const status = "approved"
  return (
      <div>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 400,
          height: 100,
          marginLeft:-45
        },
      }}
    >
      <Paper elevation={3} style={{position:"absolute", width:"300px", height:"300px"}}>
      <Box style={{marginTop:"5%"}}>
      <Avatar alt="Remy Sharp" src="http://bootdey.com/img/Content/avatar/avatar6.png" style={{position:"absolute", width:"100px", height:"100px", marginLeft:"33%"}} />
      <InputLabel style={{position:"absolute", marginTop:"35%", marginLeft:"30%"}}>Himanshu Singh </InputLabel>
      </Box>
      <Box style={{position:"absolute", marginTop:"50%", marginLeft:"8%", textAlign:"center", textAlign:"left"}}>
      <Typography variant="button" display="block" gutterBottom>
        Department: <InputLabel style={{display:"inline",paddingLeft:"20px", marginTop:"2.1%", float:"right"}} >Teaching </InputLabel>

      </Typography>
      <Typography variant="button" display="block" gutterBottom>
        Designation: <InputLabel style={{display:"inline",paddingLeft:"20px", marginTop:"2.1%", textAlign:"left"}} >Class Teacher </InputLabel>
      </Typography>
      <Typography variant="button" display="block" gutterBottom>
      Reporting To: <InputLabel style={{display:"inline",paddingLeft:"20px", marginTop:"2.1%", float:"right"}} >Divesh Kumar </InputLabel>
      </Typography>
      </Box>
      </Paper>
      <Paper elevation={3} style={{position:"absolute", width:"385px", height:"400px", marginLeft:"-12%"}}>
          {status === "toStart" ?<Alert severity="info">Yet To Start</Alert> : status === "update" ? <Alert severity="warning" icon={<PendingIcon fontSize="inherit" />}>Ongoing</Alert> : status === "completed" ? <Alert severity="success">Done</Alert> : <Alert severity="success">Approved</Alert>}
          <TextField
          id="outlined-read-only-input"
          label="Task Description"
          defaultValue="Read the Book - The Hooked"
          InputProps={{
            readOnly: true,
          }}
          style={{marginTop:"3%", width:"95%"}}
        />
        <TextField
          id="outlined-read-only-input"
          label="Task Priority"
          defaultValue="High"
          InputProps={{
            readOnly: true,
          }}
          style={{marginTop:"3%", width:"95%"}}
        />
        <TextField
          id="outlined-read-only-input"
          label="Assigned By"
          defaultValue="Himanshu Singh"
          InputProps={{
            readOnly: true,
          }}
          style={{marginTop:"3%", width:"95%"}}
        />
        <TextField
          id="outlined-read-only-input"
          label="Task Deadline"
          defaultValue="2021-10-31"
          InputProps={{
            readOnly: true,
          }}
          style={{marginTop:"3%", width:"95%"}}
        />
        <TextField
          id="outlined-read-only-input"
          label="Task Nature"
          defaultValue="Weekly"
          InputProps={{
            readOnly: true,
          }}
          style={{marginTop:"3%", width:"95%"}}
        />
    </Paper> 
    </Box>

<Box
sx={{
  display: 'flex',
  flexWrap: 'wrap',
  '& > :not(style)': {
    m: 1,
    width: 400,
    height: 100,
    marginLeft:-45
  },
}}
>
<Paper elevation={3} style={{position:"absolute", width:"300px", height:"494px", marginTop:"85%"}} />
<Paper elevation={3} style={{position:"absolute", width:"385px", height:"400px", marginLeft:"-12%", marginTop:"110%"}}/>
</Box>
</div> 
  );
}
