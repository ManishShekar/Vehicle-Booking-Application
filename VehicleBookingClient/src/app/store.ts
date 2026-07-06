import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import vehicleReducer from "../redux/vehicle/vehicleSlice";
import bookingReducer
from "../redux/booking/bookingSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    vehicle: vehicleReducer,
       booking:bookingReducer,
  },
 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




