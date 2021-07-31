import React, { useState, useEffect } from "react";
import Link from "next/link";
import { withRouter, useRouter } from "next/router";
import axios, { post } from "axios";
import Cookies from "cookies";
//mt ui

import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../../components/theme.js";
//page import
import Dashboard_page from "./dashboard_page";
import Manageroom_page from "./manageroom_page";
import Manageremember_page from "./manageremember_page";
import Checkslip_page from "./checkslip_page";
import Cancel_page from "./cancel_page";
import History_page from "./history_page";
import Withdraw_page from "./withdraw_page";
import Setting_page from "./setting_page";
import Report_page from "./report_page";
//style

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const Tabs = ({ router }) => {
  // console.log(user);

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const {
    query: { tab },
  } = router;
  const isTabOne = tab === "1" || tab == null;
  const isTabTwo = tab === "2";
  const isTabThree = tab === "3";
  const isTabFour = tab === "4";
  const isTabFive = tab === "5";
  const isTabSix = tab === "6";
  const isTabSeven = tab === "7";
  const isTabEight = tab === "8";
  const isTabNine = tab === "9";
  const [us_id, Us_id] = useState(localStorage.getItem("auth_backend"));

  const [register_count, Register_count] = React.useState("0");
  const [register_empty, Register_empty] = React.useState(true);
  const [bill_count, Bill_count] = React.useState("0");
  const [bill_empty, Bill_empty] = React.useState(true);
  const [withdraw_count, Withdraw_count] = React.useState("0");
  const [withdraw_empty, Withdraw_empty] = React.useState(true);
  const [cancel_count, Cancel_count] = React.useState("0");
  const [cancel_empty, Cancel_empty] = React.useState(true);
  const [savingroom_count, Savingroom_count] = React.useState("0");
  const [savingroom_empty, Savingroom_empty] = React.useState(true);
  // console.log("id แอดมิน" + us_id);
  const [is_emp, Is_emp] = React.useState(false);
  useEffect(async () => {
    // console.log("id แอดมิน" + us_id);

    if (us_id === null) {
      await liff.init({ liffId: `1656271362-Q0yZk2JK` }).catch((err) => {
        throw err;
      });
      await liff.logout();
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        url: "/api/logout",
      }).then(
        (response) => {
          return router.push("/mobile");
        },
        (error) => {
          console.log(error);
        }
      );
    }
    var data = { user_id: us_id };
    var Role = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: "/api/role_user",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        // console.log(response.data.data[0].role);
        return response.data.data[0].role;
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(Role);
    if (Role === "super_admin") {
      await localStorage.setItem("role", Role);
    }
    if (Role === "admin") {
      await localStorage.setItem("role", Role);
    }
    if (Role === "mgr") {
      await localStorage.setItem("role", Role); //james add
    }
    if (Role === "emp") {
      await localStorage.setItem("role", Role);
      Is_emp(true);
    }

    if (Role === "user") {
      await liff.init({ liffId: `1656271362-Q0yZk2JK` }).catch((err) => {
        throw err;
      });
      await liff.logout();
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        url: "/api/logout",
      }).then(
        (response) => {
          return router.push("/mobile");
        },
        (error) => {
          console.log(error);
        }
      );
    }
    console.log("id แอดมิน" + us_id);
    axios.get("/api/check_status").then(function (response) {
      if (response.data.data.Register_ > 0) {
        Register_count(response.data.data.Register_);
        Register_empty(false);
      } else {
        Register_count("0");
        Register_empty(true);
      }
      if (response.data.data.Bill_ > 0) {
        Bill_count(response.data.data.Bill_);
        Bill_empty(false);
      } else {
        Bill_count("0");
        Bill_empty(true);
      }
      if (response.data.data.Withdraw_ > 0) {
        Withdraw_count(response.data.data.Withdraw_);
        Withdraw_empty(false);
      } else {
        Withdraw_count("0");
        Withdraw_empty(true);
      }
      if (response.data.data.Cancel_ > 0) {
        Cancel_count(response.data.data.Cancel_);
        Cancel_empty(false);
      } else {
        Cancel_count("0");
        Cancel_empty(true);
      }
      if (response.data.data.SavingRooms_ > 0) {
        Savingroom_count(response.data.data.SavingRooms_);
        Savingroom_empty(false);
      } else {
        Savingroom_count("0");
        Savingroom_empty(true);
      }
    });
  }, []);

  setInterval(() => {
    axios.get("/api/check_status").then(function (response) {
      // console.log(response);
      if (response.data.data.Register_ > 0) {
        Register_count(response.data.data.Register_);
        Register_empty(false);
      } else {
        Register_count("0");
        Register_empty(true);
      }
      if (response.data.data.Bill_ > 0) {
        Bill_count(response.data.data.Bill_);
        Bill_empty(false);
      } else {
        Bill_count("0");
        Bill_empty(true);
      }
      if (response.data.data.Withdraw_ > 0) {
        Withdraw_count(response.data.data.Withdraw_);
        Withdraw_empty(false);
      } else {
        Withdraw_count("0");
        Withdraw_empty(true);
      }
      if (response.data.data.Cancel_ > 0) {
        Cancel_count(response.data.data.Cancel_);
        Cancel_empty(false);
      } else {
        Cancel_count("0");
        Cancel_empty(true);
      }
      if (response.data.data.SavingRooms_ > 0) {
        Savingroom_count(response.data.data.SavingRooms_);
        Savingroom_empty(false);
      } else {
        Savingroom_count("0");
        Savingroom_empty(true);
      }
    });
  }, 10000);
  const OnLogout = async () => {
    var data = { user_id: us_id };
    var Role = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: "/api/role_user",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        console.log(response.data.data[0].role);
        return response.data.data[0].role;
      },
      (error) => {
        console.log(error);
      }
    );
    if (Role === "super_admin") {
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        url: "/api/logout",
      }).then(
        (response) => {
          return router.push("/browser/login");
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      await liff.init({ liffId: `1656271362-Q0yZk2JK` }).catch((err) => {
        throw err;
      });
      await liff.logout();
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        url: "/api/logout",
      }).then(
        (response) => {
          return router.push("/mobile");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="container-fluid">
          {/* header  */}
          <div
            style={{
              height: "65px",
              width: "100% - 250px",
              backgroundColor: "#fff",
              borderBottom: "1px solid rgba(0,0,0,.0625)",
              position: "fixed",
              left: "250px",
              right: 0,
              top: 0,
            }}
          >
            <div className="container-fluid">
              <div
                className="row d-flex align-items-center justify-content-end"
                style={{ fontFamily: "SukhumvitSet-SemiBold" }}
              >
                <button
                  onClick={OnLogout}
                  type="button"
                  className="btn btn-danger"
                >
                  ออกจากระบบ <ExitToAppIcon />
                </button>
              </div>
            </div>
          </div>

          {/* left menu  */}
          <div
            style={{
              minHeight: "100%",
              width: "250px",
              borderRight: "1px solid rgba(0, 0, 0, 0.12)",
              position: "fixed",
              left: 0,
              top: 0,
            }}
          >
            <div
              className="d-flex justify-content-center"
              style={{
                height: "65px",
                borderBottom: "1px solid rgba(0,0,0,.0625)",
              }}
            >
              <div className="row d-flex align-items-center">
                <div
                  className="col justify-content-center align-items-center"
                  style={{
                    color: "#313435",
                    fontFamily: "SukhumvitSet-SemiBold",
                    fontSize: "20px",
                  }}
                >
                  Adminator
                </div>
                {/* <div
                  className="col justify-content-center"
                  style={{
                    color: "#313435",
                    fontFamily: "SukhumvitSet-SemiBold",
                  }}
                >
                  ร้านทองอารมณ์ดี (แอดมิน)
                </div> */}
              </div>
              {/* <img
                src="/image/logo.svg"
                className="d-flex justify-content-center mb-3"
                width={"auto"}
                height={"100px"}
              /> */}
            </div>
            {/* <div className="d-flex justify-content-center mb-3 mt-3">
              <img
                src="/image/logo.svg"
                className="d-flex justify-content-center mb-3"
                width={"auto"}
                height={"100px"}
              />
            </div> */}

            <div>
              <List>
                <Link
                  href={{
                    pathname: "/browser/route",
                    query: { tab: "1" },
                  }}
                >
                  <ListItem style={{ cursor: "pointer" }}>
                    <ListItemIcon>
                      <img
                        src="/image/icon_browser/แดชบอร์ด.png"
                        className="d-flex justify-content-center"
                        width={"24px"}
                        height={"24px"}
                      />
                    </ListItemIcon>
                    <ListItemText primary={"แดชบอร์ด"} />
                  </ListItem>
                </Link>
                <Link
                  href={{
                    pathname: "/browser/route",
                    query: { tab: "2" },
                  }}
                >
                  <ListItem style={{ cursor: "pointer" }}>
                    <ListItemIcon>
                      <img
                        src="/image/icon_browser/จัดการห้องออม.png"
                        className="d-flex justify-content-center"
                        width={"24px"}
                        height={"24px"}
                      />
                      <div
                        hidden={savingroom_empty}
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: "#E74C3C ",
                          borderRadius: "10px",
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        {savingroom_count}
                      </div>
                    </ListItemIcon>
                    <ListItemText primary={"จัดการห้องออม"} />
                  </ListItem>
                </Link>
                <Link
                  href={{
                    pathname: "/browser/route",
                    query: { tab: "3" },
                  }}
                >
                  <ListItem style={{ cursor: "pointer" }}>
                    <ListItemIcon>
                      <img
                        src="/image/icon_browser/จัดการสมาชิก.png"
                        className="d-flex justify-content-center"
                        width={"24px"}
                        height={"24px"}
                      />
                      <div
                        hidden={register_empty}
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: "#E74C3C ",
                          borderRadius: "10px",
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        {register_count}
                      </div>
                    </ListItemIcon>
                    <ListItemText primary={"จัดการสมาชิก"} />
                  </ListItem>
                </Link>
                <Link
                  href={{
                    pathname: "/browser/route",
                    query: { tab: "4" },
                  }}
                >
                  <ListItem style={{ cursor: "pointer" }}>
                    <ListItemIcon>
                      <img
                        src="/image/icon_browser/ยกเลิกการออม.png"
                        className="d-flex justify-content-center"
                        width={"24px"}
                        height={"24px"}
                      />
                      <div
                        hidden={cancel_empty}
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: "#E74C3C ",
                          borderRadius: "10px",
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        {cancel_count}
                      </div>
                    </ListItemIcon>
                    <ListItemText primary={"ยกเลิกออม"} />
                  </ListItem>
                </Link>
                <Link
                  href={{
                    pathname: "/browser/route",
                    query: { tab: "5" },
                  }}
                >
                  <ListItem style={{ cursor: "pointer" }} hidden={is_emp}>
                    <ListItemIcon>
                      <img
                        src="/image/icon_browser/รายการถอน.png"
                        className="d-flex justify-content-center"
                        width={"24px"}
                        height={"24px"}
                      />
                      <div
                        hidden={withdraw_empty}
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: "#E74C3C ",
                          borderRadius: "10px",
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        {withdraw_count}
                      </div>
                    </ListItemIcon>
                    <ListItemText primary={"รายการถอน"} />
                  </ListItem>
                </Link>
                <Link
                  href={{
                    pathname: "/browser/route",
                    query: { tab: "6" },
                  }}
                >
                  <ListItem style={{ cursor: "pointer" }}>
                    <ListItemIcon>
                      <img
                        src="/image/icon_browser/ตรวจสอบสลิป.png"
                        className="d-flex justify-content-center"
                        width={"24px"}
                        height={"24px"}
                      />
                      <div
                        hidden={bill_empty}
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: "#E74C3C ",
                          borderRadius: "10px",
                          textAlign: "center",
                          color: "#fff",
                        }}
                      >
                        {bill_count}
                      </div>
                    </ListItemIcon>
                    <ListItemText primary={"ตรวจสอบสลิป"} />
                  </ListItem>
                </Link>
                <Link
                  href={{
                    pathname: "/browser/route",
                    query: { tab: "7" },
                  }}
                >
                  <ListItem style={{ cursor: "pointer" }}>
                    <ListItemIcon>
                      <img
                        src="/image/icon_browser/ข้อมูลย้อนหลัง.png"
                        className="d-flex justify-content-center"
                        width={"24px"}
                        height={"24px"}
                      />
                    </ListItemIcon>
                    <ListItemText primary={"ข้อมูลย้อนหลัง"} />
                  </ListItem>
                </Link>
                <Link
                  href={{
                    pathname: "/browser/route",
                    query: { tab: "9" },
                  }}
                  hidden={is_emp}
                >
                  <ListItem style={{ cursor: "pointer" }} hidden={is_emp}>
                    <ListItemIcon>
                      <img
                        src="/image/icon_browser/business-report.png"
                        className="d-flex justify-content-center"
                        width={"24px"}
                        height={"24px"}
                      />
                    </ListItemIcon>
                    <ListItemText primary={"รายงาน"} />
                  </ListItem>
                </Link>
                <Link
                  href={{
                    pathname: "/browser/route",
                    query: { tab: "8" },
                  }}
                  hidden={is_emp}
                >
                  <ListItem style={{ cursor: "pointer" }} hidden={is_emp}>
                    <ListItemIcon>
                      <img
                        src="/image/icon_browser/settings.png"
                        className="d-flex justify-content-center"
                        width={"24px"}
                        height={"24px"}
                      />
                    </ListItemIcon>
                    <ListItemText primary={"ตั้งค่า"} />
                  </ListItem>
                </Link>
              </List>
            </div>
          </div>

          {/* Body */}
          <div
            style={{
              height: "90%",
              width: "100% - 250px",
              position: "fixed",
              left: "250px",
              top: "65px",
              right: 0,
              bottom: "10vh",
              overflow: "auto",
              padding: "20px",
              backgroundColor: "#f9fafb",
            }}
          >
            {isTabOne && (
              <React.Fragment>
                <Dashboard_page />
              </React.Fragment>
            )}
            {isTabTwo && (
              <React.Fragment>
                <Manageroom_page />
              </React.Fragment>
            )}
            {isTabThree && (
              <React.Fragment>
                <Manageremember_page />
              </React.Fragment>
            )}
            {isTabFour && (
              <React.Fragment>
                <Cancel_page />
              </React.Fragment>
            )}
            {isTabFive && (
              <React.Fragment>
                <Withdraw_page />
              </React.Fragment>
            )}
            {isTabSix && (
              <React.Fragment>
                <Checkslip_page />
              </React.Fragment>
            )}
            {isTabSeven && (
              <React.Fragment>
                <History_page />
              </React.Fragment>
            )}
            {isTabEight && (
              <React.Fragment>{!is_emp && <Setting_page />}</React.Fragment>
            )}
            {isTabNine && (
              <React.Fragment>
                <Report_page />
              </React.Fragment>
            )}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};
export const getServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const user = await cookies.get("user");
  if (!user) {
    res.statusCode = 404;
    res.end();
    return { props: {} };
  }
  return {
    props: { user },
  };
};
export default withRouter(Tabs);
