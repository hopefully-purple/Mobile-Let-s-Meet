import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {SmallBoxButton} from '../../assets/components/CustomButtons';
import Colors from '../../assets/styles/colors';
import {TextInput} from 'react-native-paper';
import {calendarGetCalendars} from '../../API/CalendarAPIHandling';
// https://stackoverflow.com/questions/48992961/react-navigation-modal-height

const Item = ({name, color}) => {
  return (
    <View style={{...styles.item, borderColor: color}}>
      <Text style={styles.listText}>{name}</Text>
    </View>
  );
};

// https://github.com/renrizzolo/react-native-sectioned-multi-select
// ^ a more interesting UI for multi-select. Experiment if time
// https://stackoverflow.com/questions/57396558/how-to-select-multiple-items-in-flatlist-highlight-them-and-keep-them-saved-in
// ^ or this stack overflow answer
export default function FilterCalendarModal({navigation}) {
  // const group = useContext(CurrentGroupObjectContext).currentGroup;
  // const user = useContext(UserContext);

  const [calendars, setCalendars] = useState([]);
  useEffect(() => {
    console.log('~~~~~~~~~~~~~~~FilterCalendarModal.useEffect call getEvents');
    let mounted = true;
    calendarGetCalendars().then(data => {
      if (mounted) {
        console.log('FilterCalendarModal mounted! setEvents');
        setCalendars(data);
      }
    });
    return () => {
      console.log('FilterCalendarModal mounted = false');
      mounted = false;
    };
  }, []);

  const renderItem = ({item}) => {
    return <Item name={`${item?.name}`} color={item?.color} />;
  };

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.creamKnob} />
        <View style={styles.bodyContainer}>
          <View style={styles.mainHeader}>
            <Text style={styles.mainHeaderText}>My Calendars:</Text>
          </View>
          <View style={styles.flatListStyle}>
            <FlatList
              data={calendars}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
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
  flatListStyle: {
    // backgroundColor: Colors.DD_EXTRA_LIGHT_GRAY,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    padding: 5,
    marginVertical: 5,
    borderWidth: 5,
  },
  listText: {
    fontSize: 20,
    color: Colors.DD_MEDIUM_GRAY,
  },
});
