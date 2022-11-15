import React, {useContext, useState, useEffect} from 'react';
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
import FriendsContext from '../../contexts/Friends';
import {BoxButton} from '../../assets/components/CustomButtons';
import {
  friendsGetSentRequests,
  friendsCreateFriendRequestByEmail,
  friendsGetFriends,
} from '../../API/FriendsAPIHandling';
import UserContext from '../../contexts/User';

export default function FriendsScreen({navigation}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newFriendEmail, setNewFriendEmail] = useState('');
  // const {friends, setFriends} = useContext(FriendsContext);
  const user = useContext(UserContext);

  this.friendEmailInput = React.createRef();

  const [friendsList, setFriendsList] = useState([]);
  useEffect(() => {
    let mounted = true;
    console.log('~~~~~~~~~~~~~~~FriendsScreen.useEffect call getFriends');
    friendsGetFriends().then(data => {
      if (mounted) {
        console.log('mounted! setFriendsList');
        // let d = organizeGroups(data);
        setFriendsList(data);
      }
    });
    return () => {
      console.log('mounted = false');
      mounted = false;
    };
  }, []);

  const onRefresh = async () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    console.log('REFRESHING FLAT LIST!!!!!!');
    await friendsGetFriends().then(data => {
      console.log('setFriendsList to data');
      //setGroupsList to new data
      setFriendsList(data);
    });

    console.log('set refreshing to false');
    // and set isRefreshing to false
    setIsRefreshing(false);
  };

  const renderItem = ({item}) => {
    // console.log(items.length);
    // console.log('rendering ' + item.id);
    return (
      <FriendBox friend={item} name={`${item.firstName} ${item.lastName}`} />
    );
  };

  const FriendBox = ({friend, name}) => {
    const handleFriendPress = () => {
      console.log('selected ' + JSON.stringify(friend, undefined, 2));
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

  // const [existingFriendsList, setExistingFriendsList] = useState([]);
  // useEffect(
  //   function createExistingFriendsList() {
  //     const newFlatL = organizeFriends(friends);
  //     setExistingFriendsList(newFlatL);
  //   },
  //   [friends],
  // );

  const addFriendHandler = async () => {
    if (newFriendEmail !== '') {
      console.log('Create friend request to ' + newFriendEmail);
      let result = await friendsCreateFriendRequestByEmail(newFriendEmail);
      if (result) {
        Alert.alert('Request sent!');
      } else {
        Alert.alert('Friend request failed');
      }

      this.friendEmailInput.current.clear();
      this.friendEmailInput.current.blur();
    } else {
      Alert.alert('Enter the email of a new friend');
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={{...styles.defaultScreentext, marginTop: -30}}>
        My Friends:
      </Text>
      <FlatList
        data={friendsList}
        renderItem={renderItem}
        keyExtractor={item => item.userID}
        style={{marginTop: 10}}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
      <View style={styles.buttons}>
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
        <BoxButton title={'Add New Friend'} onPress={addFriendHandler} />
        <BoxButton
          title={'View Requests'}
          onPress={() => navigation.navigate('RequestsModal')}
        />
      </View>
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
    // backgroundColor: Colors.DD_RED_2,
    borderTopColor: Colors.DD_RED_2,
    borderTopWidth: 10,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
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
