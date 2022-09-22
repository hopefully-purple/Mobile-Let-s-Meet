import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import Navigation from './screens/Navigation/Navigation';
import SplashScreen from './screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from './contexts/User';
import LandInLogScreenContext from './contexts/LandInLogScreen';

// Clears all contents in AsyncStorage
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
    console.log('!!!! Error with clearing! > ' + e);
  }

  console.log('App: Done clearing');
};

// Gets the value stored with given username
const getUsernameValue = async username => {
  try {
    const value = await AsyncStorage.getItem(username);
    if (value !== null) {
      console.log('getUsername: value=' + value);
      return JSON.parse(value);
    }
  } catch (e) {
    // read error
    console.log('getUsername error: ' + e);
  }
  console.log('Done getting usesrname');
  return null;
};

const getAllKeys = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
    if (keys !== null) {
      console.log(keys);
      return keys;
    }
  } catch (e) {
    // read key error
    console.log('getAllKeys error: ' + e);
  }

  return keys;
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
};

export async function isStorageEmpty() {
  console.log(
    'isStorageEmpty: Checking if storage is empty. Call getAllKeys()',
  );
  let k = await getAllKeys();
  if (k.length > 0) {
    console.log('isStorageEmpty: No');
    return false;
  } else {
    console.log('isStorageEmpty: Yes');
    return true;
  }
}

// export const CheckIsTokenExpired = async () => {
export async function checkIsTokenExpired(name) {
  console.log('checkIsTExp - step 2.1: Call isStorageEmpty');

  let emptyStorage = await isStorageEmpty();
  if (!emptyStorage) {
    //There are things that exist in storage
    console.log(
      'checkIsTExp - step 2.3: There are many!! Parse expiration and current date',
    );

    let user = await getUsernameValue(name);
    console.log('checkIsTExp - step 2.4: user result=' + user);
    var exp = Date.parse(user.expiration);
    var d1 = new Date();
    var d = Date.parse(d1);

    console.log(
      'checkIsTExp - step 2.5: Check if current date is past expiration',
    );
    if (d >= exp) {
      console.log('checkIsTExp - Token is expired.');
      return true;
    } else {
      console.log('checkIsTExp - Token is not expired');
      return false;
    }
  } else {
    // There is nothing stored. Need to login. return true
    console.log('checkIsTExp - step 2.6: nothing is stored, return true');
    return true;
  }
}

const user = {
  name: 'Kwame',
  favorites: ['avocado', 'carrot'],
};

const App = () => {
  const [init, setInit] = useState(false);
  const [landInLog, setLandInLog] = useState(true);

  const initStuff = useCallback(async () => {
    console.log('initStuff');
    // const data = await fetch('https://yourapi.com'); << save for building user???
    let isEmpty = await isStorageEmpty();
    if (isEmpty) {
      console.log('Storage is empty');
      setLandInLog(true);
      setInit(true);
    } else {
      console.log('Storage is NOT empty. Perform expiration check');
      let isExpired = await checkIsTokenExpired('test');
      if (isExpired) {
        console.log('Token is expired! Go to login');
        setLandInLog(true);
        setInit(true);
      } else {
        console.log('Token is not expired, go to myschedule');
        setLandInLog(false);
        setInit(true);
      }
    }
    console.log('end of async initStuff');
  }, []);

  useEffect(() => {
    console.log('useEffect');
    // declare the data fetching function

    console.log('useEffect: call initStuff');
    // call the function
    initStuff()
      // make sure to catch any error
      .catch(console.error);

    console.log('useEffect: end of useEffect');
  }, [initStuff]);

  // useEffect(() => {
  //   while (!init) {
  //     console.log('second useEffect');
  //   }
  // }, [init]);

  return (
    <UserContext.Provider value={user}>
      <LandInLogScreenContext.Provider value={{landInLog, setLandInLog}}>
        {init ? <Navigation /> : <SplashScreen />}
      </LandInLogScreenContext.Provider>
    </UserContext.Provider>
  );
};

export default App;

//Important links
//https://reactnavigation.org/docs/drawer-based-navigation/
//https://reactnavigation.org/docs/drawer-navigator/
