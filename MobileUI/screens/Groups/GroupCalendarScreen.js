import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Colors from '../../assets/styles/colors';
import {Card} from 'react-native-paper';
import CalendarStrip from 'react-native-calendar-strip';
import {formatEventTime} from '../../miscHelpers/DateParsing';
import CurrentGroupObjectContext from '../../contexts/CurrentGroupObjectContext';
import {BoxButton, MiniBoxButton} from '../../assets/components/CustomButtons';
import {
  calendarDeleteEvent,
  calendarGetCalendarEvents,
} from '../../API/CalendarAPIHandling';

const CalendarTitle = props => {
  return (
    <View style={styles.calendarTitle}>
      <View style={styles.backButtonWrapper}>
        <MiniBoxButton
          title={'< Back'}
          onPress={() => props.navigation.navigate('Group')}
        />
      </View>
      <Text style={styles.calendarTitleText}>{props.name} Schedule</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          props.navigation.navigate('AddEventModal', {
            calendarID: props.calendarID,
          })
        }>
        <Text style={styles.floatingButtonStyle}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const Empty = ({item}) => {
  return <Text style={styles.emptyText}>No events on this day</Text>;
};

const Item = ({i, itemColor, time}) => {
  async function deleteItemInEvents() {
    if (await calendarDeleteEvent(i)) {
      console.log('(groupCalendarScreen.deleteItemInEvents) delete succeeded');
      const selected = this.calendarStrip.current.getSelectedDate();
      this.calendarStrip.current.setSelectedDate(selected);
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
              {`Group: ${i.groupName}\n${time}\n${i.title}\n${i.location}`}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

// https://openbase.com/js/react-native-calendar-strip
// There's stuff in there that talks about localization for datetimes!
const GroupCalendarScreen = ({navigation}) => {
  this.calendarStrip = React.createRef();

  const nowDate = new Date();
  const [selectedDay, setSelectedDay] = useState(nowDate.toUTCString()); //why utc? i don't like it. confused
  const [items, setItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {currentGroup, setcurrentGroup} = useContext(CurrentGroupObjectContext);

  const [events, setEvents] = useState([]);
  useEffect(() => {
    console.log('~~~~~~~~~~~~~~~GroupCalendarScreen.useEffect call getEvents');
    let mounted = true;
    let list = [currentGroup.calendarID];
    calendarGetCalendarEvents(list).then(data => {
      if (mounted) {
        console.log('GroupCalendarScreen mounted! setEvents');
        setEvents(data);
      }
    });
    return () => {
      console.log('GroupCalendarScreen mounted = false');
      mounted = false;
    };
  }, [currentGroup.calendarID]);

  const onRefresh = async () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    console.log('REFRESHING FLAT LIST!!!!!!');
    let list = [currentGroup.calendarID];
    await calendarGetCalendarEvents(list).then(data => {
      console.log('setEvents to data');
      //setEvents to new data
      setEvents(data);
    });

    //Try updating calendar strip
    console.log('On refresh, getSelectedDate()');
    const selected = this.calendarStrip.current.getSelectedDate();
    // this.calendarStrip.current.updateWeekView('2022-11-07T19:00:00.000Z');
    // this.calendarStrip.current.updateWeekView(selected);
    this.calendarStrip.current.setSelectedDate(selected);
    // and set isRefreshing to false
    setIsRefreshing(false);
  };

  const renderItem = ({item}) => {
    const itemColor = item.color;
    const time = formatEventTime(item.start, item.end);
    return <Item i={item} itemColor={itemColor} time={time} />;
  };

  const handleDateSelected = date => {
    setSelectedDay(date);
    //date is a moment object
    // Set items to the array in Flatlist corresponding to date
    const dateKey = date.format('YYYY-MM-DD');
    const dayEvents = events[dateKey];
    if (dayEvents !== undefined) {
      setItems(dayEvents);
    } else {
      setItems([]);
    }
  };

  const customDatesStylesFunc = date => {
    if (date.format('ddd MMM DD YYYY') === nowDate.toDateString()) {
      return {
        dateNameStyle: {
          backgroundColor: Colors.DD_RED_2,
          color: Colors.DD_CREAM,
          paddingHorizontal: 3,
        },
      };
    }
  };

  const markedDatesFunc = date => {
    if (events[date.format('YYYY-MM-DD')]) {
      return {dots: [{color: Colors.DD_RED_1}]};
    }
    return {};
  };

  return (
    <SafeAreaView style={styles.container}>
      <CalendarTitle
        name={currentGroup.groupName}
        navigation={navigation}
        calendarID={currentGroup.calendarID}
      />
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
        highlightDateNumberStyle={{
          color: Colors.DD_RED_3,
          fontSize: 15,
        }}
        highlightDateNameStyle={{
          backgroundColor: Colors.DD_RED_3,
          color: Colors.DD_CREAM,
          fontSize: 15,
          paddingHorizontal: 3,
        }}
        iconContainer={{flex: 0.1}}
        ref={this.calendarStrip}
      />
      <View
        style={{backgroundColor: Colors.DD_EXTRA_LIGHT_GRAY, height: '65%'}}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onRefresh={onRefresh}
          ListEmptyComponent={Empty}
          refreshing={isRefreshing}
        />
      </View>
      <View style={styles.groupScheduleButtons}>
        <BoxButton
          title={'Info'}
          onPress={() => navigation.navigate('InfoModal')}
        />
        <BoxButton
          title={`Let's Meet!`}
          onPress={() =>
            navigation.navigate('MeetModal', {
              groupID: currentGroup.groupID,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DD_RED_2,
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
  emptyText: {
    color: Colors.DD_MEDIUM_GRAY,
    fontSize: 20,
    padding: 10,
    fontStyle: 'italic',
    alignSelf: 'center',
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
    marginLeft: 10,
    marginRight: 20,
  },
  backButtonWrapper: {
    marginLeft: 20,
    marginRight: 10,
  },
  calendarTitleText: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 25,
    fontWeight: '500',
    color: Colors.DD_CREAM,
    marginTop: 10,
    marginBottom: 10,
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

export default GroupCalendarScreen;

//Sources for trying to get drawer navigator to work
//https://www.youtube.com/watch?v=EaNCi8o8H0A&ab_channel=TheNetNinja
//https://github.com/iamshaunjp/react-native-tutorial/tree/lesson-24
//https://reactnavigation.org/docs/drawer-navigator

//https://www.npmjs.com/package/react-native-calendars this is the calendar ap

//https://www.codegrepper.com/code-examples/javascript/react-native-calendar+selected+date
//https://blog.expo.dev/5-easy-to-use-react-native-calendar-libraries-e830a97d5bf7
//https://stackoverflow.com/questions/59598513/highlight-pressedselected-date-in-react-native-calendars
