export function formatDate(timestamp: {
  _seconds: number;
  _nanoseconds: number;
}): string {
  const seconds = timestamp._seconds;
  const nanoseconds = timestamp._nanoseconds;
  const date = new Date(seconds * 1000); // Convert seconds to milliseconds
  const year = date.getFullYear().toString().padStart(4, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const secondsStr = date.getSeconds().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  const formattedTime = `${hours}:${minutes}:${secondsStr} ${ampm}`; // Add nanoseconds and AM/PM

  return `${day}/${month}/${year} ${formattedTime}`;
}
