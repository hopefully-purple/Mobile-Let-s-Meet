import React, {useContext} from 'react';
import {bareBonesFriendsList} from '../assets/data/HardCodedFriends';
import {URL} from './APIControllers';
import {getUserInfo} from '../miscHelpers/AsyncStorageMethods';

// https://bobbyhadz.com/blog/react-sort-array-of-objects
function organizeFriends(friends) {
  let newF = {};
  newF = [...friends].sort((a, b) => (a.firstName > b.firstName ? 1 : -1));
  return newF;
}

/**
 * API call to get friends of user
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @returns json array of friend objects
 */
export async function friendsGetFriends() {
  console.log('(FAPIHandling) Beginning of GetFriends');
  let user = await getUserInfo();
  return fetch(`${URL}/FriendsModels/GetFriends`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
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
// export async function friendsGetFriend() {
//   console.log('(FAPIHandling) Beginning of GetFriends');
//   let user = await getUserInfo();
//   try {
//     const response = await fetch(`${URL}/FriendsModels/GetFriends`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     });
//     const result = await response.json();

//     console.log(JSON.stringify(result, undefined, 2));
//     return result;
//   } catch (err) {
//     console.log('something went wrong with friendsGetFriends: ' + err);
//     // throw err;
//     return [];
//   }
// }

/**
 * API call to get sent friend requests of user
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @returns json array of sent friend requests
 */
export async function friendsGetSentRequests() {
  console.log('(FAPIHandling) Beginning of GetSentRequests');
  let user = await getUserInfo();
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
    return [];
  }
}

/**
 * API call to get recieved requests of user
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @returns json array of recieved friend requests
 */
export async function friendsGetReceivedRequests() {
  console.log('(FAPIHandling) Beginning of GetReceivedRequests');
  let user = await getUserInfo();
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
    return [];
  }
}

/**
 * API call to create a friend request using email
 * If something goes wrong, catches error and goes to hardcoded functionality
 * @param {string} email1 The email of the friend you want to request
 * @returns response.ok
 */
export async function friendsCreateFriendRequestByEmail(email1) {
  console.log('(FAPIHandling) Beginning of CreateFriendRequestByEmail');
  let user = await getUserInfo();
  try {
    const response = await fetch(
      `${URL}/FriendsModels/CreateFriendRequestByEmail`,
      {
        method: 'POST',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
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
 * @param {string} friendID The id of the friend you accept the request from
 * @returns response.ok
 */
export async function friendsAcceptRequest(friendID) {
  console.log('(FAPIHandling) Beginning of AcceptRequest');
  let user = await getUserInfo();
  try {
    const response = await fetch(`${URL}/FriendsModels/AcceptRequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
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
 * @param {string} friendID The id of the friend you want to reject
 * @returns response.ok
 */
export async function friendsRejectRequest(friendID) {
  console.log('(FAPIHandling) Beginning of RejectRequest');
  let user = await getUserInfo();
  try {
    const response = await fetch(`${URL}/FriendsModels/RejectRequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
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
