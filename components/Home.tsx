import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Button, Text } from 'react-native';

const Home = () => {
    const { navigate } = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Go to reminder list!</Text>
            <View style={styles.button}>
            <Button
                title="Add some reminders"
                onPress={() =>
                    navigate('reminderList')
                }
            />
            </View>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eaeaea',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#daddef',
        alignItems: 'center',
        padding: 10,
        margin: 10,
      },
});

export default Home;