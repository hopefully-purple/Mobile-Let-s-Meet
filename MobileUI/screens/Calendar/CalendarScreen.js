import React, {useState, useEffect} from 'react';
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
import {BoxButton} from '../../assets/components/CustomButtons';
import {
  calendarGetEvents,
  calendarGetCalendars,
  calendarGetCalendarEvents,
  calendarDeleteEvent,
} from '../../API/CalendarAPIHandling';
import DropDownPicker from 'react-native-dropdown-picker';

const CalendarTitle = props => {
  return (
    <View style={styles.calendarTitle}>
      <Text style={styles.calendarTitleText}>{props.name} Schedule</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          props.navigation.navigate('AddEventModal', {
            calendarID: null,
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

const Item = props => {
  const {i, itemColor, time} = props;
  // const {events, setEvents} = useContext(CalendarEventsContext);
  // const user = useContext(UserContext);

  async function deleteItemInEvents() {
    // console.log('(calendarScreen.deleteItem) user = ' + user.name);
    if (await calendarDeleteEvent(i)) {
      console.log('(calendarScreen.deleteItemInEvents) delete succeeded');
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
  this.calendarStrip = React.createRef();

  const nowDate = new Date();
  const [selectedDay, setSelectedDay] = useState(nowDate.toUTCString()); //why utc? i don't like it. confused
  const [items, setItems] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCals, setSelectedCals] = useState([]);
  const [areAllCalsSelected, setAreAllCalsSelected] = useState(false);
  // const [colors, setColors] = useState([]);
  // const {events, setEvents} = useContext(CalendarEventsContext);
  // const user = useContext(UserContext);

  const [events, setEvents] = useState([]);
  useEffect(() => {
    console.log('~~~~~~~~~~~~~~~CalendarScreen.useEffect call getEvents');
    let mounted = true;
    calendarGetEvents().then(data => {
      if (mounted) {
        console.log('CalendarScreen mounted! setEvents');
        setEvents(data);
      }
    });
    return () => {
      console.log('CalendarScreen mounted = false');
      mounted = false;
    };
  }, []);

  const [calendars, setCalendars] = useState([]);
  useEffect(() => {
    console.log('~~~~~~~~~~~~~FilterCalendarModal.useEffect call getCalendars');
    let mounted = true;
    calendarGetCalendars().then(data => {
      if (mounted) {
        console.log('FilterCalendarModal mounted! setCalendars');
        // data.push({calendarID: -1, name: 'Select All'});
        // data.push({calendarID: -2, name: '+ New Calendar'});
        setCalendars(data);
      }
    });
    return () => {
      console.log('FilterCalendarModal mounted = false');
      mounted = false;
    };
  }, []);

  const onRefresh = async flag => {
    //set isRefreshing to true
    setIsRefreshing(true);
    console.log('REFRESHING FLAT LIST!!!!!!');
    if (flag === 'all') {
      setAreAllCalsSelected(false);
      setSelectedCals([]);
      await calendarGetEvents().then(data => {
        console.log('setEvents to data');
        //setEvents to new data
        setEvents(data);
      });
      await calendarGetCalendars().then(data => {
        console.log('setCalendars to data');
        setCalendars(data);
      });
    } else if (flag === 'filtered') {
      await calendarGetCalendarEvents(selectedCals).then(data => {
        console.log('!!!!!handleFilterPress!!!!! setEvents to new event data');
        setEvents(data);
      });
    }
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
    // console.log(items.length);
    // console.log('RENDERITEM::: item below');
    // console.log(item);
    const itemColor = item.color;
    const time = formatEventTime(item.start, item.end);
    // console.log('rendering ' + item.id);
    return <Item i={item} itemColor={itemColor} time={time} />;
  };

  const handleDateSelected = date => {
    setSelectedDay(date);
    // Set items to the array in Flatlist corresponding to date
    console.log('handleDateSelected: ' + date);
    // createItemsList(date, flatList);
    //date is a moment object
    const dateKey = date.format('YYYY-MM-DD');
    // console.log(flatList[dateKey]);
    const dayEvents = events[dateKey];
    if (dayEvents !== undefined) {
      setItems(dayEvents);
    } else {
      console.log(
        'createItemsList: events[' + dateKey + '] undefined, setItems([])',
      );
      setItems([]);
    }
  };

  // const createItemsList = ({date, list}) => {};

  const customDatesStylesFunc = date => {
    if (date.format('ddd MMM DD YYYY') === nowDate.toDateString()) {
      return {
        dateNameStyle: {
          backgroundColor: Colors.DD_RED_2,
          color: Colors.DD_CREAM,
          paddingHorizontal: 3,
        },
        // dateNumberStyle: {color: 'purple'},
        // dateContainerStyle: {backgroundColor: Colors.DD_RED_3_LIGHT},
      };
    }
  };

  const markedDatesFunc = date => {
    if (events[date.format('YYYY-MM-DD')]) {
      return {dots: [{color: Colors.DD_RED_1}]};
    }
    return {};
  };

  async function handleFilterPress() {
    console.log('HANDLE FILTER PRESS > ' + selectedCals);
    // await calendarGetCalendarEvents(selectedCals).then(data => {
    //   console.log('!!!!!handleFilterPress!!!!! setEvents to new event data');
    //   setEvents(data);
    // });
    onRefresh('filtered');
    console.log('!!!!! done handleFilterPress');
  }

  function handleSelectAll() {
    console.log('Select all press');
    // console.log(JSON.stringify(selectedCals, undefined, 2));
    if (areAllCalsSelected) {
      setSelectedCals([]);
      setAreAllCalsSelected(false);
    } else {
      let c = [];
      calendars.map(i => c.push(i.calendarID));
      console.log(JSON.stringify(c, undefined, 2));
      setSelectedCals(c);
      setAreAllCalsSelected(true);
    }
  }

  const selectAll = 'Select All';
  const deselectAll = 'Deselect All';
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
        highlightDateNumberStyle={{
          // backgroundColor: Colors.DD_RED_3,
          // color: Colors.DD_CREAM,
          color: Colors.DD_RED_3,
          fontSize: 15,
          // paddingHorizontal: 7,
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
          onRefresh={() => onRefresh('all')}
          ListEmptyComponent={Empty}
          refreshing={isRefreshing}
        />
      </View>
      <View style={styles.calendarFeaturesStyling}>
        <DropDownPicker
          placeholder="Select a calendar"
          schema={{
            label: 'name',
            value: 'calendarID',
            color: 'color',
          }}
          mode="BADGE"
          // extendableBadgeContainer={true}
          // badgeDotColors={colors}
          showBadgeDot={false}
          // renderBadgeItem={(item, props) => <Badge item={item} props={...props} />}
          multiple={true}
          items={calendars}
          value={selectedCals}
          open={open}
          min={0}
          setOpen={setOpen}
          setValue={setSelectedCals}
          onSelectItem={item => {
            console.log(JSON.stringify(item, undefined, 2));
            // if (item.name === 'Select All') {
            // }
            // // setColors([...colors, item.color]);
            // item.map(i => {
            //   !colors.includes(i.color)
            //     ? colors.push(i)
            //     : console.log('remove ' + i);
            // });
            // console.log('colors: ' + JSON.stringify(colors, undefined, 2));
          }}
          // setItems={setItems}
          dropDownDirection="TOP"
          listMode="SCROLLVIEW"
          style={{
            backgroundColor: Colors.DD_CREAM,
          }}
          containerStyle={{
            width: '70%',
            margin: 5,
          }}
          dropDownContainerStyle={{
            backgroundColor: Colors.DD_CREAM,
          }}
        />
        <BoxButton title={'Filter'} onPress={handleFilterPress} />
      </View>
      <View style={styles.calendarButtons}>
        <TouchableOpacity onPress={handleSelectAll}>
          <Text style={styles.calendarTextButton}>
            {areAllCalsSelected ? deselectAll : selectAll}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NewCalModal')}>
          <Text style={styles.calendarTextButton}>+ New Calendar</Text>
        </TouchableOpacity>
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
  calendarFeaturesStyling: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    marginTop: 15,
    marginHorizontal: 15,
  },
  calendarButtons: {
    flexDirection: 'row',
    marginLeft: 15,
    justifyContent: 'space-between',
    width: '65%',
  },
  calendarTextButton: {
    fontSize: 20,
    color: Colors.DD_CREAM,
    margin: 5,
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
