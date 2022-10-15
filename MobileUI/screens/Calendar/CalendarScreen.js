import React, {useState, useContext, useEffect} from 'react';
import {
  Button,
  Image,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../assets/styles/colors';
import {calendarTheme} from '../../assets/styles/calendarTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from 'react-native-paper';
import {getAllKeys} from '../LoginScreen';
import CalendarEventsContext from '../../contexts/CalendarEvents';
import {calendarGetEvents} from './CalendarAPIHandling';
import {classScheduleList} from '../../assets/data/HardCodedEvents';
import CalendarStrip from 'react-native-calendar-strip';

const CalendarTitle = props => {
  return (
    <View style={styles.calendarTitle}>
      <Text style={styles.calendarTitleText}>{props.name} Schedule</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => props.navigation.navigate('AddEventModal')}>
        {/* <Image
          //We are making FAB using TouchableOpacity with an image
          //We are using online image here
          source={{
            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
          }}
          //You can use you project image Example below
          //source={require('./images/float-add-icon.png')}
          style={styles.floatingButtonStyle}
        /> */}
        <Text style={styles.floatingButtonStyle}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// https://openbase.com/js/react-native-calendar-strip
// There's stuff in there that talks about localization for datetimes!
const CalendarScreen = ({navigation, calendarName}) => {
  const nowDate = new Date().toUTCString();
  const [selectedDay, setSelectedDay] = useState(nowDate);
  const [items, setItems] = useState({});
  const events = useContext(CalendarEventsContext);

  return (
    <SafeAreaView style={styles.container}>
      <CalendarTitle name={calendarName} navigation={navigation} />
      <CalendarStrip
        onDateSelected={date => {
          console.log('date changed=' + date);
        }}
        scrollable
        style={{height: 100, paddingTop: 10, paddingBottom: 10}}
        calendarColor={Colors.DD_CREAM}
        calendarHeaderStyle={{color: Colors.DD_RED_2, fontSize: 21}}
        dateNameStyle={{color: Colors.DD_RED_2, fontSize: 15}}
        dateNumberStyle={{color: Colors.DD_LIGHT_GRAY, fontSize: 15}}
        highlightDateNumberStyle={{color: Colors.DD_RED_3, fontSize: 15}}
        highlightDateNameStyle={{color: Colors.DD_RED_3, fontSize: 15}}
        iconContainer={{flex: 0.1}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DD_RED_2,
    // justifyContent: 'space-evenly',
  },
  itemText: {
    color: Colors.DD_DARK_GRAY,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  cardStyle: {
    backgroundColor: Colors.DD_CREAM_LIGHT,
    borderColor: Colors.DD_LIGHT_GRAY,
    borderWidth: 5,
  },
  floatingButtonStyle: {
    fontSize: 25,
    fontWeight: '500',
    color: Colors.DD_CREAM,
    borderColor: Colors.DD_CREAM,
  },
  calendarTitleText: {
    fontSize: 25,
    fontWeight: '500',
    color: Colors.DD_CREAM,
    marginTop: 10,
    marginBottom: 10,
    // paddingHorizontal: 90,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  calendarTitle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});

export default CalendarScreen;

//Sources for trying to get drawer navigator to work
//https://www.youtube.com/watch?v=EaNCi8o8H0A&ab_channel=TheNetNinja
//https://github.com/iamshaunjp/react-native-tutorial/tree/lesson-24
//https://reactnavigation.org/docs/drawer-navigator

//https://www.npmjs.com/package/react-native-calendars this is the calendar ap

//https://www.codegrepper.com/code-examples/javascript/react-native-calendar+selected+date
//https://blog.expo.dev/5-easy-to-use-react-native-calendar-libraries-e830a97d5bf7
//https://stackoverflow.com/questions/59598513/highlight-pressedselected-date-in-react-native-calendars
