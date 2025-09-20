export const format = (seconds: number) => {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  let secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  if (hrs > 0) {
    return `${hrs}:${mins}:${secs}`;
  } else {
    return `${mins}:${secs}`; 
  }
};
