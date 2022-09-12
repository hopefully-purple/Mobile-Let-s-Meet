import React, {useState, useContext, createContext, useEffect} from 'react';
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

export const RegistrationStepContext = createContext(0);

const RegistrationScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [err, setErr] = useState('');
  const {isLoggedIn, setIsLoggedIn} = useContext(LogStateContext);
  const [step, setStep] = useState(0);

  this.nameInput = React.createRef();
  this.passwordInput = React.createRef();
  this.emailInput = React.createRef();

  //   if (step !== 0) {
  //     setStep(0);
  //   }
  Alert.alert('step: ' + step);
  return (
    <RegistrationStepContext.Provider value={{step, setStep}}>
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
          <Button
            title="Create Account"
            onPress={() => {
              navigation.navigate('BaseRegistration');
            }}
          />
          {/* {isLoading && <Text style={styles.defaultScreentext}>Loading...</Text>}
        {err && <Text style={styles.defaultScreentext}>{err}</Text>} */}
        </View>
      </SafeAreaView>
    </RegistrationStepContext.Provider>
  );
};

// RegistrationScreen.defaultProps = {
//   groupName: "My"
// }

export default RegistrationScreen;
