import React, {useState, useContext} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Alert,
} from 'react-native';
import Colors from '../assets/styles/colors';
import {GreyPillButton} from '../assets/components/CustomButtons';
import LogStateContext from '../contexts/LoginState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../contexts/User';
import {loginAPICall} from '../API/LoginAndRegistrationAPIHandling.js';
import {storeUserLoginInfo, clearAll} from '../miscHelpers/AsyncStorageMethods';

const LoginScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const [err, setErr] = useState('');
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
      user.first = '';
      user.last = '';
      user.password = '';
      user.token = '';
      user.expiration = '';
    }
  });

  const handleLogInButton = async () => {
    console.log('(1)setisloading to true');
    setIsLoading(true);
    let response = '';
    try {
      console.log('(2)calling loginAPICall');
      response = await loginAPICall(name, password);
      console.log('(3)line after call');
    } catch (err) {
      console.log('set is loading false. Send an alert for this eror: ' + err);
      Alert.alert('Username or password is not correct, try again');
      // throw err;
    }
    if (response.ok) {
      console.log('(4)await response');

      const result1 = await response.json();
      console.log('login resposne:::');
      console.log(JSON.stringify(result1, undefined, 2));

      // Store info in async storage
      await storeUserLoginInfo(name, password, result1);

      // Store info in user context
      user.name = name;
      user.password = password;
      user.token = result1.token;
      user.expiration = result1.expiration;

      setIsLoading(false);

      if (!isLoading) {
        // console.log('no longer loading, set logged in true, pull up my schedule');
        setIsLoggedIn(true);
        navigation.navigate('Profile');
      }
    } else {
      console.log(JSON.stringify(response, undefined, 2));
      Alert.alert('response was falsyyyyyy');
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
          placeholder="Username"
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
        {/* <GreyPillButton
          title="Bypass login"
          onPress={() => handleByPassButton()}
        /> */}
        {!!isLoading && (
          <Text style={styles.defaultScreentext}>Loading...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

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

export default LoginScreen;
