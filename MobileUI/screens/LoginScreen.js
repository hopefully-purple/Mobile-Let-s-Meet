import React, {useState} from 'react';
import {
  Alert,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import Colors from '../assets/styles/colors';
import Button from '../assets/components/CustomButton';

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
    color: Colors.DD_RED_2,
    textAlign: 'center',
  }
});

function LoginScreen() {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <Text style={styles.defaultScreentext}> Let's Meet</Text>
        <Text style={styles.defaultScreentext}>
          No account? Click to sign up
        </Text>
        <TextInput placeholder="Email" />
        <TextInput placeholder="password" />
        <Button title='Go!' />
      </View>
    </SafeAreaView>
  );
}

// LoginScreen.defaultProps = {
//   groupName: "My"
// }

export default LoginScreen;
