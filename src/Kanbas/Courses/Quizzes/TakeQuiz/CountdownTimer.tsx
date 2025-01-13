import { useEffect, useState } from "react";

/**
 * Helper function to format time in hours, minutes, and seconds.
 */
function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let formattedTime: string[] = [];

  if (hours > 0) {
    formattedTime.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  }

  if (minutes > 0 || hours > 0) {
    formattedTime.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
  }

  formattedTime.push(`${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`);
  return formattedTime.join(', ');
}

export default function CountdownTimer({ minutes }: { minutes: number }) {

  // Directly calculate seconds from minutes
  const secondsCalculated = minutes * 60;
  const initialSeconds = isNaN(secondsCalculated) ? 0 : secondsCalculated;
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    // Stop if seconds is <= 0
    if (seconds <= 0) return;

    // Set up the countdown interval
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 0) {
          clearInterval(interval); // Stop interval when seconds reach 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);  // Cleanup on unmount or state change
    };
  }, [seconds]); // Only re-run when seconds changes

  return (
    <span>
      {formatTime(seconds)}
    </span>
  );
}
