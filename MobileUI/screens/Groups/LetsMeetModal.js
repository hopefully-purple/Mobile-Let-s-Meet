import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {
  BoxButton,
  SmallBoxButton,
  MiniBoxButton,
} from '../../assets/components/CustomButtons';
import {Picker} from '@react-native-picker/picker';
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

const DURATION_OPTIONS = [
  {value: '01:00:00', id: 1},
  {value: '00:30:00', id: 2},
];

export default function LetsMeetModal({navigation, calendarID}) {
  const [reason, setReason] = useState('');
  const [location, setLocation] = useState('');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState({});
  const [duration, setDuration] = useState('01:00:00');
  const [isLoading, setIsLoading] = useState(false);
  const [suggested, setSuggested] = useState([]);
  const [areNoSuggestions, setAreNoSuggestions] = useState(false);

  this.reasonInput = React.createRef();
  this.locationInput = React.createRef();
  // this.scrollView = React.createRef();

  const handleLetsMeet = () => {
    setIsLoading(true);
    this.reasonInput.current.blur();
    this.locationInput.current.blur();
    // this.scrollView.scrollToEnd({animated: true});
    // setTimeout(() => {
    //   setIsLoading(false);
    //   setSuggested(DUMMY_SUGGESTIONS);
    // }, 3000);
    // console.log('selected time frame: ');
    // console.log(JSON.stringify(selectedTimeFrame, undefined, 2));
    const details = {
      calendarID: calendarID,
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

  const Suggestion = ({s}) => {
    function confirmAccept() {
      Alert.alert(`Accept ${s.startTime} - ${s.endTime} ?`, '', [
        {
          text: 'Accept',
          onPress: () => handleAccept(),
        },
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
      ]);
    }

    async function handleAccept() {
      Alert.alert(
        `Accepted ${s.startTime} - ${s.endTime}. Adding event to calendar`,
      );
      console.log('NEW EVENT MADE > Post API call');
      // API call to post new event
      // console.log('New Event:' + JSON.stringify(newEvent, undefined, 2));
      let result = await calendarCreateNewEvent(s);
      //Clear inputs
      this.reasonInput.current.clear();
      this.locationInput.current.clear();
      setSelectedTimeFrame({});

      if (result) {
        //Go back to schedule
        console.log('go back');
        navigation.goBack();
      }
    }

    return (
      <View
        key={s.id}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{...styles.infoText, alignSelf: 'center', marginRight: 20}}>
          {s.startTime} - {s.endTime}
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
              // console.log(itemValue);
            }}>
            {TIME_FRAMES.map(item => (
              <Picker.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
          <Text style={styles.infoText}>Meeting duration: 1 hour</Text>
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
            suggested.map(s => <Suggestion s={s} />)
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
