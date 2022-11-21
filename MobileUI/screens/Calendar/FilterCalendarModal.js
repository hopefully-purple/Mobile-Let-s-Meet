import React, {useState, useEffect} from 'react';
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
// import {SmallBoxButton} from '../../assets/components/CustomButtons';
import Colors from '../../assets/styles/colors';
// import {Switch, Card} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import {calendarGetCalendars} from '../../API/CalendarAPIHandling';
import Badge from '../../assets/components/Badge';
import {color} from 'react-native-reanimated';
// import SelectMultiple from 'react-native-select-multiple';
// https://stackoverflow.com/questions/48992961/react-navigation-modal-height

// https://github.com/renrizzolo/react-native-sectioned-multi-select
// ^ a more interesting UI for multi-select. Experiment if time
// https://stackoverflow.com/questions/57396558/how-to-select-multiple-items-in-flatlist-highlight-them-and-keep-them-saved-in
// ^ or this stack overflow answer

export default function FilterCalendarModal({navigation}) {
  // const group = useContext(CurrentGroupObjectContext).currentGroup;
  // const user = useContext(UserContext);
  // const [calendarsON, setCalendarsON] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [colors, setColors] = useState([]);

  const [calendars, setCalendars] = useState([]);
  useEffect(() => {
    console.log('~~~~~~~~~~~~~FilterCalendarModal.useEffect call getCalendars');
    let mounted = true;
    calendarGetCalendars().then(data => {
      if (mounted) {
        console.log('FilterCalendarModal mounted! setCalendars');
        setCalendars(data);
      }
    });
    return () => {
      console.log('FilterCalendarModal mounted = false');
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      // navigation.addListener('beforeRemove', e => {
      // Do something
      console.log('>>>>>>>>>>>>>>>> ' + JSON.stringify(e, undefined, 2));
      console.log(JSON.stringify(value, undefined, 2));
    });

    return unsubscribe;
  }, [navigation, value]);

  return (
    <View style={styles.screenContainer}>
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.creamKnob} />
        <View style={styles.bodyContainer}>
          <View style={styles.mainHeader}>
            <Text style={styles.mainHeaderText}>My Calendars:</Text>
          </View>
          <View style={styles.flatListStyle}>
            <DropDownPicker
              placeholder="Select a calendar"
              schema={{
                label: 'name',
                value: 'id',
                color: 'color',
              }}
              mode="BADGE"
              extendableBadgeContainer={true}
              badgeDotColors={colors}
              // renderBadgeItem={(item, props) => <Badge item={item} props={...props} />}
              multiple={true}
              items={calendars}
              value={value}
              open={open}
              min={0}
              setOpen={setOpen}
              setValue={setValue}
              onSelectItem={item => {
                // console.log(JSON.stringify(item, undefined, 2));
                // // setColors([...colors, item.color]);
                // item.map(i => {
                //   !colors.includes(i.color)
                //     ? colors.push(i)
                //     : console.log('remove ' + i);
                // });
                // console.log('colors: ' + JSON.stringify(colors, undefined, 2));
              }}
              // setItems={setItems}
              dropDownDirection="BOTTOM"
              listMode="SCROLLVIEW"
              style={
                {
                  // backgroundColor: selectedCal
                  //   ? selectedCal.color
                  //   : Colors.DD_EXTRA_LIGHT_GRAY,
                }
              }
              containerStyle={{
                width: '95%',
                margin: 10,
              }}
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
