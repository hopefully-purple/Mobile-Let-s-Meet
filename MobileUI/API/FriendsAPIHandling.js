import React, {useContext} from 'react';
import {bareBonesFriendsList} from '../assets/data/HardCodedFriends';

/**
 * API call to get friends of user
 * @returns Hardcoded list of friends
 */
export async function friendsGetFriends() {
  console.log('(FAPIHandling) Beginning of GetFriends');
  return bareBonesFriendsList;
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
 * API call to get sent friend requests of user
 * @returns empty list
 */
export async function friendsGetSentRequests() {
  console.log('(FAPIHandling) Beginning of GetSentRequests');
  return [];
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
 * API call to get sent friend requests of user
 * @returns true
 */
export async function friendsCreateFriendRequestById() {
  console.log('(FAPIHandling) Beginning of CreateFriendRequest');
  return true;
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
