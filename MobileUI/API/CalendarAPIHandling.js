import React, {useContext} from 'react';
// import {bareBonesUsersCalendars} from '../assets/data/HardCodedCalendars';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserInfo} from '../miscHelpers/AsyncStorageMethods';
import {constructDateString} from '../miscHelpers/DateParsing';
import {URL} from './APIControllers';

function organizeIntoDates(events) {
  let newFL = [];
  // console.log(JSON.stringify(events, undefined, 2));
  console.log('(apicon.organizeIntoDates) events=' + events.length);
  if (events.length === 0) {
    console.log('events currently empty, return []');
    return newFL;
  }

  for (let i of events) {
    // console.log('i.start=' + i.start);
    // let iMonth = constructMonth(i.start);
    // let iDay = constructDay(i.start);
    let iDateString = constructDateString(i.start);
    // console.log('iDateString=' + iDateString);
    // if (month.month === iMonth) {
    // console.log('iMonth= ' + iMonth + ' iDay= ' + iDay);
    if (!newFL[iDateString]) {
      // console.log('add iDateString to array');
      newFL[iDateString] = [];
      // console.log('newFL size=' + newFL.length);
    }
    // console.log('month.day =' + month.day + '');
    if (!newFL[iDateString].includes(i)) {
      // console.log('push: ' + i.title + ' ' + i.start);
      var localStartDate = new Date(i.start); //.toLocaleTimeString('en-US', {
      //   timeZone: 'UTC',
      //   hour12: true,
      //   hour: 'numeric',
      //   minute: 'numeric',
      // });
      var localEndDate = new Date(i.end);
      console.log('##################' + localStartDate + '  ' + localEndDate);
      const convertedI = {
        ...i,
        start: localStartDate,
        end: localEndDate,
      };
      newFL[iDateString].push(convertedI);
    }
  }

  // console.log('newFL:');
  // console.log(JSON.stringify(newFL, undefined, 2));

  return newFL;
}

/**
 * API call to get calendar events
 * @returns result of GetEvents API request as a JSON object
 */
export async function calendarGetEvents() {
  console.log('(CAPIHandling) Beginning of CalendarGetEvents');
  let user = await getUserInfo();
  return fetch(`${URL}/EventModels/GetEvents`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then(data => {
      console.log('CAPIHANDLING - CalendarGetEvents data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.ok) {
        return data.json();
      } else {
        throw Error(data.statusText);
      }
    })
    .then(jsonData => {
      console.log('CAPIHANDLING - CalendarGetEvents data.json():');
      console.log(JSON.stringify(jsonData, undefined, 2));
      // console.log(org['2022-11-26']);
      const sorted_dates = [...jsonData].sort((a, b) =>
        a.start > b.start ? 1 : -1,
      );
      // console.log(JSON.stringify(sorted_dates, undefined, 2));
      return organizeIntoDates(sorted_dates);
    })
    .catch(e => {
      console.log('something went wrong with calendarGetEvents: ' + e);
      return [];
    });
}

/**
 * API call to get calendar events
 * @param {int array} calendarIDs - int[] of calendarIDs to grab events from
 * @returns result of GetEvents API request as a JSON object
 */
export async function calendarGetCalendarEvents(calendarIDs) {
  console.log('(CAPIHandling) Beginning of CalendarGetCalendarEvents');
  let user = await getUserInfo();
  console.log(JSON.stringify(calendarIDs, undefined, 2));
  return fetch(
    `${URL}/EventModels/GetCalendarEvents?calendarIDs=${calendarIDs}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    },
  )
    .then(data => {
      console.log('CAPIHANDLING - CalendarGetCalendarEvents data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.ok) {
        return data.json();
      } else {
        throw Error(data.statusText); //or data.message?
      }
    })
    .then(jsonData => {
      console.log('CAPIHANDLING - CalendarGetCalendarEvents data.json():');
      console.log(JSON.stringify(jsonData, undefined, 2));
      return organizeIntoDates(jsonData);
    })
    .catch(e => {
      console.log('something went wrong with CalendarGetCalendarEvents: ' + e);
      return [];
    });
}

// export async function calendarGetEvent() {
//   // const user = useContext(UserContext);
//   console.log('(CAPIHandling) Beginning of CalendarGetEvents');
//   let user = await getUserInfo();
//   try {
//     // console.log('Sending Username: ' + name + ' Password: ' + password);
//     // So what needs to change is we need to send name and pass, and get the 'token' and 'expiration'.
//     const response = await fetch(`${URL}/EventModels/GetEvents`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     });

//     console.log(JSON.stringify(response, undefined, 2));
//     const result = await response.json();
//     console.log('(CAPIHandling) calendarGetEvents result:');
//     console.log(JSON.stringify(result, undefined, 2));
//     return organizeIntoDates(result);
//   } catch (err) {
//     console.log('something went wrong with calendarGetEvents: ' + err);
//     // throw err;
//     return [];
//   }
// }

/**
 * API call to create a new event
 * TODO: Truly need to test once AWS is updated
 * @param {eventObject} newEvent - event object to be added
 * @returns OK response??
 */
export async function calendarCreateNewEvent(newEvent) {
  console.log('(CAPIHandling) Beginning of CalendarCreateNewEvent');
  let user = await getUserInfo();
  console.log('New Event:' + JSON.stringify(newEvent, undefined, 2));
  return fetch(`${URL}/EventModels/Create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      title: newEvent.title,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      calendarID: newEvent.calendarID,
      location: newEvent.location,
    }),
  })
    .then(data => {
      console.log('CAPIHANDLING - CalendarCreateNewEvent data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.ok) {
        return data.json();
      } else {
        throw Error(data.statusText);
      }
    })
    .then(jsonData => {
      console.log('CAPIHANDLING - CalendarCreateNewEvent data.json():');
      console.log(JSON.stringify(jsonData, undefined, 2));
      return jsonData;
    })
    .catch(e => {
      console.log('something went wrong with calendarCreateNewEvent: ' + e);
      return [];
    });
}

