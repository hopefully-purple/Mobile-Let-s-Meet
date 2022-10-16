import React, {useState} from 'react';
import {View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import CalendarScreen from '../Calendar/CalendarScreen';
import HomeRootStackScreen from '../Calendar/HomeRootStackScreen';
import LoginScreen from '../LoginScreen';
import {Text, StyleSheet} from 'react-native';
import Colors from '../../assets/styles/colors';
import RegistrationScreen from '../RegistrationFlow/RegistrationScreen';
import BaseRegistration from '../RegistrationFlow/BaseRegistration';
import LogStateContext from '../../contexts/LoginState';
import ProfileScreen from '../ProfileScreen';
import SettingsScreen from '../SettingsScreen';

//Important links
//https://reactnavigation.org/docs/drawer-based-navigation/
//https://reactnavigation.org/docs/drawer-navigator/

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.DD_CREAM,
    color: Colors.DD_RED_2,
  },
  defaultScreentext: {
    fontSize: 25,
    fontWeight: '500',
    color: Colors.DD_RED_2,
    textAlign: 'center',
  },
});

function GroupsScreen({navigation}) {
  return <HomeRootStackScreen calendarName="Group" navigation={navigation} />;
}

function MyScheduleScreen({navigation}) {
  return <HomeRootStackScreen calendarName="My" navigation={navigation} />;
}

function FriendsScreen({navigation}) {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.defaultScreentext}> List of friends</Text>
      <Text style={styles.defaultScreentext}> Add friends</Text>
    </View>
  );
}

function LoggingScreen({navigation}) {
  return <LoginScreen navigation={navigation} />;
}

const Drawer = createDrawerNavigator();

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let logScreenLabel = isLoggedIn ? 'Log Out' : 'Log In';
  let landing = isLoggedIn ? 'My Schedule' : 'Login';
  return (
    <LogStateContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={landing}
          screenOptions={{
            drawerType: 'front',
            drawerActiveBackgroundColor: Colors.DD_CREAM,
            drawerActiveTintColor: Colors.DD_RED_3,
            drawerInactiveTintColor: Colors.DD_LIGHT_GRAY,
            drawerLabelStyle: {
              fontSize: 24,
            },
            drawerStyle: {
              backgroundColor: Colors.DD_CREAM,
            },
          }}>
          {isLoggedIn && (
            <Drawer.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />
          )}
          <Drawer.Screen
            name="My Schedule"
            component={MyScheduleScreen}
            options={{
              headerShown: false,
              drawerItemStyle: {
                height: isLoggedIn ? 55 : 0,
              },
            }}
          />
          {isLoggedIn && (
            <Drawer.Screen
              name="Groups"
              component={GroupsScreen}
              options={{
                headerShown: false,
              }}
            />
          )}
          {isLoggedIn && (
            <Drawer.Screen
              name="Friends"
              component={FriendsScreen}
              options={{
                headerShown: false,
              }}
            />
          )}
          {isLoggedIn && (
            <Drawer.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                headerShown: false,
              }}
            />
          )}
          <Drawer.Screen
            name="Login"
            component={LoggingScreen}
            options={{
              headerShown: false,
              drawerLabel: logScreenLabel,
            }}
          />
          <Drawer.Screen
            name={'Registration'}
            component={RegistrationScreen}
            options={{
              headerShown: false,
              drawerHideStatusBarOnOpen: true,
              drawerItemStyle: {
                height: 0,
              },
            }}
          />
          <Drawer.Screen
            name={'BaseRegistration'}
            component={BaseRegistration}
            options={{
              headerShown: false,
              drawerItemStyle: {
                height: 0,
              },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </LogStateContext.Provider>
  );
}
