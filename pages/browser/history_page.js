import React, { useState, useEffect } from "react";
import Cookies from "cookies";
import Typography from "@material-ui/core/Typography";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import HisUser from "./history/hisUser.js";
import HisBill from "./history/hisBill.js";
import HisLogin from "./history/hisLogin.js";
import HisCancel from "./history/hisCancel.js";
import HisWithdraw from "./history/hisWithdraw.js";
import HisSavingroom from "./history/hisSavingroom.js";
const HistoryPage = ({ user }) => {
  const [key, setKey] = useState("bill");
  return (
    <>
      <Typography paragraph>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="bill" title="ประวัติการอัปโหลดสลิป">
            <HisBill />
          </Tab>
          <Tab eventKey="user" title="ประวัติสมาชิก">
            <HisUser />
          </Tab>
          <Tab eventKey="saving_room" title="ประวัติห้องออม">
            <HisSavingroom />
          </Tab>
          <Tab eventKey="withdraw" title="ประวัติการถอน">
            <HisWithdraw />
          </Tab>
          <Tab eventKey="cancel" title="ประวัติการยกเลิกออม">
            <HisCancel />
          </Tab>
          <Tab eventKey="login" title="ประวัติการเข้าสู่ระบบ">
            <HisLogin />
          </Tab>
        </Tabs>
      </Typography>
    </>
  );
};
//   <span onClick={OnLogout}>Go To login</span> */}
export const getServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const user = await cookies.get("user");
  console.log(user);
  if (!user) {
    res.statusCode = 404;
    res.end();
    return { props: {} };
  }
  return {
    props: { user },
  };
};

export default HistoryPage;
