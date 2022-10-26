import React, {useContext, useState, useEffect} from 'react';
import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import Colors from '../../assets/styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card} from 'react-native-paper';
import GroupsContext from '../../contexts/Groups';
import CurrentCalendarNameContext from '../../contexts/CurrentCalendarName';
import {BoxButton} from '../../assets/components/CustomButtons';

// https://bobbyhadz.com/blog/react-sort-array-of-objects
function organizeGroups(groups) {
  let newG = {};
  newG = [...groups].sort((a, b) => a.id - b.id);
  return newG;
}

export default function GroupListScreen({navigation}) {
  const {groups, setGroups} = useContext(GroupsContext);
  const {currentCalendarName, setCurrentCalendarName} = useContext(
    CurrentCalendarNameContext,
  );

  const GroupBox = ({group}) => {
    const handleGroupPress = () => {
      //Grab group name
      // console.log(group.name + ' selected');
      console.log('pulling up ' + group.name + ' calendar (eventually . . .)');
      setCurrentCalendarName(group.name);
      //Set things up to trigger a correct event grab and calendar name change
      //navigate to calendar
      navigation.navigate('Home');
    };
    return (
      <TouchableOpacity onPress={handleGroupPress}>
        <Card style={styles.cardStyle}>
          <Card.Content>
            <View>
              <Text style={styles.defaultScreentext}>{group.name}</Text>
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
