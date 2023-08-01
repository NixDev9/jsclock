function updateClock() {
  const clockElement = document.getElementById('clock');

  // Get the visitor's timezone abbreviation using Intl.DateTimeFormat
  const timezoneAbbreviation = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
    .format(new Date())
    .split(' ')[2];

  // Get the current time in the visitor's timezone
  const now = new Date();
  const timezoneOffsetMinutes = now.getTimezoneOffset();

  // Create a new date object with the timezone offset applied
  const localTime = new Date(now.getTime() + (timezoneOffsetMinutes * 60 * 1000));

  // Determine whether Daylight Saving Time (DST) is in effect
  const isDST = (() => {
    const january = new Date(localTime.getFullYear(), 0, 1);
    const july = new Date(localTime.getFullYear(), 6, 1);
    const stdTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
    return localTime.getTimezoneOffset() < stdTimezoneOffset;
  })();

  // Add the DST offset (1 hour) if DST is in effect
  const adjustedTimezoneOffset = timezoneOffsetMinutes + (isDST ? 60 : 0);
  const adjustedLocalTime = new Date(now.getTime() + (adjustedTimezoneOffset * 60 * 1000));

  // Format the time as hh:mm:ss AM/PM
  const hours = adjustedLocalTime.getHours() % 12 || 12;
  const minutes = adjustedLocalTime.getMinutes().toString().padStart(2, '0');
  const seconds = adjustedLocalTime.getSeconds().toString().padStart(2, '0');
  const meridiem = adjustedLocalTime.getHours() >= 12 ? 'PM' : 'AM';
  const timeString = `${hours}:${minutes}:${seconds} ${meridiem}`;

  // Format the date as YYYY-MM-DD
  const year = adjustedLocalTime.getFullYear();
  const month = (adjustedLocalTime.getMonth() + 1).toString().padStart(2, '0');
  const day = adjustedLocalTime.getDate().toString().padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;

  // Update the clock element with the current time and timezone
  clockElement.textContent = `${timeString} (${timezoneAbbreviation})`;
}

// Call the updateClock function every second
setInterval(updateClock, 1000);

// Run the updateClock function immediately to display the initial time
updateClock();

