import React from "react";
import axios, { post } from "axios";
export default function wait() {
  const onSendNotiToadminTets = async (e) => {
    var messages_user = {
      messages:
        "ระบบได้รับข้อมูลการอัปโหลดสลิปของท่านแล้ว \nกรุณารอการตรวจสอบภายใน 30 นาที",
      user_id: "Uf08604dbfae9ffdc8123032a8cb2d26c",
    };
    await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/line_messaging_user",
      data: JSON.stringify({ data: messages_user }),
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "rgb(156, 0, 0)",
        overflow: "scroll",
      }}
    >
      <div className="d-flex justify-content-center">
        <img
          src="/image/logo.svg"
          className="d-flex justify-content-center mt-5"
          width={"300px"}
          height={"150px"}
        />
      </div>
      <div
        className="d-flex justify-content-center  mt-2"
        style={{ color: "#fff", fontFamily: "SukhumvitSet-SemiBold" }}
      >
        <label className="ml-2 mr-2">
          ระบบกำลังตรวจสอบข้อมูลการสมัครของท่าน
          อีกสักครู่ท่านจะได้รับข้อความยืนยันการสมัครทางไลน์
        </label>
        <button
          className="btn btn-danger container mb-3"
          onClick={() => onSendNotiToadminTets()}
        >
          ส่งรหัส ข้อความเข้า admin
        </button>
      </div>
    </div>
  );
}
