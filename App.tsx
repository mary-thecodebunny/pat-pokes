import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button, FlatList } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import storageReducer from './store/reducers/storageReducer';
import AppNavigator from './components/AppNavigator';
import { createAppContainer } from 'react-navigation';

const store = createStore(storageReducer);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  listItem: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#eee'
  },
  listContainer: {
    width: '100%'
  }
});

