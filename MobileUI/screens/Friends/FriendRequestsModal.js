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
import PropTypes from 'prop-types';
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
  // const user = useContext(UserContext);

  const renderSentItem = ({item}) => {
    return (
      <SentItem
        name={`${item?.requestedTo.firstName} ${item?.requestedTo.lastName}`}
      />
    );
  };

  const ReceivedItem = ({item, name}) => {
    const [showAccRej, setShowAccRej] = useState(true);
    const [result, setResult] = useState('');
    return (
      <View
        key={item.friendsID}
        style={{
          ...styles.item,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{...styles.listText, alignSelf: 'center'}}>{name}</Text>
        {showAccRej && (
          <View style={styles.acceptRejectButtons}>
            <MiniBoxButton
              title={'Accept'}
              onPress={async () => {
                console.log(item.friendsID);
                const r = await friendsAcceptRequest(item.friendsID);
                if (r) {
                  Alert.alert(`Accepted ${name} request`);
                  setShowAccRej(false);
                  setResult('Accepted');
                } else {
                  Alert.alert('PROBLEMS!!');
                }
              }}
            />
          </View>
        )}
        {showAccRej && (
          <View style={styles.acceptRejectButtons}>
            <MiniBoxButton
              title={'Reject'}
              onPress={async () => {
                console.log(item.friendsID);
                const r = await friendsRejectRequest(item.friendsID);
                if (r) {
                  Alert.alert(`Rejected ${name} request`);
                  setShowAccRej(false);
                  setResult('Rejected');
                } else {
                  Alert.alert('PROBLEMS!!');
                }
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

  const renderReceivedItem = ({item}) => {
    return (
      <ReceivedItem
        item={item}
        name={`${item?.requestedBy.firstName} ${item?.requestedBy.lastName}`}
      />
    );
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
                keyExtractor={item => item.friendsID}
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
                renderItem={renderSentItem}
                keyExtractor={item => item.friendsID}
              />
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
}

FriendRequestModal.propTypes = {
  sentRequests: PropTypes.array.isRequired,
  receivedRequests: PropTypes.array.isRequired,
};

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
