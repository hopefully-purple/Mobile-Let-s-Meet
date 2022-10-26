import React, {useState, useContext, useEffect} from 'react';
import Colors from '../../assets/styles/colors';
import {
  ScrollView,
  View,
  Text,
  Keyboard,
  Button,
  StyleSheet,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import {
  Camera,
  useCameraDevices,
  CameraPermissionStatus,
} from 'react-native-vision-camera';
import {BoxButton} from '../../assets/components/CustomButtons';

// https://mrousavy.com/react-native-vision-camera/docs/guides/
// https://github.com/mrousavy/react-native-vision-camera/blob/1d6f720f8b499c03e91de32fabce64e9db293702/example/src/App.tsx

export default function JoinGroupModal({navigation}) {
  const [joinGroupLink, setJoinGroupLink] = useState('');

  const [cameraPermission, setCameraPermission] = useState();
  const [openCamera, setOpenCamera] = useState(false);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  this.joinGroupLinkInput = React.createRef();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  let devNu = device == null;

  if (cameraPermission == null) {
    // still loading
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Paste Group Link Here"
        value={joinGroupLink}
        onChangeText={text => setJoinGroupLink(text)}
        mode="outlined"
        style={styles.input}
        activeOutlineColor={Colors.DD_RED_2}
        autoCorrect={false}
        ref={this.joinGroupLinkInput}
      />
      <BoxButton title={'Scan QR Code'} onPress={() => setOpenCamera(true)} />
      {openCamera && !devNu && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DD_CREAM,
    // justifyContent: 'space-evenly',
  },
  input: {
    margin: 10,
  },
  text: {
    color: Colors.DD_DARK_GRAY,
    fontSize: 20,
    margin: 10,
  },
});

// https://github.com/henninghall/react-native-date-picker
