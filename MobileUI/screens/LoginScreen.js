import React, {useState, useContext} from 'react';
import {
  Alert,
  Text,
  //StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import Colors from '../assets/styles/colors';
import Button from '../assets/components/CustomButton';
import {LogStateContext} from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const setStringToken = async value => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    // save error
    console.log('error : ' + e);
  }

  console.log('Set token is done.');
};

const setStringExpiration = async value => {
  try {
    await AsyncStorage.setItem('expiration', value);
  } catch (e) {
    // save error
    console.log('error : ' + e);
  }

  console.log('Set expiration is done.');
};

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      console.log('getToken: value=' + value);
      return value;
    }
  } catch (e) {
    // read error
    console.log('get token error: ' + e);
  }
  console.log('Done getting token');
  return null;
};

const getExpiration = async () => {
  try {
    const value = await AsyncStorage.getItem('expiration');
    if (value !== null) {
      console.log('getExpiration: value=' + value);
      return value;
    }
  } catch (e) {
    // read error
    console.log('getExpiration error: ' + e);
  }
  console.log('Done getting expiration');
  return null;
};

const LoginScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const {isLoggedIn, setIsLoggedIn} = useContext(LogStateContext);

  // if (getToken() !== null) {
  //   // Meaning we have already logged in
  //   console.log('we have already recieved a login token');
  //   setIsLoggedIn(true);
  // }

  this.nameInput = React.createRef();
  this.passwordInput = React.createRef();

  navigation.addListener('drawerItemPress', () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      this.passwordInput.current.clear();
      this.nameInput.current.clear();
    }
  });

  const handleLogInButton = async () => {
    console.log('setisloading to true');
    setIsLoading(true);
    try {
      console.log('Sending Username: ' + name + ' Password: ' + password);
      // So what needs to change is we need to send name and pass, and get the 'token' and 'expiration'.
      const response = await fetch(
        'http://ec2-52-7-65-63.compute-1.amazonaws.com/Auth/Login',
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
      // if (!response.ok) {
      //   throw new Error(`Error! status: ${response.status}`);
      // }

      console.log('await response');
      const result1 = await response.json();
      // console.log(result1);
      const result = JSON.parse(JSON.stringify(result1));
      const token = result.token;
      const expiration = result.expiration;
      console.log('token variable: ' + token);
      await setStringToken(token);
      console.log('expiration variable: ' + expiration);
      await setStringExpiration(expiration);

      setIsLoading(false);
    } catch (err) {
      setErr(err.message);
      console.log('set is loading false. Send an alert for this eror: ' + err);
      setIsLoading(false);
      Alert.alert(err.message);
    }
    // } finally {
    // }
    if (!isLoading) {
      console.log('no longer loading, set logged in true, pull up my schedule');
      setIsLoggedIn(true);
      navigation.navigate('My Schedule');
    }
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
        <Button title="Go!" onPress={() => handleLogInButton()} />
        {isLoading && <Text style={styles.defaultScreentext}>Loading...</Text>}
        {{err} && <Text style={styles.defaultScreentext}>{err}</Text>}
      </View>
    </SafeAreaView>
  );
};

// LoginScreen.defaultProps = {
//   groupName: "My"
// }

export default LoginScreen;

// import {useState} from 'react';

// const App = () => {
//   const [data, setData] = useState();
//   const [isLoading, setIsLoading] = useState(false);
//   const [err, setErr] = useState('');

//   const handleClick = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('https://reqres.in/api/users', {
//         method: 'POST',
//         body: JSON.stringify({
//           name: 'John Smith',
//           job: 'manager',
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Error! status: ${response.status}`);
//       }

//       const result = await response.json();

//       console.log('result is: ', JSON.stringify(result, null, 4));

//       setData(result);
//     } catch (err) {
//       setErr(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   console.log(data);

//   return (
//     <div>
//       {err && <h2>{err}</h2>}

//       <button onClick={handleClick}>Make request</button>

//       {isLoading && <h2>Loading...</h2>}

//       {data && (
//         <div>
//           <h2>Name: {data.name}</h2>
//           <h2>Job: {data.job}</h2>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
