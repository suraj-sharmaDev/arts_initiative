import { combineReducers } from '@reduxjs/toolkit';
import auth from './authorization/reducer';
import counter from './counter/reducer';
import invites from './invites/reducer';
import onboarding from './onboarding/reducer';
import firebase from './firebase/reducer';

const appReducer = combineReducers({
    auth,
    counter,
    invites,
    onboarding,
    firebase,
});

export default appReducer;
