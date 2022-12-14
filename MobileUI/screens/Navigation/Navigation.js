import React, {useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeRootStackScreen from './HomeRootStackScreen';
import LoginScreen from '../LoginScreen';
import Colors from '../../assets/styles/colors';
import RegistrationScreen from '../RegistrationFlow/RegistrationScreen';
import BaseRegistration from '../RegistrationFlow/BaseRegistration';
import LogStateContext from '../../contexts/LoginState';
import FriendsContext from '../../contexts/Friends';
import CurrentGroupObjectContext from '../../contexts/CurrentGroupObjectContext';
import ProfileScreen from '../ProfileScreen';

//Important links
//https://reactnavigation.org/docs/drawer-based-navigation/
//https://reactnavigation.org/docs/drawer-navigator/

function GroupsScreen({navigation}) {
  return <HomeRootStackScreen calendarName="Group" navigation={navigation} />;
}

function MyScheduleScreen({navigation}) {
  return <HomeRootStackScreen calendarName="My" navigation={navigation} />;
}

function LoggingScreen({navigation}) {
  return <LoginScreen navigation={navigation} />;
}

function FriendScreen({navigation}) {
  return <HomeRootStackScreen calendarName="Friends" navigation={navigation} />;
}

const Drawer = createDrawerNavigator();

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [friends, setFriends] = useState([]);
  const [currentGroup, setcurrentGroup] = useState({});

  let logScreenLabel = isLoggedIn ? 'Log Out' : 'Log In';
  let landing = isLoggedIn ? 'My Schedule' : 'Login';
  console.log('landing ' + landing);
  return (
    <LogStateContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
      <FriendsContext.Provider value={{friends, setFriends}}>
        <CurrentGroupObjectContext.Provider
          value={{currentGroup, setcurrentGroup}}>
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
                  component={FriendScreen}
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
        </CurrentGroupObjectContext.Provider>
      </FriendsContext.Provider>
    </LogStateContext.Provider>
  );
}
