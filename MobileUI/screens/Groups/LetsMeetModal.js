import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {SmallBoxButton} from '../../assets/components/CustomButtons';
import Colors from '../../assets/styles/colors';

export default function LetsMeetModal({navigation}) {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.creamKnob} />
        <View style={styles.bodyContainer}>
          <Text style={styles.infoText}>
            Enter info and we'll suggest good times to meet!
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    height: '50%',
    width: '100%',
    backgroundColor: Colors.DD_RED_2,
    borderRadius: 10,
  },
  creamKnob: {
    alignSelf: 'center',
    borderRadius: 29,
    height: 9,
    width: 60,
    margin: 15,
    backgroundColor: Colors.DD_CREAM,
  },
  bodyContainer: {
    height: '80%',
    backgroundColor: Colors.DD_CREAM,
    padding: 5,
  },
  infoText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.DD_MEDIUM_GRAY,
    paddingLeft: 5,
  },
});
