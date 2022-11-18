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
import {Switch} from 'react-native-paper';
import {calendarGetCalendars} from '../../API/CalendarAPIHandling';
import {isStorageEmpty} from '../../miscHelpers/AsyncStorageMethods';
// https://stackoverflow.com/questions/48992961/react-navigation-modal-height

// https://github.com/renrizzolo/react-native-sectioned-multi-select
// ^ a more interesting UI for multi-select. Experiment if time
// https://stackoverflow.com/questions/57396558/how-to-select-multiple-items-in-flatlist-highlight-them-and-keep-them-saved-in
// ^ or this stack overflow answer

export default function FilterCalendarModal({navigation}) {
  // const group = useContext(CurrentGroupObjectContext).currentGroup;
  // const user = useContext(UserContext);
  const [calendarsON, setCalendarsON] = useState([]);

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

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      // navigation.addListener('beforeRemove', e => {
      // Do something
      console.log('>>>>>>>>>>>>>>>> ' + JSON.stringify(e, undefined, 2));
      console.log(JSON.stringify(calendarsON, undefined, 2));
    });

    return unsubscribe;
  }, [navigation, calendarsON]);

  const renderItem = ({item}) => {
    // console.log('when does item render happen ' + item.name); //no
    return <Item item={item} />;
  };

  const Item = ({item}) => {
    // const [isSwitchOn, setIsSwitchOn] = useState(false);

    // const onToggleSwitch = () => {
    //   setIsSwitchOn(!isSwitchOn);
    // isSwitchOn ? console.log('off') : console.log('on');
    // !isSwitchOn ? console.log('on') : console.log('off');

    // let oldC = calendarsON.filter(i => i !== item.id);
    // setCalendarsON(oldC);
    //^^^^^ kablooey. no work.

    // let oldC = calendarsON;
    // oldC.push(!isSwitchOn ? item.id : `-${item.id}`);
    // setCalendarsON(oldC);
    // ^^^^^^!!WORKS!! but doesn't make sensee

    // let newC = !isSwitchOn
    //   ? [...oldC, item.id]
    //   : oldC.filter(i => i !== item.id);
    // console.log(JSON.stringify(newC, undefined, 2));
    // setCalendarsON(newC);
    // ^^^ WORKS! but setCalendarsON still makes wack

    // let newC = oldC.reduce((acc, i) => {
    //   if (i !== item.id) {
    //     acc.push(i);
    //   }
    //   return acc;
    // }, []);
    // console.log(JSON.stringify(newC, undefined, 2));
    // setCalendarsON(newC);
    // ^^^ WORKS! but setCalendarsON(newC) makes the gui wack
    // };

    return (
      <View style={{...styles.item, borderColor: item?.color}}>
        {/* <View style={{...styles.item}}> */}
        <Text style={styles.listText}>{item?.name}</Text>
        {/* <Switch
          color={item?.color}
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
        /> */}
      </View>
    );
  };

  // function addToCalendarsON(id) {
  //   //might have to add listener for switch event
  //   let newON = calendarsON;
  //   newON.push(id);
  //   setCalendarsON(newON);
  // }

  // function removeFromCalendarsON(id) {
  //   //might have to add listener for switch event
  //   let oldON = calendarsON;
  //   let newON = oldON.filter(i => i !== id);
  //   console.log(JSON.stringify(newON, undefined, 2));
  //   setCalendarsON(newON);
  // }

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
    borderWidth: 2,
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
