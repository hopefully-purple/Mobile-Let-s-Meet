import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import {MiniBoxButton} from '../../assets/components/CustomButtons';
import Colors from '../../assets/styles/colors';
import {
  friendsGetSentRequests,
  friendsGetReceivedRequests,
  friendsAcceptRequest,
  friendsRejectRequest,
} from '../../API/FriendsAPIHandling';
import UserContext from '../../contexts/User';
// https://stackoverflow.com/questions/48992961/react-navigation-modal-height

const SentItem = ({name}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.listText}>{name}</Text>
    </View>
  );
};

export default function FriendRequestModal({
  navigation,
  sentRequests,
  receivedRequests,
}) {
  // console.log('sentRequests = ' + JSON.stringify(sentRequests, undefined, 2));
  // const [sentReqs, setSentReqs] = useState(sentRequests);
  // const [receivedReqs, setReceivedReqs] = useState(receivedRequests);
  const user = useContext(UserContext);

  const ReceivedItem = ({item}) => {
    const [showAccRej, setShowAccRej] = useState(true);
    const [result, setResult] = useState('');
    return (
      <View
        key={item.id}
        style={{
          ...styles.item,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{...styles.listText, alignSelf: 'center'}}>
          {item.name}
        </Text>
        {showAccRej && (
          <View style={styles.acceptRejectButtons}>
            <MiniBoxButton
              title={'Accept'}
              onPress={async () => {
                await friendsAcceptRequest(item, user.name);
                Alert.alert(`Accepted ${item.name} request`);
                setShowAccRej(false);
                setResult('Accepted');
              }}
            />
          </View>
        )}
        {showAccRej && (
          <View style={styles.acceptRejectButtons}>
            <MiniBoxButton
              title={'Reject'}
              onPress={async () => {
                await friendsRejectRequest(item, user.name);
                Alert.alert(`Rejected ${item.name} request`);
                setShowAccRej(false);
                setResult('Rejected');
              }}
            />
          </View>
        )}
        {!showAccRej && (
          <Text style={{...styles.listText, fontStyle: 'italic'}}>
            {result}
          </Text>
        )}
      </View>
    );
  };

  const renderSentItem = ({item}) => {
    return <SentItem name={item.name} />;
  };

  const renderReceivedItem = ({item}) => {
    return <ReceivedItem item={item} />;
  };

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.creamKnob} />
        <SafeAreaView style={styles.bodyContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Received Requests:</Text>
          </View>
          <View style={styles.flatListWrapper}>
            <View style={styles.flatListStyle}>
              <FlatList
                data={receivedRequests}
                renderItem={renderReceivedItem}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Sent Requests:</Text>
          </View>
          <View style={styles.flatListWrapper}>
            <View style={styles.flatListStyle}>
              <FlatList
                data={sentRequests}
                // data={[]}
                renderItem={renderSentItem}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </SafeAreaView>
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
    height: '50%',
    width: '100%',
    backgroundColor: Colors.DD_RED_2,
    borderRadius: 10,
    paddingBottom: 10,
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
    marginBottom: 100,
    // justifyContent: 'space-evenly',
  },
  header: {
    // backgroundColor: Colors.DD_LIGHT_GRAY,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.DD_MEDIUM_GRAY,
    paddingLeft: 5,
  },
  flatListWrapper: {
    // backgroundColor: Colors.DD_WHITE,
    flexDirection: 'row',
    height: '40%',
    width: '90%',
  },
  flatListStyle: {
    // backgroundColor: Colors.DD_EXTRA_LIGHT_GRAY,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    paddingVertical: 5,
    marginVertical: 5,
  },
  listText: {
    fontSize: 20,
    marginRight: 20,
    color: Colors.DD_MEDIUM_GRAY,
  },
  acceptRejectButtons: {
    // flexDirection: 'row',
    marginRight: 10,
  },
});