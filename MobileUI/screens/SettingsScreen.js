import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Text, StyleSheet} from 'react-native';
import Colors from '../assets/styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';

export default function SettingsScreen({navigation}) {
  const [output, setOutput] = useState('');

  const getCurrentUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('User');
      console.log(jsonValue);
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // read error
    }

    console.log('Done.');
  };

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      // read key error
      console.log('getAllKeys storage threw error ' + e);
      throw e;
    }

    setOutput(JSON.stringify(keys, undefined, 2));
    console.log(JSON.stringify(keys));
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <Text style={styles.defaultScreentext}>Change profile info</Text>
        <Text style={styles.defaultScreentext}>Change password</Text>
        <Text style={styles.defaultScreentext}>Change privacy settings</Text>
        <Button
          style={styles.clearButton}
          textColor={Colors.TEST_CREAM}
          onPress={() => getAllKeys()}>
          GET ALL KEYS STORAGE
        </Button>
        <Button
          style={styles.clearButton}
          textColor={Colors.TEST_CREAM}
          onPress={() => getCurrentUser()}>
          LIST CURRENT USER OBJECT
        </Button>
        <Button style={styles.clearButton} textColor={Colors.TEST_CREAM}>
          RUN CUSTOM DELETE METHOD
        </Button>
        <ScrollView>
          <Text style={styles.text}>{output}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

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
  clearButton: {
    backgroundColor: Colors.DD_LIGHT_GRAY,
    borderRadius: 12,
    width: 230,
    alignSelf: 'center',
    margin: 10,
  },
});
