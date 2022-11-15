import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import Colors from '../../assets/styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card, TextInput} from 'react-native-paper';
import FriendsContext from '../../contexts/Friends';
import GroupsContext from '../../contexts/Groups';
import {friendsGetFriends} from '../../API/FriendsAPIHandling';
import {groupCreateNewGroup} from '../../API/GroupsAPIHandling';
import {BoxButton} from '../../assets/components/CustomButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../../contexts/User';

// https://bobbyhadz.com/blog/react-sort-array-of-objects
function organizeFriends(friends) {
  let newF = {};
  newF = [...friends].sort((a, b) => (a.name > b.name ? 1 : -1));
  return newF;
}

// https://github.com/renrizzolo/react-native-sectioned-multi-select
// ^ a more interesting UI for multi-select. Experiment if time
// https://stackoverflow.com/questions/57396558/how-to-select-multiple-items-in-flatlist-highlight-them-and-keep-them-saved-in
// ^ or this stack overflow answer

export default function AddGroupModal({navigation}) {
  const [newGroupName, setNewGroupName] = useState('');
  const [addedFriends, setAddedFriends] = useState([]);
  const [groupMembersDisplayList, setGroupMembersDisplayList] = useState('');
  const {friends, setFriends} = useContext(FriendsContext); // TODO: REMOVE!!!!
  const {groups, setGroups} = useContext(GroupsContext);
  const user = useContext(UserContext);

  this.newGroupNameInput = React.createRef();

  const doneHandler = async () => {
    if (newGroupName !== '' && addedFriends.length !== 0) {
      console.log(addedFriends);
      const newGroup = {
        name: newGroupName,
        friendIds: addedFriends,
      };
      // console.log('NEW EVENT MADE, events context:');

      console.log('NEW GROUP MADE > Post API call > result');
      let apiResult = await groupCreateNewGroup(newGroup);

      if (apiResult) {
        //Clear inputs
        this.newGroupNameInput.current.clear();
        setNewGroupName('');
        //Go back to group list screen
        console.log('go back');
        navigation.goBack();
      }
    } else {
      Alert.alert('Please set a new group name and at least one friend!');
    }
  };

  const FriendBox = ({friend, name}) => {
    const handleFriendPress = () => {
      console.log('selected ' + name);
      let addF = addedFriends;
      if (!addF.includes(friend.userID)) {
        addF.push(friend.userID);
        setAddedFriends(addF);
        // console.log(JSON.stringify(addedFriends, undefined, 2));
        setGroupMembersDisplayList(groupMembersDisplayList + name + ', ');
      }
    };
    return (
      <TouchableOpacity onPress={handleFriendPress}>
        <Card style={styles.cardStyle}>
          <Card.Content>
            <View>
              <Text style={styles.defaultScreentext}>{name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    // console.log(items.length);
    // console.log('rendering ' + item.id);
    return (
      <FriendBox friend={item} name={`${item.firstName} ${item.lastName}`} />
    );
  };

  const handleGroupNameSubmit = async () => {
    console.log('GROUP NAME SUBMIT ' + newGroupName);
  };

  const [flatList, setFlatList] = useState([]);
  useEffect(
    function createFlatList() {
      // console.log(JSON.stringify(friends, undefined, 2));

      const makeGetFriendsAPIRequest = async () => {
        const data = await friendsGetFriends();
        // console.log(JSON.stringify(data, undefined, 2));
        console.log('set friends to data');
        setFriends(data);
      };

      if (friends.length === 0) {
        makeGetFriendsAPIRequest();
      }
      console.log('create new flat list');
      const newFlatL = organizeFriends(friends);
      setFlatList(newFlatL);
    },
    [friends, setFriends],
  );

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.buttons}>
        <TextInput
          label="New Group Name"
          value={newGroupName}
          onChangeText={text => setNewGroupName(text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor={Colors.DD_RED_2}
          autoCorrect={false}
          ref={this.newGroupNameInput}
          onSubmitEditing={handleGroupNameSubmit}
        />
      </View>
      <View style={{marginTop: 60, display: 'flex'}}>
        <Text style={{...styles.defaultScreentext, marginHorizontal: 10}}>
          Group members: {groupMembersDisplayList}
        </Text>
        <Button
          onPress={doneHandler}
          title="Done"
          style={{fontWeight: 'bold', margin: 100}}
        />
      </View>
      <Text
        style={{
          ...styles.defaultScreentext,
          marginTop: 20,
          position: 'relative',
        }}>
        Add friends to your new group!
      </Text>
      <FlatList
        data={flatList}
        renderItem={renderItem}
        keyExtractor={item => item.userID}
        style={{marginTop: 40}}
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
    padding: 1,
  },
  buttons: {
    flexDirection: 'row',
    position: 'absolute',
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
