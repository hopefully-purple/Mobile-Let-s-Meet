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
    height: 200,
    width: 120,
    paddingLeft: 166,
    padddingTop: 649,
    backgroundColor: Colors.DD_LIGHT_GRAY
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

//TODO::: Figure out why text isn't showing up anymore!!!!!