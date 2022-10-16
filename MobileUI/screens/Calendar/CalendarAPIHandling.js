import React, {useContext} from 'react';
import UserContext from '../../contexts/User';

/**
 * API call to get calendar events
 * FYI: under postmanTest1, capstone project calendar id = 7
 * @returns result of GetEvents API request as a JSON object
 */
export async function calendarGetEvents() {
  console.log('(CAPIHandling) Beginning of CalendarGetEvents');
  try {
    // console.log('Sending Username: ' + name + ' Password: ' + password);
    // So what needs to change is we need to send name and pass, and get the 'token' and 'expiration'.
    const response = await fetch(
      'http://ec2-3-84-219-120.compute-1.amazonaws.com/EventModels/GetEvents',
      {
        method: 'GET',
      },
    );

    // console.log('await response');
    const result = await response.json();

    console.log(JSON.stringify(result, undefined, 2));
    return result;
  } catch (err) {
    console.log('something went wrong with calendarGetEvents: ' + err);
    throw err;
  }
}

/**
 * API call to create a new event
 * @param {eventObject} newEvent - event object to be added
 * @returns OK response??
 */
export async function calendarCreateNewEvent(newEvent) {
  console.log('(CAPIHandling) Beginning of CalendarGetEvents');
  try {
    console.log('New Event:' + JSON.stringify(newEvent, undefined, 2));
    const response = await fetch(
      'http://ec2-3-84-219-120.compute-1.amazonaws.com/EventModels/Create',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: newEvent,
      },
    );

    // console.log('await response');
    const result = await response.json();

    // console.log(JSON.stringify(result, undefined, 2));
    return result;
  } catch (err) {
    console.log('something went wrong with calendarCreateNewEvent: ' + err);
    throw err;
  }
}
