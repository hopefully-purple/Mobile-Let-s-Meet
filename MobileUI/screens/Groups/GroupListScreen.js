import React, {useContext, useState, useEffect} from 'react';
import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import Colors from '../../assets/styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card} from 'react-native-paper';
import GroupsContext from '../../contexts/Groups';
import CurrentGroupObjectContext from '../../contexts/CurrentGroupObjectContext';
import {BoxButton} from '../../assets/components/CustomButtons';
import {groupsGetGroupMembers} from '../../API/GroupsAPIHandling';
import UserContext from '../../contexts/User';

// https://bobbyhadz.com/blog/react-sort-array-of-objects
function organizeGroups(groups) {
  let newG = {};
  // newG = [...groups].sort((a, b) => a.groupID - b.groupID);
  newG = [...groups].sort((a, b) => (a.groupName > b.groupName ? 1 : -1));
  return newG;
}

export default function GroupListScreen({navigation}) {
  const {groups, setGroups} = useContext(GroupsContext);
  const {currentGroup, setcurrentGroup} = useContext(CurrentGroupObjectContext);
  const user = useContext(UserContext);

  const GroupBox = ({group}) => {
    const handleGroupPress = async () => {
      //Grab group name
      // console.log(group.name + ' selected');
      console.log(
        'pulling up ' + group.groupName + ' calendar (eventually . . .)',
      );
      // Call getGroup API to get full group object
      const detailedGroup = await groupsGetGroupMembers(
        group.groupID,
        user.token,
      );
      console.log(JSON.stringify(detailedGroup, undefined, 2));
      setcurrentGroup(detailedGroup);
      //Set things up to trigger a correct event grab and calendar name change
      //navigate to calendar
      navigation.navigate('GroupCalendar');
    };
    return (
      <TouchableOpacity onPress={handleGroupPress}>
        <Card style={styles.cardStyle}>
          <Card.Content>
            <View>
              <Text key={group.groupID} style={styles.defaultScreentext}>
                {group.groupName}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    // console.log(items.length);
    // console.log('rendering ' + item.id);
    return <GroupBox group={item} />;
  };

  const [flatList, setFlatList] = useState([]);
  useEffect(
    function createFlatList() {
      const newFlatL = organizeGroups(groups);
      setFlatList(newFlatL);
    },
    [groups],
  );

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.buttons}>
        <BoxButton
          title={'+ Create'}
          onPress={() => navigation.navigate('AddGroupModal')}
        />
        <BoxButton
          title={'Join'}
          onPress={() => navigation.navigate('JoinGroupModal')}
        />
      </View>
      <FlatList
        data={flatList}
        renderItem={renderItem}
        keyExtractor={item => item.groupID}
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
    // color: Colors.DD_RED_2,
  },
  defaultScreentext: {
    fontSize: 25,
    // fontWeight: '500',
    color: Colors.DD_RED_2,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    position: 'absolute',
    margin: 10,
    // alignContent: 'center',
  },
  cardStyle: {
    backgroundColor: Colors.DD_CREAM,
    height: 70,
    width: 300,
    borderColor: Colors.DD_RED_2,
    borderWidth: 2,
    marginVertical: 10,
    marginHorizontal: 40,
    // alignContent: 'space-around',
  },
  // itemText: {
  //   color: Colors.DD_DARK_GRAY,
  // },
  // item: {
  //   flex: 1,
  //   // borderRadius: 5,
  //   // padding: 10,
  //   marginRight: 10,
  //   marginTop: 17,
  // },
});
