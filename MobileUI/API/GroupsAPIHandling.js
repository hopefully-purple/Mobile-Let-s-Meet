import React, {useContext} from 'react';
import {bareBonesGroupList} from '../assets/data/HardCodedGroups';

/**
 * API call to get groups user is in
 * @returns Hardcoded list of groups
 */
export async function groupsGetGroups() {
  console.log('(GAPIHandling) Beginning of GroupsGetGroups');
  return bareBonesGroupList;
  //   try {
  //     const response = await fetch(
  //       'http://ec2-3-84-219-120.compute-1.amazonaws.com/EventModels/GetEvents',
  //       {
  //         method: 'GET',
  //       },
  //     );
  //     const result = await response.json();

  //     console.log(JSON.stringify(result, undefined, 2));
  //     return result;
  //   } catch (err) {
  //     console.log('something went wrong with groupsGetGroups: ' + err);
  //     throw err;
  //   }
}

/**
 * API call to create a new group
 * @param {groupObject} newGroup - group object to be added
 * @returns OK = true
 */
export async function groupCreateNewGroup(newGroup) {
  console.log('(GAPIHandling) Beginning of GroupCreateNewGroup');
  return true;
  //   try {
  //     console.log('New Group:' + JSON.stringify(newGroup, undefined, 2));
  //     const response = await fetch(
  //       'http://ec2-3-84-219-120.compute-1.amazonaws.com/EventModels/Create',
  //       {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: newGroup,
  //       },
  //     );
  //     const result = await response.json();
  //     return result;
  //   } catch (err) {
  //     console.log('something went wrong with groupCreateNewGroup: ' + err);
  //     throw err;
  //   }
}

// TODO: Do we want just anybody to be able to delete groups?
