import React, {useContext} from 'react';
import {bareBonesGroupList} from '../assets/data/HardCodedGroups';
import {getUsernameValue} from '../miscHelpers/AsyncStorageMethods';

/**
 * API call to get groups user is in
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} userName The name of current user for extraction of token
 * @returns list of groups
 */
export async function groupsGetGroups(userName) {
  console.log('(GAPIHandling) Beginning of GroupsGetGroups');
  let user = await getUsernameValue(userName);
  try {
    const response = await fetch(
      'http://ec2-3-84-219-120.compute-1.amazonaws.com/GroupModels/GetGroups',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    );
    const result = await response.json();

    console.log(JSON.stringify(result, undefined, 2));
    return result;
  } catch (err) {
    console.log('something went wrong with groupsGetGroups: ' + err);
    // throw err;
    // TODO::: Need to adjust display code for the accurate list, and figure out
    // how to display members
    return bareBonesGroupList;
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
    const response = await fetch(
      'http://ec2-3-84-219-120.compute-1.amazonaws.com//GroupModels/CreateGroup',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: newGroup,
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log('something went wrong with groupCreateNewGroup: ' + err);
    // throw err;
    return true;
  }
}

// TODO: Do we want just anybody to be able to delete groups?
