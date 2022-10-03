import React from 'react';
import {View, Text, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import CalendarScreen from './CalendarScreen';
import AddEventModal from './AddEventModal';
import Colors from '../../assets/styles/colors';

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
  return (
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
  );
}

// HomeRootStackScreen.defaultProps = {
//   groupName: 'My',
// };
