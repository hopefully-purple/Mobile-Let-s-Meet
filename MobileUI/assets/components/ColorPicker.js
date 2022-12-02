import {StyleSheet} from 'react-native';
import {ColorPicker} from 'react-native-color-picker';
import React from 'react';
import {Alert} from 'react-native';

const MyColorPicker = () => {
  return (
    <ColorPicker
      onColorSelected={color => Alert.alert(`Selected: ${color}`)}
      style={styles.colorContainer}
    />
  );
};

const styles = StyleSheet.create({
  colorContainer: {
    // width: '50%',
    height: 200,
  },
});

export default MyColorPicker;
