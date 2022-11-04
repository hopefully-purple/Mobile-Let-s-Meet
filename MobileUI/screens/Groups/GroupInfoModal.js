import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import Colors from '../../assets/styles/colors';
import {bareBonesFriendsList} from '../../assets/data/HardCodedFriends';
// https://stackoverflow.com/questions/48992961/react-navigation-modal-height

const Item = ({name}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.listText}>{name}</Text>
    </View>
  );
};

export default function GroupInfoModal({navigation}) {
  const renderItem = ({item}) => {
    return <Item name={item.name} />;
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.bodyContainer}>
          <View style={styles.mainHeader}>
            <Text style={styles.membersHeaderText}>Members:</Text>
            <Text style={styles.generationHeaderText}>Invite:</Text>
          </View>
          <View style={styles.mainBody}>
            <View style={styles.flatListStyle}>
              <FlatList
                data={bareBonesFriendsList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
            <View style={styles.generationSide}>
              <Text style={styles.generationText}>Generate invite link</Text>
              <Text style={styles.generationText}>Generate invite QR</Text>
            </View>
          </View>
        </View>
      </View>
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
    justifyContent: 'center',
    borderRadius: 10,
  },
  bodyContainer: {
    height: '80%',
    backgroundColor: Colors.DD_CREAM,
    // flexDirection: 'column',
    // justifyContent: 'space-evenly',
    padding: 5,
  },
  mainHeader: {
    // backgroundColor: Colors.DD_LIGHT_GRAY,
    flexDirection: 'row',
    // justifyContent: 'space-around',
  },
  membersHeaderText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.DD_MEDIUM_GRAY,
    paddingLeft: 5,
  },
  generationHeaderText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.DD_MEDIUM_GRAY,
    marginLeft: 120,
  },
  mainBody: {
    // backgroundColor: Colors.DD_WHITE,
    flexDirection: 'row',
    height: '90%',
  },
  generationSide: {
    // backgroundColor: Colors.DD_EXTRA_LIGHT_GRAY,
    flexDirection: 'column',
    borderLeftWidth: 5,
    borderColor: Colors.DD_LIGHT_GRAY,
    margin: 20,
    justifyContent: 'center',
    flexShrink: 1,
  },
  generationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.DD_MEDIUM_GRAY,
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  flatListStyle: {
    // backgroundColor: Colors.DD_EXTRA_LIGHT_GRAY,
    paddingHorizontal: 10,
    paddingTop: 10,
    // height: '70%',
  },
  item: {
    // backgroundColor: '#f9c2ff',
    paddingVertical: 5,
    marginVertical: 5,
    // marginHorizontal: 16,
  },
  listText: {
    fontSize: 20,
    color: Colors.DD_MEDIUM_GRAY,
    // textAlign: 'center',
  },
});
