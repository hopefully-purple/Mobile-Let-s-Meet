import Colors from './colors';
import {StyleSheet} from 'react-native';

export const calendarTheme = StyleSheet.create({
  agenda: {
    calendarBackground: Colors.DD_CREAM,
    monthTextColor: Colors.DD_RED_2,
    dayTextColor: Colors.DD_RED_2,
    textSectionTitleColor: Colors.DD_MEDIUM_GRAY,
    textDisabledColor: Colors.DD_RED_2_LIGHT,
    selectedDayBackgroundColor: Colors.DD_RED_3,
    dotColor: Colors.DD_RED_1,
    agendaKnobColor: Colors.DD_LIGHT_GRAY,
    // todayTextColor: Colors.DD_DARK_GRAY, // I think we are going to stay with blue

    // todayColor: Colors.TEST_GREEN,
    // ...calendarTheme,
    // textSectionTitleDisabledColor: '#d9e1e8',
    // selectedDayTextColor: Colors.TEST_PURPLE,
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
    // agendaDayNumColor: Colors.TEST_GREEN,
    // agendaTodayColor: 'red',
  },
});
