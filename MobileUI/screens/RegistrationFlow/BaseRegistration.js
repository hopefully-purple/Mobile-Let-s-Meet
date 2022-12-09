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
import Colors from '../../assets/styles/colors';
import {GreyPillButton} from '../../assets/components/CustomButtons';
import LogStateContext from '../../contexts/LoginState';

// Step 1.1
// const Step11 = ({onClick1, onClick2}) => {
//   return (
//     <View style={styles.screenContainer}>
//       <Text style={styles.defaultScreentext}>Step 1:</Text>
//       <Text style={styles.defaultScreentext}>
//         Do you use a scheduling app already?
//       </Text>
//       <GreyPillButton title="Yes" onPress={onClick1} />
//       <GreyPillButton title="No" onPress={onClick2} />
//     </View>
//   );
// };

// //Step 1.2
// const Step12 = ({onClick1, onClick2}) => {
//   return (
//     <View style={styles.screenContainer}>
//       <Text style={styles.defaultScreentext}>Step 1:</Text>
//       <Text style={styles.defaultScreentext}>Let's import your schedule!</Text>
//       <Text style={styles.defaultScreentext}>
//         Click on the schedule service you use from this list:
//       </Text>
//       <Text
//         style={{borderWidth: 3, borderColor: Colors.DD_RED_3}}
//         onPress={onClick1}>
//         Google Calendar, iCalender . . .
//       </Text>
//       <Text style={styles.defaultScreentext} onPress={onClick2}>
//         Can't find your app?
//       </Text>
//     </View>
//   );
// };

// //Step 1.2 manual pop up. Need to figure out modal thing?
// const Step12Manual = ({onClick1, onClick2}) => {
//   return (
//     <View style={styles.screenContainer}>
//       <Text style={styles.defaultScreentext}>What app do you use?</Text>
//       <TextInput
//         placeholder="Timo, Android, etc."
//         style={styles.userInput}
//         placeholderTextColor={Colors.DD_LIGHT_GRAY}
//         //   onChangeText={newText => setName(newText)}
//         //   ref={this.nameInput}
//       />
//       <Text style={styles.defaultScreentext}>
//         Wanna manually enter your schedule?
//       </Text>
//       <GreyPillButton title="Yes" onPress={onClick1} />
//       <GreyPillButton title="No" onPress={onClick2} />
//     </View>
//   );
// };

// //Step 1.3
// const Step13 = ({onClick}) => {
//   return (
//     <View style={styles.screenContainer}>
//       <Text style={styles.defaultScreentext}>Step 1:</Text>
//       <Text style={styles.defaultScreentext}>
//         Hang on while we grab your schedule!
//       </Text>
//       <Text style={styles.defaultScreentext} onPress={onClick}>
//         DONE
//       </Text>
//     </View>
//   );
// };

// Step 2.1
// const Step21 = ({onClick1, onClick2}) => {
//   return (
//     <View style={styles.screenContainer}>
//       <Text style={styles.defaultScreentext}>Step 2:</Text>
//       <Text style={styles.defaultScreentext}>
//         Are you in a rush to schedule a meeting?
//       </Text>
//       <GreyPillButton title="Yes" onPress={onClick1} />
//       <GreyPillButton title="No" onPress={onClick2} />
//     </View>
//   );
// };

//Step 2.2
const Step22 = ({onClick}) => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.titleText}>Sucess!</Text>
      <Text style={styles.registrationText} onPress={onClick}>
        Click to return to login page
      </Text>
    </View>
  );
};

//Step 2.3
// const Step23 = ({onClick}) => {
//   // Need to store first name and last name as part of registration process?????
//   return (
//     <View style={styles.screenContainer}>
//       <Text style={styles.defaultScreentext}>Step 2:</Text>
//       <Text style={styles.defaultScreentext}>
//         Great! Let's set up some stuff . . .
//       </Text>
//       <TextInput
//         placeholder="First Name"
//         style={styles.userInput}
//         placeholderTextColor={Colors.DD_LIGHT_GRAY}
//         //   onChangeText={newText => setName(newText)}
//         //   ref={this.nameInput}
//       />
//       <TextInput
//         placeholder="Last Name"
//         style={styles.userInput}
//         placeholderTextColor={Colors.DD_LIGHT_GRAY}
//         //   onChangeText={newText => setName(newText)}
//         //   ref={this.nameInput}
//       />
//       <Text style={styles.defaultScreentext} onPress={onClick}>
//         NEXT
//       </Text>
//     </View>
//   );
// };

// //Step 3.1
// const Step31 = ({onClick}) => {
//   return (
//     <View style={styles.screenContainer}>
//       <Text style={styles.defaultScreentext}>Step 3:</Text>
//       <Text style={styles.defaultScreentext}>Let's create your Schedule!</Text>
//       <Text
//         style={styles.defaultScreentext}
//         onPress={() => {
//           Alert.alert('Add a class');
//         }}>
//         + Class
//       </Text>
//       <Text
//         style={styles.defaultScreentext}
//         onPress={() => {
//           Alert.alert('Add an event');
//         }}>
//         + Event
//       </Text>
//       <Text style={styles.defaultScreentext} onPress={onClick}>
//         DONE
//       </Text>
//     </View>
//   );
// };

export const RegistrationStepContext = createContext(0);

const BaseRegistration = ({navigation}) => {
  // const {step, setStep} = useContext(RegistrationStepContext);
  const [step, setStep] = useState(0);
  const {isLoggedIn, setIsLoggedIn} = useContext(LogStateContext);
  // setStep(0);
  // Alert.alert('base step: ' + step);

  return (
    <SafeAreaView style={styles.screenContainer}>
      {/* {step === 0 && (
        <Step11 onClick1={() => setStep(1)} onClick2={() => setStep(3)} />
      )}
      {step === 1 && (
        <Step12 onClick1={() => setStep(2)} onClick2={() => setStep(7)} />
      )}
      {step === 2 && <Step13 onClick={() => setStep(3)} />}
      {step === 3 && (
        <Step21 onClick1={() => setStep(4)} onClick2={() => setStep(5)} />
      )} */}
      {/* {step === 4 && <Step22 onClick={() => navigation.navigate('Login')} />} */}
      <Step22 onClick={() => navigation.navigate('Login')} />
      {/* {step === 5 && <Step23 onClick={() => setStep(6)} />}
      {step === 6 && (
        <Step31
          onClick={() => {
            setIsLoggedIn(true);
            navigation.navigate('My Schedule');
          }}
        />
      )}
      {step === 7 && (
        <Step12Manual onClick1={() => setStep(3)} onClick2={() => setStep(1)} />
      )} */}
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
  registrationText: {
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: '400',
    color: Colors.DD_RED_3,
    marginVertical: 30,
  },
  titleText: {
    fontFamily: 'Sansita Swashed',
    fontSize: 72,
    fontWeight: '700',
    color: Colors.DD_RED_3,
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

export default BaseRegistration;
