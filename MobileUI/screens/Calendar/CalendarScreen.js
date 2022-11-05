import React, {useState, useContext, useEffect, cloneElement} from 'react';
import {
  Button,
  Image,
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Colors from '../../assets/styles/colors';
import {calendarTheme} from '../../assets/styles/calendarTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from 'react-native-paper';
import {getAllKeys} from '../LoginScreen';
import CalendarEventsContext from '../../contexts/CalendarEvents';
import {readEventData, deleteEvent} from '../../API/APIControllers';
import {classScheduleList} from '../../assets/data/HardCodedEvents';
import CalendarStrip from 'react-native-calendar-strip';
import {
  constructDateString,
  formatEventTime,
} from '../../miscHelpers/DateParsing';
import CurrentCalendarNameContext from '../../contexts/CurrentCalendarName';
import {BoxButton} from '../../assets/components/CustomButtons';
import GroupsContext from '../../contexts/Groups';
import UserContext from '../../contexts/User';

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

function organizeIntoDates(events) {
  let newFL = {};
  // console.log(JSON.stringify(events, undefined, 2));
  console.log('(calendarScreen.organizeIntoDates) events=' + events.length);
  if (events.length === 0) {
    console.log('events currently empty, return {}');
    return newFL;
  }

  for (let i of events) {
    // console.log('i.start=' + i.start);
    // let iMonth = constructMonth(i.start);
    // let iDay = constructDay(i.start);
    let iDateString = constructDateString(i.start);
    // console.log('iDateString=' + iDateString);
    // if (month.month === iMonth) {
    // console.log('iMonth= ' + iMonth + ' iDay= ' + iDay);
    if (!newFL[iDateString]) {
      // console.log('add iDateString to array');
      newFL[iDateString] = [];
      // console.log('newFL size=' + newFL.length);
    }
    // console.log('month.day =' + month.day + '');
    if (!newFL[iDateString].includes(i)) {
      // console.log('push: ' + i.title + ' ' + i.start);
      var localStartDate = new Date(i.start); //.toLocaleTimeString('en-US', {
      //   timeZone: 'UTC',
      //   hour12: true,
      //   hour: 'numeric',
      //   minute: 'numeric',
      // });
      var localEndDate = new Date(i.end);
      console.log('##################' + localStartDate + '  ' + localEndDate);
      const convertedI = {
        ...i,
        start: localStartDate,
        end: localEndDate,
      };
      newFL[iDateString].push(convertedI);
    }
  }

  // console.log('newFL:');
  // console.log(JSON.stringify(newFL, undefined, 2));

  return newFL;
}

const Item = ({i, itemColor, time}) => {
  const {events, setEvents} = useContext(CalendarEventsContext);
  const user = useContext(UserContext);

  async function deleteItemInEvents() {
    console.log('(calendarScreen.deleteItem) user = ' + user.name);
    if (await deleteEvent(i, events, setEvents, user.name)) {
      console.log('(calendarScreen.deleteItemInEvents) delete succeeded');
    } else {
      Alert.alert('Delete did not succeed');
    }
  }

  const changeItemAlert = () => {
    Alert.alert(i.title, i.location, [
      {
        text: 'Delete',
        onPress: () => deleteItemInEvents(),
      },
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
    ]);
  };
  return (
    <TouchableOpacity style={styles.item} onLongPress={() => changeItemAlert()}>
      <Card style={{...styles.cardStyle, borderColor: itemColor}}>
        <Card.Content>
          <View>
            <Text style={styles.itemText}>
              {`${time}\n${i.title}\n${i.location}`}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

// https://openbase.com/js/react-native-calendar-strip
// There's stuff in there that talks about localization for datetimes!
const CalendarScreen = ({navigation}) => {
  const nowDate = new Date();
  const [selectedDay, setSelectedDay] = useState(nowDate.toUTCString()); //why utc? i don't like it. confused
  const [items, setItems] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {events, setEvents} = useContext(CalendarEventsContext);
  const user = useContext(UserContext);

  this.calendarStrip = React.createRef();

  const renderItem = ({item}) => {
    // console.log(items.length);
    const itemColor = item.color;
    const time = formatEventTime(item.start, item.end);
    // console.log('rendering ' + item.id);
    return <Item i={item} itemColor={itemColor} time={time} />;
  };

  const handleDateSelected = date => {
    setSelectedDay(date);
    //date is a moment object
    // Set items to the array in Flatlist corresponding to date
    const dateKey = date.format('YYYY-MM-DD');
    // console.log(flatList[dateKey]);
    const dayEvents = flatList[dateKey];
    if (dayEvents !== undefined) {
      setItems(dayEvents);
    } else {
      setItems({});
    }
    // console.log(dateKey);
  };

  const customDatesStylesFunc = date => {
    if (date.format('ddd MMM DD YYYY') === nowDate.toDateString()) {
      return {
        dateNameStyle: {
          backgroundColor: Colors.DD_RED_2,
          color: Colors.DD_CREAM,
        },
        // dateNumberStyle: {color: 'purple'},
        // dateContainerStyle: {backgroundColor: Colors.DD_RED_3_LIGHT},
      };
    }
  };

  const markedDatesFunc = date => {
    if (flatList[date.format('YYYY-MM-DD')]) {
      return {dots: [{color: Colors.DD_RED_1}]};
    }
    return {};
  };

  const [flatList, setFlatList] = useState([]);
  useEffect(
    function createFlatList() {
      const newFlatL = organizeIntoDates(events);
      setFlatList(newFlatL);
    },
    [events],
  );

  const onRefresh = async () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    console.log('REFRESHING FLAT LIST!!!!!!');
    const data = await readEventData('My', user.name); // API call
    // console.log('(CalendarScreen.onRefresh) new event data:');
    // console.log(JSON.stringify(data, undefined, 2));
    setEvents(data);
    // and set isRefreshing to false
    setIsRefreshing(false);
  };

  // useEffect(() => {
  //   if (selectedDay !== undefined) {
  //     this.calendarStrip.current.updateWeekView(selectedDay);
  //   }
  // }, [selectedDay]);
  return (
    <SafeAreaView style={styles.container}>
      <CalendarTitle name={'My'} navigation={navigation} />
      <CalendarStrip
        selectedDate={selectedDay}
        onDateSelected={handleDateSelected}
        // Marked dates callback
        markedDates={markedDatesFunc}
        scrollable
        style={{height: 100, paddingTop: 10, paddingBottom: 10}}
        calendarColor={Colors.DD_CREAM}
        calendarHeaderStyle={{color: Colors.DD_RED_2, fontSize: 21}}
        customDatesStyles={customDatesStylesFunc}
        dateNameStyle={{color: Colors.DD_RED_2, fontSize: 15}}
        dateNumberStyle={{color: Colors.DD_LIGHT_GRAY, fontSize: 15}}
        markedDatesStyle={{height: 5, width: 5}}
        highlightDateNumberStyle={{color: Colors.DD_RED_3, fontSize: 15}}
        highlightDateNameStyle={{color: Colors.DD_RED_3, fontSize: 15}}
        iconContainer={{flex: 0.1}}
        ref={this.calendarStrip}
      />
      <View
        style={{backgroundColor: Colors.DD_EXTRA_LIGHT_GRAY, height: '70%'}}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
        />
      </View>
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
  groupScheduleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 15,
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
