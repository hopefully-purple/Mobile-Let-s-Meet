import React, {useState} from 'react';
import Colors from '../../assets/styles/colors';
import {
  ScrollView,
  View,
  Text,
  Keyboard,
  Button,
  StyleSheet,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import {SliderPicker, HuePicker} from 'react-color';

const styles = StyleSheet.create({
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

// https://casesandberg.github.io/react-color/
// Doesn't work! Throws Text errors :`(
const CalendarThing = (calColor, setCalColor) => {
  return (
    <HuePicker
      color={calColor}
      onChangeComplete={setCalColor}
      width={50}
      height={20}
    />
  );
};

const storeNewEvent = async (title, location, start, end, color) => {
  const newEvent = {
    title,
    start,
    end,
    location,
    color,
  };
  // console.log(newEvent);
  try {
    // Attempt to keep keys unique: Key= "Event title" + " - start"
    // bc not going to have two Bio discussions at the same time
    // but two bio discussions can exist
    await AsyncStorage.setItem(
      `Event ${title} - ${start}`,
      JSON.stringify(newEvent),
    );
  } catch (e) {
    // print error
    console.log('storing event error: ' + e);
    throw e;
  }

  return;
};

export default function AddEventModal({navigation}) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [calColor, setCalColor] = useState('#0D852F');

  const doneHandler = async () => {
    // console.log(title);
    // console.log(location);
    // console.log(startDate);
    // console.log(endDate);
    // console.log(calColor);
    // API call to post new event
    // Async storage call
    await storeNewEvent(title, location, startDate, endDate, calColor);
    //let event = await AsyncStorage.getItem(`${title} - ${startDate}`);
    //console.log(event);
    navigation.goBack();
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
      <Text style={styles.text}>Pick color aka calendar soon</Text>
      {/* <CalendarThing calColor={calColor} setCalColor={setCalColor} /> */}
      <Button onPress={doneHandler} title="Done" style={{margin: 100}} />
      <Text> </Text>
    </ScrollView>
  );
}

// https://github.com/henninghall/react-native-date-picker
