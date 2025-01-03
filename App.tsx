import {View, Text} from 'react-native';
import React from 'react';
import Navigation from './src/Navigation/Navigation';
import {Provider} from 'react-redux';
import store from './Store/Store';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
};

export default App;
