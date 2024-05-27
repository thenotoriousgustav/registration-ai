export default function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes} menit`;
}
