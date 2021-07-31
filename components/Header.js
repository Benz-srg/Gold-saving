import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
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
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Dashboard from "@material-ui/icons/Dashboard";
import Class from "@material-ui/icons/Class";
import People from "@material-ui/icons/People";
import LocalAtm from "@material-ui/icons/LocalAtm";
import AssignmentTurnedIn from "@material-ui/icons/AssignmentTurnedIn";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Timeline from "@material-ui/icons/Timeline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import axios, { post } from "axios";

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
const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [loop, setLoop] = React.useState(0);
  const [register, Register] = useState({
    empty: true,
    alert: false,
    count: "0",
  });
  const [bill, Bill] = useState({
    empty: true,
    alert: false,
    count: "0",
  });
  const [withdraw, Withdraw] = useState({
    empty: true,
    alert: false,
    count: "0",
  });
  const [cancel, Cancel] = useState({
    empty: true,
    alert: false,
    count: "0",
  });
  const [savingroom, Savingroom] = useState({
    empty: true,
    alert: false,
    count: "0",
  });
  useEffect(() => {
    // console.log("first");
    // CheckStaus();
  }, []);

  // const loop = () => {
  //   console.log("test");
  // };
  setInterval(() => {
    // for (let index = 0; index < 2; index++) {

    // }
    console.log(
      "tegdfsgsdfgf;lk;k';lk';lk';lk';k';kl'lk';lk';lk';lk';lk';lk;lk';k';lk';lk';ksdgt"
    );
    // return;
    // setTimeout(() => {
    //   console.log("test");
    // }, 1000);
  }, 1000);
  const CheckStaus = async () => {
    // for (let index = 0; index < 1; index++) {}
    // console.log("load");
    return "finish";
    // const timeout =
    // axios.get("/api/check_status").then(function (response) {
    //   if (response.data.data.Register_ > 0) {
    //     Register({
    //       empty: false,
    //       alert: true,
    //       count: response.data.data.Register_,
    //     });
    //   } else {
    //     Register({
    //       empty: true,
    //       alert: false,
    //       count: "0",
    //     });
    //   }
    //   if (response.data.data.Bill_ > 0) {
    //     Bill({
    //       empty: false,
    //       alert: true,
    //       count: response.data.data.Bill_,
    //     });
    //   } else {
    //     Bill({
    //       empty: true,
    //       alert: false,
    //       count: "0",
    //     });
    //   }
    //   if (response.data.data.Withdraw_ > 0) {
    //     Withdraw({
    //       empty: false,
    //       alert: true,
    //       count: response.data.data.Withdraw_,
    //     });
    //   } else {
    //     Withdraw({
    //       empty: true,
    //       alert: false,
    //       count: "0",
    //     });
    //   }
    //   if (response.data.data.Cancel_ > 0) {
    //     Cancel({
    //       empty: false,
    //       alert: true,
    //       count: response.data.data.Cancel_,
    //     });
    //   } else {
    //     Cancel({
    //       empty: true,
    //       alert: false,
    //       count: "0",
    //     });
    //   }
    //   if (response.data.data.SavingRooms_ > 0) {
    //     Savingroom({
    //       empty: false,
    //       alert: true,
    //       count: response.data.data.SavingRooms_,
    //     });
    //   } else {
    //     Savingroom({
    //       empty: true,
    //       alert: false,
    //       count: "0",
    //     });
    //   }
    // });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  const OnLogout = async (e) => {
    e.preventDefault();
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
  };
  const OnClickMenu = async (e) => {
    const menu_name = e;
    if (menu_name == "แดชบอร์ด") {
      return router.push("/browser/dashboard");
    }
    if (menu_name == "จัดการห้องออม") {
      return router.push("/browser/manageroom");
    }
    if (menu_name == "จัดการสมาชิก") {
      return router.push("/browser/manageremember");
    }
    if (menu_name == "ยกเลิกออม") {
      return router.push("/browser/cancel_list");
    }
    if (menu_name == "ตรวจสอบสลิป") {
      return router.push("/browser/checkslip");
    }
    if (menu_name == "ข้อมูลย้อนหลัง") {
      return router.push("/browser/history");
    }
    if (menu_name == "รายการถอน") {
      return router.push("/browser/withdraw");
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className="d-flex bd-highlight mb-3">
          <IconButton
            className="p-2 bd-highlight"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className="p-2 bd-highlight" variant="h6" noWrap>
            ร้านทองอารมณ์ดี (แอดมิน)
          </Typography>
          <div className="ml-auto p-2 bd-highlight">
            <Button
              onClick={OnLogout}
              variant="contained"
              color="default"
              className={classes.button}
              endIcon={<ExitToAppIcon />}
            >
              ออกจากระบบ
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem onClick={() => OnClickMenu("แดชบอร์ด")}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary={"แดชบอร์ด"} />
          </ListItem>
          <ListItem onClick={() => OnClickMenu("จัดการห้องออม")}>
            <ListItemIcon>
              <Class hidden={savingroom.alert} />
              <Class style={{ color: "#E74C3C" }} hidden={savingroom.empty} />
              <div
                hidden={savingroom.empty}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#E74C3C ",
                  borderRadius: "10px",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                {savingroom.count}
              </div>
            </ListItemIcon>
            <ListItemText primary={"จัดการห้องออม"} />
          </ListItem>
          <ListItem onClick={() => OnClickMenu("จัดการสมาชิก")}>
            <ListItemIcon>
              <People hidden={register.alert} />
              <People style={{ color: "#E74C3C" }} hidden={register.empty} />
              <div
                hidden={register.empty}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#E74C3C ",
                  borderRadius: "10px",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                {register.count}
              </div>
            </ListItemIcon>
            <ListItemText primary={"จัดการสมาชิก"} />
          </ListItem>
          <ListItem onClick={() => OnClickMenu("ยกเลิกออม")}>
            <ListItemIcon>
              <LocalAtm hidden={cancel.alert} />
              <LocalAtm style={{ color: "#E74C3C" }} hidden={cancel.empty} />
              <div
                hidden={cancel.empty}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#E74C3C ",
                  borderRadius: "10px",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                {cancel.count}
              </div>
            </ListItemIcon>
            <ListItemText primary={"ยกเลิกออม"} />
          </ListItem>
          <ListItem onClick={() => OnClickMenu("รายการถอน")}>
            <ListItemIcon>
              <AttachMoney hidden={withdraw.alert} />
              <AttachMoney
                style={{ color: "#E74C3C" }}
                hidden={withdraw.empty}
              />
              <div
                hidden={withdraw.empty}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#E74C3C ",
                  borderRadius: "10px",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                {withdraw.count}
              </div>
            </ListItemIcon>
            <ListItemText primary={"รายการถอน"} />
          </ListItem>
          <ListItem onClick={() => OnClickMenu("ตรวจสอบสลิป")}>
            <ListItemIcon>
              <AssignmentTurnedIn hidden={bill.alert} />
              <AssignmentTurnedIn
                style={{ color: "#E74C3C" }}
                hidden={bill.empty}
              />
              <div
                hidden={bill.empty}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#E74C3C ",
                  borderRadius: "10px",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                {bill.count}
              </div>
            </ListItemIcon>
            <ListItemText primary={"ตรวจสอบสลิป"} />
          </ListItem>
          <ListItem onClick={() => OnClickMenu("ข้อมูลย้อนหลัง")}>
            <ListItemIcon>
              <Timeline />
            </ListItemIcon>
            <ListItemText primary={"ข้อมูลย้อนหลัง"} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
export default Header;
