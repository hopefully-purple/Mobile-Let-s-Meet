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
import {Card} from 'react-native-paper';
import CurrentGroupObjectContext from '../../contexts/CurrentGroupObjectContext';
import {BoxButton} from '../../assets/components/CustomButtons';
import {
  groupLeaveGroup,
  groupsGetGroupMembers,
  groupsGetGroups,
} from '../../API/GroupsAPIHandling';

const Empty = ({item}) => {
  return <Text style={styles.emptyText}>Not in any groups yet</Text>;
};

export default function GroupListScreen({navigation}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {currentGroup, setcurrentGroup} = useContext(CurrentGroupObjectContext);

  const [groupsList, setGroupsList] = useState([]);
  useEffect(() => {
    console.log('~~~~~~~~~~~~~~~GroupListScreen.useEffect call getGroups');
    let mounted = true;
    groupsGetGroups().then(data => {
      if (mounted) {
        console.log('GroupListScreen mounted! setGroupsList');
        setGroupsList(data);
      }
    });
    return () => {
      console.log('GroupListScreen mounted = false');
      mounted = false;
    };
  }, []);

  const onRefresh = async () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    console.log('GroupListScreen REFRESHING FLAT LIST!!!!!!');
    await groupsGetGroups().then(data => {
      console.log('setGroupsList to data');
      //setGroupsList to new data
      setGroupsList(data);
    });

    console.log('set refreshing to false');
    // and set isRefreshing to false
    setIsRefreshing(false);
  };

  const renderItem = ({item}) => {
    return <GroupBox group={item} />;
  };

  const GroupBox = ({group}) => {
    const handleGroupPress = async () => {
      //Grab group name
      console.log(
        'pulling up ' + group.groupName + ' calendar (eventually . . .)',
      );
      // Call getGroup API to get full group object
      const detailedGroup = await groupsGetGroupMembers(group.groupID);
      setcurrentGroup(detailedGroup);
      //Set things up to trigger a correct event grab and calendar name change
      //navigate to calendar
      navigation.navigate('GroupCalendar');
    };
    const handleLongPress = () => {
      Alert.alert('Leave this group?', '', [
        {
          text: 'Leave',
          onPress: () => {
            groupLeaveGroup(group.groupID);
            navigation.navigate('Group');
          },
        },
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      ]);
    };
    return (
      <TouchableOpacity
        onPress={handleGroupPress}
        onLongPress={handleLongPress}>
        <Card style={styles.cardStyle}>
          <Card.Content>
            <View>
              <Text key={group.groupID} style={styles.defaultScreentext}>
                {group?.groupName}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

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
        style={{marginTop: 15}}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        ListEmptyComponent={Empty}
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
  emptyText: {
    color: Colors.DD_MEDIUM_GRAY,
    fontSize: 20,
    padding: 10,
    fontStyle: 'italic',
    alignSelf: 'center',
  },
});
