import React from "react";

export default function wait() {
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
      </div>
    </div>
  );
}
