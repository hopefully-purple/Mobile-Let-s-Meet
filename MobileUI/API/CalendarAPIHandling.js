import React, {useContext} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUsernameValue} from '../miscHelpers/AsyncStorageMethods';

/**
 * API call to get calendar events
 * FYI: under postmanTest1, capstone project calendar id = 7
 * @returns result of GetEvents API request as a JSON object
 */
export async function calendarGetEvents(name) {
  // const user = useContext(UserContext);
  console.log('(CAPIHandling) Beginning of CalendarGetEvents');
  let user = await getUsernameValue(name);
  try {
    // console.log('Sending Username: ' + name + ' Password: ' + password);
    // So what needs to change is we need to send name and pass, and get the 'token' and 'expiration'.
    const response = await fetch(
      'http://ec2-3-84-219-120.compute-1.amazonaws.com/EventModels/GetEvents',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    );

    // console.log('await response');
    const result = await response.json();
    console.log('(CAPIHandling) calendarGetEvents result:');
    console.log(JSON.stringify(result, undefined, 2));
    return result;
  } catch (err) {
    console.log('something went wrong with calendarGetEvents: ' + err);
    throw err;
  }
}

/**
 * API call to create a new event
 * TODO: Truly need to test once AWS is updated
 * @param {eventObject} newEvent - event object to be added
 * @returns OK response??
 */
export async function calendarCreateNewEvent(newEvent) {
  // const user = useContext(UserContext);
  console.log('(CAPIHandling) Beginning of CalendarCreateNewEvent');
  try {
    console.log('New Event:' + JSON.stringify(newEvent, undefined, 2));
    const response = await fetch(
      'http://ec2-3-84-219-120.compute-1.amazonaws.com/EventModels/Create',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
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

/**
 * API call to delete an event
 * @param {eventObject} event - event object to be deleted
 * @returns OK response??
 */
export async function calendarDeleteEvent(event) {
  console.log('(CAPIHandling) Beginning of CalendarDeleteEvent');
  try {
    console.log('Event:' + JSON.stringify(event, undefined, 2));
    const response = await fetch(
      `http://ec2-3-84-219-120.compute-1.amazonaws.com/EventModels/Delete/${event.id}`,
      {
        method: 'POST',
      },
    );

    // console.log('await response');
    // const result = await response.json();
    // console.log(typeof response);
    // console.log(JSON.stringify(response, undefined, 2));
    return response.ok;
  } catch (err) {
    console.log('something went wrong with calendarDeleteEvent: ' + err);
    throw err;
  }
}
