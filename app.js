const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');
//or
// const items = document.querySelectorAll('div > h4');


let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();
// months are ZERO index based;
// weekdays are also ZERO index based
const futureDate = new Date(currentYear, currentMonth, currentDay + 10, 11, 30, 0);

// let futureDate = new Date(2020, 3, 24, 11, 30, 0);
//date format is (year,month,day,hrs,minutes,seconds) new Date()
// passed the format as argument in the date function... with this method you can select a precise date 

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

/// the array months and weekdays was set up cos we can only get the index of the month and weekday
// months are ZERO index based;
// weekdays are also ZERO index based
// weeekday can be known when we have the year,month and date
const month = months[futureDate.getMonth()];
const weekday = weekdays[futureDate.getDay()];
const date = futureDate.getDate();
giveaway.innerHTML = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

const futureTime = futureDate.getTime();
// this gives the future time give away ends in milliseconds

function getRemaindingTime() {
  //today : gives the present date in milliseconds
  const todayTime = new Date().getTime();

  const Endtime = futureTime - todayTime;
  // Endtime : gives the diffrence in milliseconds from present day and future date
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1d = 24hr
  // values in miliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  // calculate all values
  let days = Math.floor(Endtime / oneDay);
  let hours = Math.floor((Endtime % oneDay) / oneHour);
  let minutes = Math.floor((Endtime % oneHour) / oneMinute);
  let seconds = Math.floor((Endtime % oneMinute) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds];

  // this function was set up to add 0 to the time if the value in each H4 is less than 10
  function format(item) {
    //item here is just a parameter
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach(function (item, index) {
    //item here is H4
    item.innerHTML = format(values[index]);
  });

  let countdown = setInterval(getRemaindingTime, 1000);
  if (Endtime < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
  }
}

getRemaindingTime();
