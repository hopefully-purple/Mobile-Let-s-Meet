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
    console.log('set is loading false. Send an alert for this eror: ' + err);
    throw err;
  }
}
