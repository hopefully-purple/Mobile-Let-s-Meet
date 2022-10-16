import React, {useContext, useState, useEffect} from 'react';
import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import Colors from '../../assets/styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card} from 'react-native-paper';
import GroupsContext from '../../contexts/Groups';

// https://bobbyhadz.com/blog/react-sort-array-of-objects
function organizeGroups(groups) {
  let newG = {};
  newG = [...groups].sort((a, b) => a.id - b.id);
  return newG;
}

const GroupBox = ({group}) => {
  return (
    <TouchableOpacity>
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

export default function GroupListScreen({navigation}) {
  // const [items, setItems] = useState({});
  //   const user = useContext(UserContext);
  const {groups, setGroups} = useContext(GroupsContext);

  const renderItem = ({item}) => {
    // console.log(items.length);
    // console.log('rendering ' + item.id);
    return <GroupBox group={item} />;
  };

  const newGroupHolder = {
    name: 'New',
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
      <GroupBox group={newGroupHolder} />
      <View>
        <FlatList
          data={flatList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: Colors.DD_CREAM,
    // color: Colors.DD_RED_2,
  },
  defaultScreentext: {
    fontSize: 25,
    fontWeight: '500',
    color: Colors.DD_RED_2,
    textAlign: 'center',
  },
  cardStyle: {
    backgroundColor: Colors.TEST_GREEN,
    height: 70,
    width: 300,
    borderColor: Colors.DD_LIGHT_GRAY,
    borderWidth: 5,
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
