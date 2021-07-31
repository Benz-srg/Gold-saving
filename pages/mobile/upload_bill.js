import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import React, { useState, useEffect } from "react";
import axios, { post } from "axios";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
// import DateTimePicker from "react-widgets/lib/DateTimePicker";
// import "react-datetime/css/react-datetime.css";
// import Datetime from "react-datetime";
// import Modal from "react-bootstrap/Modal";
import moment from "moment";
import Swal from "sweetalert2";
import TimePicker from "react-bootstrap-time-picker";
import Modal from "react-modal";

const customStyles2 = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default function LabelBottomNavigation() {
  const router = useRouter();
  const [money, Money] = useState(String);
  const [min_saving, Min_saving] = useState(Number);
  const [isloading, Isloading] = useState(false);
  const [time, Time] = useState(new Date());
  const [hidealert, Hidealert] = useState(true);
  const [file_bill, File_bill] = useState("");
  const [us_id, Us_is] = useState(localStorage.getItem("auth"));
  const [price, Price] = useState(String);
  const [installment, Installment] = useState(String);
  const [total_installment, Total_installment] = useState(String);
  const [join_room_id, Join_room_id] = useState(
    localStorage.getItem("join_room")
  );
  const [imagePreviewIdCard, ImagePreviewIdCard] = useState(
    <img
      src="/image/no-image.jpg"
      width="300px"
      height="200px"
      alt=""
      style={{ marginLeft: "10px" }}
    />
  );
  useEffect(() => {
    RoomDetail();
  }, []);
  const RoomDetail = async () => {
    var data = {
      user_id: us_id,
      room_id: join_room_id,
    };
    var min_saving_total = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/saving_rooms/roomdata_by_id",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        Price(response.data.data[0].price);
        Installment(response.data.data[0].installment);
        console.log(
          response.data.data[0].price / response.data.data[0].installment
        );
        return response.data.data[0].price / response.data.data[0].installment;
      },
      (error) => {
        console.log(error);
      }
    );

    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/joinroom/getdata_by_user_id",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        Total_installment(response.data.data[0].total_installment);
        console.log(response.data.data[0].total_installment);
        if (response.data.data[0].total_installment == 0) {
          Min_saving(Math.ceil(min_saving_total));
        } else {
          Min_saving(100);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const GoBack = async () => {
    return router.push("/mobile/saving_room");
  };
  const onChangeMoney = (e) => {
    const { value } = e.target;
    const message = value.slice(0, 13);
    if (isNaN(message)) {
    } else {
      Money(Math.ceil(message));
    }
  };
  const onConfrimeSlip = async () => {
    if (file_bill === "") {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "คุณยังไม่อัปโหลดสลิป",
      });
    }
    if (money === "") {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาระบุจำนวนเงิน",
      });
    }
    if ((await parseFloat(money)) < min_saving) {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "จำนวนเงินขั้นต่ำ " + min_saving + " บาท",
      });
    }
    if (time === "") {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาระบุเวลาทำรายการโอน",
      });
    }

    Isloading(true);
    var Bill_Path = await fileUpload(file_bill).then((response) => {
      return response.data.secure_url;
    });
    //ส่งข้อมูลให้แอดมิน
    var message_admin = {
      message: "สลิป รอการตรวจสอบ",
    };
    await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/line_messaging_admin",
      data: JSON.stringify({ data: message_admin }),
    }).then(
      (response) => {},
      (error) => {
        console.log(error);
      }
    );
    //ส่งข้อมูลให้ผู้อัพโหลด
    var messages_user = {
      messages:
        "ระบบได้รับข้อมูลการอัปโหลดสลิปของท่านแล้ว \nกรุณารอการตรวจสอบภายใน 30 นาที",
      user_id: us_id,
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

    var data = {
      user_id: us_id,
      bill_path: Bill_Path,
      money: money,
      time: time,
      room_id: join_room_id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/bill/upload",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        Isloading(false);
        Swal.fire({
          icon: "success",
          title: "เรียบร้อย",
          text: "กรุณารอการตรวจสอบภายใน 24 ชั่วโมง",
        });

        return router.push("/mobile/saving_room");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const fileUpload = (file) => {
    const url = "https://api.cloudinary.com/v1_1/zxv/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_bill");
    return axios.post(url, formData);
  };
  const onCheckMin = async () => {
    if ((await parseFloat(money)) < min_saving) {
      await Hidealert(false);
    } else {
      await Hidealert(true);
    }
  };
  const imageIdCardChange = async (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      File_bill(file);
      ImagePreviewIdCard(
        <img
          src={reader.result}
          width="300px"
          height="200px"
          alt=""
          style={{ marginLeft: "10px" }}
        />
      );
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
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
            className="d-flex justify-content-center  mt-5"
            width={"300px"}
            height={"150px"}
            //
          />
        </div>
        <div className="d-flex justify-content-center pl-3 pr-3">
          <IconButton
            style={{ backgroundColor: "#fff", padding: "0" }}
            className="mr-auto"
            onClick={GoBack}
          >
            <ChevronLeftIcon
              style={{ fontSize: 40, color: "rgb(156, 0, 0)" }}
            />
          </IconButton>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <div className="d-flex justify-content-center mb-3">
            {imagePreviewIdCard}
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <input
            className="fileInputcustom"
            type="file"
            id="file"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={(e) => imageIdCardChange(e)}
          />
          {/* <button htmlFor="file" type="button" className="btn btn-light">
            Light
          </button> */}

          <label htmlFor="file" type="button" className="btn btn-light">
            เลือกรูปภาพ
          </label>
        </div>

        <div className="d-flex justify-content-center mt-2">
          <div className="modal-body ">
            <div
              className="form-group"
              style={{ color: "#fff", fontFamily: "SukhumvitSet-SemiBold" }}
            >
              <label for="comment">ระบุจำนวนเงิน :</label>
              <div className="row">
                <div className="col-md-auto" style={{ width: "80vw" }}>
                  <input
                    type="text"
                    className=" inputUpload d-flex justify-content-center"
                    style={{ color: "#fff", width: "80vw" }}
                    placeholder={"ขั้นต่ำ " + min_saving + " บาท"}
                    value={money}
                    onChange={(e) => onChangeMoney(e)}
                    onMouseLeave={() => onCheckMin()}
                  />
                </div>
                <div
                  className="col"
                  style={{
                    color: "#fff",
                    width: "10vw",
                  }}
                >
                  บาท
                </div>
              </div>
            </div>
            <p
              style={{
                fontFamily: "SukhumvitSet-SemiBold",
                color: "#F1C40F",
                margin: "0px",
                padding: "0px",
              }}
              hidden={hidealert}
            >
              *ขั้นต่ำ {min_saving} บาท
            </p>
            <div
              className="form-group"
              style={{ color: "#fff", fontFamily: "SukhumvitSet-SemiBold" }}
            >
              <label for="comment">ระบุเวลาโอนสลิป :</label>
              <DatePicker
                className="react-datepicker__input-container2 input"
                selected={time}
                onChange={(e) => Time(e)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2 mb-5">
          <button
            type="button"
            className="btn d-flex justify-content-center align-items-center"
            // style={{
            //   backgroundColor: "rgb(56, 0, 0)",
            //   width: "90vw",
            //   height: "10vh",
            //   fontFamily: "SukhumvitSet-SemiBold",
            //   color: "#fff",
            //   textAlign: "center",
            // }}
            style={{
              backgroundColor: "rgb(231, 180, 0)",
              fontFamily: "SukhumvitSet-SemiBold",
              color: "#fff",
              height: "10vh",
              width: "90vw",
              fontSize:"1.2em",
              marginLeft:"0px!important"
            }}
            onClick={onConfrimeSlip}
          >
            ยืนยันการชำระ
          </button>
        </div>
      </div>

      <Modal style={customStyles2} isOpen={isloading}>
        <button className="btn btn-primary" type="button" disabled>
          <span
            className="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          />
          กรุณารอสักครู่...
        </button>
      </Modal>
    </>
  );
}
