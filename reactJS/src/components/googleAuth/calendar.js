import React from "react";
import Calendar from "@ericz1803/react-google-calendar";

const API_KEY = "AIzaSyC3zR8eWkmSr5UEtlnVJ3KeDhnxedXhSS4";
let calendars = [
  {calendarId: "pohulabs@srishtiworldschools.in"}
];

class CalendarAPI extends React.Component {
  render() {
    return (
      <div>
        <Calendar apiKey={API_KEY} calendars={calendars} />
      </div>
    )
  }
}

export default CalendarAPI;