import React from "react";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
return <MuiAlert elevation={6}
				variant="filled" {...props} />;
}

export default function App() {
return (
	<div>
	<Alert severity="success">User Successfully Created!!</Alert>
	</div>
);
}
