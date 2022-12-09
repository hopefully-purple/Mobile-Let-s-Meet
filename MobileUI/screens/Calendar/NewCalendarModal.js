import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Colors from '../../assets/styles/colors';
import {BoxButton} from '../../assets/components/CustomButtons';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import {calendarCreateNewCalendar} from '../../API/CalendarAPIHandling';
import {LogBox} from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
// import SelectMultiple from 'react-native-select-multiple';
// https://stackoverflow.com/questions/48992961/react-navigation-modal-height

// https://github.com/renrizzolo/react-native-sectioned-multi-select
// ^ a more interesting UI for multi-select. Experiment if time
// https://stackoverflow.com/questions/57396558/how-to-select-multiple-items-in-flatlist-highlight-them-and-keep-them-saved-in
// ^ or this stack overflow answer

export default function NewCalendarModal({navigation}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');

  this.nameInput = React.createRef();
  this.descriptionInput = React.createRef();

  async function handleCreate() {
    console.log('NewCalendarModal create new calendar object');
    const newC = {
      Name: name,
      Description: description,
      Color: fromHsv(color),
    };

    let result = await calendarCreateNewCalendar(newC);

    if (result) {
      Alert.alert('Success!');
      this.nameInput.current.clear();
      this.descriptionInput.current.clear();
      setName('');
      setDescription('');
      setColor('');
    } else {
      Alert.alert('Failed to create calendar');
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.screenContainer}>
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.creamKnob} />
        <View style={styles.bodyContainer}>
          <View style={styles.mainHeader}>
            <Text style={styles.mainHeaderText}>Create New Calendar:</Text>
          </View>
          <ScrollView>
            <TextInput
              label="Name"
              value={name}
              onChangeText={text => setName(text)}
              mode="outlined"
              style={styles.input}
              activeOutlineColor={Colors.DD_RED_2}
              autoCorrect={false}
              ref={this.nameInput}
            />
            <TextInput
              label="Description"
              value={description}
              onChangeText={text => setDescription(text)}
              mode="outlined"
              style={styles.input}
              activeOutlineColor={Colors.DD_RED_2}
              autoCorrect={false}
              ref={this.descriptionInput}
            />
            <Text style={styles.mainHeaderText}>
              Selected color: {fromHsv(color)}
            </Text>
            <ColorPicker
              onColorChange={c => setColor(c)}
              onColorSelected={c => Alert.alert(`Selected: ${c}`)}
              style={styles.colorContainer}
            />
            <View style={{alignSelf: 'center'}}>
              <BoxButton title={'Create'} onPress={handleCreate} />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  colorContainer: {
    // width: '50%',
    height: 200,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    height: '50%',
    width: '100%',
    backgroundColor: Colors.DD_RED_2,
    borderRadius: 10,
  },
  creamKnob: {
    alignSelf: 'center',
    borderRadius: 29,
    height: 9,
    width: 60,
    margin: 15,
    backgroundColor: Colors.DD_CREAM,
  },
  bodyContainer: {
    height: '80%',
    backgroundColor: Colors.DD_CREAM,
    padding: 5,
  },
  mainHeader: {
    // backgroundColor: Colors.DD_LIGHT_GRAY,
    flexDirection: 'row',
  },
  mainHeaderText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.DD_MEDIUM_GRAY,
    paddingLeft: 5,
  },
  input: {
    margin: 10,
  },
  flatListStyle: {
    // backgroundColor: Colors.DD_EXTRA_LIGHT_GRAY,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    padding: 5,
    marginVertical: 5,
    borderWidth: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'baseline',
  },
  listText: {
    fontSize: 20,
    color: Colors.DD_MEDIUM_GRAY,
    marginRight: 10,
  },
});
