import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Colors from '../../assets/styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card, TextInput} from 'react-native-paper';
import {friendsGetFriends} from '../../API/FriendsAPIHandling';
import {groupCreateNewGroup} from '../../API/GroupsAPIHandling';
import {BoxButton} from '../../assets/components/CustomButtons';

// https://github.com/renrizzolo/react-native-sectioned-multi-select
// ^ a more interesting UI for multi-select. Experiment if time
// https://stackoverflow.com/questions/57396558/how-to-select-multiple-items-in-flatlist-highlight-them-and-keep-them-saved-in
// ^ or this stack overflow answer

export default function AddGroupModal({navigation}) {
  const [newGroupName, setNewGroupName] = useState('');
  const [addedFriends, setAddedFriends] = useState([]);
  const [groupMembersDisplayList, setGroupMembersDisplayList] = useState('');

  this.newGroupNameInput = React.createRef();

  const [friendsList, setFriendsList] = useState([]);
  useEffect(() => {
    console.log('~~~~~~~~~~~~~~~AddGroupModal.useEffect call getFriends');
    let mounted = true;
    friendsGetFriends().then(data => {
      if (mounted) {
        console.log('AddGroupModal mounted! setFriendsList');
        setFriendsList(data);
      }
    });
    return () => {
      console.log('AddGroupModal mounted = false');
      mounted = false;
    };
  }, []);

  const doneHandler = async () => {
    if (newGroupName !== '' && addedFriends.length !== 0) {
      console.log(addedFriends);
      const newGroup = {
        name: newGroupName,
        friendIds: addedFriends,
      };
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

  const renderItem = ({item}) => {
    return (
      <FriendBox friend={item} name={`${item?.firstName} ${item?.lastName}`} />
    );
  };

  const FriendBox = ({friend, name}) => {
    const handleFriendPress = () => {
      console.log('selected ' + name);
      let addF = addedFriends;
      if (!addF.includes(friend.userID)) {
        addF.push(friend.userID);
        setAddedFriends(addF);
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

  const handleGroupNameSubmit = async () => {
    console.log('GROUP NAME SUBMIT ' + newGroupName);
  };

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
      <View
        style={{marginTop: 10, flexDirection: 'column', alignItems: 'center'}}>
        <Text style={{...styles.defaultScreentext, marginHorizontal: 10}}>
          Group members: {groupMembersDisplayList}
        </Text>
        <BoxButton onPress={doneHandler} title="Done" />
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
        data={friendsList}
        renderItem={renderItem}
        keyExtractor={item => item?.userID}
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
