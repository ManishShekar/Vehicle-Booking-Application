import { AppBar, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logout } from "../../redux/auth/authSlice";
import { ROUTES } from "../../utils/constants";
import { NavTitle, NavActions, NavButton, WelcomeText, LogoutButton } from "./Navbar.styles";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const role = localStorage.getItem("role") ?? "";
  const name = localStorage.getItem("name") ?? "User";

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <NavTitle variant="h6">Vehicle Management System</NavTitle>

        <NavActions>
          {role === "Customer" && (
            <>
              <NavButton onClick={() => navigate(ROUTES.VEHICLES)}>
                Vehicles
              </NavButton>
              <NavButton onClick={() => navigate(ROUTES.MY_BOOKINGS)}>
                My Bookings
              </NavButton>
            </>
          )}

          {role === "Admin" && (
            <>
              <NavButton onClick={() => navigate(ROUTES.MANAGE_VEHICLES)}>
                Manage Vehicles
              </NavButton>
              <NavButton onClick={() => navigate(ROUTES.ALL_BOOKINGS)}>
                All Bookings
              </NavButton>
            </>
          )}

          <WelcomeText>{name}</WelcomeText>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </NavActions>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;