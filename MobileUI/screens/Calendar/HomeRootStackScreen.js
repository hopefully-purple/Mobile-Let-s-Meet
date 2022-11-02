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
import CurrentCalendarNameContext from '../../contexts/CurrentCalendarName';
import {readEventData, readGroupData} from '../../API/APIControllers';
import UserContext from '../../contexts/User';

function HomeScreen({navigation}) {
  const {events, setEvents} = useContext(CalendarEventsContext);
  const {currentCalendarName, setCurrentCalendarName} = useContext(
    CurrentCalendarNameContext,
  );
  const user = useContext(UserContext);
  useEffect(() => {
    navigation.addListener('focus', async () => {
      // do something
      console.log('-------HomerootStackscreen (For calendar)-------------');
      // if (events.length === 0) {
      if (currentCalendarName !== 'My') {
        console.log(
          '@@@@@@@@@@@@grabbing events for groups needs to be implemented @@@@@@@@@@@@',
        );
        setEvents([]);
      } else {
        const data = await readEventData(currentCalendarName, user.name);
        // console.log(JSON.stringify(data, undefined, 2));
        console.log('set events to data');
        setEvents(data);
      }
      // }
    });
  }, [navigation, setEvents, currentCalendarName, user.name]);
  console.log('****************' + currentCalendarName + '********');
  return (
    <CalendarScreen
      calendarName={currentCalendarName}
      navigation={navigation}
    />
  );
}

function GroupScreen({navigation}) {
  const {groups, setGroups} = useContext(GroupsContext);
  useEffect(() => {
    navigation.addListener('focus', async () => {
      console.log('-------HomerootStackscreen (For Group)-------------');
      const data = await readGroupData();
      // console.log(JSON.stringify(data, undefined, 2));
      console.log('set groups to data');
      setGroups(data);
    });
  }, [navigation, setGroups]);
  return <GroupListScreen navigation={navigation} />;
}

function AddEventModalScreen({navigation}) {
  return <AddEventModal navigation={navigation} />;
}

function AddGroupModalScreen({navigation}) {
  return <AddGroupModal navigation={navigation} />;
}

function JoinGroupModalScreen({navigation}) {
  return <JoinGroupModal navigation={navigation} />;
}

const RootStack = createStackNavigator();

export default function HomeRootStackScreen(props) {
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);
  // const {currentCalendar, setCurrentCalendar} = useContext(
  //   CurrentCalendarContext,
  // );

  return (
    <GroupsContext.Provider value={{groups, setGroups}}>
      <CalendarEventsContext.Provider value={{events, setEvents}}>
        <RootStack.Navigator>
          <RootStack.Group>
            {props.calendarName !== 'My' ? (
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
            ) : (
              <RootStack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  headerShown: false,
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
                // headerRight: () => (
                //   <Button
                //     onPress={() => {
                //       props.navigation.navigate('Group');
                //     }}
                //     title="Done"
                //   />
                // ),
              }}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      </CalendarEventsContext.Provider>
    </GroupsContext.Provider>
  );
}

// HomeRootStackScreen.defaultProps = {
//   groupName: 'My',
// };
