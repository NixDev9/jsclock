// Function to update the clock every second
function updateClock() {
  const dateElement = document.getElementById('date');
  const timeElement = document.getElementById('time');

  // Get the current time in the visitor's timezone
  const now = new Date();
  const timezoneOffsetMinutes = now.getTimezoneOffset();
  const localTime = new Date(now.getTime() - (timezoneOffsetMinutes * 60 * 1000));

  // Get the timezone abbreviation using Intl.DateTimeFormat
  const timezoneAbbreviation = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
    .format(localTime)
    .split(' ')[2];

  // Format the time as HH:mm:ss
  const hours = localTime.getHours().toString().padStart(2, '0');
  const minutes = localTime.getMinutes().toString().padStart(2, '0');
  const seconds = localTime.getSeconds().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds} ${timezoneAbbreviation}`;

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
