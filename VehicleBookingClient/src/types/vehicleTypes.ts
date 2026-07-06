export type VehicleStatus =
  | "Available"
  | "Maintenance";

export type VehicleType =
  | "Sedan"
  | "SUV"
  | "Hatchback"
  | "Van";

export interface Vehicle {
  vehicleId: number;
  vehicleName: string;
  vehicleType: VehicleType;
  registrationNumber: string;
  dailyRate: number;
  status: VehicleStatus;
}

export interface VehiclePayload {
  vehicleName: string;
  vehicleType: VehicleType;
  registrationNumber: string;
  dailyRate: number;
  status: VehicleStatus;
}
export const vehicleStatuses: VehicleStatus[] = [
  "Available",
  "Maintenance",
];

export interface VehicleState {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  loading: boolean;
  error: string | null;
}

export interface VehicleFilter {
    startDate: Date | null;
    endDate: Date | null;
    vehicleType: string;
}