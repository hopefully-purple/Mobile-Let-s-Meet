import React, {useState, useContext, useEffect, useRef} from 'react';
import Colors from '../../assets/styles/colors';
import {
  SafeAreaView,
  View,
  Text,
  Keyboard,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import {
  Camera,
  useCameraDevices,
  CameraPermissionStatus,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {BoxButton} from '../../assets/components/CustomButtons';
import {CaptureButton} from './views/CaptureButton';
import UserContext from '../../contexts/User';
import {groupJoinGroup} from '../../API/GroupsAPIHandling';
import QRCodeScanner from 'react-native-qrcode-scanner'; //TODO uninstall
// import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import {
  DBRConfig,
  decode,
  TextResult,
} from 'vision-camera-dynamsoft-barcode-reader';
import * as REA from 'react-native-reanimated';

// https://mrousavy.com/react-native-vision-camera/docs/guides/
// https://github.com/mrousavy/react-native-vision-camera/blob/1d6f720f8b499c03e91de32fabce64e9db293702/example/src/App.tsx
// Be prepared to spend a whole 24 hours on figuring this out! Yay!

export default function JoinGroupModal({navigation}) {
  const [joinGroupLink, setJoinGroupLink] = useState('');
  const user = useContext(UserContext);

  const camera = useRef();
  const [cameraPermission, setCameraPermission] = useState();
  const [openCamera, setOpenCamera] = useState(false);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const [barcodeResults, setBarcodeResults] = useState([]);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const config = {};
    config.template =
      '{"ImageParameter":{"BarcodeFormatIds":["BF_QR_CODE"],"Description":"","Name":"Settings"},"Version":"3.0"}'; //scan qrcode only

    const results = decode(frame, config);
    REA.runOnJS(setBarcodeResults)(results);
    console.log('-------------FRAME PROCESSOR BARCODERESULTS:::');
    console.log(barcodeResults);
  }, []);

  this.joinGroupLinkInput = React.createRef();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  let devNu = device == null;

  if (cameraPermission == null) {
    // still loading
    return null;
  }

  const handleLinkSubmit = async () => {
    console.log('Group Link! ' + joinGroupLink);
    const response = await groupJoinGroup(joinGroupLink, user.name);
    if (!response) {
      Alert.alert('Failed to join group :(');
    } else {
      Alert.alert('Successfully joined group!');
      navigation.goBack();
    }
    this.joinGroupLinkInput.current.clear();
  };

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
        onSubmitEditing={handleLinkSubmit}
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
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
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
