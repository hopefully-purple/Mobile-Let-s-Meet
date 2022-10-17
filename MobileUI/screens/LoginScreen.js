import React, {useState, useContext} from 'react';
import {Text, SafeAreaView, StyleSheet, View, TextInput} from 'react-native';
import Colors from '../assets/styles/colors';
import {GreyPillButton} from '../assets/components/CustomButtons';
import LogStateContext from '../contexts/LoginState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../contexts/User';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.DD_CREAM,
    color: Colors.DD_RED_2,
  },
  defaultScreentext: {
    fontSize: 25,
    fontWeight: '500',
    color: Colors.DD_RED_3,
    textAlign: 'center',
    marginBottom: 46,
  },
  userName: {
    height: 51,
    width: 260,
    marginLeft: 57,
    marginRight: 60,
    marginTop: 62,
    backgroundColor: Colors.DD_RED_2,
    paddingLeft: 17,
    color: Colors.DD_LIGHT_GRAY,
  },
  userPassword: {
    height: 51,
    width: 260,
    marginLeft: 56,
    marginRight: 60,
    marginTop: 37,
    backgroundColor: Colors.DD_RED_2,
    paddingLeft: 17,
    color: Colors.DD_LIGHT_GRAY,
  },
});

const setStringUsername = async (username, value) => {
  try {
    await AsyncStorage.setItem(`${username}`, value);
  } catch (e) {
    // save error
    console.log('error : ' + e);
    throw e;
  }

  // console.log('Set username in async storage is done.');
};

export const storeUserLoginInfo = async (name, password, postResult) => {
  let loginInfo;
  if (postResult.status !== '') {
    loginInfo = {
      password: password,
    };
  } else {
    loginInfo = {
      token: postResult.token,
      expiration: postResult.expiration,
      password: password,
    };
  }

  await setStringUsername(name, JSON.stringify(loginInfo));
};

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

/*
 * Gets the value stored with given username
 */
const getUsernameValue = async username => {
  try {
    const value = await AsyncStorage.getItem(username);
    if (value !== null) {
      // console.log('getUsername: value=' + value);
      return JSON.parse(value);
    }
  } catch (e) {
    // read error
    console.log('getUsername error: ' + e);
    throw e;
  }
  // console.log('Done getting usesrname');
  return null;
};

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

// export const CheckIsTokenExpired = async () => {
export async function checkIsTokenExpired(name) {
  // console.log('checkIsTExp - step 2.1: Call isStorageEmpty');

  let emptyStorage = await isStorageEmpty();
  if (!emptyStorage) {
    //There are things that exist in storage
    // console.log(
    //   'checkIsTExp - step 2.3: There are many!! Parse expiration and current date',
    // );

    let user = await getUsernameValue(name);
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

const LoginScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const {isLoggedIn, setIsLoggedIn} = useContext(LogStateContext);
  const user = useContext(UserContext);

  this.nameInput = React.createRef();
  this.passwordInput = React.createRef();

  navigation.addListener('drawerItemPress', async () => {
    if (isLoggedIn) {
      // console.log(
      //   'LoginScreen: setIsLoggedIn(false), clear inputs, clear storage, clear user context',
      // );
      setIsLoggedIn(false);
      this.passwordInput.current.clear();
      this.nameInput.current.clear();
      await clearAll();
      user.name = '';
      user.password = '';
      user.token = '';
      user.expiration = '';
    }
  });

  const handleLogInButton = async () => {
    // console.log('setisloading to true');
    setIsLoading(true);
    try {
      // console.log('Sending Username: ' + name + ' Password: ' + password);
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

      // console.log('await response');
      const result1 = await response.json();
      // console.log(result1);

      // Store info in async storage
      await storeUserLoginInfo(name, password, result1);

      // Store info in user context
      user.name = name;
      user.password = password;
      user.token = result1.token;
      user.expiration = result1.expiration;

      setIsLoading(false);
    } catch (err) {
      setErr(err.message);
      console.log('set is loading false. Send an alert for this eror: ' + err);
      throw err;
    }

    if (!isLoading) {
      // console.log('no longer loading, set logged in true, pull up my schedule');
      setIsLoggedIn(true);
      navigation.navigate('My Schedule');
    }
  };

  const handleByPassButton = () => {
    user.name = 'test';
    user.password = 'Password1!';
    setIsLoggedIn(true);
    navigation.navigate('My Schedule');
  };

  let title = "Let's Meet";
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <Text style={styles.defaultScreentext}>{title}</Text>
        <Text
          style={styles.defaultScreentext}
          onPress={() => navigation.navigate('Registration')}>
          No account? Click to sign up
        </Text>
        <TextInput
          placeholder="User Name"
          style={styles.userName}
          placeholderTextColor={Colors.DD_LIGHT_GRAY}
          onChangeText={newText => setName(newText)}
          ref={this.nameInput}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.userPassword}
          placeholderTextColor={Colors.DD_LIGHT_GRAY}
          onChangeText={newText => setPassword(newText)}
          ref={this.passwordInput}
          autoCapitalize="none"
        />
        <GreyPillButton title="Go!" onPress={() => handleLogInButton()} />
        <GreyPillButton
          title="Bypass login"
          onPress={() => handleByPassButton()}
        />
        {!!isLoading && (
          <Text style={styles.defaultScreentext}>Loading...</Text>
        )}
        {{err} && <Text style={styles.defaultScreentext}>{err}</Text>}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
