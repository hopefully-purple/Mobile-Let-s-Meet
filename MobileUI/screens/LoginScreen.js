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
import UserContext from '../contexts/User';
import {loginAPICall} from '../API/LoginAndRegistrationAPIHandling.js';
import {storeUserLoginInfo, clearAll} from '../miscHelpers/AsyncStorageMethods';

const LoginScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {isLoggedIn, setIsLoggedIn} = useContext(LogStateContext);
  const user = useContext(UserContext);

  this.nameInput = React.createRef();
  this.passwordInput = React.createRef();

  navigation.addListener('drawerItemPress', async () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      this.passwordInput.current.clear();
      this.nameInput.current.clear();
      this.passwordInput.current.blur();
      // this.nameInput.current.blur();
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
    console.log('(2)calling loginAPICall');
    const response = await loginAPICall(name, password);
    console.log('(3)line after call');

    if (response === null) {
      console.log('set is loading false. Send an alert');
      Alert.alert('Username or password is not correct, try again');
      setIsLoading(false);
      // this.passwordInput.current.clear();
      // this.nameInput.current.clear();
    } else {
      console.log('(4) response is good, log in');
      // Store info in async storage
      await storeUserLoginInfo(name, password, response);

      // Store info in user context
      user.name = name;
      user.password = password;
      user.token = response.token;
      user.expiration = response.expiration;

      setIsLoading(false);

      if (!isLoading) {
        setIsLoggedIn(true);
        navigation.navigate('My Schedule');
      }
    }
  };

  // const handleByPassButton = () => {
  //   user.name = 'test';
  //   user.password = 'Password1!';
  //   setIsLoggedIn(true);
  //   navigation.navigate('My Schedule');
  // };

  let title = "Let's\n    Meet";
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text
          style={styles.registrationText}
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
          secureTextEntry={true}
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
  titleText: {
    fontFamily: 'Sansita Swashed',
    fontSize: 72,
    fontWeight: '700',
    color: Colors.DD_RED_3,
    marginBottom: 46,
  },
  registrationText: {
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: '400',
    color: Colors.DD_RED_3,
    marginVertical: 30,
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
