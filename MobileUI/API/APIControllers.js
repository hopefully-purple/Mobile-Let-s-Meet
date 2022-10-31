import React, {useEffect, useState, useContext} from 'react';
import {calendarGetEvents} from './CalendarAPIHandling';
import {classScheduleList} from '../assets/data/HardCodedEvents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {bareBonesGroupList} from '../assets/data/HardCodedGroups';

/**
 * Calls the calendarGetEvents method and returns the result
 * Still a work in progess. Can modify to stick with hardcoded data.
 * @param {string} currentCalendarName
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
      return value; //for API call result
    } else {
      //TODO: probably return empty array irl
      if (currentCalendarName === 'My') {
        console.log(
          '(homerootstack.readEventData).getEvents value is null! Set to class schedule list for now',
        );
        return classScheduleList;
      } else {
        return [];
      }
    }
  } catch (e) {
    console.log(
      '(Homerootstack.readEventData) Failed to fetch the events from server: ' +
        e,
    );
    throw e;
  }
};

export const readGroupData = async () => {
  //TODO: change call based on calendarName?
  try {
    const value = await AsyncStorage.getItem('Groups');
    // const value = await groupsGetGroups(); // API call
    // const value = null;
    // console.log('(App.readData) value:' + value);
    if (value !== null && value !== undefined) {
      // setLanguageObj({language: language, words: JSON.parse(value)});
      return JSON.parse(value); // initialize groups context
      // return value; //for API call result
    } else {
      console.log(
        '(homerootstack.readGroupData).getGroups value is null! Set to bareBonesGroupList for now',
      );
      //TODO: probably return empty array irl
      return bareBonesGroupList;
    }
  } catch (e) {
    console.log(
      '(Homerootstack.readGroupData) Failed to fetch the groups from server: ' +
        e,
    );
    throw e;
  }
};
