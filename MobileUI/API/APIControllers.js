import React, {useEffect, useState, useContext} from 'react';
import {calendarGetEvents, calendarDeleteEvent} from './CalendarAPIHandling';
import {groupsGetGroups} from './GroupsAPIHandling';
import {classScheduleList} from '../assets/data/HardCodedEvents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {constructDateString} from '../miscHelpers/DateParsing';
// import {bareBonesGroupList} from '../assets/data/HardCodedGroups';

//Don't forget to update Info.plist
export const URL = 'http://ec2-52-201-245-93.compute-1.amazonaws.com';

/**
 * Calls the calendarGetEvents method and returns the result
 * Still a work in progess. Can modify to stick with hardcoded data.
 * @param {string} currentCalendarName
 * @param {string} userName The name of current user for extraction of token
 * @returns {array} Array of event objects
 */
export const readEventData = async currentCalendarName => {
  //TODO: change call based on calendarName?
  try {
    // const value = await AsyncStorage.getItem('Events'); // Hardcoded
    const value = await calendarGetEvents(); // API call
    // console.log('(App.readData) value:' + value);
    if (value !== null && value !== undefined) {
      // return JSON.parse(value); // initialize events context for Hardcoded
      // return value; //for API call result
      return organizeIntoDates(value);
    } else {
      console.log(
        '(apicon.readEventData).getEvents value is null! Set to [] for now',
      );
      return [];
    }
  } catch (e) {
    console.log(
      '(apicon.readEventData) Failed to fetch the events from server: ' + e,
    );
    throw e;
  }
};

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
 * Calls the groupsGetGroups method and returns the result
 * Still a work in progess.
 *
 * @param {string} userName The name of current user for extraction of token
 * @returns {array} Array of group objects
 */
export const readGroupData = async userName => {
  //TODO: change call based on calendarName?
  try {
    // const value = await AsyncStorage.getItem('Groups');
    const value = await groupsGetGroups(); // API call
    // const value = null;
    // console.log('(App.readData) value:' + value);
    if (value !== null && value !== undefined) {
      // setLanguageObj({language: language, words: JSON.parse(value)});
      // return JSON.parse(value); // initialize groups context
      return value; //for API call result
    } else {
      console.log(
        '(homerootstack.readGroupData).getGroups value is null! Set to [] for now',
      );
      //TODO: probably return empty array irl
      return [];
    }
  } catch (e) {
    console.log(
      '(Homerootstack.readGroupData) Failed to fetch the groups from server: ' +
        e,
    );
    throw e;
  }
};

/**
 * Either deletes the given event the ASYNC storage way and resets the Events context
 * Or calls calendarDeleteEvent (API)
 * Returns true or false based on success
 * @param {eventObject} i Event to delete
 * @param {array} events Events array context for ASYNC way
 * @param {context} setEvents to set the Events context to the updated data
 * @returns true or false based on success
 */
export const deleteEvent = async (i, events, setEvents) => {
  //   console.log(JSON.stringify(i, undefined, 2));
  //ASYNC WAY
  // Filter condition
  //   function excludeItem(it) {
  //     return it.id !== i.id;
  //   }
  //   const newEvents = events.filter(excludeItem);
  //   // console.log(words);
  //   setEvents(newEvents);
  //   const saveData = async () => {
  //     try {
  //       await AsyncStorage.setItem('Events', JSON.stringify(newEvents));
  //       console.log('(calnedarscreen.saveData) Data successfully saved');
  //     } catch (e) {
  //       console.log(
  //         '(calendarscreen.saveData) Failed to save the data to the storage',
  //       );
  //       throw e;
  //     }
  //   };
  //   saveData();
  //   return true;

  //API WAY
  try {
    const result = await calendarDeleteEvent(i);
    if (result) {
      console.log('(deleteEvent) call calendarGetEvents');
      const value = await calendarGetEvents(); // API call
      if (value !== null && value !== undefined) {
        console.log('deleteEvent) setEvents to the new value! ret true');
        setEvents(value);
        return true;
      } else {
        console.log(
          '(deleteEvent) calendarGetEvents returned null/undef...ret false',
        );
        return false;
      }
    }
  } catch (e) {
    console.log('(deleteEvent) Something went wrong with API deleting >' + e);
    throw e;
  }
};
