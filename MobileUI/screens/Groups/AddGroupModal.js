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
import {BoxButton} from '../../assets/components/CustomButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const {friends, setFriends} = useContext(FriendsContext);
  const {groups, setGroups} = useContext(GroupsContext);

  this.newGroupNameInput = React.createRef();

  const saveData = async newGroup => {
    try {
      let newG = [];
      newG = groups;
      console.log(JSON.stringify(newG, undefined, 2));
      newG.push(newGroup);
      await AsyncStorage.setItem('Groups', JSON.stringify(newG));
      console.log('(saveData) Data successfully saved');
      return true;
    } catch (e) {
      console.log('(saveData) Failed to save the data to the storage');
      throw e;
    }
  };

  const doneHandler = async () => {
    if (newGroupName !== '' && addedFriends.length !== 0) {
      const newGroup = {
        id: `${groups.length + 1} ${newGroupName}`,
        name: newGroupName,
        members: addedFriends,
      };
      // console.log('NEW EVENT MADE, events context:');

      console.log(
        'NEW GROUP MADE > Post API call > result: <not rn, dev server not updated, just save storage>',
      );
      // API call to post new event
      // await calendarCreateNewEvent(newEvent);
      // console.log(JSON.stringify(result, undefined, 2));
      //To trigger reload of Events and new GET API call, update the events context
      // const newE = events;
      // newE.push(newEvent);
      // setEvents(newE);

      //Clear inputs
      this.newGroupNameInput.current.clear();
      setNewGroupName('');

      //Save to async storage (for now until dev server is fixed)
      const result = await saveData(newGroup);
      if (result) {
        //Go back to schedule
        console.log('go back');
        navigation.goBack();
      }
    } else {
      Alert.alert('Please set a new group name and at least one friend!');
    }
  };

  const FriendBox = ({friend}) => {
    const handleFriendPress = () => {
      console.log('selected ' + friend.name);
      let addF = addedFriends;
      if (!addF.includes(friend)) {
        addF.push(friend);
        setAddedFriends(addF);
        // console.log(JSON.stringify(addedFriends, undefined, 2));
        setGroupMembersDisplayList(
          groupMembersDisplayList + friend.name + ', ',
        );
      }
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
        keyExtractor={item => item.id}
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
