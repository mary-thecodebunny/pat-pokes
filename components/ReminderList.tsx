import React, { useState } from 'react';
import {
    Alert,
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

const Item = ({ id, endDateTime, title, selected, onSelect, confirmDelete }) => {
    return (
        <TouchableOpacity
            key={id}
            onPress={() => onSelect(id)}
            style={[
                styles.item,
                { backgroundColor: selected ? '#c6b6e0' : '#e2daef' },
            ]}
        >
            <Text style={styles.title}>{title}: {endDateTime}</Text>
            <Button
                title="X"
                onPress={() => confirmDelete(title, id)}
                color="rgba(108, 140, 255, 1)" />
        </TouchableOpacity>
    );
}

const ReminderList = () => {
    const { navigate } = useNavigation();
    const [eventList, setEventList] = useState([]);
    const [selected, setSelected] = useState(new Map());

    const loadData = async () => {
        try {
            setEventList(await getAllReminders());

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
    });

    const onSelect = React.useCallback(
        id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);
        },
        [selected],
    );

    const confirmDelete = React.useCallback(
        (title, id) => {
            Alert.alert(`Delete ${title}`,
                'Are you sure you want to delete this reminder?',
                [{ text: 'Cancel', onPress: () => onCancel },
                { text: 'Yes', onPress: () => onDelete(id) }],
                { cancelable: true })
        }, [],
        );

    const onCancel = () => {

    }

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
                        endDateTime={moment(item.endDate).format('LLL')}
                        selected={!!selected.get(item.id)}
                        onSelect={onSelect}
                        confirmDelete={confirmDelete}
                    />
                )}
                keyExtractor={item => item.id}
                extraData={selected}
            />}
            {eventList.length === 0 && <View style={styles.container}>
                <Text style={styles.paragraph}>Please add a runway reminder.</Text>
            </View>}
            <View style={styles.container}>
                <Text style={styles.paragraph}>{`You have ${eventList.length} runway reminders.`}</Text>
            </View>
            <View style={styles.button}>
                <Button
                    title="Back to home"
                    onPress={() => navigate('home')} />
            </View>
            <ActionButton
                key="fab"
                onPress={() => navigate('newReminderForm')}
                buttonColor="rgba(108, 140, 255, 1)" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaeaea',
        paddingBottom: 30,
    },
    button: {
        backgroundColor: '#daddef',
        alignItems: 'center',
        padding: 12,
    },
    item: {
        backgroundColor: '#e2daef',
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
        backgroundColor: '#eaeaea',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ReminderList;