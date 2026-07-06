import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  getVehiclesApi,
  getVehicleByIdApi,
  addVehicleApi,
  updateVehicleApi,
  getAllVehiclesApi,
} from "../../api/vehicleApi";

import type {
  Vehicle,
  VehiclePayload,
} from "../../types/vehicleTypes";

export const getVehicles = createAsyncThunk<
  Vehicle[],
  { startDate?: string | null; endDate?: string | null } | void,
  {
    rejectValue: string;
  }
>(
  "vehicle/getVehicles",
  async (params, thunkAPI) => {
    try {
      return await getVehiclesApi(
        params?.startDate,
        params?.endDate
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          "Unable to fetch vehicles."
        );
      }

      return thunkAPI.rejectWithValue(
        "Something went wrong."
      );
    }
  }
);

export const getAllVehicles = createAsyncThunk<
  Vehicle[],
  void,
  {
    rejectValue: string;
  }
>(
  "vehicle/getAllVehicles",
  async (_, thunkAPI) => {
    try {
      return await getAllVehiclesApi();
    } catch {
      return thunkAPI.rejectWithValue(
        "Unable to fetch vehicles."
      );
    }
  }
);

export const getVehicleById = createAsyncThunk<
  Vehicle,
  number,
  {
    rejectValue: string;
  }
>(
  "vehicle/getVehicleById",
  async (vehicleId, thunkAPI) => {
    try {
      return await getVehicleByIdApi(vehicleId);
    } catch {
      return thunkAPI.rejectWithValue(
        "Unable to fetch vehicle."
      );
    }
  }
);

export const addVehicle = createAsyncThunk<
  Vehicle,
  VehiclePayload,
  {
    rejectValue: string;
  }
>(
  "vehicle/addVehicle",
  async (payload, thunkAPI) => {
    try {
      return await addVehicleApi(payload);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          typeof error.response?.data === "string"
            ? error.response.data
            : "Failed to add vehicle."
        );
      }

      return thunkAPI.rejectWithValue(
        "Failed to add vehicle."
      );
    }
  }
);

export const updateVehicle = createAsyncThunk<
  Vehicle,
  {
    vehicleId: number;
    payload: VehiclePayload;
  },
  {
    rejectValue: string;
  }
>(
  "vehicle/updateVehicle",
  async ({ vehicleId, payload }, thunkAPI) => {
    try {
      return await updateVehicleApi(
        vehicleId,
        payload
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          typeof error.response?.data === "string"
            ? error.response.data
            : "Failed to update vehicle."
        );
      }

      return thunkAPI.rejectWithValue(
        "Failed to update vehicle."
      );
    }
  }
);