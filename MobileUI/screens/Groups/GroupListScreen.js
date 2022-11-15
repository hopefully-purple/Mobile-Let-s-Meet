import React, {useContext, useState, useEffect} from 'react';
import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import Colors from '../../assets/styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card} from 'react-native-paper';
import GroupsContext from '../../contexts/Groups';
import CurrentGroupObjectContext from '../../contexts/CurrentGroupObjectContext';
import {BoxButton} from '../../assets/components/CustomButtons';
import {
  groupsGetGroupMembers,
  getRiverInformation,
  groupsGetGroups,
} from '../../API/GroupsAPIHandling';
import UserContext from '../../contexts/User';
import PropTypes from 'prop-types';

export default function GroupListScreen({navigation}) {
  // const {groups, setGroups} = useContext(GroupsContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {currentGroup, setcurrentGroup} = useContext(CurrentGroupObjectContext);
  const user = useContext(UserContext);

  const [groupsList, setGroupsList] = useState([]);
  useEffect(() => {
    let mounted = true;
    console.log('~~~~~~~~~~~~~~~GroupListScreen.useEffect call getGroups');
    groupsGetGroups(user.token).then(data => {
      if (mounted) {
        console.log('mounted! setGroupsList');
        // let d = organizeGroups(data);
        setGroupsList(data);
      }
    });
    return () => {
      console.log('mounted = false');
      mounted = false;
    };
  }, [user.token]);

  const onRefresh = async () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    console.log('REFRESHING FLAT LIST!!!!!!');
    await groupsGetGroups(user.token).then(data => {
      console.log('setGroupsList to data');
      //setGroupsList to new data
      setGroupsList(data);
    });

    console.log('set refreshing to false');
    // and set isRefreshing to false
    setIsRefreshing(false);
  };

  const renderItem = ({item}) => {
    // console.log(items.length);
    // console.log('rendering ' + item.id);
    return <GroupBox group={item} />;
  };

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

  // const [flatList, setFlatList] = useState([]);
  // useEffect(
  //   function createFlatList() {
  //     const newFlatL = organizeGroups(groups);
  //     setFlatList(newFlatL);
  //   },
  //   [groups],
  // );

  // const [riverInformation, setRiverInformation] = useState();

  // useEffect(() => {
  //   let mounted = true;
  //   console.log(
  //     'GroupListScreen.useEffect call getRiverInformation on ' + name,
  //   );
  //   getRiverInformation(name).then(data => {
  //     if (mounted) {
  //       setRiverInformation(data);
  //     }
  //   });
  //   return () => {
  //     mounted = false;
  //   };
  // }, [name]);

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
        data={groupsList}
        renderItem={renderItem}
        keyExtractor={item => item.groupID}
        style={{marginTop: 40}}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
    </SafeAreaView>
  );
}

// GroupListScreen.propTypes = {
//   name: PropTypes.string.isRequired,
// };

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
