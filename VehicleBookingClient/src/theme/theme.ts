import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2563EB",
    },
    secondary: {
      main: "#64748B",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#64748B",
    },
    divider: "#E2E8F0",
  },

  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    h4: {
      fontWeight: 700,
      fontSize: "1.5rem",
      letterSpacing: "-0.01em",
    },
    h5: {
      fontWeight: 700,
      fontSize: "1.25rem",
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    body1: {
      fontSize: "0.9rem",
    },
    body2: {
      fontSize: "0.8rem",
    },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.875rem",
          boxShadow: "none",
          borderRadius: 8,
          "&:hover": {
            boxShadow: "none",
          },
        },
      },

      variants: [
        {
          props: {
            variant: "contained",
            color: "primary",
          },
          style: {
            backgroundColor: "#2563EB",
            "&:hover": {
              backgroundColor: "#1D4ED8",
            },
          },
        },
        {
          props: {
            variant: "outlined",
            color: "primary",
          },
          style: {
            borderColor: "#CBD5E1",
            color: "#0F172A",
            "&:hover": {
              backgroundColor: "#F1F5F9",
              borderColor: "#94A3B8",
            },
          },
        },
      ],
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
          borderRadius: 12,
          border: "1px solid #E2E8F0",
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#FFFFFF",

            "& fieldset": {
              borderColor: "#CBD5E1",
            },

            "&:hover fieldset": {
              borderColor: "#94A3B8",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#2563EB",
              borderWidth: 1.5,
            },
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#0F172A",
          boxShadow: "none",
          borderBottom: "1px solid #E2E8F0",
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          border: "1px solid #E2E8F0",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#E2E8F0",
        },
      },
    },
  },
});

export default theme;