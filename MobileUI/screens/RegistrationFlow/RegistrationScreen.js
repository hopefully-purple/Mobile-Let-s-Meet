import React, {useState, useContext, createContext, useEffect} from 'react';
import {Text, SafeAreaView, StyleSheet, View, TextInput} from 'react-native';
import Colors from '../../assets/styles/colors';
import {GreyPillButton} from '../../assets/components/CustomButtons';
import {storeUserLoginInfo} from '../../miscHelpers/AsyncStorageMethods';
import UserContext from '../../contexts/User';
// import LogStateContext from '../../contexts/LoginState';

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
  userInput: {
    height: 51,
    width: 260,
    marginLeft: 57,
    marginRight: 60,
    marginTop: 62,
    backgroundColor: Colors.DD_RED_2,
    paddingLeft: 17,
    color: Colors.DD_LIGHT_GRAY,
  },
});

const RegistrationScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);
  // const {isLoggedIn, setIsLoggedIn} = useContext(LogStateContext);

  this.nameInput = React.createRef();
  this.passwordInput = React.createRef();
  this.emailInput = React.createRef();

  const handleCreateAccountButton = async () => {
    // console.log('setisloading to true');
    setIsLoading(true);
    try {
      // console.log('Sending Username: ' + name + ' Password: ' + password);
      // So what needs to change is we need to send name and pass, and get the 'token' and 'expiration'.
      const response = await fetch(
        'http://ec2-3-84-219-120.compute-1.amazonaws.com/Auth/CreateUser',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Username: name,
            Email: email,
            Password: password,
          }),
        },
      );

      // console.log('await response');
      const result1 = await response.json();
      // console.log(result1);

      if (result1.status === 'Success') {
        // Store info in async storage
        await storeUserLoginInfo(name, password, result1);

        // Store info in user context
        user.name = name;
        user.password = password;

        setIsLoading(false);
      }
    } catch (err) {
      // setErr(err.message);
      console.log('set is loading false. Send an alert for this eror: ' + err);
      throw err;
    }

    if (!isLoading) {
      // console.log('no longer loading, set logged in true, pull up my schedule');
      // setIsLoggedIn(true);
      navigation.navigate('BaseRegistration');
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <Text style={styles.defaultScreentext}>Sign up for</Text>
        <Text style={styles.defaultScreentext}> Let's Meet</Text>
        <TextInput
          placeholder="User Name"
          style={styles.userInput}
          placeholderTextColor={Colors.DD_LIGHT_GRAY}
          onChangeText={newText => setName(newText)}
          ref={this.nameInput}
        />
        <TextInput
          placeholder="Password"
          style={styles.userInput}
          placeholderTextColor={Colors.DD_LIGHT_GRAY}
          onChangeText={newText => setPassword(newText)}
          ref={this.passwordInput}
        />
        <TextInput
          placeholder="Email"
          style={styles.userInput}
          placeholderTextColor={Colors.DD_LIGHT_GRAY}
          onChangeText={newText => setEmail(newText)}
          ref={this.emailInput}
        />
        <GreyPillButton
          title="Create Account"
          onPress={() => handleCreateAccountButton()}
        />
        {isLoading && <Text style={styles.defaultScreentext}>Loading...</Text>}
      </View>
    </SafeAreaView>
  );
};

// RegistrationScreen.defaultProps = {
//   groupName: "My"
// }

export default RegistrationScreen;
