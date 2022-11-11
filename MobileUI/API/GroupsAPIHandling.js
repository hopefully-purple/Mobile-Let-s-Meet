import React, {useContext} from 'react';
import {
  bareBonesGroupListAccurate,
  accurateGetGroupResult,
  accurateGetGroupResult0,
} from '../assets/data/HardCodedGroups';
import {getUsernameValue} from '../miscHelpers/AsyncStorageMethods';
import {URL} from './APIControllers';

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
export async function groupsGetGroupMembers(groupID, userName) {
  console.log('(GAPIHandling) Beginning of GroupsGetGroupMembers');
  let user = await getUsernameValue(userName);
  try {
    const response = await fetch(`${URL}/GroupModels/GetGroup?id=${groupID}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
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
export async function groupCreateNewGroup(newGroup, userName) {
  console.log('(GAPIHandling) Beginning of GroupCreateNewGroup');
  let user = await getUsernameValue(userName);
  try {
    console.log('New Group:' + JSON.stringify(newGroup, undefined, 2));
    const response = await fetch(`${URL}/GroupModels/CreateGroup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: newGroup,
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
export async function groupJoinGroup(joinCode, userName) {
  console.log('(GAPIHandling) Beginning of GroupJoinGroup');
  //Pull out joincode from:
  //`${URL}/GroupModels/JoinGroupRedirect?joinCode=${joinCode}`
  let user = await getUsernameValue(userName);
  try {
    const response = await fetch(`${URL}/GroupModels/JoinGroup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: {joinCode}, //shorthand might not work??
    });

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
 * @param {string} userName The name of current user for extraction of token
 * @returns join group link?
 */
export async function groupsGenerateLink(groupID, userName) {
  console.log('(GAPIHandling) Beginning of groupsGenerateLink');
  //`${URL}/GroupModels/JoinGroupRedirect?joinCode=${joinCode}`
  // ^^ the join link!!!!!!!!! (for web)
  return '';
  // let user = await getUsernameValue(userName);
  // try {
  //   // const response = await fetch(
  //   //   ,
  //   //   {
  //   //     method: 'GET',
  //   //     headers: {
  //   //       Authorization: `Bearer ${user.token}`,
  //   //     },
  //   //   },
  //   // );
  //   // const result = await response.json();

  //   // console.log(JSON.stringify(result, undefined, 2));
  //   return '';
  // } catch (err) {
  //   console.log('something went wrong with groupsGenerateLink: ' + err);
  //   // throw err;
  //   return 'hello world';
  // }
}

/**
 * API call to generate QR code
 * If something goes wrong, catches error and goes to hardcoded functionality
 *
 * @param {int} groupID Identifier for group
 * @param {string} userName The name of current user for extraction of token
 * @returns QR thing?
 */
export async function groupsGenerateQRCode(groupID, userName) {
  console.log('(GAPIHandling) Beginning of groupsGenerateQRCode');
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
    console.log('something went wrong with groupsGenerateQRCode: ' + err);
    // throw err;
    return 'qr';
  }
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
