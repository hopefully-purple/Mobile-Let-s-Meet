import React, {useContext} from 'react';
import {Alert} from 'react-native';

export async function loginAPICall(name, password) {
  console.log('Beginning of loginAPICall');
  try {
    console.log('Sending Username: ' + name + ' Password: ' + password);
    // So what needs to change is we need to send name and pass, and get the 'token' and 'expiration'.
    const response = await fetch(
      'http://ec2-3-84-219-120.compute-1.amazonaws.com/Auth/Login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: name,
          Password: password,
        }),
      },
    );

    console.log('(loginAPICall) return response');
    return response;
  } catch (err) {
    console.log('set is loading false. Send an alert for this eror: ' + err);
    Alert.alert('Username or password is not correct, try again');
    // throw err;
  }
}
