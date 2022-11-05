import React, {useState, useContext, useEffect} from 'react';
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
import FriendsContext from '../../contexts/Friends';
import CurrentGroupObjectContext from '../../contexts/CurrentGroupObjectContext';
import ProfileScreen from '../ProfileScreen';
import SettingsScreen from '../SettingsScreen';
import FriendsScreen from '../FriendsScreen';
import {friendsGetFriends} from '../../API/FriendsAPIHandling';
import UserContext from '../../contexts/User';

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

function LoggingScreen({navigation}) {
  return <LoginScreen navigation={navigation} />;
}

function FriendScreen({navigation}) {
  const {friends, setFriends} = useContext(FriendsContext);
  const user = useContext(UserContext);
  useEffect(() => {
    navigation.addListener('focus', async () => {
      console.log('-------Navigation (For Friends)-------------');
      const data = await friendsGetFriends(user.name);
      // console.log(JSON.stringify(data, undefined, 2));
      console.log('set friends to data');
      setFriends(data);
    });
  }, [navigation, setFriends, user.name]);
  return <FriendsScreen navigation={navigation} />;
}

const Drawer = createDrawerNavigator();

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [friends, setFriends] = useState([]);
  const [currentGroup, setcurrentGroup] = useState({});
  // console.log('~~~~~~~~~~~' + currentGroup + '~~~~~~~~~~');

  let logScreenLabel = isLoggedIn ? 'Log Out' : 'Log In';
  let landing = isLoggedIn ? 'My Schedule' : 'Login';
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
                    headerStyle: {
                      backgroundColor: Colors.DD_RED_2,
                    },
                    headerTitleStyle: {
                      color: Colors.DD_CREAM,
                      fontSize: 25,
                      fontWeight: '500',
                      marginBottom: 10,
                    },
                    headerBackVisible: false,
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
        </CurrentGroupObjectContext.Provider>
      </FriendsContext.Provider>
    </LogStateContext.Provider>
  );
}
