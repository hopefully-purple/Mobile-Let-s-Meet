import React, {useContext} from 'react';
import {bareBonesFriendsList} from '../assets/data/HardCodedFriends';
import {getUsernameValue} from '../miscHelpers/AsyncStorageMethods';
import {URL} from './APIControllers';

// https://bobbyhadz.com/blog/react-sort-array-of-objects
function organizeFriends(friends) {
  let newF = {};
  newF = [...friends].sort((a, b) => (a.firstName > b.firstName ? 1 : -1));
  return newF;
}

/**
 * API call to get friends of user
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} userToken The token of current user for authorization
 * @returns json array of friend objects
 */
export function friendsGetFriends(userToken) {
  console.log('(FAPIHandling) Beginning of GetFriends');
  return fetch(`${URL}/FriendsModels/GetFriends`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then(data => {
      console.log('FAPIHANDLING - data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.ok) {
        return data.json();
      } else {
        throw Error(data.statusText);
      }
    })
    .then(jsonData => {
      console.log('FAPIHANDLING - data.json():');
      console.log(JSON.stringify(jsonData, undefined, 2));
      return organizeFriends(jsonData);
    })
    .catch(e => {
      console.log('something went wrong with friendsGetFriends: ' + e);
      return [];
    });
}
export async function friendsGetFriend(userToken) {
  console.log('(FAPIHandling) Beginning of GetFriends');
  // let user = await getUsernameValue(userName);
  try {
    const response = await fetch(`${URL}/FriendsModels/GetFriends`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const result = await response.json();

    console.log(JSON.stringify(result, undefined, 2));
    return result;
  } catch (err) {
    console.log('something went wrong with friendsGetFriends: ' + err);
    // throw err;
    return [];
  }
}

/**
 * API call to get sent friend requests of user
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} userName The name of current user for extraction of token
 * @returns json array of sent friend requests
 */
export async function friendsGetSentRequests(userToken) {
  console.log('(FAPIHandling) Beginning of GetSentRequests');
  // let user = await getUsernameValue(userName);
  try {
    const response = await fetch(`${URL}/FriendsModels/GetSentRequests`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
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
 * API call to get recieved requests of user
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} userName The name of current user for extraction of token
 * @returns json array of recieved friend requests
 */
export async function friendsGetReceivedRequests(userToken) {
  console.log('(FAPIHandling) Beginning of GetReceivedRequests');
  // let user = await getUsernameValue(userName);
  try {
    const response = await fetch(`${URL}/FriendsModels/GetReceivedRequests`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const result = await response.json();

    console.log(JSON.stringify(result, undefined, 2));
    return result;
  } catch (err) {
    console.log('something went wrong with friendsGetReceivedRequests: ' + err);
    // throw err;
    return [];
  }
}

/**
 * API call to create a friend request using email
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} userName The name of current user for extraction of token
 * @returns response.ok
 */
export async function friendsCreateFriendRequestByEmail(email1, userToken) {
  console.log('(FAPIHandling) Beginning of CreateFriendRequestByEmail');
  // let user = await getUsernameValue(userName);
  try {
    const response = await fetch(
      `${URL}/FriendsModels/CreateFriendRequestByEmail`,
      {
        method: 'POST',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        // body: {email},
        body: JSON.stringify({
          email: email1,
        }),
      },
    );

    console.log('(FAPIHANDLING) CreateRequestEmail status: ');
    console.log(JSON.stringify(response, undefined, 2));

    // if (response.status !== 200) {
    //   console.log(JSON.stringify(response, undefined, 2));
    // }
    return response.ok;
  } catch (err) {
    console.log(
      'something went wrong with friendsCreateFriendRequestByEmail: ' + err,
    );
    // throw err;
    return false;
  }
}

/**
 * API call to accept a friend request
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} userName The name of current user for extraction of token
 * @returns response.ok
 */
export async function friendsAcceptRequest(friendID, userToken) {
  console.log('(FAPIHandling) Beginning of AcceptRequest');
  // let user = await getUsernameValue(userName);
  try {
    const response = await fetch(`${URL}/FriendsModels/AcceptRequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({id: friendID}),
    });

    console.log('(FAPIHandling) Return Accepted status: ' + response.status);
    if (response.status !== 200) {
      console.log(JSON.stringify(response, undefined, 2));
    }
    return response.ok;
  } catch (err) {
    console.log('something went wrong with friendsAcceptRequest: ' + err);
    // throw err;
    return false;
  }
}

/**
 * API call to reject a friend request
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} userName The name of current user for extraction of token
 * @returns response.ok
 */
export async function friendsRejectRequest(friendID, userToken) {
  console.log('(FAPIHandling) Beginning of RejectRequest');
  // let user = await getUsernameValue(userName);
  try {
    const response = await fetch(`${URL}/FriendsModels/RejectRequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      body: {id: friendID},
    });

    console.log('(FAPIHandling) Return Rejected status: ' + response.status);
    if (response.status !== 200) {
      console.log(JSON.stringify(response, undefined, 2));
    }
    return response.ok;
  } catch (err) {
    console.log('something went wrong with friendsRejectRequest: ' + err);
    // throw err;
    return false;
  }
}
