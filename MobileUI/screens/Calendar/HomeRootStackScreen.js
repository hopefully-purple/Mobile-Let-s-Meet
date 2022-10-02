import React, {useState} from 'react';
import Colors from '../../assets/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from 'react-native-paper';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CalendarScreen from './CalendarScreen';

function HomeScreen({navigation}) {
  return <CalendarScreen groupName="My" navigation={navigation} />;
}

function GroupScreen({navigation}) {
  return <CalendarScreen groupName="Group" navigation={navigation} />;
}

function ModalScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
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
      <RootStack.Group screenOptions={{presentation: 'modal'}}>
        <RootStack.Screen name="MyModal" component={ModalScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

// HomeRootStackScreen.defaultProps = {
//   groupName: 'My',
// };
