import React, {useState, useContext, useEffect} from 'react';
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
// import RegistrationScreen from './RegistrationScreen';

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

// function handleCreateAccount() {
//   return <RegistrationScreen />;
// }

const LoginScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const {isLoggedIn, setIsLoggedIn} = useContext(LogStateContext);

  this.nameInput = React.createRef();
  this.passwordInput = React.createRef();

  navigation.addListener('drawerItemPress', () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      this.nameInput.current.clear();
      this.passwordInput.current.clear();
    }
  });

  const handleLogInButton = async () => {
    setIsLoading(true);
    try {
      // So what needs to change is we need to send name and pass, and get the 'token' and 'expiration'.
      // const response = await fetch('https://reqres.in/api/users', {
      const response = await fetch(
        'https://3b6b1870-81e4-424f-a57d-113afec85025.mock.pstmn.io/get',
        {
          // method: 'POST',
          method: 'GET',
          // body: JSON.stringify({
          //   Username: name,
          //   Password: password,
          // }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));
      Alert.alert('result is: ', JSON.stringify(result, null, 4));
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
    Alert.alert('User Name: ' + name + ' Password: ' + password);
    setIsLoggedIn(true);
    navigation.navigate('My Schedule');
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <Text style={styles.defaultScreentext}> Let's Meet</Text>
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
        />
        <TextInput
          placeholder="Password"
          style={styles.userPassword}
          placeholderTextColor={Colors.DD_LIGHT_GRAY}
          onChangeText={newText => setPassword(newText)}
          ref={this.passwordInput}
        />
        <Button title="Go!" onPress={() => handleLogInButton()} />
        {isLoading && <Text style={styles.defaultScreentext}>Loading...</Text>}
        {err && <Text style={styles.defaultScreentext}>{err}</Text>}
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
