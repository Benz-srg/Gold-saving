import React, { useState, useEffect } from "react";
import Cookies from "cookies";
import axios, { post } from "axios";

const DashboardPage = ({ user }) => {
  const [fixbutton, Fixbutton] = useState(false);
  const [member, Member] = useState(String);
  const [installment, Installment] = useState(String);
  const [point, Point] = useState(String);
  const [day, Day] = useState(String);
  const [us_id, Us_id] = useState(localStorage.getItem("auth_backend"));
  const [us_role, Us_role] = useState(localStorage.getItem("role"));
  useEffect(async () => {
    Refesh();
  }, []);
  const Refesh = async () => {
    await axios({
      method: "GET",
      url: "/api/saving_room_setting/save_setting",
    }).then((response) => {
      Member(response.data.data[0].min_member);
      Installment(response.data.data[0].installment);
      Day(response.data.data[0].day);
      Point(response.data.data[0].point);
    });
  };

  const onChangeMember = (e) => {
    const { value } = e.target;
    const message = value.slice(0, 13);
    if (isNaN(message)) {
    } else {
      Member(message);
    }
  };
  const onChangeInstallment = (e) => {
    const { value } = e.target;
    const message = value.slice(0, 13);
    if (isNaN(message)) {
    } else {
      Installment(message);
    }
  };
  const onChangePoint = (e) => {
    const { value } = e.target;
    const message = value.slice(0, 13);
    if (isNaN(message)) {
    } else {
      Point(message);
    }
  };
  const onChangeDay = (e) => {
    const { value } = e.target;
    const message = value.slice(0, 13);
    if (isNaN(message)) {
    } else {
      Day(message);
    }
  };
  const SaveSetting = () => {
    var data = {
      min_member: member,
      installment: installment,
      day: day,
      point: point,
      fee: "0",
      user_id: us_id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/saving_room_setting/save_setting",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        console.log(response);
        Fixbutton(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const CancelSetting = () => {
    Fixbutton(false);
    Refesh();
  };
  return (
    <>
      <div style={{ fontFamily: "SukhumvitSet" }}>
        <div className="card ">
          <div className="card-header">ตั้งค่าข้อมูลห้องออม</div>
          <div className="card-body">
            <div className="form-group">
              <label>สมาชิกขั้นต่ำ (คน)</label>
              <input
                disabled={!fixbutton}
                type="text"
                className="form-control"
                value={member}
                onChange={(e) => onChangeMember(e)}
                placeholder="จำนวนสมาชิกขั้นต่ำในการขอสร้างห้องออม"
              />
            </div>
            <div className="form-group">
              <label>จำนวนงวด</label>
              <input
                disabled={!fixbutton}
                type="text"
                className="form-control"
                value={installment}
                onChange={(e) => onChangeInstallment(e)}
                placeholder="จำนวนงวดในการออม"
              />
            </div>
            <div className="form-group">
              <label>ระยะเวลาต่องวด (วัน)</label>
              <input
                disabled={!fixbutton}
                type="text"
                className="form-control"
                value={day}
                onChange={(e) => onChangeDay(e)}
                placeholder="ระยะเวลาต่องวด (จำนวนวัน)"
              />
            </div>
            <div className="form-group">
              <label>จำนวนแต้มในการโอนครั้งแรก</label>
              <input
                disabled={!fixbutton}
                type="text"
                className="form-control"
                value={point}
                onChange={(e) => onChangePoint(e)}
                placeholder="จำนวนงวดในการออม"
              />
            </div>
            <button
              className="btn btn-primary"
              hidden={fixbutton}
              onClick={() => Fixbutton(true)}
            >
              แก้ไข
            </button>
            <button
              type="button"
              hidden={!fixbutton}
              className="btn btn-success mr-2"
              onClick={() => SaveSetting()}
            >
              บันทึก
            </button>
            <button
              type="button"
              className="btn btn-danger"
              hidden={!fixbutton}
              onClick={() => CancelSetting()}
            >
              ยกเลิก
            </button>
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
