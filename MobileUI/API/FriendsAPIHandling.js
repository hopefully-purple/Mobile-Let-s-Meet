import React, {useContext} from 'react';
import {bareBonesFriendsList} from '../assets/data/HardCodedFriends';
import {getUsernameValue} from '../miscHelpers/AsyncStorageMethods';

/**
 * API call to get friends of user
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @returns json array of friend objects
 */
export async function friendsGetFriends(userName) {
  console.log('(FAPIHandling) Beginning of GetFriends');
  let user = await getUsernameValue(userName);
  try {
    const response = await fetch(
      'http://ec2-3-84-219-120.compute-1.amazonaws.com/FriendsModels/GetFriends',
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
    console.log('something went wrong with friendsGetFriends: ' + err);
    // throw err;
    return bareBonesFriendsList;
  }
}

/**
 * API call to get sent friend requests of user
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @returns json array of sent friend requests
 */
export async function friendsGetSentRequests(userName) {
  console.log('(FAPIHandling) Beginning of GetSentRequests');
  let user = await getUsernameValue(userName);
  try {
    const response = await fetch(
      'http://ec2-3-84-219-120.compute-1.amazonaws.com/FriendsModels/GetSentRequests',
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
    console.log('something went wrong with friendsGetSentRequests: ' + err);
    // throw err;
    return [];
  }
}

/**
 * API call to create a friend request using email
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @returns response.ok
 */
export async function friendsCreateFriendRequestByEmail(email, userName) {
  console.log('(FAPIHandling) Beginning of CreateFriendRequestByEmail');
  let user = await getUsernameValue(userName);
  try {
    const response = await fetch(
      'http://ec2-3-84-219-120.compute-1.amazonaws.com/FriendsModels/CreateFriendRequestByEmail',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: email,
      },
    );

    return response.ok;
  } catch (err) {
    console.log(
      'something went wrong with friendsCreateFriendRequestByEmail: ' + err,
    );
    // throw err;
    return true;
  }
}
