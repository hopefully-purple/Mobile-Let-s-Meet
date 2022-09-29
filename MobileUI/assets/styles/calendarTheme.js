import Colors from './colors';
import {StyleSheet} from 'react-native';

export const calendarTheme = StyleSheet.create({
  agenda: {
    calendarBackground: Colors.DD_CREAM, //works!
    monthTextColor: Colors.DD_RED_2, //works!!
    dayTextColor: Colors.DD_RED_2,
    textSectionTitleColor: Colors.DD_MEDIUM_GRAY,
    textDisabledColor: Colors.DD_RED_2_LIGHT,
    selectedDayBackgroundColor: Colors.DD_RED_3,
    dotColor: Colors.DD_RED_1,
    agendaKnobColor: Colors.DD_LIGHT_GRAY,

    // todayTextColor: Colors.TEST_PURPLE,
    // ...calendarTheme,
    // textSectionTitleDisabledColor: '#d9e1e8',
    // selectedDayTextColor: Colors.TEST_PURPLE,
    // todayTextColor: Colors.DD_LIGHT_GRAY, //meh suppper iffy on this one
    // selectedDotColor: '#ffffff',
    // arrowColor: Colors.DD_CREAM,
    // disabledArrowColor: '#d9e1e8',
    //indicatorColor: 'blue',
    // textDayFontFamily: 'monospace',
    // textMonthFontFamily: 'monospace',
    // textDayHeaderFontFamily: 'monospace',
    // textDayFontWeight: '300',
    // textMonthFontWeight: 'bold',
    // textDayHeaderFontWeight: '300',
    // textDayFontSize: 20,
    // textMonthFontSize: 40,
    // textDayHeaderFontSize: 24,
    // agendaDayTextColor: 'yellow',
    // agendaDayNumColor: Colors.TEST_GREEN,
    // agendaTodayColor: 'red',
  },
});