// export async function calendarCreateNewEven(newEvent) {
//   console.log('(CAPIHandling) Beginning of CalendarCreateNewEvent');
//   let user = await getUserInfo();
//   try {
//     console.log('New Event:' + JSON.stringify(newEvent, undefined, 2));
//     const response = await fetch(`${URL}/EventModels/Create`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${user.token}`,
//       },
//       body: newEvent,
//     });

//     // console.log('await response');
//     const result = await response.json();

//     // console.log(JSON.stringify(result, undefined, 2));
//     return result;
//   } catch (err) {
//     console.log('something went wrong with calendarCreateNewEvent: ' + err);
//     throw err;
//   }
// }

/**
 * API call to delete an event
 * @param {eventObject} event - event object to be deleted
 * @returns OK response??
 */
export async function calendarDeleteEvent(event) {
  console.log('(CAPIHandling) Beginning of CalendarDeleteEvent');
  let user = await getUserInfo();
  console.log('Event:' + JSON.stringify(event, undefined, 2));
  return fetch(`${URL}/EventModels/Delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({id: event.id}),
  })
    .then(data => {
      console.log('CAPIHANDLING - calendarDeleteEvent data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.ok) {
        return true;
      } else {
        throw Error(data.statusText);
      }
    })
    .catch(e => {
      console.log('something went wrong with calendarDeleteEvent: ' + e);
      return false;
    });
}

// export async function calendarDeleteEven(event) {
//   console.log('(CAPIHandling) Beginning of CalendarDeleteEvent');
//   let user = await getUserInfo();
//   try {
//     console.log('Event:' + JSON.stringify(event, undefined, 2));
//     const response = await fetch(`${URL}/EventModels/Delete/${event.id}`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     });

//     // console.log('await response');
//     // const result = await response.json();
//     // console.log(typeof response);
//     // console.log(JSON.stringify(response, undefined, 2));
//     return response.ok;
//   } catch (err) {
//     console.log('something went wrong with calendarDeleteEvent: ' + err);
//     throw err;
//   }
// }

/**
 * API call to get calendars belonging to user
 * @returns result of GetCalendars API request as a JSON object
 */
export async function calendarGetCalendars() {
  console.log('(CAPIHandling) Beginning of CalendarGetCalendars');
  let user = await getUserInfo();
  return fetch(`${URL}/CalendarModels/GetCalendars`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then(data => {
      console.log('CAPIHANDLING - CalendarGetCalendars data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.ok) {
        return data.json();
      } else {
        throw Error(data.statusText);
      }
    })
    .then(jsonData => {
      console.log(
        'CAPIHANDLING - CalendarGetCalendars data.json() after filter:',
      );
      // let j = jsonData.filter(c => c.group === null); // filters out group calendars
      console.log(JSON.stringify(jsonData, undefined, 2));

      return jsonData;
    })
    .catch(e => {
      console.log('something went wrong with calendarGetCalendars: ' + e);
      return [];
    });
}

/**
 * API call to delete an event
 * @param {eventObject} event - event object to be deleted
 * @returns OK response??
 */
export async function calendarCreateNewCalendar(newCalendar) {
  console.log('(CAPIHandling) Beginning of CalendarCreateNewCalendar');
  let user = await getUserInfo();
  console.log('Calendar:' + JSON.stringify(newCalendar, undefined, 2));
  return fetch(`${URL}/CalendarModels/Create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      Name: newCalendar.Name,
      Description: newCalendar.Description,
      Color: newCalendar.Color,
    }),
  })
    .then(data => {
      console.log('CAPIHANDLING - CalendarCreateNewCalendar data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.ok) {
        return true;
      } else {
        throw Error(data.statusText);
      }
    })
    .catch(e => {
      console.log('something went wrong with CalendarCreateNewCalendar: ' + e);
      return false;
    });
}
