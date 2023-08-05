function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 o'clock)
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function updateClock() {
  const now = new Date();
  const timeString = formatAMPM(now);
  const dateString = now.toLocaleDateString();

  document.getElementById('clock').innerHTML = `
    <div>${timeString}</div>
    <div>Text in the middle</div>
    <div>${dateString}</div>
  `;
}

// Call the updateClock function every second to keep the clock updated
setInterval(updateClock, 1000);

// Initial call to display the clock immediately
updateClock();
