import React, { useRef } from "react";
import { useRouter } from "next/router";
import axios, { post } from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Swal from "sweetalert2";
import Cookies from "cookies";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../../components/theme.js";
import {
  isChrome,
  isFirefox,
  isSafari,
  isOpera,
  isIE,
  isEdge,
  isYandex,
  isChromium,
} from "react-device-detect";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const SignInPage = ({ test }) => {
  const classes = useStyles();
  const router = useRouter();
  const userInput = useRef();
  const passwordInput = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = userInput.current.value;
    const password = passwordInput.current.value;
    await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: "/api/login",
      data: JSON.stringify({ username, password }),
    }).then(
      async (response) => {
        if (response.status === 200) {
          await localStorage.setItem("auth_backend", username);
          var browser_name = "";
          if (isChrome) {
            browser_name = "isChrome";
          }
          if (isFirefox) {
            browser_name = "isFirefox";
          }
          if (isSafari) {
            browser_name = "isSafari";
          }
          if (isOpera) {
            browser_name = "isOpera";
          }
          if (isIE) {
            browser_name = "isIE";
          }
          if (isEdge) {
            browser_name = "isEdge";
          }
          if (isYandex) {
            browser_name = "isYandex";
          }
          if (isChromium) {
            browser_name = "isChromium";
          }
          var data = {
            user_id: response.data.data,
            device: "",
            browser_name: browser_name,
          };
          axios({
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer my-token",
              "My-Custom-Header": "foobar",
            },
            url: "/api/login_history",
            data: JSON.stringify({ data: data }),
          }).then(
            (response) => {
              return router.push("/browser/route");
            },
            (error) => {
              console.log(error);
            }
          );
        }
        if (response.status === 201) {
          // alert("Username");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "ไม่พบบัญชีผู้ใช้!",
          });
        }
        if (response.status === 202) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "รหัสผ่านไม่ถูกต้อง!",
          });
        }
        if (response.status === 203) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "คุณไม่ใช่ผู้ดูแลระบบ!",
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              inputRef={userInput}
              // defaultValue="admin"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              inputRef={passwordInput}
              // defaultValue="admin"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </ThemeProvider>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const loged = await cookies.get("user");
  if (loged === undefined) {
    return { props: {} };
  } else {
    res.statusCode = 404;
    res.end();
    return { props: {} };
  }
};

export default SignInPage;
