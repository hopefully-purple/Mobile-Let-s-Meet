import React, {useContext} from 'react';
import {bareBonesUsersCalendars} from '../assets/data/HardCodedCalendars';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUsernameValue} from '../miscHelpers/AsyncStorageMethods';
import {URL} from './APIControllers';

/**
 * API call to get calendar events
 * FYI: under postmanTest1, capstone project calendar id = 7
 * @param {string} userName The name of current user for extraction of token
 * @returns result of GetEvents API request as a JSON object
 */
export async function calendarGetEvents(userName) {
  // const user = useContext(UserContext);
  console.log('(CAPIHandling) Beginning of CalendarGetEvents');
  let user = await getUsernameValue(userName);
  try {
    // console.log('Sending Username: ' + name + ' Password: ' + password);
    // So what needs to change is we need to send name and pass, and get the 'token' and 'expiration'.
    const response = await fetch(`${URL}/EventModels/GetEvents`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    console.log(JSON.stringify(response, undefined, 2));
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
 * @param {string} userName The name of current user for extraction of token
 * @returns OK response??
 */
export async function calendarCreateNewEvent(newEvent, userName) {
  console.log('(CAPIHandling) Beginning of CalendarCreateNewEvent');
  let user = await getUsernameValue(userName);
  try {
    console.log('New Event:' + JSON.stringify(newEvent, undefined, 2));
    const response = await fetch(`${URL}/EventModels/Create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: newEvent,
    });

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
 * @param {string} userName The name of current user for extraction of token
 * @returns OK response??
 */
export async function calendarDeleteEvent(event, userName) {
  console.log('(CAPIHandling) Beginning of CalendarDeleteEvent');
  let user = await getUsernameValue(userName);
  try {
    console.log('Event:' + JSON.stringify(event, undefined, 2));
    const response = await fetch(`${URL}/EventModels/Delete/${event.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

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

/**
 * API call to get calendars belonging to user
 * FYI: under postmanTest1, capstone project calendar id = 7
 * @param {string} userName The name of current user for extraction of token
 * @returns result of GetCalendars API request as a JSON object
 */
export async function calendarGetCalendars(userName) {
  // const user = useContext(UserContext);
  console.log('(CAPIHandling) Beginning of CalendarGetCalendars');
  let user = await getUsernameValue(userName);
  try {
    // console.log('Sending Username: ' + name + ' Password: ' + password);
    // So what needs to change is we need to send name and pass, and get the 'token' and 'expiration'.
    const response = await fetch(`${URL}/CalendarModels/GetCalendars`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    // console.log('await response');
    const result = await response.json();
    console.log('(CAPIHandling) calendarGetCalendars result:');
    console.log(JSON.stringify(result, undefined, 2));
    return result;
  } catch (err) {
    console.log('something went wrong with calendarGetCalendars: ' + err);
    // throw err;
    return bareBonesUsersCalendars;
  }
}
