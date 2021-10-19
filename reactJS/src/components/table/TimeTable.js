import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TimeTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Day</TableCell>
                        <TableCell align="right">10-11</TableCell>
                        <TableCell align="right">11-12</TableCell>
                        <TableCell align="right">12-1</TableCell>
                        <TableCell align="right">Lunch</TableCell>
                        <TableCell align="right">1-2</TableCell>
                        <TableCell align="right">2-3</TableCell>
                        <TableCell align="right">3-4</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Monday</TableCell>
                        <TableCell align="right">Maths</TableCell>
                        <TableCell align="right">physics</TableCell>
                        <TableCell align="right">science</TableCell>
                        <TableCell align="right">geography</TableCell>
                        <TableCell align="right">mil</TableCell>
                        <TableCell align="right">history</TableCell>
                        <TableCell align="right">play</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Tuesday</TableCell>
                        <TableCell align="right">Maths</TableCell>
                        <TableCell align="right">physics</TableCell>
                        <TableCell align="right">science</TableCell>
                        <TableCell align="right">geography</TableCell>
                        <TableCell align="right">mil</TableCell>
                        <TableCell align="right">history</TableCell>
                        <TableCell align="right">play</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Wednessday</TableCell>
                        <TableCell align="right">Maths</TableCell>
                        <TableCell align="right">physics</TableCell>
                        <TableCell align="right">science</TableCell>
                        <TableCell align="right">geography</TableCell>
                        <TableCell align="right">mil</TableCell>
                        <TableCell align="right">history</TableCell>
                        <TableCell align="right">play</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Thursday</TableCell>
                        <TableCell align="right">Maths</TableCell>
                        <TableCell align="right">physics</TableCell>
                        <TableCell align="right">science</TableCell>
                        <TableCell align="right">geography</TableCell>
                        <TableCell align="right">mil</TableCell>
                        <TableCell align="right">history</TableCell>
                        <TableCell align="right">play</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Friday</TableCell>
                        <TableCell align="right">Maths</TableCell>
                        <TableCell align="right">physics</TableCell>
                        <TableCell align="right">science</TableCell>
                        <TableCell align="right">geography</TableCell>
                        <TableCell align="right">mil</TableCell>
                        <TableCell align="right">history</TableCell>
                        <TableCell align="right">play</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Saturday</TableCell>
                        <TableCell align="right">Maths</TableCell>
                        <TableCell align="right">physics</TableCell>
                        <TableCell align="right">science</TableCell>
                        <TableCell align="right">geography</TableCell>
                        <TableCell align="right">mil</TableCell>
                        <TableCell align="right">history</TableCell>
                        <TableCell align="right">play</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

