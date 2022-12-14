import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../../assets/styles/colors';
import {Card, TextInput} from 'react-native-paper';
import {BoxButton} from '../../assets/components/CustomButtons';
import {
  friendsCreateFriendRequestByEmail,
  friendsGetFriends,
} from '../../API/FriendsAPIHandling';

const Empty = ({item}) => {
  return <Text style={styles.emptyText}>No friends yet</Text>;
};

export default function FriendsScreen({navigation}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [newFriendEmail, setNewFriendEmail] = useState('');

  this.friendEmailInput = React.createRef();

  const [friendsList, setFriendsList] = useState([]);
  useEffect(() => {
    let mounted = true;
    console.log('~~~~~~~~~~~~~~~FriendsScreen.useEffect call getFriends');
    friendsGetFriends().then(data => {
      if (mounted) {
        console.log('FriendsScreen mounted! setFriendsList');
        setFriendsList(data);
      }
    });
    return () => {
      console.log('FriendsScreen mounted = false');
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
    <KeyboardAvoidingView style={styles.screenContainer} behavior="padding">
      <Text style={{...styles.defaultScreentext, marginTop: 10}}>
        My Friends:
      </Text>
      <FlatList
        data={friendsList}
        renderItem={renderItem}
        keyExtractor={item => item.userID}
        style={{marginTop: 10}}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        ListEmptyComponent={Empty}
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
    </KeyboardAvoidingView>
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
    borderTopColor: Colors.DD_RED_2,
    borderTopWidth: 10,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    marginBottom: 30,
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
  emptyText: {
    color: Colors.DD_MEDIUM_GRAY,
    fontSize: 20,
    padding: 10,
    fontStyle: 'italic',
    alignSelf: 'center',
  },
});
