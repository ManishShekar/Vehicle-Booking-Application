import axiosClient from "./axiosClient";



import type { Vehicle, VehicleType, VehicleStatus } from "../types/vehicleTypes";

export interface VehiclePayload {
  vehicleName: string;
  vehicleType: VehicleType;
  registrationNumber: string;
  dailyRate: number;
  status?: VehicleStatus;
}

export const addVehicleApi = async (
  payload: VehiclePayload
): Promise<Vehicle> => {
  const response = await axiosClient.post<Vehicle>("/Vehicle", payload);
  return response.data;
};

export const getAllVehiclesApi = async (): Promise<Vehicle[]> => {
  const response = await axiosClient.get<Vehicle[]>("/Vehicle/admin");
  return response.data;
};

export const updateVehicleApi = async (
  vehicleId: number,
  payload: VehiclePayload
): Promise<Vehicle> => {
  const response = await axiosClient.put<Vehicle>(
    `/Vehicle/${vehicleId}`,
    payload
  );
  return response.data;
};

export const getVehiclesApi = async (
  startDate?: string | null,
  endDate?: string | null
): Promise<Vehicle[]> => {
  const response =
    await axiosClient.get<Vehicle[]>("/Vehicle", {
      params: {
        ...(startDate ? { startDate } : {}),
        ...(endDate ? { endDate } : {}),
      },
    });

  return response.data;
};
export const getVehicleByIdApi = async (
  vehicleId: number
): Promise<Vehicle> => {
  const response = await axiosClient.get<Vehicle>(
    `/Vehicle/${vehicleId}`
  );

  return response.data;
};