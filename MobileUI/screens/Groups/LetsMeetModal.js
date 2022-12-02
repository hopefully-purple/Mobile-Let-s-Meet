import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {BoxButton, MiniBoxButton} from '../../assets/components/CustomButtons';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Colors from '../../assets/styles/colors';
import {groupsLetsMeet} from '../../API/GroupsAPIHandling';
import {calendarCreateNewEvent} from '../../API/CalendarAPIHandling';

const TIME_FRAMES = [
  {value: 1, label: 'Within 1 day from now'},
  {value: 2, label: 'Within 2 days from now'},
  {value: 3, label: 'Within 3 days from now'},
  {value: 4, label: 'Within 4 days from now'},
  {value: 5, label: 'Within 5 days from now'},
  {value: 6, label: 'Within 6 days from now'},
  {value: 7, label: 'Within 7 days from now'},
];
// 30 minutes, 45 minnutes, 1 hour, 2 hour, 3 hour
const DURATION_OPTIONS = [
  {value: '00:30:00', label: '30 minutes'},
  {value: '00:45:00', label: '45 minutes'},
  {value: '01:00:00', label: '1 hour'},
  {value: '02:00:00', label: '2 hours'},
  {value: '03:00:00', label: '3 hours'},
];

function makeReadable(s) {
  const sDate = new Date(s.startTime);
  // console.log(sDate.toLocaleDateString()); //12/4/2022
  const sString = sDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: 'numeric',
    // minute: 'numeric',
  });
  const start = sDate.toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  }); // 7:30 AM
  // console.log(start);
  const end = new Date(s.endTime).toLocaleTimeString('en-US', {
    timeZone: 'UTC',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
  }); // 7:30 AM

  let readable = `${sString}\nfrom ${start} to ${end}`;

  return readable;
}

export default function LetsMeetModal({navigation, groupID}) {
  const [reason, setReason] = useState('');
  const [location, setLocation] = useState('');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(1);
  const [duration, setDuration] = useState('01:00:00');
  const [isLoading, setIsLoading] = useState(false);
  const [suggested, setSuggested] = useState([]);
  const [areNoSuggestions, setAreNoSuggestions] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  this.reasonInput = React.createRef();
  this.locationInput = React.createRef();

  const handleLetsMeet = () => {
    setIsLoading(true);
    this.reasonInput.current.blur();
    this.locationInput.current.blur();

    const details = {
      groupID: groupID,
      duration: duration,
      withinDays: selectedTimeFrame,
      title: reason,
      location: location,
    };

    groupsLetsMeet(details).then(data => {
      setIsLoading(false);
      if (data[0].id === -1) {
        setAreNoSuggestions(true);
        setSuggested([]);
      } else {
        setAreNoSuggestions(false);
        setSuggested(data);
      }
    });
  };

  const Suggestion = ({s, r}) => {
    function confirmAccept() {
      Alert.alert(`Accept ${r} ?`, '', [
        {
          text: 'Accept',
          onPress: () => handleAccept(),
        },
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      ]);
    }

    async function handleAccept() {
      console.log('NEW EVENT MADE > Post API call');
      console.log(s.calendar.calendarID);
      const newE = {
        title: s.title,
        startTime: new Date(s.startTime).toISOString(),
        endTime: new Date(s.endTime).toISOString(),
        location: s.location,
        calendarID: s.calendar.calendarID,
      };
      let result = await calendarCreateNewEvent(newE);
      //Clear inputs
      this.reasonInput.current.clear();
      this.locationInput.current.clear();
      setSelectedTimeFrame({});

      if (result) {
        //Go back to schedule
        Alert.alert(`Accepted ${r}. Adding event to calendar`);
        console.log('go back');
        navigation.goBack();
      } else {
        Alert.alert('Unable to add event');
      }
    }

    return (
      <View
        key={s.id}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '80%',
        }}>
        <Text
          style={{
            ...styles.infoText,
            marginRight: 20,
            fontSize: 18,
          }}>
          {r}
        </Text>
        <MiniBoxButton title={'Accept'} onPress={confirmAccept} />
      </View>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.creamKnob} />
        <ScrollView style={styles.bodyContainer}>
          <Text style={styles.infoText}>
            Enter info and we'll suggest good times to meet!
          </Text>
          <TextInput
            label="Reason for meeting (or title)"
            value={reason}
            onChangeText={text => setReason(text)}
            mode="outlined"
            style={styles.input}
            activeOutlineColor={Colors.DD_RED_2}
            autoCorrect={false}
            ref={this.reasonInput}
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
          <Text style={styles.infoText}>
            How soon do you want to hold the meeting?
          </Text>
          <Picker
            selectedValue={selectedTimeFrame}
            style={styles.timeFramePicker}
            itemStyle={styles.timeFrameItem}
            onValueChange={itemValue => {
              setSelectedTimeFrame(itemValue);
            }}>
            {TIME_FRAMES.map(item => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <Text style={styles.infoText}>Meeting duration:</Text>
            <DropDownPicker
              placeholder="30 minutes"
              schema={{
                label: 'label',
                value: 'value',
              }}
              open={open}
              value={value}
              items={DURATION_OPTIONS}
              setOpen={setOpen}
              setValue={setValue}
              onSelectItem={item => {
                console.log(JSON.stringify(item, undefined, 2));
                console.log(item.value);
                setDuration(item.value);
              }}
              dropDownDirection="TOP"
              listMode="SCROLLVIEW"
              style={{
                borderColor: Colors.DD_RED_2,
                borderWidth: 2,
              }}
              containerStyle={{
                width: '40%',
                margin: 10,
              }}
            />
          </View>
          <View style={styles.button}>
            <BoxButton title={`Let's Meet!`} onPress={handleLetsMeet} />
          </View>
          <Text style={styles.infoText}>Suggestions:</Text>
          {!!isLoading && (
            <Text style={styles.defaultScreentext}>Loading...</Text>
          )}
          {areNoSuggestions ? (
            <Text style={styles.infoText}>No suggestions</Text>
          ) : (
            suggested.map(s => {
              const readable = makeReadable(s);
              return <Suggestion s={s} r={readable} />;
            })
          )}
          <Text> </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    height: '85%',
    width: '100%',
    backgroundColor: Colors.DD_RED_2,
    borderRadius: 10,
    paddingBottom: 10,
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
    paddingHorizontal: 20,
    // justifyContent: 'space-evenly',
  },
  infoText: {
    fontSize: 25,
    // fontWeight: 'bold',
    color: Colors.DD_MEDIUM_GRAY,
    padding: 10,
  },
  input: {
    margin: 10,
  },
  timeFramePicker: {
    height: 100,
    width: '90%',
    marginBottom: 100,
  },
  timeFrameItem: {
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    // flexDirection: 'row',
  },
  defaultScreentext: {
    fontSize: 25,
    color: Colors.DD_RED_2,
    textAlign: 'center',
    margin: 20,
  },
});
