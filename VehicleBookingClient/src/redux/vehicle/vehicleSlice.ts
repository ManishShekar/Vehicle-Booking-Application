import { createSlice } from "@reduxjs/toolkit";

import type { VehicleState } from "../../types/vehicleTypes";

import { getAllVehicles, getVehicleById, getVehicles } from "./vehicleThunk";

 import { addVehicle, updateVehicle } from "./vehicleThunk";

const initialState: VehicleState = {
  vehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",

  initialState,

  reducers: {},

  extraReducers(builder) {
    builder


.addCase(addVehicle.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(addVehicle.fulfilled, (state) => {
  state.loading = false;
})
.addCase(addVehicle.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload ?? "Failed to add vehicle.";
})

.addCase(updateVehicle.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(updateVehicle.fulfilled, (state) => {
  state.loading = false;
})
.addCase(updateVehicle.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload ?? "Failed to update vehicle.";
})

      .addCase(getVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
  getAllVehicles.pending,
  (state) => {
    state.loading = true;
    state.error = null;
  }
)

.addCase(
  getAllVehicles.fulfilled,
  (state, action) => {
    state.loading = false;
    state.vehicles = action.payload;
  }
)

.addCase(
  getAllVehicles.rejected,
  (state, action) => {
    state.loading = false;
    state.error =
      action.payload ??
      "Unable to fetch vehicles.";
  }
)

      .addCase(
        getVehicles.fulfilled,
        (state, action) => {
          state.loading = false;
          state.vehicles = action.payload;
        }
      )

      .addCase(
        getVehicles.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ??
            "Unable to fetch vehicles.";
        }
      ).addCase(
    getVehicleById.pending,
    (state) => {
        state.loading = true;
    }
)

.addCase(
    getVehicleById.fulfilled,
    (state, action) => {
        state.loading = false;
        state.selectedVehicle =
            action.payload;
    }
)

.addCase(
    getVehicleById.rejected,
    (state, action) => {
        state.loading = false;
        state.error =
            action.payload ??
            "Unable to fetch vehicle.";
    }
)
      
      
      
      
      
      ;
  },
});

export default vehicleSlice.reducer;