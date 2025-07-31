import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './reducer';

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});

export default store;