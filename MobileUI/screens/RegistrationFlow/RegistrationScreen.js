import React, {useState, useContext} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../../assets/styles/colors';
import {GreyPillButton} from '../../assets/components/CustomButtons';
import {storeUserLoginInfo} from '../../miscHelpers/AsyncStorageMethods';
import UserContext from '../../contexts/User';
import {registerAPICall} from '../../API/LoginAndRegistrationAPIHandling.js';

const RegistrationScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [firstN, setFirstN] = useState('');
  const [lastN, setLastN] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useContext(UserContext);

  this.nameInput = React.createRef();
  this.firstNInput = React.createRef();
  this.lastNInput = React.createRef();
  this.passwordInput = React.createRef();
  this.emailInput = React.createRef();

  const handleCreateAccountButton = async () => {
    setIsLoading(true);
    const result1 = await registerAPICall(name, firstN, lastN, email, password);
    if (result1 !== null) {
      // Store info in async storage
      await storeUserLoginInfo(name, password, result1);

      // Store info in user context
      user.name = name;
      user.first = firstN;
      user.last = lastN;
      user.password = password;

      setIsLoading(false);
      if (!isLoading) {
        this.nameInput.current.clear();
        this.firstNInput.current.clear();
        this.lastNInput.current.clear();
        this.passwordInput.current.clear();
        this.emailInput.current.clear();

        navigation.navigate('BaseRegistration');
      }
    } else {
      Alert.alert('Something went wrong');
      setIsLoading(false);
    }
  };

  let title = "Let's\n    Meet";
  return (
    <KeyboardAvoidingView style={styles.screenContainer} behavior="padding">
      <View style={styles.screenContainer}>
        <Text style={styles.registrationText}>Sign up for</Text>
        <Text style={styles.titleText}>{title}</Text>
        <TextInput
          placeholder="Username"
          style={styles.userInput}
          placeholderTextColor={Colors.DD_LIGHT_GRAY}
          onChangeText={newText => setName(newText)}
          autoCapitalize={'none'}
          autoCorrect={false}
          ref={this.nameInput}
        />
        <TextInput
          placeholder="First Name"
          style={styles.userInput}
          placeholderTextColor={Colors.DD_LIGHT_GRAY}
          onChangeText={newText => setFirstN(newText)}
          autoCorrect={false}
          ref={this.firstNInput}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.userInput}
          placeholderTextColor={Colors.DD_LIGHT_GRAY}
          onChangeText={newText => setLastN(newText)}
          autoCorrect={false}
          ref={this.lastNInput}
        />
        <TextInput
          placeholder="Email"
          style={styles.userInput}
          placeholderTextColor={Colors.DD_LIGHT_GRAY}
          onChangeText={newText => setEmail(newText)}
          autoCapitalize={'none'}
          autoCorrect={false}
          ref={this.emailInput}
        />
        <TextInput
          placeholder="Password"
          style={styles.userInput}
          placeholderTextColor={Colors.DD_LIGHT_GRAY}
          onChangeText={newText => setPassword(newText)}
          autoCapitalize={'none'}
          autoCorrect={false}
          ref={this.passwordInput}
        />
        <GreyPillButton
          title="Create Account"
          onPress={() => handleCreateAccountButton()}
        />
        {isLoading && <Text style={styles.defaultScreentext}>Loading...</Text>}
      </View>
    </KeyboardAvoidingView>
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
    marginLeft: 70,
    alignSelf: 'flex-start',
  },
  userInput: {
    height: 51,
    width: 260,
    marginLeft: 57,
    marginRight: 60,
    marginTop: 20,
    backgroundColor: Colors.DD_RED_2,
    paddingLeft: 17,
    color: Colors.DD_LIGHT_GRAY,
  },
});

export default RegistrationScreen;
