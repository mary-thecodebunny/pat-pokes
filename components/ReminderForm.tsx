import React, { useState } from 'react';
import { DatePickerIOS, Button, StyleSheet, TextInput, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import moment from 'moment';
const uuidv4 = require('uuid/v4');

import { saveReminder } from '../store/dal';

const ReminderForm = () => {
  const [pressed, setPressedCount] = useState(0);
  const [title, setTitle] = useState('Reminder title');
  const [chosenDate, setChosenDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { navigate } = useNavigation();

  const handleAddPress = () => {
    const id = uuidv4();
    saveReminder(id, { title, endDate: chosenDate, id });
    navigate('list');
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


  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.text}
          onChangeText={text => setTitle(text)}
          value={title}>
        </TextInput>
        {<TextInput
          style={[styles.text, styles.borderTop]}
          placeholder="Reminder date"
          value={moment.utc(chosenDate).format('MM/DD/YYYY HH:mm A')}
          editable={!showDatePicker}
          onFocus={showDateTimePicker}>
        </TextInput>}
        {showDatePicker &&
        <View>
          <DatePickerIOS
          date={chosenDate}
          onDateChange={setDate}
        />
        <Button title="Cancel" onPress={() => hideDateTimePicker()} />
        <Button title="Save" onPress={() => handleDatePicked()} />
        </View>}
      </View>
      <View>
          <Button title="Add reminder" onPress={() => handleAddPress()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    marginBottom: 20,
  },
  borderTop: {
    borderColor: '#edeeef',
    borderTopWidth: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: '#e6e6fa',
    color: "#ed64d9",
    fontWeight: "400",
    alignItems: 'center',
    justifyContent: 'center',
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