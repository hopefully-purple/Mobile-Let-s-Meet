import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CalendarScreen from './CalendarScreen';
import AddEventModal from './AddEventModal';
import Colors from '../../assets/styles/colors';
import CalendarEventsContext from '../../contexts/CalendarEvents';

function HomeScreen({navigation}) {
  return <CalendarScreen groupName="My" navigation={navigation} />;
}

function GroupScreen({navigation}) {
  return <CalendarScreen groupName="Group" navigation={navigation} />;
}

function AddEventModalScreen({navigation}) {
  return <AddEventModal navigation={navigation} />;
}

const RootStack = createStackNavigator();

export default function HomeRootStackScreen(props) {
  const [items, setItems] = useState({});

  const readData = async () => {
    console.log('ReadData');
    // try {
    //   const value = await AsyncStorage.getItem('Spanish');
    //   console.log('(App.readData) value:' + value);
    //   if (value !== null) {
    //     beginningObject.words = JSON.parse(value);
    //     setLanguageObj(beginningObject);
    //   } else {
    //     console.log('(App.readData).getItem value is null!');
    //   }
    // } catch (e) {
    //   console.log('(App.readData) Failed to fetch the input from storage: ' + e);
    //   throw e;
    // }
  };

  useEffect(() => {
    console.log('App.useEffect');
    readData();
  }, []);
  return (
    <CalendarEventsContext.Provider value={{items, setItems}}>
      <RootStack.Navigator>
        <RootStack.Group>
          {props.groupName ? (
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
