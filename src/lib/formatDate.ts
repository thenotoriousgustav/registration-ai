export const formatDate = (isoString: string): string => {
  // Membuat objek Date dari string ISO
  const date = new Date(isoString);

  // Mendapatkan jam dan menit dari objek Date
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format jam dan menit agar selalu dua digit
  const hoursFormatted = hours.toString().padStart(2, "0");
  const minutesFormatted = minutes.toString().padStart(2, "0");

  return `${hoursFormatted}:${minutesFormatted}`;
};
