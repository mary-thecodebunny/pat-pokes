import React, { useState } from 'react';
import { DatePickerIOS, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import moment from 'moment';
const uuidv4 = require('uuid/v4');

import { saveReminder } from '../store/dal';

const ReminderForm = () => {
  const [title, setTitle] = useState('Please enter a new reminder title.');
  const [chosenDate, setChosenDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showError, setShowError] = useState(false);

  const { navigate } = useNavigation();

  const handleAddPress = () => {
    if (validateTitle()) {
      const id = uuidv4();
      saveReminder(id, { title, endDate: chosenDate, id });
      navigate('list');
    }
  }

  const showDateTimePicker = () => {
    setShowDatePicker(true);
  }

  const handleDatePicked = () => {
    setChosenDate(chosenDate);
    setShowDatePicker(false);
  }

  const hideDateTimePicker = () => {
    setShowDatePicker(false);
  }

  const setDate = (date: Date) => {
    setChosenDate(date);
  }

  const validateTitle = () => {
    if (title === '' || title === 'Please enter a new reminder title.') {
      setShowError(true);
      return false;
    }
    setShowError(false);
    return true;
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <TextInput
          style={[styles.text, styles.borderTop]}
          onChangeText={text => setTitle(text)}
          value={title}>
        </TextInput>
        <TextInput
          style={[styles.text, styles.borderTop]}
          placeholder="Please enter reminder title."
          value={moment(chosenDate).format('LLL')}
          editable={!showDatePicker}
          onFocus={showDateTimePicker}>
        </TextInput>
        {showError && 
        <Text style={styles.error}>
          Please enter a new custom reminder title!
        </Text>}
        {showDatePicker &&
          <View>
            <DatePickerIOS
              date={chosenDate}
              onDateChange={setDate}
              minimumDate={new Date()}
            />
            <Button title="Cancel" onPress={() => hideDateTimePicker()} />
            <Button title="Save" onPress={() => handleDatePicked()} />
          </View>}
      </View>
      <View style={styles.button}>
        <Button title="Add reminder" onPress={() => handleAddPress()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#daddef',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  borderTop: {
    borderColor: '#edeeef',
    borderTopWidth: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    color: "#ed64d9",
    fontWeight: "400",
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    backgroundColor: '#eaeaea',
    color: "#BE2C36",
    fontWeight: "600",
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    width: 350,
  },
  text: {
    height: 40,
    margin: 0,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  dateTimeText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
});

export default ReminderForm;