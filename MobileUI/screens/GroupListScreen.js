import React, {useContext} from 'react';
import {View} from 'react-native';
import {Text, StyleSheet} from 'react-native';
import Colors from '../assets/styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import UserContext from '../contexts/User';

export default function GroupListScreen({navigation}) {
  //   const user = useContext(UserContext);
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <Text style={styles.defaultScreentext}> Create a new group</Text>
        <Text style={styles.defaultScreentext}> Join a group</Text>
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
});
