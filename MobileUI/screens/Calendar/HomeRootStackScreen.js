import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CalendarScreen from './CalendarScreen';
import AddEventModal from './AddEventModal';
import Colors from '../../assets/styles/colors';
import CalendarEventsContext from '../../contexts/CalendarEvents';
import GroupsContext from '../../contexts/Groups';
import GroupListScreen from '../Groups/GroupListScreen';
import AddGroupModal from '../Groups/AddGroupModal';
import JoinGroupModal from '../Groups/JoinGroupModal';
import GroupInfoModal from '../Groups/GroupInfoModal';
import LetsMeetModal from '../Groups/LetsMeetModal';
import {readEventData, readGroupData} from '../../API/APIControllers';
import {calendarGetCalendars} from '../../API/CalendarAPIHandling';
import UserContext from '../../contexts/User';
import GroupCalendarScreen from '../Groups/GroupCalendarScreen';
import FriendsScreen from '../Friends/FriendsScreen';
import FriendsContext from '../../contexts/Friends';
import {
  friendsGetSentRequests,
  friendsGetFriends,
  friendsGetReceivedRequests,
} from '../../API/FriendsAPIHandling';
import FriendRequestModal from '../Friends/FriendRequestsModal';
import IsCameraOpenContext from '../../contexts/IsCameraOpen';
import NewCalendarModal from './NewCalendarModal';
import {StackActions} from '@react-navigation/native';
import {MiniBoxButton} from '../../assets/components/CustomButtons';
import {roundToNearestPixel} from 'react-native/Libraries/Utilities/PixelRatio';

const popAction = StackActions.pop(1);

function HomeScreen({navigation}) {
  // const {events, setEvents} = useContext(CalendarEventsContext);
  // const user = useContext(UserContext);
  // useEffect(() => {
  //   navigation.addListener('focus', async () => {
  //     // do something
  //     console.log('-------HomerootStackscreen (For calendar)-------------');

  //     const data = await readEventData('My', user.name);
  //     // console.log(JSON.stringify(data, undefined, 2));
  //     console.log('set events to data');
  //     setEvents(data);
  //   });
  // }, [navigation, setEvents, user.name]);
  return <CalendarScreen navigation={navigation} />;
}

function GroupScreen({navigation}) {
  // const {groups, setGroups} = useContext(GroupsContext);
  // const user = useContext(UserContext);
  // useEffect(() => {
  //   navigation.addListener('focus', async () => {
  //     console.log('-------HomerootStackscreen (For Group)-------------');
  //     const data = await readGroupData(user.name);
  //     // console.log(JSON.stringify(data, undefined, 2));
  //     console.log('set groups to data');
  //     setGroups(data);
  //   });
  // }, [navigation, setGroups, user.name]);
  return <GroupListScreen navigation={navigation} />;
}

function GroupCalendar({navigation}) {
  return <GroupCalendarScreen navigation={navigation} />;
}

function AddEventModalScreen({navigation, route}) {
  return (
    <AddEventModal
      navigation={navigation}
      calendarID={route.params.calendarID}
    />
  );
}

function NewCalOverlay({navigation}) {
  return <NewCalendarModal navigation={navigation} />;
}

function AddGroupModalScreen({navigation}) {
  return <AddGroupModal navigation={navigation} />;
}

function JoinGroupModalScreen({navigation}) {
  return <JoinGroupModal navigation={navigation} />;
}

function InfoModalOverlay({navigation}) {
  return <GroupInfoModal navigation={navigation} />;
}

function MeetModalOverlay({navigation}) {
  return <LetsMeetModal navigation={navigation} />;
}

function FriendScreen({navigation}) {
  return <FriendsScreen navigation={navigation} />;
}

