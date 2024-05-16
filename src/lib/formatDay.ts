export const formatDay = (isoString: string): string => {
  // Create a Date object from the ISO string
  const date = new Date(isoString);

  // Arrays for day names and month names in English
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the day name, date, and month name
  const dayName = days[date.getUTCDay()];
  const day = date.getUTCDate();
  const monthName = months[date.getUTCMonth()];

  return `${dayName}, ${day} ${monthName}`;
};
