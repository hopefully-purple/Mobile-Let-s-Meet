import React, {useState, useContext, useEffect, useRef} from 'react';
import Colors from '../../assets/styles/colors';
import {
  SafeAreaView,
  ScrollView,
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
import IsCameraOpenContext from '../../contexts/IsCameraOpen';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

// https://www.dynamsoft.com/codepool/react-native-qr-code-scanner-vision-camera.html

export default function JoinGroupModal({navigation}) {
  const [joinGroupLink, setJoinGroupLink] = useState('');
  const [qrJoinLink, setQRJoinLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isQRScanComplete, setIsQRScanComplete] = useState(false);
  // const [isJoinSuccess, setIsJoinSuccess] = useState(false);
  const user = useContext(UserContext);

  const camera = useRef();
  const [cameraPermission, setCameraPermission] = useState();
  const {isCameraOpen, setIsCameraOpen} = useContext(IsCameraOpenContext);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const [barcodeResults, setBarcodeResults] = useState([]);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const config = {};
    config.template =
      '{"ImageParameter":{"BarcodeFormatIds":["BF_QR_CODE"],"Description":"","Name":"Settings"},"Version":"3.0"}'; //scan qrcode only

    const results = decode(frame, config);

    if (results[0] !== undefined) {
      console.log(results[0].barcodeText);
      REA.runOnJS(ReactNativeHapticFeedback.trigger)('impactHeavy', options);
      REA.runOnJS(setQRJoinLink)(results[0].barcodeText);
      REA.runOnJS(setIsCameraOpen)(false);
      REA.runOnJS(setIsQRScanComplete)(true);
    }
    REA.runOnJS(setBarcodeResults)(results);
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
    let link = joinGroupLink === '' ? qrJoinLink : joinGroupLink;

    console.log('Group Link! ' + link);
    setIsLoading(true);
    const response = await groupJoinGroup(link);
    if (response) {
      setIsLoading(false);
      Alert.alert('Successfully joined group!');
      this.joinGroupLinkInput.current.clear();
      navigation.goBack();
    } else {
      setIsQRScanComplete(false);
      setIsLoading(false);
      // setIsJoinSuccess(false);
      Alert.alert('Failed to join group :(');
      this.joinGroupLinkInput.current.clear();
      setJoinGroupLink('');
      setQRJoinLink('');
    }
    console.log('Reachable code? JoinGroupModal.handleLinkSubmit');
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
      <Text style={styles.text}>OR</Text>
      <View style={styles.scanWrapper}>
        <BoxButton
          title={isCameraOpen ? 'Close Camera' : 'Scan QR Code'}
          onPress={() => {
            setIsCameraOpen(isCameraOpen ? false : true);
          }}
        />
      </View>
      {isQRScanComplete && !isCameraOpen && !isLoading && (
        <ScrollView style={styles.qrResultsWrapper}>
          <Text style={styles.joinQuestion}>Join</Text>
          <Text style={styles.qrLinkText}>{qrJoinLink}</Text>
          <Text style={styles.joinQuestion}>?</Text>
          <View style={styles.joinButtons}>
            <BoxButton title={'Yes'} onPress={handleLinkSubmit} />
            <BoxButton
              title={'No'}
              onPress={() => {
                setIsQRScanComplete(false);
                setQRJoinLink('');
              }}
            />
          </View>
        </ScrollView>
      )}
      {isLoading && (
        <View style={styles.loadingWrapper}>
          <Text style={styles.joinQuestion}>Joining . . . </Text>
        </View>
      )}
      {isCameraOpen && !devNu && (
        <>
          <Camera
            ref={camera}
            style={styles.camera}
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
    color: Colors.DD_RED_2,
    fontSize: 30,
    margin: 10,
    alignSelf: 'center',
  },
  scanWrapper: {
    alignSelf: 'center',
  },
  qrResultsWrapper: {
    marginTop: 60,
    marginBottom: 30,
    // justifyContent: 'center',
  },
  joinQuestion: {
    fontSize: 50,
    fontWeight: '500',
    color: Colors.DD_RED_2,
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 46,
  },
  qrLinkText: {
    fontSize: 40,
    fontWeight: '500',
    color: Colors.DD_RED_1,
    textAlign: 'center',
    marginBottom: 46,
    padding: 20,
  },
  joinButtons: {
    // justifyContent: 'center',
    // alignContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    // alignItems: 'center',
  },
  camera: {
    height: '70%',
  },
});

// https://github.com/henninghall/react-native-date-picker
