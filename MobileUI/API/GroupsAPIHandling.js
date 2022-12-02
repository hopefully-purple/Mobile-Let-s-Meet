import React, {useContext} from 'react';
import {Alert} from 'react-native';
import {
  bareBonesGroupListAccurate,
  accurateGetGroupResult,
  accurateGetGroupResult0,
} from '../assets/data/HardCodedGroups';
import {getUserInfo} from '../miscHelpers/AsyncStorageMethods';
import {URL} from './APIControllers';

// export function getRiverInformation(name) {
//   console.log('\n\n\n\nGET RIVER INFORMATION: ' + name + '\n\n\n\n');
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(rivers[name]);
//     }, 1500);
//   });
// }

// export function getList() {
//   return fetch('http://localhost:3333/list').then(data => data.json());
// }

// export function setItem(item) {
//   return fetch('http://localhost:3333/list', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({item}),
//   }).then(data => data.json());
// }

// https://bobbyhadz.com/blog/react-sort-array-of-objects
function organizeGroups(groups) {
  let newG = [];
  // newG = [...groups].sort((a, b) => a.groupID - b.groupID);
  newG = [...groups].sort((a, b) => (a.groupName > b.groupName ? 1 : -1));
  return newG;
}

/**
 * API call to get all groups user is in
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @returns list of groups (organized)
 */
export async function groupsGetGroups() {
  console.log('(GAPIHandling) Beginning of GroupsGetGroups');
  let user = await getUserInfo();
  // console.log('user = ' + JSON.stringify(user, undefined, 2));
  return fetch(`${URL}/GroupModels/GetGroups`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then(data => {
      console.log('GAPIHANDLING - groupsGetGroups data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.ok) {
        return data.json();
      } else {
        throw Error(data.statusText);
      }
    })
    .then(jsonData => {
      console.log('GAPIHANDLING - groupsGetGroups data.json():');
      console.log(JSON.stringify(jsonData, undefined, 2));
      return organizeGroups(jsonData);
    })
    .catch(e => {
      console.log('something went wrong with groupsGetGroups: ' + e);
      return [];
    });
}

// export async function groupsGetGroup() {
//   console.log('(GAPIHandling) Beginning of GroupsGetGroups');
//   let user = await getUserInfo();
//   try {
//     const response = await fetch(`${URL}/GroupModels/GetGroups`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     });
//     const result = await response.json();

//     console.log('GAPIHANDLING - result:');
//     console.log(JSON.stringify(result, undefined, 2));
//     return result;
//   } catch (err) {
//     console.log('something went wrong with groupsGetGroups: ' + err);
//     return [];
//   }
// }

/**
 * API call to get members of given group
 * If something goes wrong, catches error and goes to hardcoded functionality
 *
 * @param {int} groupID Identifier for group
 * @returns list of group members
 */
export async function groupsGetGroupMembers(groupID) {
  console.log('(GAPIHandling) Beginning of GroupsGetGroupMembers');
  let user = await getUserInfo();
  // console.log('user = ' + JSON.stringify(user, undefined, 2));
  return fetch(`${URL}/GroupModels/GetGroup?id=${groupID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then(data => {
      console.log('GAPIHANDLING - GroupsGetGroupMembers data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.ok) {
        return data.json();
      } else {
        throw Error(data.statusText);
      }
    })
    .then(jsonData => {
      console.log('GAPIHANDLING - GroupsGetGroupMembers data.json():');
      console.log(JSON.stringify(jsonData, undefined, 2));
      return jsonData;
    })
    .catch(e => {
      console.log('something went wrong with groupsGetGroupMembers: ' + e);
      return [];
    });
}

// export async function groupsGetGroupMember(groupID) {
//   console.log('(GAPIHandling) Beginning of GroupsGetGroupMembers');
//   let user = await getUserInfo();
//   try {
//     const response = await fetch(`${URL}/GroupModels/GetGroup?id=${groupID}`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     });
//     const result = await response.json();

//     console.log(JSON.stringify(result, undefined, 2));
//     return result;
//   } catch (err) {
//     console.log('something went wrong with groupsGetGroupMembers: ' + err);
//     // throw err;
//     // TODO::: Confirm response JSON structure
//     // return accurateGetGroupResult[groupID];
//     // console.log(
//     //   '&&&&&&&&&&&&&&&&&&' +
//     //     JSON.stringify(accurateGetGroupResult[0], undefined, 2),
//     // );
//     // return accurateGetGroupResult[groupID];
//     return [];
//   }
// }

/**
 * API call to create a new group
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {groupObject} newGroup - group object to be added
 * @returns OK = true
 */
export async function groupCreateNewGroup(newGroup) {
  console.log('(GAPIHandling) Beginning of GroupCreateNewGroup');
  let user = await getUserInfo();
  console.log('New Group:' + JSON.stringify(newGroup, undefined, 2));
  return fetch(`${URL}/GroupModels/CreateGroup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(newGroup),
  })
    .then(data => data.json())
    .then(data => {
      console.log('GAPIHANDLING - GroupCreateNewGroup data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.status === 'ok' && data.message === 'Group created') {
        return true;
      } else {
        throw Error(data.message);
      }
    })
    .catch(e => {
      console.log('something went wrong with groupCreateNewGroup: ' + e);
      return false;
    });
}

/**
 * API call to join a group
 * TO BE CALLED FROM HANDLE LINK SUBMIT
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} joinLink - Link to join associated group
 * @returns OK = true
 */
