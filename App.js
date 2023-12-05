import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import MyTabs from './Navigation';
import SplashScreen from 'react-native-splash-screen';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];

    case 'REMOVE_TO_CART':
      return state.filter(cartItem => cartItem.id !== action.payload.id);

    default:
      return state;
  }
};

// function renderProduct() {
//   return SplashScreen.hide();
// }

const database = createStore(reducer);
const App = () => (
  <Provider store={database}>
    {/* {renderProduct()} */}
    <MyTabs />
  </Provider>
);
export default App;
