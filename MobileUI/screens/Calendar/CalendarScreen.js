import React, {useState} from 'react';
import {
  Button,
  Image,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import Colors from '../../assets/styles/colors';
import {calendarTheme} from '../../assets/styles/calendarTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DD_RED_2,
    justifyContent: 'space-evenly',
  },
  outputContainer: {
    color: Colors.DD_RED_2,
    left: 50,
    maxWidth: 300,
    padding: 15,
    borderWidth: 15,
    borderColor: Colors.DD_RED_2,
    backgroundColor: Colors.DD_CREAM,
    fontWeight: 'bold',
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

const CalendarTitle = props => {
  return (
    <View style={styles.calendarTitle}>
      <Text style={styles.calendarTitleText}>{props.groupName} Schedule</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => props.navigation.navigate('MyModal')}>
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

//This is what is stored in the database. Might not necessarily be the result from get
const eventObject = {
  eventID: '', //int
  startTime: '', //DateTime
  endTime: '', //DateTime
  title: '',
  location: '',
  privacy: '',
  users: [], // list of users
  group: {}, //groupmodel object
};

// Or the EventModels/Mine get events action might return this object:
// id = e.EventID,
// title = e.Title,
// start = e.StartTime.ToString("O"),
// end = e.EndTime.ToString("O"),
// location = e.Location,
// color = e.Calendar.Color,
// background = e.Calendar.Color,
// backgroundColor = e.Calendar.Color,
const uncertainVolleyballM = {
  title: 'Volleyball',
  start: 'Mon, 03 Oct 2022 8:35:00 MDT',
  end: 'Mon, 03 Oct 2022 9:25:00 MDT',
  location: 'HPR E 101',
  color: '#8A56E6', //A nice purple
  // The bckgd and bckgdC are unnecessary imo . . . TODO: ask about that
};

const uncertainVolleyballW = {
  title: 'Volleyball',
  start: 'Wed, 05 Oct 2022 8:35:00 MDT',
  end: 'Wed, 05 Oct 2022 9:25:00 MDT',
  location: 'HPR E 101',
  color: '#8A56E6', //A nice purple
  // The bckgd and bckgdC are unnecessary imo . . . TODO: ask about that
};

const uncertainCapstoneM = {
  title: 'Capstone Project',
  start: 'Mon, 03 Oct 2022 10:45:00 MDT',
  end: 'Mon, 03 Oct 2022 11:35:00 MDT',
  location: 'Discord',
  color: '#F02F17', //A nice, bright, red
  // The bckgd and bckgdC are unnecessary imo . . . TODO: ask about that
};

const uncertainCapstoneW = {
  title: 'Capstone Project',
  start: 'Wed, 05 Oct 2022 10:45:00 MDT',
  end: 'Wed, 05 Oct 2022 11:35:00 MDT',
  location: 'Discord',
  color: '#F02F17', //A nice, bright, red
  // The bckgd and bckgdC are unnecessary imo . . . TODO: ask about that
};

const uncertainNLPM = {
  title: 'Natural Language Processing',
  start: 'Mon, 03 Oct 2022 13:25:00 MDT',
  end: 'Mon, 03 Oct 2022 14:45:00 MDT',
  location: 'CTIHB 109',
  color: '#F07F26', //A nice, bright, orange
  // The bckgd and bckgdC are unnecessary imo . . . TODO: ask about that
};

const uncertainNLPW = {
  title: 'Natural Language Processing',
  start: 'Wed, 05 Oct 2022 13:25:00 MDT',
  end: 'Wed, 05 Oct 2022 14:45:00 MDT',
  location: 'CTIHB 109',
  color: '#F07F26', //A nice, bright, orange
  // The bckgd and bckgdC are unnecessary imo . . . TODO: ask about that
};

const uncertainAIT = {
  title: 'Artificial Intelligence',
  start: 'Tue, 04 Oct 2022 12:25:00 MDT',
  end: 'Tue, 04 Oct 2022 13:45:00 MDT',
  location: 'WEB L103',
  color: '#1D4BD6', //A nice blue
  // The bckgd and bckgdC are unnecessary imo . . . TODO: ask about that
};

const uncertainAITH = {
  title: 'Artificial Intelligence',
  start: 'Thu, 06 Oct 2022 12:25:00 MDT',
  end: 'Thu, 06 Oct 2022 13:45:00 MDT',
  location: 'WEB L103',
  color: '#1D4BD6', //A nice blue
  // The bckgd and bckgdC are unnecessary imo . . . TODO: ask about that
};

const uncertainBiologyT = {
  title: 'Biology',
  start: 'Tue, 04 Oct 2022 14:00:00 MDT',
  end: 'Tue, 04 Oct 2022 15:20:00 MDT',
  location: 'GC 1900',
  color: '#0D852F', //A dark green
  // The bckgd and bckgdC are unnecessary imo . . . TODO: ask about that
};

const uncertainBiologyTH = {
  title: 'Biology',
  start: 'Thu, 06 Oct 2022 14:00:00 MDT',
  end: 'Thu, 06 Oct 2022 15:20:00 MDT',
  location: 'GC 1900',
  color: '#0D852F', //A dark green
  // The bckgd and bckgdC are unnecessary imo . . . TODO: ask about that
};

const hardCodeUncertainItems = {
  '2022-10-02': [],
  '2022-10-03': [uncertainVolleyballM, uncertainCapstoneM, uncertainNLPM],
  '2022-10-04': [uncertainAIT, uncertainBiologyT],
  '2022-10-05': [uncertainVolleyballW, uncertainCapstoneW, uncertainNLPW],
  '2022-10-06': [uncertainAITH, uncertainBiologyTH],
  '2022-10-07': [],
  '2022-10-08': [],
};

const originalDummyItems = {
  '2022-10-01': [],
  '2022-10-02': [],
  '2022-10-03': [{name: 'item -1 - any js object'}, {name: 'item 0!'}],
  '2022-10-04': [{name: 'item 1 - any js object'}, {name: 'item 2!'}],
  '2022-10-05': [{name: 'item 3 - any js object'}, {name: 'item 4!'}],
  '2022-10-06': [{name: 'item 5 - any js object'}, {name: 'item 6!'}],
  '2022-10-07': [{name: 'item7 - any js object'}, {name: 'item 8!'}],
  '2022-10-08': [],
};

function formatEventTime(s, e) {
  let finalTimeString = '';
  let date = new Date(s);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  finalTimeString = `${hours}:${minutes}`;

  date = new Date(e);
  hours = date.getHours();
  minutes = date.getMinutes();
  finalTimeString += ` - ${hours}:${minutes}`;

  return finalTimeString;
}

// function CalendarScreen(props) {
const CalendarScreen = ({navigation, groupName}) => {
  const nowDate = new Date().toUTCString();
  const [selectedDay, setSelectedDay] = useState(nowDate);
  const [items, setItems] = useState({});

  const loadItems = day => {
    // setItems(originalDummyItems);
    setItems(hardCodeUncertainItems);
  };

  const renderItem = item => {
    const itemColor = item.color;
    const time = formatEventTime(item.start, item.end);
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => console.log(JSON.stringify(item))}>
        <Card style={{...styles.cardStyle, borderColor: itemColor}}>
          <Card.Content>
            <View>
              <Text style={styles.itemText}>
                {`${time}\n${item.title}\n${item.location}`}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CalendarTitle groupName={groupName} navigation={navigation} />
      <Agenda
        // The list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key has to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={items}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={loadItems}
        // Callback that fires when the calendar is opened or closed
        onCalendarToggled={calendarOpened => {
          console.log(calendarOpened);
        }}
        // Callback that gets called on day press
        onDayPress={day => {
          // console.log('day pressed=' + JSON.stringify(day));
          setSelectedDay(day.dateString);
        }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={day => {
          console.log('day changed');
        }}
        // Initially selected day
        selected={selectedDay}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Specify how each item should be rendered in agenda
        renderItem={renderItem}
        // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        // renderDay={(day, item) => {
        //   return <View />;
        // }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return <View />;
        }}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return <View />;
        }}
        // Specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
        showClosingKnob={true}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        refreshControl={null}
        // Agenda theme
        theme={calendarTheme.agenda}
        // Agenda container style
        style={{}}
      />
    </SafeAreaView>
  );
};

// CalendarScreen.defaultProps = {
//   groupName: 'My',
//   navigation,
// };

LocaleConfig.locales['fr'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'fr';

export default CalendarScreen;

//Keep for posterity just in case we need another button to interact with navigator
// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

//Sources for trying to get drawer navigator to work
//https://www.youtube.com/watch?v=EaNCi8o8H0A&ab_channel=TheNetNinja
//https://github.com/iamshaunjp/react-native-tutorial/tree/lesson-24
//https://reactnavigation.org/docs/drawer-navigator

//https://www.npmjs.com/package/react-native-calendars this is the calendar ap

//https://www.codegrepper.com/code-examples/javascript/react-native-calendar+selected+date
//https://blog.expo.dev/5-easy-to-use-react-native-calendar-libraries-e830a97d5bf7
//https://stackoverflow.com/questions/59598513/highlight-pressedselected-date-in-react-native-calendars
