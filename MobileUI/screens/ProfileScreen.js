import React, {useContext} from 'react';
import {View} from 'react-native';
import {Text, StyleSheet} from 'react-native';
import Colors from '../assets/styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import UserContext from '../contexts/User';

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
  },
});

export default function ProfileScreen({navigation}) {
  const user = useContext(UserContext);
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <Text style={styles.defaultScreentext}> This is my profile</Text>
        <Text style={styles.defaultScreentext}> Username: {user.name}</Text>
        <Text style={styles.defaultScreentext}> Password: {user.password}</Text>
        <Text style={styles.defaultScreentext}> QR code</Text>
        <Text style={styles.defaultScreentext}>
          Swipe from the left to open navigation tool
        </Text>
      </View>
    </SafeAreaView>
  );
}
