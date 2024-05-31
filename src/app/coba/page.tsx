"use client";

import React from "react";

// const exams = [
//   {
//     id: "4d7e2d3a-50a6-4a2b-a2d4-5b1c8a8c2e1f",
//     title: "Math Exam 101",
//     start: "2024-05-25T11:00:00Z",
//     end: "2024-05-25T13:00:00Z",
//     reg_start: "2024-05-20T13:00:00Z",
//     reg_end: "2024-05-21T13:00:00Z",
//     settings: {
//       duration: "2 hours",
//       question_count: 50,
//     },
//   },
//   {
//     id: "0f55b58e-7c6a-44f0-9c38-9b7dc5f1c57e",
//     title: "Physics Exam 201",
//     start: "2024-06-02T09:00:00Z",
//     end: "2024-06-02T15:00:00Z",
//     reg_start: "2024-05-28T10:00:00Z",
//     reg_end: "2024-05-30T10:00:00Z",
//     settings: {
//       duration: "6 hours",
//       question_count: 40,
//     },
//   },
// ];

export default function Coba() {
  const date = "Tue Jun 11 2024 13:30:40 GMT+0700 (Western Indonesia Time)";
  const time = "11:49";

  const getCombinedDateTime = (
    dateString: string,
    timeString: string
  ): string => {
    if (!dateString || !timeString) return "";

    // Parse the date string to create a Date object
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Check if the date is invalid

    // Extract the hours and minutes from the time input
    const [hours, minutes] = timeString.split(":").map(Number);

    // Set the hours and minutes from the time input in local time
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    // Convert to ISO string
    return date.toISOString();
  };

  const handleClick = () => {
    const res = getCombinedDateTime(date, time);
    console.log(res);
    const dat = new Date(res);
    console.log(dat);
  };

  return (
    <div className="w-full h-screen bg-red-200">
      <h1>tekan</h1>
      <button onClick={handleClick}>ok</button>
    </div>
  );
}
