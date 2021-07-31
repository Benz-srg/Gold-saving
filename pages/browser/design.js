import React, { useState, useEffect } from "react";
import Cookies from "cookies";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NumberFormat from "react-number-format";
const DashboardPage = ({ user }) => {
  return (
    <>
      <div>
        <div className="card ">
          <div className="card-body">
            <h5 className="card-title">ข้อมูลการโอน(โอนจาก)</h5>

            <div className="container">
              <div className="row ">
                <label>ชื่อบัญชี:</label>
              </div>
              <div className="row">
                <input className="custom_date" type="text" />
              </div>
              <div className="row">
                <label>ชื่อธนาคาร:</label>
              </div>
              <div className="row">
                <select contentEditable={true} className="custom_date">
                  <option selected disabled={true}>
                    กรุณาเลือกธนาคาร...
                  </option>
                  <option>ธนาคารแห่งประเทศไทย</option>
                  <option>ธนาคารกสิกรไทย</option>
                  <option>ธนาคารกรุงเทพ</option>
                  <option>ธนาคารกรุงไทย</option>
                  <option>ธนาคารกรุงศรีอยุธยา</option>
                  <option>ธนาคารซีไอเอ็มบีไทย</option>
                  <option>ธนาคารทหารไทย</option>
                  <option>ธนาคารไทยพาณิชย์</option>
                  <option>ธนาคารยูโอบี</option>
                  <option>ธนาคารแลนด์แอนด์ เฮ้าส์</option>
                  <option>ธนาคารสแตนดาร์ด</option>
                  <option>ธนาคารธนชาต</option>
                  <option>ธนาคารออมสิน</option>
                  <option>ธนาคารเกียรตินาคินภัทร</option>
                  <option>ธนาคารซิตี้แบงค์</option>
                  <option>ธนาคารอาคารสงเคราะห์</option>
                  <option>ธนาคาร ธ.ก.ส</option>
                  <option>ธนาคารมิซูโฮ</option>
                  <option>ธนาคารอิสลาม</option>
                  <option>ธนาคารทิสโก้</option>
                  <option>ธนาคารไอซีบีซี</option>
                  <option>ธนาคารไทยเครดิต</option>
                  <option>ธนาคารซูมิโตโมมิตซุย</option>
                  <option>ธนาคารเอชเอสบีซี</option>
                  <option>ธนาคารดอยซ์แบงก์ เอจี</option>
                  <option>ธนาคารแห่งประเทศจีน</option>
                  <option>ธนาคารเอเอ็นแซด</option>
                </select>
              </div>
              <div className="row ">
                <label>เลขที่บัญชี:</label>
              </div>
              <div className="row">
                <NumberFormat
                  className="inputUpload2"
                  format="###-#-#####-###"
                  style={{
                    backgroundColor: "#fff",
                    fontFamily: "SukhumvitSet-SemiBold",
                    color: "rgb(0, 0, 0)",
                  }}
                  // value={bankid}
                  // onValueChange={(values) => Bankid(values.value)}
                />
              </div>
              <div className="row">
                <label>วันเวลาใน สลิปโอนเงิน:</label>
              </div>
              <div className="row">
                <div className="custom_date">
                  <DatePicker
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                  />
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
