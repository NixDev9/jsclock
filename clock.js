function updateClock() {
  const dateElement = document.getElementById('date');
  const timeElement = document.getElementById('time');

  // Get the current time in the visitor's timezone
  const now = new Date();

  // Determine whether Daylight Saving Time (DST) is in effect
  const isDST = (() => {
    const january = new Date(now.getFullYear(), 0, 1);
    const july = new Date(now.getFullYear(), 6, 1);
    const stdTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
    return now.getTimezoneOffset() < stdTimezoneOffset;
  })();

  // Add the DST offset (1 hour) if DST is in effect
  const timezoneOffsetMinutes = now.getTimezoneOffset() + (isDST ? 60 : 0);
  const localTime = new Date(now.getTime() - (timezoneOffsetMinutes * 60 * 1000));

  // Get the timezone abbreviation using Intl.DateTimeFormat
  const timezoneAbbreviation = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
    .format(localTime)
    .split(' ')[2];

  // Format the time as hh:mm:ss AM/PM
  const hours = localTime.getHours() % 12 || 12;
  const minutes = localTime.getMinutes().toString().padStart(2, '0');
  const seconds = localTime.getSeconds().toString().padStart(2, '0');
  const meridiem = localTime.getHours() >= 12 ? 'PM' : 'AM';
  const timeString = `${hours}:${minutes}:${seconds} ${meridiem} ${timezoneAbbreviation}`;

  // Format the date as YYYY-MM-DD
  const year = localTime.getFullYear();
  const month = (localTime.getMonth() + 1).toString().padStart(2, '0');
  const day = localTime.getDate().toString().padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;

  // Update the clock elements with the current time and date
  dateElement.textContent = dateString;
  timeElement.textContent = timeString;
}

// Call the updateClock function every second
setInterval(updateClock, 1000);

// Run the updateClock function immediately to display the initial time
updateClock();
