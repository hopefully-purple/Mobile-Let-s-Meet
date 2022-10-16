import React from 'react';

//This is what is stored in the database. Might not necessarily be the result from get
const eventObject = {
  eventID: '', //int
  startTime: '', //DateTime
  endTime: '', //DateTime
  title: '',
  location: '',
  privacy: '',
  users: [], // list of users
  group: {}, //groupmodel object
  calendar: '', //calendar model object
};

// Or the EventModels/Mine get events action might return this object:
// id = e.EventID,
// title = e.Title,
// start = e.StartTime.ToString("O"),
// end = e.EndTime.ToString("O"),
// location = e.Location,
// color = e.Calendar.Color,

const septVolleyballM = {
  id: 1,
  title: 'Volleyball',
  start: 'Mon, 26 Sep 2022 8:35:00 MDT',
  end: 'Mon, 26 Sep 2022 9:25:00 MDT',
  location: 'HPR E 101',
  color: '#8A56E6', //A nice purple
};

const octVolleyballM = {
  id: 2,
  title: 'Volleyball',
  start: 'Mon, 10 Oct 2022 8:35:00 MDT',
  end: 'Mon, 10 Oct 2022 9:25:00 MDT',
  location: 'HPR E 101',
  color: '#8A56E6', //A nice purple
};

const octVolleyballW = {
  id: 3,
  title: 'Volleyball',
  start: 'Wed, 12 Oct 2022 8:35:00 MDT',
  end: 'Wed, 12 Oct 2022 9:25:00 MDT',
  location: 'HPR E 101',
  color: '#8A56E6', //A nice purple
};

const octCapstoneM = {
  id: 4,
  title: 'Capstone Project',
  start: 'Mon, 10 Oct 2022 10:45:00 MDT',
  end: 'Mon, 10 Oct 2022 11:35:00 MDT',
  location: 'Discord',
  color: '#F02F17', //A nice, bright, red
};

const octCapstoneW = {
  id: 5,
  title: 'Capstone Project',
  start: 'Wed, 12 Oct 2022 10:45:00 MDT',
  end: 'Wed, 12 Oct 2022 11:35:00 MDT',
  location: 'Discord',
  color: '#F02F17', //A nice, bright, red
};

const octNLPM = {
  id: 6,
  title: 'Natural Language Processing',
  start: 'Mon, 10 Oct 2022 13:25:00 MDT',
  end: 'Mon, 10 Oct 2022 14:45:00 MDT',
  location: 'CTIHB 109',
  color: '#F07F26', //A nice, bright, orange
};

const octNLPW = {
  id: 7,
  title: 'Natural Language Processing',
  start: 'Wed, 12 Oct 2022 13:25:00 MDT',
  end: 'Wed, 12 Oct 2022 14:45:00 MDT',
  location: 'CTIHB 109',
  color: '#F07F26', //A nice, bright, orange
};

const octAIT = {
  id: 8,
  title: 'Artificial Intelligence',
  start: 'Tue, 11 Oct 2022 12:25:00 MDT',
  end: 'Tue, 11 Oct 2022 13:45:00 MDT',
  location: 'WEB L103',
  color: '#1D4BD6', //A nice blue
};

const octAITH = {
  id: 9,
  title: 'Artificial Intelligence',
  start: 'Thu, 13 Oct 2022 12:25:00 MDT',
  end: 'Thu, 13 Oct 2022 13:45:00 MDT',
  location: 'WEB L103',
  color: '#1D4BD6', //A nice blue
};

const octBiologyT = {
  id: 10,
  title: 'Biology',
  start: 'Tue, 11 Oct 2022 14:00:00 MDT',
  end: 'Tue, 11 Oct 2022 15:20:00 MDT',
  location: 'GC 1900',
  color: '#0D852F', //A dark green
};

const octBiologyTH = {
  id: 11,
  title: 'Biology',
  start: 'Thu, 13 Oct 2022 14:00:00 MDT',
  end: 'Thu, 13 Oct 2022 15:20:00 MDT',
  location: 'GC 1900',
  color: '#0D852F', //A dark green
};

const novBiologyTH = {
  id: 12,
  title: 'Biology',
  start: 'Thu, 03 Nov 2022 14:00:00 MDT',
  end: 'Thu, 03 Nov 2022 15:20:00 MDT',
  location: 'GC 1900',
  color: '#0D852F', //A dark green
};

export const classScheduleList = [
  octVolleyballM,
  octVolleyballW,
  novBiologyTH,
  octAIT,
  octAITH,
  octBiologyT,
  octBiologyTH,
  septVolleyballM,
  octCapstoneM,
  octCapstoneW,
  octNLPM,
  octNLPW,
];

export const hardCodeClassScheduleItems = {
  '2022-10-02': [],
  '2022-10-03': [octVolleyballM, octCapstoneM, octNLPM],
  '2022-10-04': [octAIT, octBiologyT],
  '2022-10-05': [octVolleyballW, octCapstoneW, octNLPW],
  '2022-10-06': [octAITH, octBiologyTH],
  '2022-10-07': [],
  '2022-10-08': [],
};

export const originalDummyItems = {
  '2022-10-01': [],
  '2022-10-02': [],
  '2022-10-03': [{name: 'item -1 - any js object'}, {name: 'item 0!'}],
  '2022-10-04': [{name: 'item 1 - any js object'}, {name: 'item 2!'}],
  '2022-10-05': [{name: 'item 3 - any js object'}, {name: 'item 4!'}],
  '2022-10-06': [{name: 'item 5 - any js object'}, {name: 'item 6!'}],
  '2022-10-07': [{name: 'item7 - any js object'}, {name: 'item 8!'}],
  '2022-10-08': [],
};
