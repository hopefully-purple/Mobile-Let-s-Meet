import React, {useState, useContext, useEffect} from 'react';
import Colors from '../../assets/styles/colors';
import {
  ScrollView,
  View,
  Text,
  Keyboard,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {SliderPicker, HuePicker} from 'react-color';
import CalendarEventsContext from '../../contexts/CalendarEvents';
import {
  calendarCreateNewEvent,
  calendarGetCalendars,
} from '../../API/CalendarAPIHandling';
import UserContext from '../../contexts/User';
import { BoxButton } from '../../assets/components/CustomButtons';

// https://casesandberg.github.io/react-color/
// Doesn't work! Throws Text errors :`(
// const CalendarThing = (calColor, setCalColor) => {
//   return (
//     <HuePicker
//       color={calColor}
//       onChangeComplete={setCalColor}
//       width={50}
//       height={20}
//     />
//   );
// };

// const storeNewEvent = async (title, location, start, end, color) => {
//   const newEvent = {
//     title,
//     start,
//     end,
//     location,
//     color,
//   };
//   // console.log(newEvent);
//   try {
//     // Attempt to keep keys unique: Key= "Event title" + " - start"
//     // bc not going to have two Bio discussions at the same time
//     // but two bio discussions can exist
//     await AsyncStorage.setItem(
//       `Event ${title} - ${start}`,
//       JSON.stringify(newEvent),
//     );
//   } catch (e) {
//     // print error
//     console.log('storing event error: ' + e);
//     throw e;
//   }

//   return;
// };

export default function AddEventModal({navigation}) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedCal, setSelectedCal] = useState(null);
  // const {events, setEvents} = useContext(CalendarEventsContext);
  // const user = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   {label: 'Apple', value: 'apple'},
  //   {label: 'Banana', value: 'banana'},
  // ]);

  this.titleInput = React.createRef();
  this.locationInput = React.createRef();

  const [calendars, setCalendars] = useState([]);
  useEffect(() => {
    console.log('~~~~~~~~~~~~~~~AddEventModal.useEffect call getEvents');
    let mounted = true;
    calendarGetCalendars().then(data => {
      if (mounted) {
        console.log('AddEventModal mounted! setEvents');
        setCalendars(data.filter(c => c.group === null));
      }
    });
    return () => {
      console.log('AddEventModal mounted = false');
      mounted = false;
    };
  }, []);

  const doneHandler = async () => {
    // console.log(calendars)
    if (title === '' && location === '' && selectedCal === null) {
      Alert.alert('Title, Location, and Calendar must be set');
      // console.log(
      //   'go back, no saving to async since title and location were empty',
      // );
      // navigation.goBack();
      return;
    }

    const newEvent = {
      title,
      startTime: startDate.toISOString(), //yyyy-MM-dd'T'HH:mm:ss.fff'Z' <whatever this is
      endTime: endDate.toISOString(),
      location,
      calendarID: selectedCal.id,
    };
    // console.log('NEW EVENT MADE, events context:');

    console.log(
      'NEW EVENT MADE > Post API call > result: <not rn, dev server broken>',
    );
    // Alert.alert(
    //   'EventModels/Create does not currently work due to AWS out of date',
    // );
    // API call to post new event
    let result = await calendarCreateNewEvent(newEvent);

    //Clear inputs
    this.titleInput.current.clear();
    this.locationInput.current.clear();
    setTitle('');
    setLocation('');

    if (result) {
      //Go back to schedule
      console.log('go back');
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={text => setTitle(text)}
        mode="outlined"
        style={styles.input}
        activeOutlineColor={Colors.DD_RED_2}
        autoCorrect={false}
        ref={this.titleInput}
        // onSubmitEditing={Keyboard.dismiss}
      />
      <TextInput
        label="Location"
        value={location}
        onChangeText={text => setLocation(text)}
        mode="outlined"
        style={styles.input}
        activeOutlineColor={Colors.DD_RED_2}
        autoCorrect={false}
        ref={this.locationInput}
      />
      <DropDownPicker
        placeholder="Select a calendar"
        schema={{
          label: 'name',
          value: 'calendarID',
        }}
        open={open}
        value={value}
        items={calendars}
        setOpen={setOpen}
        setValue={setValue}
        onSelectItem={item => {
          console.log(item);
          setSelectedCal(item);
        }}
        // setItems={setItems}
        dropDownDirection="BOTTOM"
        listMode="SCROLLVIEW"
        style={{
          backgroundColor: selectedCal
            ? selectedCal.color
            : Colors.DD_EXTRA_LIGHT_GRAY,
        }}
        containerStyle={{
          width: '95%',
          margin: 10,
        }}
      />
      <Text style={styles.text}>
        Start: {startDate.toLocaleDateString()} {startDate.toLocaleTimeString()}
      </Text>
      <DatePicker
        date={startDate}
        onDateChange={setStartDate}
        minuteInterval={5}
      />
      <Text style={styles.text}>
        End: {endDate.toLocaleDateString()} {endDate.toLocaleTimeString()}
      </Text>
      <DatePicker date={endDate} onDateChange={setEndDate} minuteInterval={5} />
      {/* <CalendarThing calColor={calColor} setCalColor={setCalColor} /> */}
      <View style={styles.doneStyle}>
        <BoxButton onPress={doneHandler} title="Done"/>
      </View>
      <Text> </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  doneStyle: {
    margin: 15,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.DD_CREAM,
    // justifyContent: 'space-evenly',
  },
  input: {
    margin: 10,
  },
  text: {
    color: Colors.DD_DARK_GRAY,
    fontSize: 20,
    margin: 10,
  },
});

// https://github.com/henninghall/react-native-date-picker
