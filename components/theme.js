import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "SukhumvitSet", // specifying a new font
  },
  overrides: {
    MUIDataTable: {
      responsiveScroll: {
        maxHeight: "980px",
      },
    },
  },
});

export default theme;
