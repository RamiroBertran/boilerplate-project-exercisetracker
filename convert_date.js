function convertDate(inputDate) {
  if (typeof inputDate !== "string") {
    return "Invalid input. Please provide a valid date string.";
  }
  // Split the input date into year, month, and day
  var parts = inputDate.split("-");
  var year = parseInt(parts[0]);
  var month = parseInt(parts[1]) - 1; // JavaScript months are zero-based
  var day = parseInt(parts[2]);

  // Create a new Date object with the provided year, month, and day
  var dateObj = new Date(year, month, day);

  // Define the names for weekdays and months
  var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the weekday, month, and day as strings
  var weekdayString = weekdays[dateObj.getDay()];
  var monthString = months[dateObj.getMonth()];
  var dayString = dateObj.getDate();

  // Combine the strings to form the formatted date
  var formattedDate =
    weekdayString + " " + monthString + " " + dayString + " " + year;

  return formattedDate;
}

module.exports = convertDate;
