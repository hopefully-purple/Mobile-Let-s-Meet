import React, {useContext} from 'react';
import {bareBonesFriendsList} from '../assets/data/HardCodedFriends';
import {getUsernameValue} from '../miscHelpers/AsyncStorageMethods';
import {URL} from './APIControllers';

/**
 * API call to get friends of user
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} userName The name of current user for extraction of token
 * @returns json array of friend objects
 */
export async function friendsGetFriends(userName) {
  console.log('(FAPIHandling) Beginning of GetFriends');
  let user = await getUsernameValue(userName);
  try {
    const response = await fetch(`${URL}/FriendsModels/GetFriends`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
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
 * @param {string} userName The name of current user for extraction of token
 * @returns json array of sent friend requests
 */
export async function friendsGetSentRequests(userName) {
  console.log('(FAPIHandling) Beginning of GetSentRequests');
  let user = await getUsernameValue(userName);
  try {
    const response = await fetch(`${URL}/FriendsModels/GetSentRequests`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const result = await response.json();

    console.log(JSON.stringify(result, undefined, 2));
    return result;
  } catch (err) {
    console.log('something went wrong with friendsGetSentRequests: ' + err);
    // throw err;
    return [
      {id: 0, name: 'NewFriend1'},
      {id: 1, name: 'NewFriend2'},
      {id: 2, name: 'NewFriend3'},
    ];
  }
}

/**
 * API call to get recieved requests of user
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} userName The name of current user for extraction of token
 * @returns json array of recieved friend requests
 */
export async function friendsGetReceivedRequests(userName) {
  console.log('(FAPIHandling) Beginning of GetReceivedRequests');
  let user = await getUsernameValue(userName);
  try {
    const response = await fetch(`${URL}/FriendsModels/GetReceivedRequests`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const result = await response.json();

    console.log(JSON.stringify(result, undefined, 2));
    return result;
  } catch (err) {
    console.log('something went wrong with friendsGetReceivedRequests: ' + err);
    // throw err;
    return [
      {id: 0, name: 'NewFriend4'},
      {id: 1, name: 'NewFriend5'},
      {id: 2, name: 'NewFriend6'},
    ];
  }
}

/**
 * API call to create a friend request using email
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} userName The name of current user for extraction of token
 * @returns response.ok
 */
export async function friendsCreateFriendRequestByEmail(email, userName) {
  console.log('(FAPIHandling) Beginning of CreateFriendRequestByEmail');
  let user = await getUsernameValue(userName);
  try {
    const response = await fetch(
      `${URL}/FriendsModels/CreateFriendRequestByEmail`,
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

/**
 * API call to accept a friend request
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} userName The name of current user for extraction of token
 * @returns response.ok
 */
export async function friendsAcceptRequest(friend, userName) {
  console.log('(FAPIHandling) Beginning of AcceptRequest');
  let user = await getUsernameValue(userName);
  try {
    const response = await fetch(`${URL}/FriendsModels/AcceptRequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: friend.id,
    });

    return response.ok;
  } catch (err) {
    console.log('something went wrong with friendsAcceptRequest: ' + err);
    // throw err;
    return true;
  }
}

/**
 * API call to reject a friend request
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} userName The name of current user for extraction of token
 * @returns response.ok
 */
export async function friendsRejectRequest(friend, userName) {
  console.log('(FAPIHandling) Beginning of RejectRequest');
  let user = await getUsernameValue(userName);
  try {
    const response = await fetch(`${URL}/FriendsModels/RejectRequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: friend.id,
    });

    return response.ok;
  } catch (err) {
    console.log('something went wrong with friendsRejectRequest: ' + err);
    // throw err;
    return true;
  }
}
