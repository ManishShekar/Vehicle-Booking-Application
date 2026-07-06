import {
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import VehicleList from "../pages/VehicleList/VehicleList";
import BookVehicle from "../pages/BookVehicle/BookVehicle";
import MyBookings from "../pages/MyBookings/MyBookings";

import ManageVehicles from "../pages/ManageVehicles/ManageVehicles";
import EditVehicle from "../pages/EditVehicle/EditVehicle";
import AllBookings from "../pages/AllBookings/AllBookings";

import ProtectedRoute from "../components/common/ProtectedRoute";
import Layout from "../components/common/Layout";

import {
  ROUTES,
  ROLES,
} from "../utils/constants";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}

      <Route
        path={ROUTES.LOGIN}
        element={<Login />}
      />

      <Route
        path={ROUTES.REGISTER}
        element={<Register />}
      />

      {/* Customer Layout */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              ROLES.CUSTOMER,
            ]}
          >
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route
          path={ROUTES.VEHICLES}
          element={<VehicleList />}
        />

        <Route
          path={ROUTES.BOOK_VEHICLE}
          element={<BookVehicle />}
        />

        <Route
          path={ROUTES.MY_BOOKINGS}
          element={<MyBookings />}
        />
      </Route>

      {/* Admin Layout */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              ROLES.ADMIN,
            ]}
          >
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route
          path={ROUTES.MANAGE_VEHICLES}
          element={<ManageVehicles />}
        />

        <Route
          path={ROUTES.EDIT_VEHICLE}
          element={<EditVehicle />}
        />

        <Route
          path={ROUTES.ALL_BOOKINGS}
          element={<AllBookings />}
        />
      </Route>

    </Routes>
  );
};

export default AppRoutes;