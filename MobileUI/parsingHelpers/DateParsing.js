import React from 'react';

/**
 * Given a start and end date,
 * return the time span in string format
 * TODO: Account for the 24hr format and adjust to 12hr + am/pm
 * @param {string} s - start date
 * @param {string} e - end date
 * @returns 'HH:MM - HH:MM
 */
export function formatEventTime(s, e) {
  let finalTimeString = '';
  let date = new Date(s);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  finalTimeString = `${hours}:${minutes}`;

  date = new Date(e);
  hours = date.getHours();
  minutes = date.getMinutes();
  finalTimeString += ` - ${hours}:${minutes}`;

  return finalTimeString;
}

/**
 * Given a date in string format,
 * return the date in 'YYYY-MM-DD' string format
 * @param {string} givenDate
 * @returns 'YYYY-MM-DD'
 */
export function constructDateString(givenDate) {
  // month.dateString = '2022-09-03' format
  // getMonth is 0 based!!!!!!!!!!!!!!!!!!!!!
  // get Day is getting day of the week, 0 based.
  // getDate will give the actual day of the month
  const date = new Date(givenDate);
  // console.log('date.month:' + date.getMonth());
  let m = formatSingleDigitMonth(date.getMonth());
  // console.log('actual month: ' + m);
  let d = formatSingleDigit(date.getDate());
  // console.log('day=' + d);
  let ds = `${date.getFullYear()}-${m}-${d}`;
  return ds;
}

/**
 * Given a number, if it is a single digit,
 * return as a double digit string: '0#'
 * @param {int} number
 * @returns '09' or 10
 */
function formatSingleDigit(number) {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
}

/**
 * Given a month number, increase by 1 to account
 * for Date object.month being zero based.
 * if it is still a single digit,
 * return as a double digit string: '0#'
 * @param {int} number
 * @returns '09' or 10
 */
function formatSingleDigitMonth(number) {
  const n = number + 1; //to account for 0 based
  if (n < 10) {
    return `0${n}`;
  } else {
    return n;
  }
}
