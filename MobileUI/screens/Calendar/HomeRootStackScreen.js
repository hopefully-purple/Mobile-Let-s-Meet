import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Button} from 'react-native';
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

function HomeScreen({navigation}) {
  const {events, setEvents} = useContext(CalendarEventsContext);
  const user = useContext(UserContext);
  useEffect(() => {
    navigation.addListener('focus', async () => {
      // do something
      console.log('-------HomerootStackscreen (For calendar)-------------');

      const data = await readEventData('My', user.name);
      // console.log(JSON.stringify(data, undefined, 2));
      console.log('set events to data');
      setEvents(data);
    });
  }, [navigation, setEvents, user.name]);
  return <CalendarScreen navigation={navigation} />;
}

function GroupScreen({navigation}) {
  const {groups, setGroups} = useContext(GroupsContext);
  const user = useContext(UserContext);
  useEffect(() => {
    navigation.addListener('focus', async () => {
      console.log('-------HomerootStackscreen (For Group)-------------');
      const data = await readGroupData(user.name);
      // console.log(JSON.stringify(data, undefined, 2));
      console.log('set groups to data');
      setGroups(data);
    });
  }, [navigation, setGroups, user.name]);
  return <GroupListScreen navigation={navigation} />;
}

function GroupCalendar({navigation}) {
  console.log(
    '@@@@@@@@@@@@grabbing events for groups needs to be implemented @@@@@@@@@@@@',
  );
  // setEvents([]);
  return <GroupCalendarScreen navigation={navigation} />;
}

function AddEventModalScreen({navigation}) {
  const [calendars, setCalendars] = useState([]);
  const user = useContext(UserContext);
  navigation.addListener('focus', async () => {
    console.log('-------Navigation (For AddEventModal)-------------');
    const data = await calendarGetCalendars(user.name);
    // console.log(JSON.stringify(data, undefined, 2));
    console.log('set calendars to data');
    setCalendars(data);
  });
  return <AddEventModal navigation={navigation} calendars={calendars} />;
}

function AddGroupModalScreen({navigation}) {
  return <AddGroupModal navigation={navigation} />;
}

function JoinGroupModalScreen({navigation}) {
  // navigation.addListener('gestureCancel', e => {
  //   console.log('{{{{{{{{{{{{{{{{????????????????');
  //   navigation.navigate('JoinGroupModal');
  // });
  return <JoinGroupModal navigation={navigation} />;
}

function InfoModalOverlay({navigation}) {
  return <GroupInfoModal navigation={navigation} />;
}

function MeetModalOverlay({navigation}) {
  return <LetsMeetModal navigation={navigation} />;
}

function FriendScreen({navigation}) {
  const {friends, setFriends} = useContext(FriendsContext);
  const user = useContext(UserContext);
  useEffect(() => {
    navigation.addListener('focus', async () => {
      console.log('-------Navigation (For Friends)-------------');
      const data = await friendsGetFriends(user.token);
      // console.log(JSON.stringify(data, undefined, 2));
      console.log('set friends to data');
      setFriends(data);
    });
  }, [navigation, setFriends, user.token]);
  return <FriendsScreen navigation={navigation} />;
}

function RequestsModalOverlay({navigation}) {
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const user = useContext(UserContext);
  // useEffect(() => {
  navigation.addListener('focus', async () => {
    console.log('-------Navigation (For RequestsOVerlay)-------------');
    const dataSent = await friendsGetSentRequests(user.token);
    const dataRec = await friendsGetReceivedRequests(user.token);
    // console.log(JSON.stringify(data, undefined, 2));
    console.log('set sent to dataSent and received to dataRec');
    setSent(dataSent);
    setReceived(dataRec);
  });
  // }, [navigation, user.name]);
  console.log('sent:');
  console.log(JSON.stringify(sent, undefined, 2));
  console.log('recieved:');
  console.log(JSON.stringify(received, undefined, 2));
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
                    <Button
                      onPress={() => {
                        props.navigation.navigate('Home');
                      }}
                      title="Cancel"
                    />
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
                    <Button
                      onPress={() => {
                        props.navigation.navigate('Group');
                      }}
                      title={'Cancel'}
                      // title={'Close'}
                    />
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
                    <Button
                      onPress={() => {
                        props.navigation.navigate('Group');
                      }}
                      title="Cancel"
                    />
                  ),
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

// HomeRootStackScreen.defaultProps = {
//   groupName: 'My',
// };
