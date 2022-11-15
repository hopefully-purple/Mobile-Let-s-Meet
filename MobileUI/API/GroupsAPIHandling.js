import React, {useContext} from 'react';
import {
  bareBonesGroupListAccurate,
  accurateGetGroupResult,
  accurateGetGroupResult0,
} from '../assets/data/HardCodedGroups';
import {getUsernameValue} from '../miscHelpers/AsyncStorageMethods';
import {URL} from './APIControllers';

const rivers = {
  nile: {
    continent: 'Africa',
    length: '6,650 km',
    outflow: 'Mediterranean',
  },
  amazon: {
    continent: 'South America',
    length: '6,575 km',
    outflow: 'Atlantic Ocean',
  },
  yangtze: {
    continent: 'Asia',
    length: '6,300 km',
    outflow: 'East China Sea',
  },
  mississippi: {
    continent: 'North America',
    length: '6,275 km',
    outflow: 'Gulf of Mexico',
  },
};

export function getRiverInformation(name) {
  console.log('\n\n\n\nGET RIVER INFORMATION\n\n\n\n');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(rivers[name]);
    }, 1500);
  });
}

/**
 * API call to get all groups user is in
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} userName The name of current user for extraction of token
 * @returns list of groups
 */
export async function groupsGetGroups(userName) {
  console.log('(GAPIHandling) Beginning of GroupsGetGroups');
  let user = await getUsernameValue(userName);
  try {
    const response = await fetch(`${URL}/GroupModels/GetGroups`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const result = await response.json();

    console.log(JSON.stringify(result, undefined, 2));
    return result;
  } catch (err) {
    console.log('something went wrong with groupsGetGroups: ' + err);
    // throw err;
    // TODO::: Need to adjust display code for the accurate list
    return bareBonesGroupListAccurate;
  }
}

/**
 * API call to get members of given group
 * If something goes wrong, catches error and goes to hardcoded functionality
 *
 * @param {int} groupID Identifier for group
 * @param {string} userName The name of current user for extraction of token
 * @returns list of group members
 */
export async function groupsGetGroupMembers(groupID, userToken) {
  console.log('(GAPIHandling) Beginning of GroupsGetGroupMembers');
  // let user = await getUsernameValue(userName);
  try {
    const response = await fetch(`${URL}/GroupModels/GetGroup?id=${groupID}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const result = await response.json();

    console.log(JSON.stringify(result, undefined, 2));
    return result;
  } catch (err) {
    console.log('something went wrong with groupsGetGroupMembers: ' + err);
    // throw err;
    // TODO::: Confirm response JSON structure
    // return accurateGetGroupResult[groupID];
    // console.log(
    //   '&&&&&&&&&&&&&&&&&&' +
    //     JSON.stringify(accurateGetGroupResult[0], undefined, 2),
    // );
    return accurateGetGroupResult[groupID];
  }
}

/**
 * API call to create a new group
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {groupObject} newGroup - group object to be added
 * @param {string} userName The name of current user for extraction of token
 * @returns OK = true
 */
export async function groupCreateNewGroup(newGroup, userToken) {
  console.log('(GAPIHandling) Beginning of GroupCreateNewGroup');
  // let user = await getUsernameValue(userName);
  try {
    console.log('New Group:' + JSON.stringify(newGroup, undefined, 2));
    const response = await fetch(`${URL}/GroupModels/CreateGroup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: {newGroup},
    });

    return response.ok;
  } catch (err) {
    console.log('something went wrong with groupCreateNewGroup: ' + err);
    // throw err;
    return false;
  }
}

/**
 * API call to join a group
 * TO BE CALLED FROM HANDLE LINK SUBMIT
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} joinCode - Code to join associated group
 * @param {string} userName The name of current user for extraction of token
 * @returns OK = true
 */
export async function groupJoinGroup(joinLink, userToken) {
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
  // let user = await getUsernameValue(user);
  try {
    const response = await fetch(`${URL}/GroupModels/JoinGroup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: {joinCode: params.joinCode},
    });

    console.log('GAPIHandling: joingroup response status: ' + response.status);
    if (response.status !== 200) {
      console.log(JSON.stringify(response, undefined, 2));
    }
    return response.ok;
  } catch (err) {
    console.log('something went wrong with groupJoinGroup: ' + err);
    // throw err;
    return false;
  }
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
 * @param {string} userName The name of current user for extraction of token
 * @returns List of suggested times?
 */
export async function groupsLetsMeet(groupID, userName) {
  console.log('(GAPIHandling) Beginning of groupsLetsMeet');
  let user = await getUsernameValue(userName);
  try {
    const response = await fetch(`${URL}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const result = await response.json();

    console.log(JSON.stringify(result, undefined, 2));
    return result;
  } catch (err) {
    console.log('something went wrong with groupsLetsMeet: ' + err);
    throw err;
    // return accurateGetGroupResult[groupID];
  }
}