export async function groupJoinGroup(joinLink) {
  console.log('(GAPIHandling) Beginning of GroupJoinGroup');
  //Pull out joincode from:
  //`http://ec2-34-204-67-135.compute-1.amazonaws.com/GroupModels/JoinGroupRedirect?joinCode=1589`

  var regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {},
    match;
  while ((match = regex.exec(joinLink))) {
    params[match[1]] = match[2];
  }
  console.log(params.joinCode);
  if (params.joinCode === undefined) {
    Alert.alert('Link not a valid join link for the Lets Meet app');
    return false;
  }
  let user = await getUserInfo();
  return (
    fetch(`${URL}/GroupModels/JoinGroup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({joinCode: params.joinCode}),
    })
      // .then(data => data.json())
      .then(data => {
        console.log('GAPIHANDLING - GroupJoinGroup data:');
        console.log(JSON.stringify(data, undefined, 2));
        if (data.ok) {
          return true;
        } else {
          throw Error(data.message);
        }
      })
      .catch(e => {
        console.log('something went wrong with groupJoinGroup: ' + e);
        return false;
      })
  );
}

/**
 * API call to generate join group link
 * If something goes wrong, catches error and goes to hardcoded functionality
 *
 * @param {int} groupID Identifier for group
 * @returns join group link?
 */
export function groupsGenerateLink(joinCode) {
  console.log('(GAPIHandling) Beginning of groupsGenerateLink');
  //`${URL}/GroupModels/JoinGroupRedirect?joinCode=${joinCode}`
  // ^^ the join link!!!!!!!!! (for web)
  console.log(
    `LINK!! ${URL}/GroupModels/JoinGroupRedirect?joinCode=${joinCode}`,
  );
  return `${URL}/GroupModels/JoinGroupRedirect?joinCode=${joinCode}`;
}

/**
 * API call to generate QR code
 * If something goes wrong, catches error and goes to hardcoded functionality
 *
 * @param {int} groupID Identifier for group
 * @param {string} userName The name of current user for extraction of token
 * @returns QR thing?
 */
// export function groupsGenerateQRCode(joinCode) {
//   console.log('(GAPIHandling) Beginning of groupsGenerateQRCode');
//   const link = `LINK!! ${URL}/GroupModels/JoinGroupRedirect?joinCode=${joinCode}`;
//   console.log(link);
//   return link;
// }

/**
 * API call to start Let's Meet algorithm
 * If something goes wrong, catches error and goes to hardcoded functionality
 *
 * @param {int} groupID Identifier for group
 * @returns List of suggested times?
 */
export async function groupsLetsMeet(details) {
  console.log('(GAPIHandling) Beginning of groupsLetsMeet');
  let user = await getUserInfo();
  console.log('Details object:' + JSON.stringify(details, undefined, 2));
  // let query = `calendarID=${details.calendarID}&duration=${details.duration}`;
  // query = query + `&withinDays=${details.withinDays}&title=${details.title}`;
  // query = query + `&location=${details.location}`;
  // 30 minutes, 45 minnutes, 1 hour, 2 hour, 3 hour
  return fetch(`${URL}/EventModels/SuggestEvent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      groupID: details.groupID,
      duration: details.duration,
      withinDays: details.withinDays,
      title: details.title,
      location: details.location,
    }),
  })
    .then(data => {
      console.log('GAPIHANDLING - groupsLetsMeet data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.ok) {
        return data.json();
      } else {
        throw Error(data.statusText);
      }
    })
    .then(jsonData => {
      console.log('GAPIHANDLING - groupsLetsMeet data.json():');
      console.log(JSON.stringify(jsonData, undefined, 2));
      if (jsonData.length === 0) {
        return [{id: -1, value: ' No suggested times available'}];
      }
      return jsonData;
    })
    .catch(e => {
      console.log('something went wrong with groupsLetsMeet: ' + e);
      // console.log(JSON.stringify(DUMMY_SUGGESTIONS, undefined, 2));
      return [{id: -1, value: ' No suggested times available'}];
      // return DUMMY_SUGGESTIONS;
    });
}

const DUMMY_SUGGESTIONS = [
  {
    id: 0,
    title: 'Suggestion 1',
    startTime: 'blah',
    endTime: 'blah',
    location: 'blah',
    calendarID: 10,
  },
  {
    id: 1,
    title: 'Suggestion 2',
    startTime: 'blah',
    endTime: 'blah',
    location: 'blah',
    calendarID: 11,
  },
  {
    id: 2,
    title: 'Suggestion 3',
    startTime: 'blah',
    endTime: 'blah',
    location: 'blah',
    calendarID: 12,
  },
];

// title,
// startTime: startDate.toISOString(), //yyyy-MM-dd'T'HH:mm:ss.fff'Z' <whatever this is
// endTime: endDate.toISOString(),
// location,
// calendarID:
/**
 * API call to leave a group
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {groupID} groupID - groupID to be left
 * @returns OK = true
 */
export async function groupLeaveGroup(groupID) {
  console.log('(GAPIHandling) Beginning of GroupDeleteGroup');
  let user = await getUserInfo();
  console.log('New Group:' + groupID);
  return fetch(`${URL}/GroupModels/LeaveGroup?id=${groupID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  })
    .then(data => data.json())
    .then(data => {
      console.log('GAPIHANDLING - GroupDeleteGroup data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.status === 'ok' && data.message === 'Left group') {
        return true;
      } else {
        throw Error(data.message);
      }
    })
    .catch(e => {
      console.log('something went wrong with GroupDeleteGroup: ' + e);
      Alert.alert('Unable to leave group');
      return false;
    });
}