function RequestsModalOverlay({navigation}) {
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  useEffect(() => {
    let mounted = true;
    console.log('~~~~~~~~~~~~~~RequestsModalOverlay.useEffect call getSent');
    friendsGetSentRequests().then(data => {
      if (mounted) {
        console.log('RequestsModalOverlay (sent) mounted! setSent');
        // let d = organizeGroups(data);
        setSent(data);
      }
    });
    return () => {
      console.log('RequestsModalOverlay (sent) mounted = false');
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    console.log('~~~~~~~~~~~~~RequestsModalOverlay.useEffect call getRecieved');
    friendsGetReceivedRequests().then(data => {
      if (mounted) {
        console.log('RequestsModalOverlay (rec) mounted! setRecieved');
        // let d = organizeGroups(data);
        setReceived(data);
      }
    });
    return () => {
      console.log('RequestsModalOverlay (rec) mounted = false');
      mounted = false;
    };
  }, []);
  return (
    <FriendRequestModal
      navigation={navigation}
      sentRequests={sent}
      receivedRequests={received}
    />
  );
}

const RootStack = createStackNavigator();

export default function HomeRootStackScreen(props) {
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  // const {currentCalendar, setCurrentCalendar} = useContext(
  //   CurrentCalendarContext,
  // );
  console.log(
    '(HomeRootStackScreen)-------------------' +
      props.calendarName +
      '-----------------',
  );
  return (
    <GroupsContext.Provider value={{groups, setGroups}}>
      <CalendarEventsContext.Provider value={{events, setEvents}}>
        <IsCameraOpenContext.Provider value={{isCameraOpen, setIsCameraOpen}}>
          <RootStack.Navigator>
            <RootStack.Group>
              {props.calendarName === 'Group' && (
                <RootStack.Screen
                  name="Group"
                  component={GroupScreen}
                  options={{
                    title: 'Groups',
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: Colors.DD_RED_2,
                    },
                    headerTitleStyle: {
                      color: Colors.DD_CREAM,
                      fontSize: 25,
                      fontWeight: '500',
                      marginBottom: 10,
                    },
                  }}
                />
              )}
              {props.calendarName === 'My' && (
                <RootStack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    headerShown: false,
                  }}
                />
              )}
              {props.calendarName === 'Friends' && (
                <RootStack.Screen
                  name="Friend"
                  component={FriendScreen}
                  options={{
                    title: 'Friends',
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: Colors.DD_RED_2,
                    },
                    headerTitleStyle: {
                      color: Colors.DD_CREAM,
                      fontSize: 25,
                      fontWeight: '500',
                      marginBottom: 10,
                    },
                  }}
                />
              )}
            </RootStack.Group>
            {/* <RootStack.Group screenOptions={{presentation: 'modal'}}> */}
            <RootStack.Group
              screenOptions={{
                headerStyle: {
                  color: Colors.DD_CREAM,
                },
              }}>
              <RootStack.Screen
                name="GroupCalendar"
                component={GroupCalendar}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                }}
              />
              <RootStack.Screen
                name="AddEventModal"
                component={AddEventModalScreen}
                options={{
                  title: 'New Event',
                  headerTitleStyle: {
                    color: Colors.DD_CREAM,
                    fontSize: 20,
                  },
                  animation: 'slide_from_right',
                  headerStyle: {
                    backgroundColor: Colors.DD_RED_2,
                  },
                  headerLeft: () => (
                    // <Button
                    //   onPress={() => {
                    //     props.navigation.dispatch(popAction);
                    //   }}
                    //   title="Cancel"
                    // />
                    <View style={styles.backButtonWrapper}>
                      <MiniBoxButton
                        title={'< Back'}
                        onPress={() => props.navigation.dispatch(popAction)}
                      />
                    </View>
                  ),
                }}
              />
              <RootStack.Screen
                name="JoinGroupModal"
                component={JoinGroupModalScreen}
                options={{
                  title: 'Join A Group',
                  headerTitleStyle: {
                    color: Colors.DD_CREAM,
                    fontSize: 20,
                  },
                  animation: 'slide_from_right',
                  headerStyle: {
                    backgroundColor: Colors.DD_RED_2,
                  },
                  // headerBackTitleVisible: false,
                  // headerBackTitle: 'Lbhadlskfj',
                  headerLeft: () => (
                    <View style={styles.backButtonWrapper}>
                      <MiniBoxButton
                        title={'Cancel'}
                        onPress={() => props.navigation.navigate('Group')}
                      />
                    </View>
                  ),
                }}
              />
              <RootStack.Screen
                name="AddGroupModal"
                component={AddGroupModalScreen}
                options={{
                  title: 'New Group',
                  headerTitleStyle: {
                    color: Colors.DD_CREAM,
                    fontSize: 20,
                  },
                  animation: 'slide_from_right',
                  headerStyle: {
                    backgroundColor: Colors.DD_RED_2,
                  },
                  headerLeft: () => (
                    <View style={styles.backButtonWrapper}>
                      <MiniBoxButton
                        title={'Cancel'}
                        onPress={() => props.navigation.navigate('Group')}
                      />
                    </View>
                  ),
                }}
              />
              <RootStack.Screen
                name="NewCalModal"
                component={NewCalOverlay}
                options={{
                  presentation: 'modal',
                  headerShown: false,
                  cardOverlayEnabled: true,
                  gestureEnabled: true,
                  gestureDirection: 'vertical',
                  gestureResponseDistance: 500,
                  cardStyle: {
                    backgroundColor: 'transparent',
                    opacity: 0.99,
                  },
                }}
              />
              <RootStack.Screen
                name="InfoModal"
                component={InfoModalOverlay}
                options={{
                  presentation: 'modal',
                  headerShown: false,
                  cardOverlayEnabled: true,
                  gestureEnabled: true,
                  gestureDirection: 'vertical',
                  gestureResponseDistance: 500,
                  cardStyle: {
                    backgroundColor: 'transparent',
                    opacity: 0.99,
                  },
                }}
              />
              <RootStack.Screen
                name="MeetModal"
                component={MeetModalOverlay}
                options={{
                  presentation: 'modal',
                  headerShown: false,
                  cardOverlayEnabled: true,
                  gestureEnabled: true,
                  gestureDirection: 'vertical',
                  gestureResponseDistance: 500,
                  cardStyle: {
                    backgroundColor: 'transparent',
                    opacity: 0.99,
                  },
                }}
              />
              <RootStack.Screen
                name="RequestsModal"
                component={RequestsModalOverlay}
                options={{
                  presentation: 'modal',
                  headerShown: false,
                  cardOverlayEnabled: true,
                  gestureEnabled: true,
                  gestureDirection: 'vertical',
                  gestureResponseDistance: 500,
                  cardStyle: {
                    backgroundColor: 'transparent',
                    opacity: 0.99,
                  },
                }}
              />
            </RootStack.Group>
          </RootStack.Navigator>
        </IsCameraOpenContext.Provider>
      </CalendarEventsContext.Provider>
    </GroupsContext.Provider>
  );
}

const styles = StyleSheet.create({
  backButtonWrapper: {
    marginLeft: 20,
    marginRight: 10,
  },
});

// HomeRootStackScreen.defaultProps = {
//   groupName: 'My',
// };
