import React from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { StyleSheet, View, Button, Text } from 'react-native';

const Home = () => {
    const { navigate } = useNavigation();
    const navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('home'),
      });
    return (
        <View style={styles.container}>
            <Text>Go to reminder list!</Text>
            <Button
                title="Add some reminders"
                onPress={() =>
                    navigate('list')
                }
            />
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6fa',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;