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
import {Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import Colors from '../../assets/styles/colors';
import {calendarTheme} from '../../assets/styles/calendarTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from 'react-native-paper';
import {getAllKeys} from '../LoginScreen';
import CalendarEventsContext from '../../contexts/CalendarEvents';
import {calendarGetEvents} from './CalendarAPIHandling';
import {classScheduleList} from '../../assets/data/HardCodedEvents';

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

function formatSingleDigitMonth(number) {
  const n = number + 1; //to account for 0 based
  if (n < 10) {
    return `0${n}`;
  } else {
    return n;
  }
}

function formatSingleDigit(number) {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
}

function constructDateString(givenDate) {
  // month.dateString = '2022-09-03' format
  // getMonth is 0 based!!!!!!!!!!!!!!!!!!!!!
  // get Day is getting day of the week, 0 based.
  // getDate will give the actual day of the month
  const date = new Date(givenDate);
  // console.log('date.month:' + date.getMonth());
  let m = formatSingleDigitMonth(date.getMonth());
  // console.log('actual month: ' + m);
  let d = formatSingleDigit(date.getDate());
  // console.log('day=' + d);
  let ds = `${date.getFullYear()}-${m}-${d}`;
  return ds;
}

/**
 * Returns the month number of the givenDate by rectifying getMonth being 0 based
 * NOT calling formatSingleDigitMonth
 * @param {givenDate} givenDate
 * @returns non-zero based month number
 */
function constructMonth(givenDate) {
  const date = new Date(givenDate);
  // let m = formatSingleDigitMonth(date.getMonth());
  let m = date.getMonth() + 1;
  return m;
}

function constructDay(givenDate) {
  // getDate will give the actual day of the month
  const date = new Date(givenDate);
  // let d = formatSingleDigit(date.getDate());
  return date.getDate();
}

// !!!!!! Eventually, we just make API calls (add,get,delete)

//TODO: method for making API call and adding to EventsContext

// TODO: Turn into just a populate items from hardcoded list method
// TODO: call conditionally (use a bool, if alreadyExmained, don't call)
// const createItemList = async (items, events) => {
const createItemList = (items, events) => {
  // let items = {};
  console.log(JSON.stringify(events, undefined, 2));
  if (items.length === undefined) {
    for (let i of events.events) {
      // console.log('i.start=' + i.start);
      let iMonth = constructMonth(i.start);
      let iDay = constructDay(i.start);
      let iDateString = constructDateString(i.start);
      // console.log('ds=' + ds);
      // if (month.month === iMonth) {
      console.log('iMonth= ' + iMonth + ' iDay= ' + iDay);
      if (!items[iDateString]) {
        items[iDateString] = [];
      }
      // console.log('month.day =' + month.day + '');
      if (!items[iDateString].includes(i)) {
        console.log('push: ' + i.title + ' ' + i.start);
        items[iDateString].push(i);
      }
    }
  }
  return items;
};

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

// function CalendarScreen(props) {
const CalendarScreen = ({navigation, calendarName}) => {
  const nowDate = new Date().toUTCString();
  const [selectedDay, setSelectedDay] = useState(nowDate);
  const [items, setItems] = useState({});
  const events = useContext(CalendarEventsContext);

  // const loadItems = async month => {
  const loadItems = month => {
    // console.log(events.length);
    // if (events.length === undefined) {
    //   console.log('---------- empty events (set to classScheduleList)');
    //   await setEvents(classScheduleList);
    // }
    // console.log('loadItems: month=' + JSON.stringify(month));
    // console.log('Events before createItemList:');
    // console.log(JSON.stringify(events, undefined, 2));
    // const itemList = await createItemList(month, events);
    // const itemList = await createItemList(items, events);
    const itemList = createItemList(items, events);
    console.log('After create itemList');
    console.log(JSON.stringify(itemList, undefined, 2));
    setItems(itemList);
    console.log('items are set');
  };

  const renderItem = item => {
    console.log(items.length);
    const itemColor = item.color;
    const time = formatEventTime(item.start, item.end);
    console.log('rendering ' + item.id);
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

  // console.log('top of useeffect, calendarName=' + calendarName);
  useEffect(() => {
    // Only want to make API call when there's been a change to events context!
    // const result = calendarGetEvents(events);
    // setEvents(result);
    console.log('****(calendarscreen)**** when does useEffect[] print');
    setItems({});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CalendarTitle name={calendarName} navigation={navigation} />
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
        showOnlySelectedDayItems={true}
        reservationsKeyExtractor={(item, index) => {
          return `${item.id}${index}`;
        }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DD_RED_2,
    justifyContent: 'space-evenly',
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
