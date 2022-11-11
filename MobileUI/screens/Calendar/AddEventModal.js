import React, {useState, useContext} from 'react';
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
import {calendarCreateNewEvent} from '../../API/CalendarAPIHandling';
import UserContext from '../../contexts/User';

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

export default function AddEventModal({navigation, calendars}) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [calColor, setCalColor] = useState(Colors.DD_EXTRA_LIGHT_GRAY);
  const {events, setEvents} = useContext(CalendarEventsContext);
  const user = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   {label: 'Apple', value: 'apple'},
  //   {label: 'Banana', value: 'banana'},
  // ]);

  this.titleInput = React.createRef();
  this.locationInput = React.createRef();

  const saveData = async newEvent => {
    try {
      const newE = events;
      newE.push(newEvent);
      await AsyncStorage.setItem('Events', JSON.stringify(newE));
      console.log('(saveData) Data successfully saved');
      return true;
    } catch (e) {
      console.log('(saveData) Failed to save the data to the storage');
      throw e;
    }
  };

  const doneHandler = async () => {
    // console.log(calendars)
    if (title === '' && location === '') {
      Alert.alert(
        'EventModels/Create does not currently work due to AWS out of date',
      );
      console.log(
        'go back, no saving to async since title and location were empty',
      );
      navigation.goBack();
      return;
    }
    // id: `${events.length + 1} ${title}`, //ASYNC WAY
    const newEvent = {
      title,
      startTime: startDate.toISOString(), //yyyy-MM-dd'T'HH:mm:ss.fff'Z' <whatever this is
      endTime: endDate.toISOString(),
      location,
      // calendarID: NEED TO PUT IN
    };
    // console.log('NEW EVENT MADE, events context:');

    console.log(
      'NEW EVENT MADE > Post API call > result: <not rn, dev server broken>',
    );
    Alert.alert(
      'EventModels/Create does not currently work due to AWS out of date',
    );
    // API call to post new event
    // await calendarCreateNewEvent(newEvent, user.name);
    // console.log(JSON.stringify(result, undefined, 2));
    //To trigger reload of Events and new GET API call, update the events context
    // const newE = events;
    // newE.push(newEvent);
    // setEvents(newE);

    //Clear inputs
    this.titleInput.current.clear();
    this.locationInput.current.clear();
    setTitle('');
    setLocation('');

    //Save to async storage (for now until dev server is fixed)
    const result = await saveData(newEvent);
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
          value: 'id',
        }}
        open={open}
        value={value}
        items={calendars}
        setOpen={setOpen}
        setValue={setValue}
        onSelectItem={item => {
          console.log(item);
          setCalColor(item.color);
        }}
        // setItems={setItems}
        dropDownDirection="BOTTOM"
        listMode="SCROLLVIEW"
        style={{
          backgroundColor: `${calColor}`,
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
      <Button onPress={doneHandler} title="Done" style={{margin: 100}} />
      <Text> </Text>
    </ScrollView>
  );
}

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

// https://github.com/henninghall/react-native-date-picker
