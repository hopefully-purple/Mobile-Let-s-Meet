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
  userEmail: {
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

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoggedIn, setIsLoggedIn} = useContext(LogStateContext);
  this.emailInput = React.createRef();
  this.passwordInput = React.createRef();
  navigation.addListener('drawerItemPress', () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      this.emailInput.current.clear();
      this.passwordInput.current.clear();
    }
  });

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <Text style={styles.defaultScreentext}> Let's Meet</Text>
        <Text style={styles.defaultScreentext}>
          No account? Click to sign up
        </Text>
        <TextInput
          placeholder="Email"
          style={styles.userEmail}
          placeholderTextColor={Colors.DD_LIGHT_GRAY}
          onChangeText={newText => setEmail(newText)}
          ref={this.emailInput}
        />
        <TextInput
          placeholder="Password"
          style={styles.userPassword}
          placeholderTextColor={Colors.DD_LIGHT_GRAY}
          onChangeText={newText => setPassword(newText)}
          ref={this.passwordInput}
        />
        <Button
          title="Go!"
          onPress={() => {
            navigation.navigate('My Schedule');
            setIsLoggedIn(true);
            Alert.alert('Email: ' + email + ' Password: ' + password);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

// LoginScreen.defaultProps = {
//   groupName: "My"
// }

export default LoginScreen;
