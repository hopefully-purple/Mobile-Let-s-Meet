import AsyncStorage from '@react-native-async-storage/async-storage';

/*
 * Clears all contents in AsyncStorage
 */
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
    console.log('!!!! Error with clearing! > ' + e);
    throw e;
  }

  console.log('LoginScreen: Done clearing async storage');
};

export const storeUserLoginInfo = async (name, password, postResult) => {
  // let loginInfo;
  // if (postResult.status !== '') {
  //   loginInfo = {
  //     name: name,
  //     password: password,
  //   };
  //   console.log('loginInfo is just name, pass');
  // } else {
  const loginInfo = {
    name: name,
    token: postResult.token,
    expiration: postResult.expiration,
    password: password,
  };
  const s = JSON.stringify(loginInfo);
  console.log('login info is name, token, expiration, password: ' + s);
  // }

  await setStringUsername(s);
};

const setStringUsername = async value => {
  try {
    console.log('setStringUsername value param = ' + value);
    await AsyncStorage.setItem('User', value);
  } catch (e) {
    // save error
    console.log('setStringUSername error : ' + e);
    throw e;
  }

  // console.log('Set username in async storage is done.');
};

/*
 * Gets the value stored with User object
 */
export const getUserInfo = async () => {
  try {
    const value = await AsyncStorage.getItem('User');
    if (value !== null) {
      // console.log('getUserInfo: value=' + value);
      console.log('returning user info');
      return JSON.parse(value);
    }
  } catch (e) {
    // read error
    console.log('getUserInfo error: ' + e);
    throw e;
  }
  // console.log('Done getting usesrname');
  return null;
};

// export const CheckIsTokenExpired = async () => {
export async function checkIsTokenExpired(name) {
  // console.log('checkIsTExp - step 2.1: Call isStorageEmpty');

  let emptyStorage = await isStorageEmpty();
  if (!emptyStorage) {
    //There are things that exist in storage
    // console.log(
    //   'checkIsTExp - step 2.3: There are many!! Parse expiration and current date',
    // );

    let user = await getUserInfo();
    // console.log('checkIsTExp - step 2.4: user result=' + user);
    var exp = Date.parse(user.expiration);
    var d1 = new Date();
    var d = Date.parse(d1);

    // console.log(
    //   'checkIsTExp - step 2.5: Check if current date is past expiration',
    // );
    if (d >= exp) {
      // console.log('checkIsTExp - Token is expired.');
      return true;
    } else {
      // console.log('checkIsTExp - Token is not expired');
      return false;
    }
  } else {
    // There is nothing stored. Need to login. return true
    // console.log('checkIsTExp - step 2.6: nothing is stored, return true');
    return true;
  }
}

export async function isStorageEmpty() {
  // console.log(
  //   'isStorageEmpty: Checking if storage is empty. Call getAllKeys()',
  // );
  let k = await getAllKeys();
  if (k.length > 0) {
    // console.log('isStorageEmpty: No');
    return false;
  } else {
    // console.log('isStorageEmpty: Yes');
    return true;
  }
}

export const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    if (keys !== null) {
      console.log('keys: ' + keys);
      return keys;
    }
  } catch (e) {
    // read key error
    console.log('getAllKeys error: ' + e);
    throw e;
  }

  return keys;
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
};
