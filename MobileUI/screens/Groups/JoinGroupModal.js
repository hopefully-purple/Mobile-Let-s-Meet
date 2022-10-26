import React, {useState, useContext, useEffect, useRef} from 'react';
import Colors from '../../assets/styles/colors';
import {
  SafeAreaView,
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
import {CaptureButton} from './views/CaptureButton';

// https://mrousavy.com/react-native-vision-camera/docs/guides/
// https://github.com/mrousavy/react-native-vision-camera/blob/1d6f720f8b499c03e91de32fabce64e9db293702/example/src/App.tsx
// Be prepared to spend a whole 24 hours on figuring this out! Yay!

export default function JoinGroupModal({navigation}) {
  const [joinGroupLink, setJoinGroupLink] = useState('');

  const camera = useRef();
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

  // const takePhoto = useCallback(async () => {
  //   try {
  //     if (camera.current == null) throw new Error('Camera ref is null!');

  //     console.log('Taking photo...');
  //     const photo = await camera.current.takePhoto(takePhotoOptions);
  //     onMediaCaptured(photo, 'photo');
  //   } catch (e) {
  //     console.error('Failed to take photo!', e);
  //   }
  // }, [camera, onMediaCaptured, takePhotoOptions]);

  return (
    <SafeAreaView style={styles.container}>
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
      <BoxButton
        title={'Scan QR Code'}
        onPress={() => {
          setOpenCamera(true);
        }}
      />
      {openCamera && !devNu && (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          {/* <CaptureButton
            style={styles.captureButton}
            camera={camera}
            onMediaCaptured={onMediaCaptured}
            cameraZoom={zoom}
            minZoom={minZoom}
            maxZoom={maxZoom}
            flash={supportsFlash ? flash : 'off'}
            enabled={isCameraInitialized && isActive}
            setIsPressingButton={setIsPressingButton}
          /> */}
        </>
      )}
    </SafeAreaView>
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
