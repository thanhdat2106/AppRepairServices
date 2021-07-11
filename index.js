import React, {Component} from 'react';
import {AppRegistry}  from 'react-native'

import {createStore} from 'redux'
import {Provider} from 'react-redux'
import allreducer from './reducers'
import Home from './screens'
let store=createStore(allreducer);

const App =()=>{
    <Provider store={store}>
        <Home />
    </Provider>
};
AppRegistry.registerComponent('tutorialProject',()=> App)