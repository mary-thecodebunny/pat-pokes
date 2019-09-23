import { AsyncStorage } from 'react-native';
import { IReminder } from '../interfaces/Reminder';

export const getReminder = async (id: string) => {
    try {
        const retrievedItem = await AsyncStorage.getItem(id);
        const item = JSON.parse(retrievedItem);
        return item;
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
};

export const saveReminder = async (id: string, reminder: IReminder) => {
    try {
        console.log(`Adding title:${id}`);
        await AsyncStorage.setItem(id, JSON.stringify(reminder));
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
};

export const deleteReminder = async (id: string) => {
    try {
        console.log(`Deleting:${id}`);
        await AsyncStorage.removeItem(id);
    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
};

export const getAllReminders = async () => {
    let remindersList: IReminder[] = [];
    console.log(`getAllReminders`);
    await AsyncStorage.getAllKeys().then((keys) => {
        return AsyncStorage.multiGet(keys)
        .then((result) => {
            result.map(req => {
                console.log(`${JSON.parse(req[1])}`);
                remindersList.push(JSON.parse(req[1]))
            })
          })
            .catch((error) => {
                // Error retrieving data
                console.log(error.message);
            })
        });
    return remindersList;
};