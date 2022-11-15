import React, {useContext, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Text, StyleSheet} from 'react-native';
import Colors from '../assets/styles/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import UserContext from '../contexts/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';

export default function SettingsScreen({navigation}) {
  const user = useContext(UserContext);
  const [output, setOutput] = useState('');

  //   const getCurrentEventData = async () => {
  //     console.log(languageObj.language);
  //     try {
  //       const result = await AsyncStorage.getItem(languageObj.language);
  //       let itemCount = JSON.parse(result).length;
  //       setOutput('ITEMCOUNT=' + itemCount + '\n' + result);
  //     } catch (e) {
  //       // clear error
  //       console.log('getCurrentData storage threw error ' + e);
  //       throw e;
  //     }
  //   };

  const getCurrentUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('User');
      console.log(jsonValue);
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // read error
    }

    console.log('Done.');
  };

  const getAllKeys = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      // read key error
      console.log('getAllKeys storage threw error ' + e);
      throw e;
    }

    setOutput(keys[0] + ', ' + keys[1]);
    // return keys;
    console.log(JSON.stringify(keys));
    // return [];
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  };

  //   const deleteCertainData = async () => {
  //     setOutput('Deleted words from context and storage that are missing an id');

  //     // Filter condition
  //     function excludeItems(i) {
  //       return i.id !== undefined;
  //     }
  //     const words = languageObj.words.filter(excludeItems);
  //     // console.log(words);
  //     setLanguageObj({...languageObj, words: words});
  //     const saveData = async () => {
  //       try {
  //         await AsyncStorage.setItem(languageObj.language, JSON.stringify(words));
  //         console.log('(saveData) Data successfully saved');
  //       } catch (e) {
  //         console.log('(saveData) Failed to save the data to the storage');
  //         throw e;
  //       }
  //     };

  //     saveData();
  //   };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <Text style={styles.defaultScreentext}>Change profile info</Text>
        <Text style={styles.defaultScreentext}>Change password</Text>
        <Text style={styles.defaultScreentext}>Change privacy settings</Text>
        <Button
          style={styles.clearButton}
          textColor={Colors.TEST_CREAM}
          onPress={() => getAllKeys()}>
          GET ALL KEYS STORAGE
        </Button>
        <Button
          style={styles.clearButton}
          textColor={Colors.TEST_CREAM}
          onPress={() => getCurrentUser()}>
          LIST CURRENT USER OBJECT
        </Button>
        <Button
          style={styles.clearButton}
          textColor={Colors.TEST_CREAM}
          //   onPress={() => deleteCertainData()}
        >
          RUN CUSTOM DELETE METHOD
        </Button>
        <ScrollView>
          <Text style={styles.text}>{output}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.DD_CREAM,
    color: Colors.DD_RED_2,
  },
  defaultScreentext: {
    fontSize: 25,
    fontWeight: '500',
    color: Colors.DD_RED_2,
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: Colors.DD_LIGHT_GRAY,
    borderRadius: 12,
    width: 230,
    alignSelf: 'center',
    margin: 10,
  },
});
