import React, { useState } from 'react';
import {
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { useNavigation } from 'react-navigation-hooks';
import moment from 'moment';

import { getAllReminders, deleteReminder } from '../store/dal';
import { IReminder } from '../interfaces/Reminder';

const Item = ({ id, endDateTime, title, selected, onSelect, onDelete }) => {
    return (
        <TouchableOpacity
            key={id}
            onPress={() => onSelect(id)}
            style={[
                styles.item,
                { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
            ]}
        >
            <Text style={styles.title}>{title}: {endDateTime}</Text>
            <Button
                title="X"
                onPress={() => onDelete(id)}
                color="rgba(108, 140, 255, 1)" />
        </TouchableOpacity>
    );
}

const ReminderList = () => {
    const { navigate } = useNavigation();
    const [ready, setReady] = useState(false);
    const [eventList, setEventList] = useState([]);
    const [selected, setSelected] = useState(new Map());

    const loadData = async () => {
        try {
            setEventList(await getAllReminders());
            setReady(true);

        } catch (error) {
            console.log(`error loading data`);
        }
    }

    React.useEffect(() => {
        getAllReminders().then(response => {
            setEventList(response);
        })
        .catch((error) => {
            console.log(`error loading data: ${error}`);
        });
    }, );

    const onSelect = React.useCallback(
        id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);
        },
        [selected],
    );

    const onDelete = React.useCallback(
        id => {
            deleteReminder(id);
            loadData();
        },
        [eventList],
    );

    return (
        <View style={styles.container}>
            {eventList.length > 0 && <FlatList
                key="flatList"
                data={eventList}
                style={styles.list}
                renderItem={({ item }) => (
                    <Item
                        id={item.id}
                        key={item.id}
                        title={item.title}
                        endDateTime={moment.utc(item.endDate).local().format('MM/DD/YYYY HH:mm A')}
                        selected={!!selected.get(item.id)}
                        onSelect={onSelect}
                        onDelete={onDelete}
                    />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
            />}
            {eventList.length === 0 && <View style={styles.container}>
                <Text style={styles.paragraph}>Please add a reminder.</Text>
            </View>}
            <View style={styles.container}>
                <Text style={styles.paragraph}>{`You have ${eventList.length} reminders.`}</Text>
            </View>
            <Button
                title="Back to home"
                onPress={() => navigate('home')} />
            <ActionButton
                key="fab"
                onPress={() => navigate('form')}
                buttonColor="rgba(108, 140, 255, 1)" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6fa',
        paddingBottom: 30,
    },
    item: {
        backgroundColor: '#f9c2ff',
        fontSize: 12,
        marginHorizontal: 16,
        margin: 20,
    },
    title: {
        fontSize: 16,
        padding: 10,
    },
    list: {
        margin: 10,
        backgroundColor: '#e6e6fa',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ReminderList;