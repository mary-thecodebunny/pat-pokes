import { createStackNavigator } from 'react-navigation-stack';

import Home from './Home';
import ReminderForm from './ReminderForm';
import ReminderList from './ReminderList';

const AppNavigator = createStackNavigator({
    home: {
      screen: Home,
      navigationOptions: () => ({
        title: 'Home'
      }),
    },
    list: {
      screen: ReminderList,
      navigationOptions: () => ({
        title: 'Your Reminders'
      }),
    },
    form: {
      screen: ReminderForm,
      navigationOptions: () => ({
        title: 'Add a reminder'
      }),
    },
  });

export default AppNavigator;