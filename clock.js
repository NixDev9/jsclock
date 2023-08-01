function updateClock() {
  const clockElement = document.getElementById('clock');
  const dateElement = document.getElementById('date');
  const timezoneElement = document.getElementById('timezone');

  // Get the visitor's timezone offset in minutes
  const timezoneOffsetMinutes = new Date().getTimezoneOffset();

  // Create a new date object with the timezone offset applied
  const localTime = new Date(Date.now() + (timezoneOffsetMinutes * 60 * 1000));

  // Format the date as Month DD, YYYY
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[localTime.getMonth()];
  const day = localTime.getDate();
  const year = localTime.getFullYear();
  const dateString = `${month} ${day}, ${year}`;

  // Format the time as hh:mm:ss AM/PM (12-hour format)
  const hours = localTime.getHours() % 12 || 12;
  const minutes = localTime.getMinutes().toString().padStart(2, '0');
  const seconds = localTime.getSeconds().toString().padStart(2, '0');
  const meridiem = localTime.getHours() >= 12 ? 'PM' : 'AM';
  const timeString = `${hours}:${minutes}:${seconds} ${meridiem}`;

  // Get the visitor's timezone abbreviation using Intl.DateTimeFormat
  const timezoneAbbreviation = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
    .format(localTime)
    .split(' ')[2];

  // Update the clock, date, and timezone elements with the visitor's local time and date
  clockElement.textContent = timeString;
  dateElement.textContent = dateString;
  timezoneElement.textContent = timezoneAbbreviation;
}

// Run the updateClock function immediately to display the initial time
updateClock();

// Call the updateClock function every second
setInterval(updateClock, 1000);

