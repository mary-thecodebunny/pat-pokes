import { DatePickerIOS, Button, View } from 'react-native';

const DatePicker = ({chosenDate, setDate, hideDateTimePicker, handleDatePicked}) => {
    return (
        <View>
            <DatePickerIOS
              date={chosenDate}
              onDateChange={setDate}
              minimumDate={new Date()}
            />
            <Button title="Cancel" onPress={() => hideDateTimePicker()} />
            <Button title="Save" onPress={() => handleDatePicked()} />
          </View>
    )
}

export default DatePicker;