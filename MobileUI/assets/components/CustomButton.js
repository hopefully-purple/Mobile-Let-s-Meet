import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Colors from '../styles/colors';

export default function Button(props) {
  const { onPress, title = 'Save' } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 29,
    height: 35,
    width: 120,
    marginLeft: 166,
    marginRight: 194,
    marginTop: 46,
    backgroundColor: Colors.DD_LIGHT_GRAY
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    // fontWeight: 'bold',
    // letterSpacing: 0.25,
    color: Colors.DD_RED_3,
  },
});

//TODO::: Figure out why text isn't showing up anymore!!!!!