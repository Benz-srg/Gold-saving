import React, { useState, useEffect } from "react";
import Cookies from "cookies";
import axios, { post } from "axios";
import Typography from "@material-ui/core/Typography";
// import Modal from "react-modal";

import Modal from "react-bootstrap/Modal";
const TitleStyle = {
  color: "rgb(0 ,0 ,0) ",
  fontSize: "18pt",
  fontFamily: "SukhumvitSet-SemiBold",
};
const TitleNameStyle = {
  color: "rgb(0 ,0 ,0) ",
  fontSize: "10pt",
  fontFamily: "SukhumvitSet-SemiBold",
};
const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  content: {
    position: "fixed",
    top: "10vh",
    left: "10vw",
    right: "10vw",
    bottom: "10vh",
    border: "1px solid #ccc",
    background: "#fff",
    // overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "10px",
    outline: "none",
    padding: "0px",
  },
};
const DashboardPage = ({ user }) => {
  const [name, setName] = useState(String);
  const [time, setTime] = useState(String);
  const [gold, setGold] = useState(Array);
  const [openPanel, setOpenPanel] = useState(false);
  const [gold_bar, setGold_bar] = useState(Array);
  const [show, setShow] = useState(false);
  const [alluser, Alluser] = useState(String);
  const [users, Users] = useState(String);
  const [emp, Emp] = useState(String);
  const [mgr, Mgr] = useState(String);
  const [admin, Admin] = useState(String);
  const [sup_admin, Sup_admin] = useState(String);
  const [allroom, Allroom] = useState(String);
  const [saving, Saving] = useState(String);
  const [finish, Finish] = useState(String);
  const [pending, Pending] = useState(String);
  const [us_id, Us_id] = useState(localStorage.getItem("auth_backend"));
  const [us_role, Us_role] = useState(localStorage.getItem("role"));
  const [hide_sup_admin, Hide_sup_admin] = useState(false);
  const [hide_admin, Hide_admin] = useState(false);
  const [hide_emp, Hide_emp] = useState(false);
  const [hide_mgr, Hide_mgr] = useState(false); //James add
  useEffect(() => {
    if (us_role === "emp") {
      //พนักงาน
      Hide_emp(true);
      Hide_mgr(true);
      Hide_admin(true);
      Hide_sup_admin(true);
    }
    if (us_role === "admin") {
      //เจ้าของร้าน
      Hide_sup_admin(true);
    }
    if (us_role === "mgr") { //James add
      //ผู้จัดการร้าน
      Hide_admin(true);
      Hide_sup_admin(true);      
    }
    axios({
      method: "get",
      url: "https://thai-gold-api.herokuapp.com/latest",
    }).then((response) => {
      // console.log(response.data.response.date);
      setName(response.data.response.date);
      setTime(response.data.response.update_time);
      setGold(response.data.response.price.gold);
      setGold_bar(response.data.response.price.gold_bar);
    });
    //ดึงข้อมูลผู้ใช้ และข้อมูลห้อง
    axios({
      method: "get",
      url: "/api/user/user_and_room",
    }).then((response) => {
      Alluser(response.data.data.allusers); //ผู้ใช้ทั้งหมด
      Users(response.data.data.user_users); //ผู้ใช้ทั่วไป
      Admin(response.data.data.admin_users); //เจ้าของร้าน
      Mgr(response.data.data.mgr_users); //ผู้จัดการร้าน James add later
      Emp(response.data.data.emp_users); //พนักงาน
      Sup_admin(response.data.data.sup_users); //ซุปเปอร์แอดมิน

      Allroom(response.data.data.allsavingrooms); //ห้องทั้งหมด
      Saving(response.data.data.ready_savingrooms); //ห้องที่กำลังออม
      Finish(response.data.data.finish_savingrooms); //ห้องที่ออมสำเร็จ
      Pending(response.data.data.pending_savingrooms); //ห้องรออนุมัติ
    });
  }, []);
  // const Test = axiosTest();
  setInterval(
    () =>
      axios({
        method: "get",
        url: "https://thai-gold-api.herokuapp.com/latest",
      }).then((response) => {
        console.log(response.data.response.date);
        setName(response.data.response.date);
        setTime(response.data.response.update_time);
        setGold(response.data.response.price.gold);
        setGold_bar(response.data.response.price.gold_bar);
      }),
    1000 * 60 * 15
  );

  return (
    <>
      <div>
        <div className="card">
          <div className="card-body">
            <Typography paragraph>ราคาทองวันที่ {name}</Typography>
            <Typography paragraph>อัปเดต {time}</Typography>
            <Typography paragraph>
              ทองคำแท่ง ขาย {gold_bar.sell} ซื้อ {gold_bar.buy}
            </Typography>
            {/* <Typography paragraph>
              ทองรูปพรรณ ซื้อ {gold_bar.buy} ขาย {gold_bar.sell}
            </Typography> */}
          </div>
        </div>
        <div className="mt-5">
          <div className="row">
            <div className="col-6">
              <div className="card" style={{ minHeight: "40vh" }}>
                <div className="card-body">
                  <Typography paragraph style={{ textAlign: "center" }}>
                    ข้อมูลห้องออม
                  </Typography>

                  <div className="row">
                    <div className="col-8">
                      <Typography paragraph>ห้องทั้งหมด</Typography>
                    </div>
                    <div className="col-2">{allroom}</div>
                    <div className="col-2">ห้อง</div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <Typography paragraph>กำลังออม</Typography>
                    </div>
                    <div className="col-2">{saving}</div>
                    <div className="col-2">ห้อง</div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <Typography paragraph>ออมสำเสร็จ</Typography>
                    </div>
                    <div className="col-2">{finish}</div>
                    <div className="col-2">ห้อง</div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <Typography paragraph>รออนุมัติ</Typography>
                    </div>
                    <div className="col-2">{pending}</div>
                    <div className="col-2">ห้อง</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card" style={{ minHeight: "40vh" }}>
                <div className="card-body">
                  <Typography paragraph style={{ textAlign: "center" }}>
                    ข้อมูลสมาชิก
                  </Typography>

                  <div className="row">
                    <div className="col-8">
                      <Typography paragraph>สมาชิกทั้งระบบ</Typography>
                    </div>
                    <div className="col-2">{alluser}</div>
                    <div className="col-2">คน</div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <Typography paragraph>ผู้ใช้ทั่วไป</Typography>
                    </div>
                    <div className="col-2">{users}</div>
                    <div className="col-2">คน</div>
                  </div>
                  <div className="row" hidden={hide_emp}>
                    <div className="col-8">
                      <Typography paragraph>พนักงาน</Typography>
                    </div>
                    <div className="col-2">{emp}</div>
                    <div className="col-2">คน</div>
                  </div>

                  <div className="row" hidden={hide_mgr}>
                    <div className="col-8">
                      <Typography paragraph>ผู้จัดการร้าน</Typography>
                    </div>
                    <div className="col-2">{mgr}</div>
                    <div className="col-2">คน</div>
                  </div>

                  <div className="row" hidden={hide_admin}>
                    <div className="col-8">
                      <Typography paragraph>เจ้าของร้าน</Typography>
                    </div>
                    <div className="col-2">{admin}</div>
                    <div className="col-2">คน</div>
                  </div>
                  <div className="row" hidden={hide_sup_admin}>
                    <div className="col-8">
                      <Typography paragraph>ซุปเปอร์แอดมิน</Typography>
                    </div>
                    <div className="col-2">{sup_admin}</div>
                    <div className="col-2">คน</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
//   <span onClick={OnLogout}>Go To login</span> */}
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

export default DashboardPage;
