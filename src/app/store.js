import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/userSlice';

import { composeWithDevTools } from 'redux-devtools-extension';

// const store = createStore(reducer, composeWithDevTools(
//   applyMiddleware(...middleware),
//   // other store enhancers if any
// ));

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
}, composeWithDevTools);
