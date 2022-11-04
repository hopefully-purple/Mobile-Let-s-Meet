import React from 'react';
import {Text, StyleSheet, Pressable, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card} from 'react-native-paper';
import Colors from '../styles/colors';

export function GreyPillButton(props) {
  const {onPress, title = 'Save'} = props;
  return (
    <Pressable style={styles.greyPillButton} onPress={onPress}>
      <Text style={styles.greyPillText}>{title}</Text>
    </Pressable>
  );
}

export const BoxButton = props => {
  const {onPress, title = '+ New'} = props;
  return (
    <TouchableOpacity style={styles.boxButton} onPress={onPress}>
      <Text style={styles.boxButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const SmallBoxButton = props => {
  const {onPress, title = '+ New'} = props;
  return (
    <TouchableOpacity style={styles.smallBoxButton} onPress={onPress}>
      <Text style={styles.smallBoxButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  smallBoxButtonText: {
    fontSize: 20,
    // fontWeight: '500',
    color: Colors.DD_RED_2,
    // textAlign: 'center',
    // padding: 5,
  },
  smallBoxButton: {
    alignSelf: 'flex-start', //<<< !! This is what makes the width adjust to content size
    backgroundColor: Colors.DD_CREAM,
    borderColor: Colors.DD_RED_2,
    borderWidth: 2,
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 18,
    borderRadius: 5,
  },
  boxButtonText: {
    fontSize: 25,
    // fontWeight: '500',
    color: Colors.DD_RED_2,
    // textAlign: 'center',
    // padding: 5,
  },
  boxButton: {
    alignSelf: 'flex-start', //<<< !! This is what makes the width adjust to content size
    backgroundColor: Colors.DD_CREAM,
    borderColor: Colors.DD_RED_2,
    borderWidth: 2,
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  greyPillButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 29,
    height: 35,
    width: 120,
    marginLeft: 166,
    marginRight: 194,
    marginTop: 46,
    marginBottom: 20,
    backgroundColor: Colors.DD_LIGHT_GRAY,
  },
  greyPillText: {
    fontSize: 16,
    lineHeight: 21,
    // fontWeight: 'bold',
    // letterSpacing: 0.25,
    color: Colors.DD_RED_3,
  },
});

//TODO::: Figure out why text isn't showing up anymore!!!!!
