import React, {useContext, useState, useEffect} from 'react';
import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import Colors from '../assets/styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card} from 'react-native-paper';
import FriendsContext from '../contexts/Friends';
import {BoxButton} from '../assets/components/CustomButtons';

// https://bobbyhadz.com/blog/react-sort-array-of-objects
function organizeFriends(friends) {
  let newF = {};
  newF = [...friends].sort((a, b) => (a.name > b.name ? 1 : -1));
  return newF;
}

export default function FriendsScreen({navigation}) {
  const {friends, setFriends} = useContext(FriendsContext);

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

  const [flatList, setFlatList] = useState([]);
  useEffect(
    function createFlatList() {
      const newFlatL = organizeFriends(friends);
      setFlatList(newFlatL);
    },
    [friends],
  );

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.buttons}>
        <BoxButton
          title={'Add New Friend'}
          onPress={() => console.log('new button pressed')}
        />
      </View>
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
