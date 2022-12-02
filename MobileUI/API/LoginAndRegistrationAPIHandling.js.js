import {URL} from './APIControllers';

export async function loginAPICall(name, password) {
  console.log('Beginning of loginAPICall');
  console.log('Sending Username: ' + name + ' Password: ' + password);
  return fetch(`${URL}/Auth/Login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Username: name,
      Password: password,
    }),
  })
    .then(data => {
      if (data.ok) {
        return data.json();
      } else {
        throw Error(data.statusText);
      }
    })
    .then(jsonData => {
      console.log('L&RAPIHANDLING - loginAPICall data:');
      console.log(JSON.stringify(jsonData, undefined, 2));
      return jsonData;
    })
    .catch(e => {
      console.log('something went wrong with loginAPICall: ' + e);
      return null;
    });
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
