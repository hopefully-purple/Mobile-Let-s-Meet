import React, { useState } from 'react';
import { Button, Alert, Text, StatusBar, SafeAreaView, StyleSheet, View, TextInput } from 'react-native';
import Colors from '../assets/styles/colors';
//import { Button, View } from 'react-native';

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: Colors.DD_CREAM,
      color: Colors.DD_RED_2
    },
    defaultScreentext: {
      fontSize: 25,
      fontWeight: '500',
      color: Colors.DD_RED_2,
      textAlign: 'center'
    }
  });

function LoginScreen() {

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
      <Text style={styles.defaultScreentext}> Login Screen!</Text>
    </View>
    </SafeAreaView>
  );
};

// LoginScreen.defaultProps = {
//   groupName: "My"
// }

export default LoginScreen;


