import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Colors from '../assets/styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card, TextInput} from 'react-native-paper';
import FriendsContext from '../contexts/Friends';
import {BoxButton} from '../assets/components/CustomButtons';
import {
  friendsGetSentRequests,
  friendsCreateFriendRequestByEmail,
} from '../API/FriendsAPIHandling';
import UserContext from '../contexts/User';

// https://bobbyhadz.com/blog/react-sort-array-of-objects
function organizeFriends(friends) {
  let newF = {};
  newF = [...friends].sort((a, b) => (a.name > b.name ? 1 : -1));
  return newF;
}

export default function FriendsScreen({navigation}) {
  const [newFriendEmail, setNewFriendEmail] = useState('');
  const [sentPendingReqsString, setSentPendingReqsString] = useState('');
  const {friends, setFriends} = useContext(FriendsContext);
  const user = useContext(UserContext);

  this.friendEmailInput = React.createRef();

  const FriendBox = ({friend}) => {
    const handleFriendPress = () => {
      console.log('selected ' + friend.name);
    };
    return (
      <TouchableOpacity onPress={handleFriendPress}>
        <Card style={styles.cardStyle}>
          <Card.Content>
            <View>
              <Text style={styles.defaultScreentext}>{friend.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    // console.log(items.length);
    // console.log('rendering ' + item.id);
    return <FriendBox friend={item} />;
  };

  const [pendingFriendsList, setPendingFriendsList] = useState([]);
  // useEffect(
  //   function createPendingFriendsList() {
  //     const makeGetSentRequestsAPIRequest = async () => {
  //       const data = await friendsGetSentRequests();
  //       // console.log(JSON.stringify(data, undefined, 2));
  //       console.log('set pending friends to data');
  //       setPendingFriendsList(data);
  //     };

  //     // if (pendingFriendsList.length === 0) {
  //     makeGetSentRequestsAPIRequest();
  //     // }
  //     // console.log('create new pending friends list');
  //     // const newFlatL = organizeFriends(pendingFriendsList);
  //     // setPendingFriendsList(newFlatL);
  //   },
  //   [pendingFriendsList],
  // );
  const [existingFriendsList, setExistingFriendsList] = useState([]);
  useEffect(
    function createExistingFriendsList() {
      const newFlatL = organizeFriends(friends);
      setExistingFriendsList(newFlatL);
    },
    [friends],
  );

  const addFriendHandler = async () => {
    console.log('Create friend request to ' + newFriendEmail);
    let newPending = [];
    newPending = pendingFriendsList;
    newPending.push({id: pendingFriendsList.length + 1, email: newFriendEmail});
    setPendingFriendsList(newPending);

    setSentPendingReqsString(sentPendingReqsString + newFriendEmail + ', ');

    let result = await friendsCreateFriendRequestByEmail(
      newFriendEmail,
      user.name,
    );
    if (!result) {
      Alert.alert('Friend request failed?');
    }

    this.friendEmailInput.current.clear();
    this.friendEmailInput.current.blur();
  };
  const showPendingSent = pendingFriendsList.length > 0;
  return (
    <SafeAreaView style={styles.screenContainer}>
      <TextInput
        label="Enter a new friend's email"
        value={newFriendEmail}
        onChangeText={text => setNewFriendEmail(text)}
        mode="outlined"
        style={styles.input}
        activeOutlineColor={Colors.DD_RED_2}
        autoCorrect={false}
        autoCapitalize="none"
        ref={this.friendEmailInput}
      />
      <View style={styles.buttons}>
        <BoxButton title={'Add New Friend'} onPress={addFriendHandler} />
      </View>
      {showPendingSent && (
        <Text style={styles.defaultScreentext}>
          Sent Pending Requests: {sentPendingReqsString}
        </Text>
      )}
      <Text style={{...styles.defaultScreentext, marginTop: 20}}>
        My Friends:
      </Text>
      <FlatList
        data={existingFriendsList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{marginTop: 10}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.DD_CREAM,
  },
  defaultScreentext: {
    fontSize: 25,
    color: Colors.DD_RED_2,
    textAlign: 'center',
  },
  input: {
    margin: 10,
    width: '90%',
  },
  buttons: {
    flexDirection: 'row',
    // position: 'absolute',
    margin: 10,
  },
  cardStyle: {
    backgroundColor: Colors.DD_CREAM,
    height: 70,
    width: 300,
    borderColor: Colors.DD_RED_2,
    borderWidth: 2,
    marginVertical: 10,
    marginHorizontal: 40,
  },
});
