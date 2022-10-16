import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CalendarScreen from './CalendarScreen';
import AddEventModal from './AddEventModal';
import Colors from '../../assets/styles/colors';
import CalendarEventsContext from '../../contexts/CalendarEvents';
import GroupsContext from '../../contexts/Groups';
import {classScheduleList} from '../../assets/data/HardCodedEvents';
import {calendarGetEvents} from '../../API/CalendarAPIHandling';
import {groupsGetGroups} from '../../API/GroupsAPIHandling';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GroupListScreen from '../Groups/GroupListScreen';

const readEventData = async () => {
  //TODO: change call based on calendarName?
  try {
    const value = await AsyncStorage.getItem('Events');
    // const value = await calendarGetEvents(); // API call
    // const value = null;
    // console.log('(App.readData) value:' + value);
    if (value !== null && value !== undefined) {
      // setLanguageObj({language: language, words: JSON.parse(value)});
      return JSON.parse(value); // initialize events context
      // return value; //for API call result
    } else {
      console.log(
        '(homerootstack.readData).getEvents value is null! Set to class schedule list for now',
      );
      //TODO: probably return empty array irl
      return classScheduleList;
    }
  } catch (e) {
    console.log(
      '(Homerootstack.readData) Failed to fetch the events from server: ' + e,
    );
    throw e;
  }
};

function HomeScreen({navigation}) {
  const {events, setEvents} = useContext(CalendarEventsContext);
  useEffect(() => {
    navigation.addListener('focus', async () => {
      // do something
      console.log('-------HomerootStackscreen (For calendar)-------------');
      // if (events.length === 0) {
      const data = await readEventData();
      console.log(JSON.stringify(data, undefined, 2));
      console.log('set events to data');
      setEvents(data);
      // }
    });
  }, [navigation, setEvents, events]);
  return <CalendarScreen calendarName="My" navigation={navigation} />;
}

function GroupScreen({navigation}) {
  const {groups, setGroups} = useContext(GroupsContext);
  useEffect(() => {
    navigation.addListener('focus', async () => {
      console.log('-------HomerootStackscreen (For Group)-------------');
      const data = await groupsGetGroups();
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

const RootStack = createStackNavigator();

export default function HomeRootStackScreen(props) {
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);

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
                      if (props.calendarName === 'My') {
                        props.navigation.navigate('Home');
                      } else {
                        props.navigation.navigate('Group');
                      }
                    }}
                    title="Cancel"
                  />
                ),
                // headerBackTitle: 'Cancel',
                // headerBackTitleStyle: {
                //   color: Colors.DD_CREAM,
                //   fontSize: 20,
                // },
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
