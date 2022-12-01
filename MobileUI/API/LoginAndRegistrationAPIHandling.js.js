import React, {useContext} from 'react';
import {Alert} from 'react-native';
import {URL} from './APIControllers';

export async function loginAPICall(name, password) {
  console.log('Beginning of loginAPICall');
  try {
    console.log('Sending Username: ' + name + ' Password: ' + password);
    // So what needs to change is we need to send name and pass, and get the 'token' and 'expiration'.
    const response = await fetch(`${URL}/Auth/Login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Username: name,
        Password: password,
      }),
    });

    console.log('(loginAPICall) return response');
    return response;
  } catch (err) {
    console.log('set is loading false. Send an alert for this eror: ' + err);
    Alert.alert('Username or password is not correct, try again');
    // throw err;
  }
}

export async function registerAPICall(name, firstN, lastN, email, password) {
  console.log('Beginning of registerAPICall');
  return fetch(`${URL}/Auth/CreateUser`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Username: name,
      FirstName: firstN,
      LastName: lastN,
      Email: email,
      Password: password,
    }),
  })
    .then(data => data.json())
    .then(data => {
      console.log('L&RAPIHANDLING - registration data:');
      console.log(JSON.stringify(data, undefined, 2));
      if (data.status === 'Success') {
        return data;
      } else {
        throw Error(data.statusText);
      }
    })
    .catch(e => {
      console.log('something went wrong with registerAPICall: ' + e);
      return null;
    });
}

// export async function registerAPICal(name, firstN, lastN, email, password) {
//   console.log('Beginning of registerAPICall');
//   try {
//     // console.log('Sending Username: ' + name + ' Password: ' + password);
//     // So what needs to change is we need to send name and pass, and get the 'token' and 'expiration'.
//     const response = await fetch(`${URL}/Auth/CreateUser`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         Username: name,
//         FirstName: firstN,
//         LastName: lastN,
//         Email: email,
//         Password: password,
//       }),
//     });

//     // console.log('await response');
//     const result1 = await response.json();
//     // console.log(result1);
//     return result1;
//   } catch (err) {
//     // setErr(err.message);
//     console.log('set is loading false. Send an alert for this eror: ' + err);
//     throw err;
//   }
// }
