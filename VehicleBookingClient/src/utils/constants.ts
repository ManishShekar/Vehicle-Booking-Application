export const ROUTES = {
  LOGIN: "/",
  REGISTER: "/register",

  VEHICLES: "/vehicles",
  BOOK_VEHICLE: "/book/:vehicleId",
  MY_BOOKINGS: "/my-bookings",

  MANAGE_VEHICLES: "/admin/vehicles",
  EDIT_VEHICLE: "/admin/vehicles/edit/:vehicleId",
  ALL_BOOKINGS: "/admin/bookings",
};
export const ROLES = {
  ADMIN: "Admin",
  CUSTOMER: "Customer",
} as const;