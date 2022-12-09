import React, {useContext, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import {BoxButton, SmallBoxButton} from '../../assets/components/CustomButtons';
import Colors from '../../assets/styles/colors';
import Clipboard from '@react-native-clipboard/clipboard';
import {groupLeaveGroup, groupsGenerateLink} from '../../API/GroupsAPIHandling';
import CurrentGroupObjectContext from '../../contexts/CurrentGroupObjectContext';
import QRCode from 'react-native-qrcode-svg';
// https://stackoverflow.com/questions/48992961/react-navigation-modal-height

const Item = ({name}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.listText}>{name}</Text>
    </View>
  );
};

export default function GroupInfoModal({navigation}) {
  const group = useContext(CurrentGroupObjectContext).currentGroup;
  const [showQR, setShowQR] = useState(false);
  const [qrValue, setQRValue] = useState('');

  const copyToClipboard = () => {
    const link = groupsGenerateLink(group.joinCode);
    Clipboard.setString(link);
    Alert.alert('The join link has been copied to your clipboard!');
  };

  const handleQR = () => {
    const qr = groupsGenerateLink(group.joinCode);
    setQRValue(qr);
    setShowQR(true);
  };

  const renderItem = ({item}) => {
    return <Item name={`${item.firstName} ${item.lastName}`} />;
  };

  function handleLeave() {
    Alert.alert('Are you sure you want to leave this group?', '', [
      {
        text: 'Leave',
        onPress: () => {
          groupLeaveGroup(group.groupID);
          navigation.navigate('Group');
        },
      },
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
    ]);
  }

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.creamKnob} />
        <View style={styles.bodyContainer}>
          <View style={styles.mainHeader}>
            <Text style={styles.membersHeaderText}>Members:</Text>
            <Text style={styles.generationHeaderText}>Invite:</Text>
          </View>
          <View style={styles.mainBody}>
            <View style={styles.flatListStyle}>
              <FlatList
                data={group.users}
                renderItem={renderItem}
                keyExtractor={item => item.userID}
              />
            </View>
            <View style={styles.generationSide}>
              <SmallBoxButton
                title={'Generate invite link'}
                onPress={copyToClipboard}
              />
              <SmallBoxButton title={'Generate invite QR'} onPress={handleQR} />
              {showQR && (
                <View style={{alignSelf: 'center'}}>
                  <QRCode
                    value={qrValue}
                    size={100}
                    color="black"
                    backgroundColor="white"
                  />
                </View>
              )}
            </View>
          </View>
          <View style={{alignSelf: 'center', marginTop: 10, marginBottom: 20}}>
            <BoxButton title={'Leave Group'} onPress={handleLeave} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    height: '60%',
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
  mainHeader: {
    flexDirection: 'row',
  },
  membersHeaderText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.DD_MEDIUM_GRAY,
    paddingLeft: 5,
  },
  generationHeaderText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.DD_MEDIUM_GRAY,
    marginLeft: 90,
  },
  mainBody: {
    flexDirection: 'row',
    height: '90%',
  },
  generationSide: {
    flexDirection: 'column',
    borderLeftWidth: 5,
    borderColor: Colors.DD_LIGHT_GRAY,
    margin: 20,
    justifyContent: 'center',
    flexShrink: 1,
  },
  generationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.DD_MEDIUM_GRAY,
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  flatListStyle: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  item: {
    paddingVertical: 5,
    marginVertical: 5,
  },
  listText: {
    fontSize: 20,
    color: Colors.DD_MEDIUM_GRAY,
  },
});
