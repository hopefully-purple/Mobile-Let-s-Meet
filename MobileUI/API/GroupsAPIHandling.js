import React, {useContext} from 'react';
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
      console.log('GAPIHANDLING - data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.ok) {
        return data.json();
      } else {
        throw Error(data.statusText);
      }
    })
    .then(jsonData => {
      console.log('GAPIHANDLING - data.json():');
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
      console.log('GAPIHANDLING - data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.ok) {
        return data.json();
      } else {
        throw Error(data.statusText);
      }
    })
    .then(jsonData => {
      console.log('GAPIHANDLING - data.json():');
      console.log(JSON.stringify(jsonData, undefined, 2));
      return organizeGroups(jsonData);
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
      console.log('GAPIHANDLING - data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.status === 'ok' && data.message === 'Group created') {
        return true;
      } else {
        throw Error(data.statusText);
      }
    })
    .catch(e => {
      console.log('something went wrong with groupCreateNewGroup: ' + e);
      return [];
    });
}

// export async function groupCreateNewGrou(newGroup) {
//   console.log('(GAPIHandling) Beginning of GroupCreateNewGroup');
//   let user = await getUserInfo();
//   try {
//     console.log('New Group:' + JSON.stringify(newGroup, undefined, 2));
//     const response = await fetch(`${URL}/GroupModels/CreateGroup`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${user.token}`,
//       },
//       body: {newGroup},
//     });

//     return response.ok;
//   } catch (err) {
//     console.log('something went wrong with groupCreateNewGroup: ' + err);
//     // throw err;
//     return false;
//   }
// }

/**
 * API call to join a group
 * TO BE CALLED FROM HANDLE LINK SUBMIT
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} joinCode - Code to join associated group
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
  // return false;
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
        console.log('GAPIHANDLING - data:');
        console.log(JSON.stringify(data, undefined, 2));
        if (
          data.status === 'ok' &&
          data.message === '** FIGURE OUT WHAT THIS IS'
        ) {
          return true;
        } else {
          throw Error(data.statusText);
        }
      })
      .catch(e => {
        console.log('something went wrong with groupJoinGroup: ' + e);
        return false;
      })
  );
}
// try {
//   const response = await fetch(`${URL}/GroupModels/JoinGroup`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${user.token}`,
//     },
//     body: {joinCode: params.joinCode},
//   });

//   console.log('GAPIHandling: joingroup response status: ' + response.status);
//   if (response.status !== 200) {
//     console.log(JSON.stringify(response, undefined, 2));
//   }
//   return response.ok;
// } catch (err) {
//   console.log('something went wrong with groupJoinGroup: ' + err);
//   // throw err;
//   return false;
// }

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
export function groupsGenerateQRCode(joinCode) {
  console.log('(GAPIHandling) Beginning of groupsGenerateQRCode');
  const link = `LINK!! ${URL}/GroupModels/JoinGroupRedirect?joinCode=${joinCode}`;
  console.log(link);
  console.log('need to transform into a qr picture');
  return '';
}

/**
 * API call to start Let's Meet algorithm
 * If something goes wrong, catches error and goes to hardcoded functionality
 *
 * @param {int} groupID Identifier for group
 * @returns List of suggested times?
 */
export async function groupsLetsMeet(groupID) {
  console.log('(GAPIHandling) Beginning of groupsLetsMeet');
  let user = await getUserInfo();
  console.log('New Group:' + JSON.stringify(groupID, undefined, 2));
  return fetch(`${URL}/GroupModels/SuggestEvent`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(groupID),
  })
    .then(data => {
      console.log('GAPIHANDLING - data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.ok) {
        return data.json();
      } else {
        throw Error(data.statusText);
      }
    })
    .then(jsonData => {
      console.log('GAPIHANDLING - data.json():');
      console.log(JSON.stringify(jsonData, undefined, 2));
      return organizeGroups(jsonData);
    })
    .catch(e => {
      console.log('something went wrong with groupsLetsMeet: ' + e);
      return [];
    });
}
