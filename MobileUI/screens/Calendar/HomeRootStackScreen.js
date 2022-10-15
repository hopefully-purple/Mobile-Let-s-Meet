import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CalendarScreen from './CalendarScreen';
import AddEventModal from './AddEventModal';
import Colors from '../../assets/styles/colors';
import CalendarEventsContext from '../../contexts/CalendarEvents';
import {classScheduleList} from '../../assets/data/HardCodedEvents';
import {calendarGetEvents} from './CalendarAPIHandling';

const readEventData = async () => {
  //TODO: change call based on calendarName?
  try {
    // const value = await AsyncStorage.getItem(language);
    //const value = await calendarGetEvents(); // API call
    const value = null;
    // console.log('(App.readData) value:' + value);
    if (value !== null) {
      // setLanguageObj({language: language, words: JSON.parse(value)});
      return value; // initialize events context
    } else {
      console.log(
        '(calendarScreen.readData).getEvents value is null! Set to class schedule list for now',
      );
      //TODO: probably return empty array irl
      return classScheduleList;
    }
  } catch (e) {
    console.log(
      '(calendarScreen.readData) Failed to fetch the events from server: ' + e,
    );
    throw e;
  }
};

function HomeScreen({navigation}) {
  const {events, setEvents} = useContext(CalendarEventsContext);
  useEffect(() => {
    navigation.addListener('focus', async () => {
      // do something
      console.log('-------calendarscreen-------------');
      const data = await readEventData();
      // console.log(JSON.stringify(data, undefined, 2));
      console.log('set events to data');
      setEvents(data);
    });
  }, [navigation, setEvents]);
  return <CalendarScreen calendarName="My" navigation={navigation} />;
}

function GroupScreen({navigation}) {
  useEffect(
    () =>
      navigation.addListener('focus', () => alert('Groupscreen was focused')),
    [navigation],
  );
  return <CalendarScreen calendarName="Group" navigation={navigation} />;
}

function AddEventModalScreen({navigation}) {
  return <AddEventModal navigation={navigation} />;
}

const RootStack = createStackNavigator();

export default function HomeRootStackScreen(props) {
  const [events, setEvents] = useState([]);

  return (
    <CalendarEventsContext.Provider value={{events, setEvents}}>
      <RootStack.Navigator>
        <RootStack.Group>
          {props.calendarName !== 'My' ? (
            <RootStack.Screen
              name="Group"
              component={GroupScreen}
              options={{
                headerShown: false,
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
                  onPress={() => props.navigation.goBack()}
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
  );
}

// HomeRootStackScreen.defaultProps = {
//   groupName: 'My',
// };
