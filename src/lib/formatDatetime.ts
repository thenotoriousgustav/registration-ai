export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const hoursFormatted = hours.toString().padStart(2, "0");
  const minutesFormatted = minutes.toString().padStart(2, "0");

  return `${hoursFormatted}:${minutesFormatted}`;
};

export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);

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

  const dayName = days[date.getUTCDay()];
  const day = date.getUTCDate();
  const monthName = months[date.getUTCMonth()];

  return `${dayName}, ${day} ${monthName}`;
};
