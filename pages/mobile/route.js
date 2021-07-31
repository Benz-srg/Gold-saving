import React, { useState, useEffect } from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Profile from "./profile";
import Withdraw from "./withdraw";
import Main from "./main";
import Cancel from "./cancel";

const Tabs = ({ router }) => {
  const {
    query: { tab },
  } = router;
  const isTabOne = tab === "1" || tab == null;
  const isTabTwo = tab === "2";
  const isTabThree = tab === "3";
  const isTabFour = tab === "4";
  const [value, setValue] = React.useState("หน้าหลัก");
  const handleChange = async (event, newValue) => {
    setValue(newValue);
    await localStorage.setItem("tab", newValue);
  };
  useEffect(async () => {
    if (tab == null) {
      setValue("หน้าหลัก");
      await localStorage.setItem("tab", "หน้าหลัก");
    } else {
      // console.log(localStorage.getItem("tab"));
      setValue(await localStorage.getItem("tab"));
    }
  }, []);
  return (
    <>
      <div style={{ height: "90vh", padding: "0px" }}>
        {isTabOne && (
          <React.Fragment>
            <Main />
          </React.Fragment>
        )}
        {isTabTwo && (
          <React.Fragment>
            <Withdraw />
          </React.Fragment>
        )}
        {isTabThree && (
          <React.Fragment>
            <Cancel />
          </React.Fragment>
        )}
        {isTabFour && (
          <React.Fragment>
            <Profile />
          </React.Fragment>
        )}
      </div>
      <div style={{ height: "10vh", padding: "0px" }}>
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction
            label="ห้องออม"
            value="หน้าหลัก"
            icon={
              <Link
                href={{
                  pathname: "/mobile/route",
                  query: { tab: "1" },
                }}
              >
                <img
                  src="/image/icon/iconห้องออมทอง.png"
                  className="d-flex justify-content-center"
                  width={"24px"}
                  height={"24px"}
                />
              </Link>
            }
          />
          <BottomNavigationAction
            label="ถอนทอง"
            value="ถอน"
            icon={
              <Link
                href={{
                  pathname: "/mobile/route",
                  query: { tab: "2" },
                }}
              >
                <img
                  src="/image/icon/iconถอนทอง.png"
                  className="d-flex justify-content-center"
                  width={"24px"}
                  height={"24px"}
                />
              </Link>
            }
          />
          <BottomNavigationAction
            label="ยกเลิกทอง"
            value="ยกเลิก"
            icon={
              <Link
                href={{
                  pathname: "/mobile/route",
                  query: { tab: "3" },
                }}
              >
                <img
                  src="/image/icon/iconยกเลิกทอง.png"
                  className="d-flex justify-content-center"
                  width={"24px"}
                  height={"24px"}
                />
              </Link>
            }
          />
          <BottomNavigationAction
            label="โปรไฟล์"
            value="โปรไฟล์"
            icon={
              <Link
                href={{
                  pathname: "/mobile/route",
                  query: { tab: "4" },
                }}
              >
                <img
                  src="/image/icon/iconProfile.png"
                  className="d-flex justify-content-center"
                  width={"24px"}
                  height={"24px"}
                />
              </Link>
            }
          />
        </BottomNavigation>
      </div>
    </>
  );
};
export default withRouter(Tabs);
