import React, {useState, useEffect, useRef} from 'react';
import Colors from '../../assets/styles/colors';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {
  Camera,
  useCameraDevices,
  CameraPermissionStatus,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {BoxButton} from '../../assets/components/CustomButtons';
import {groupJoinGroup} from '../../API/GroupsAPIHandling';
// import QRCodeScanner from 'react-native-qrcode-scanner'; //TODO uninstall
import {decode} from 'vision-camera-dynamsoft-barcode-reader';
import * as REA from 'react-native-reanimated';
import {DCVBarcodeReader} from 'dynamsoft-capture-vision-react-native';
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
  this.joinGroupLinkInput = React.createRef();

  const camera = useRef();
  const [cameraPermission, setCameraPermission] = useState();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const [barcodeResults, setBarcodeResults] = useState([]);

  const newCameraPermission = Camera.requestCameraPermission();

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const config = {};
    config.template =
      '{"ImageParameter":{"BarcodeFormatIds":["BF_QR_CODE"],"Description":"","Name":"Settings"},"Version":"3.0"}'; //scan qrcode only

    const results = decode(frame, config);

    REA.runOnJS(DCVBarcodeReader.initLicense)(
      'DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAxNTE2MDY4LVRYbE5iMkpwYkdWUWNtOXFYMlJpY2ciLCJvcmdhbml6YXRpb25JRCI6IjEwMTUxNjA2OCIsImNoZWNrQ29kZSI6LTM3NjkwNzg2N30=',
    );
    if (results[0] !== undefined) {
      console.log(results[0].barcodeText);
      REA.runOnJS(ReactNativeHapticFeedback.trigger)('impactHeavy', options);
      REA.runOnJS(setQRJoinLink)(results[0].barcodeText);
      REA.runOnJS(setIsCameraOpen)(false);
      REA.runOnJS(setIsQRScanComplete)(true);
    }
    REA.runOnJS(setBarcodeResults)(results);
  }, []);

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
            frameProcessorFps={
              5
            } /*The number here for Android might not matter because of what's listed in this post https://github.com/mrousavy/react-native-vision-camera/issues/1202 
                                    So the Android side of things might flicker until I find a fix, but it might not be possible to fix because of the CameraX library vision-camera is based off of
                                    The QR code will still scan, but the camera will flicker lots*/
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
  },
  joinQuestion: {
    fontSize: 50,
    fontWeight: '500',
    color: Colors.DD_RED_2,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  qrLinkText: {
    fontSize: 40,
    fontWeight: '500',
    color: Colors.DD_RED_1,
    textAlign: 'center',
    marginBottom: 10,
    padding: 20,
  },
  joinButtons: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  camera: {
    height: '70%',
  },
});
