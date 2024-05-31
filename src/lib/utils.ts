import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function dataURLtoBlob(dataURL: string) {
  const base64String = dataURL.split(",")[1]; // Mengabaikan bagian 'data:image/jpeg;base64,'
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "image/png" }); // Ganti 'image/jpeg' sesuai dengan tipe gambar yang diinginkan
}

export const assignLabel = (exams: any) => {
  const now = new Date();

  return exams.map((exam: any) => {
    const regStart = new Date(exam.reg_start);
    const regEnd = new Date(exam.reg_end);
    const start = new Date(exam.start);
    const end = new Date(exam.end);

    if (now < regStart) {
      // Jika now sebelum reg_start
      exam.label = "registration_not_open";
    } else if (now >= regStart && now <= regEnd) {
      // Jika now di antara atau sesuai dengan reg_start dan reg_end
      exam.label = "registration_open";
    } else if (now > regEnd && now < start) {
      // Jika now sudah melewati reg_end tapi sebelum start
      exam.label = "exam_soon";
    } else if (
      now.toISOString().split("T")[0] === start.toISOString().split("T")[0]
    ) {
      // Jika now berada pada tanggal yang sama dengan start
      exam.label = "exam_today";
    } else if (now >= start && now <= end) {
      // Jika now berada pada tanggal dan jam yang sama dengan start
      exam.label = "exam_ongoing";
    } else if (now > end) {
      // Jika now sudah melewati end
      exam.label = "exam_finished";
    }

    return exam;
  });
};

export const getCombinedDateTime = (
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
