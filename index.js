import { registerRootComponent } from 'expo';
import App from './App';
import React from 'react';
import store from './src/Store/store';
import {Provider} from 'react-redux';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately

const Application = (props)=>{
    return <Provider store={store}>
        <App/>
    </Provider>
}

registerRootComponent(Application);
