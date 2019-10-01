import { DatePickerAndroid, TouchableWithoutFeedback, View, Text } from 'react-native';

const DatePicker = async ({chosenDate, setDate, hideDateTimePicker, handleDatePicked}) => {
  try {
    DatePickerAndroid.open({
      // Use `new Date()` for current date.
      // May 25 2020. Month 0 is January.
      date: chosenDate,
      mode: "spinner",
      minDate: new Date(),
    }).then((response) => {
      const { action, } = response;
      if (action === DatePickerAndroid.dateSetAction) {
        console.log(`Date picked`);
        //setDate(new Date( action ))
      }
    }

    )
      // Selected year, month (0-11), day
  } catch ({code, message}) {
    
  } finally {
    hideDateTimePicker(true)
  }
  return (
    <TouchableWithoutFeedback
     onPress={this.showPicker.bind(this, 'spinner', { date: chosenDate })}>
      <View>
         <Text>Date selector</Text>
      </View>
    </TouchableWithoutFeedback>
   )
}

export default DatePicker;