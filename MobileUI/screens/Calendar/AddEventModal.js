import React, {useState} from 'react';
import Colors from '../../assets/styles/colors';
import {ScrollView, View, Keyboard, Button, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DD_CREAM,
    // justifyContent: 'space-evenly',
  },
  input: {
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

export default function AddEventModal({navigation}) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  return (
    // <ScrollView style={styles.container}>
    <View style={styles.container}>
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
      <Button onPress={() => navigation.goBack()} title="Done" />
      {/* </ScrollView> */}
    </View>
  );
}
