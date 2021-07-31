import React, { useState, useEffect } from "react";
import axios, { post } from "axios";
import { useRouter } from "next/router";
// import Modal from "react-bootstrap/Modal";
import moment from "moment";
import Swal from "sweetalert2";
import Modal from "react-modal";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
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
const ButtonStyle = {
  borderRadius: "8vw",
  width: "16vw",
  height: "16vw",
  backgroundColor: "#fff",
  border: "2px solid #D5D8DC",
  fontSize: "8vw",
  color: "#7e7e7e",
  textAlign: "center",
};
export default function LabelBottomNavigation() {
  const router = useRouter();
  const [isloading, Isloading] = useState(false);
  const [pending, Pending] = useState(false);
  const [dot_1, Dot_1] = useState("dot ml-1 mr-1");
  const [dot_2, Dot_2] = useState("dot ml-1 mr-1");
  const [dot_3, Dot_3] = useState("dot ml-1 mr-1");
  const [dot_4, Dot_4] = useState("dot ml-1 mr-1");
  const [dot_5, Dot_5] = useState("dot ml-1 mr-1");
  const [dot_6, Dot_6] = useState("dot ml-1 mr-1");
  const [PIN, SetPin] = useState("");
  const [us_id, Us_id] = useState(localStorage.getItem("auth"));
  const [detail, Detail] = useState(false);
  const [confrim, Confrim] = useState(true);
  const [point, Point] = useState(String);
  const [unready_text, Unready_text] = useState(String);
  useEffect(async () => {
    LoadUserData();
    CheckPending();
  }, []);
  const RefeshData = async () => {
    LoadUserData();
    CheckPending();
  };
  const CheckPending = async () => {
    var data = {
      user_id: us_id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/withdraw/check_pending_point",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        if (response.status === 201) {
          Pending(false);
        } else {
          Pending(true);
          Unready_text("กำลังดำเนินการ กรุณารอการตรวจสอบรายการภายใน 30 นาที");
        }
        // Point(response.data.data[0].point);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const LoadUserData = async () => {
    var data = {
      user_id: us_id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/user/user_detail",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        Point(response.data.data[0].point);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const onConfirmPass = async () => {
    Detail(true);
    Confrim(false);
  };
  const closeConfrim = async () => {
    Confrim(true);
    Dot_1("dot ml-1 mr-1");
    Dot_2("dot ml-1 mr-1");
    Dot_3("dot ml-1 mr-1");
    Dot_4("dot ml-1 mr-1");
    Dot_5("dot ml-1 mr-1");
    Dot_6("dot ml-1 mr-1");
    SetPin("");
    Detail(false);
  };

  const onRequestWithdraw = async () => {
    // เช็คธนาคาร
    var data = {
      user_id: us_id,
    };
    var user_data = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/user/user_detail",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        if (response.data.data[0].bank_name === "") {
          return "nobank";
        } else {
          return response.data.data[0];
        }
      },
      (error) => {
        console.log(error);
      }
    );
    if (user_data === "nobank") {
      await localStorage.setItem("tab", "โปรไฟล์");
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาตั้งค่าบัญชีธนาคาร!",
      });
      return router.push("/mobile/bank_setting");
    } else {
      // noti admin
      var message_admin = {
        message: "ถอนแต้ม รออนุมัติ",
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

      // noti user
      var messages_user = {
        messages:
          "ระบบได้รับข้อมูลการถอนแต้มของท่านแล้ว \nกรุณารอการตรวจสอบภายใน 30 นาที",
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
      // noti user ตาราง withdraw
      var data = {
        room_id: "",
        user_id: us_id,
        type: "point",
        total: "",
        bank_name: user_data.bank_name,
        bank_number: user_data.bank_number,
        bank_account: user_data.bank_account,
        change: "", //เงินทอน
        point: point, //แต้ม
      };
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer my-token",
          "My-Custom-Header": "foobar",
        },
        url: "/api/withdraw/request_withdraw",
        data: JSON.stringify({ data: data }),
      }).then(
        (response) => {
          RefeshData();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };
  const OnPinPress = async (number) => {
    var Ole_pin = await PIN;
    if (number == "x") {
      if (Ole_pin.length == 1) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        Dot_1("dot ml-1 mr-1");
        SetPin(str);
      }
      if (Ole_pin.length == 2) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        Dot_2("dot ml-1 mr-1");
        SetPin(str);
      }
      if (Ole_pin.length == 3) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        Dot_3("dot ml-1 mr-1");
        SetPin(str);
      }
      if (Ole_pin.length == 4) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        Dot_4("dot ml-1 mr-1");
        SetPin(str);
      }
      if (Ole_pin.length == 5) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        Dot_5("dot ml-1 mr-1");
        SetPin(str);
      }
      if (Ole_pin.length == 6) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        Dot_6("dot ml-1 mr-1");
        SetPin(str);
      }
    } else {
      if (Ole_pin.length == 0) {
        Dot_1("dot_full ml-1 mr-1");
        SetPin((await Ole_pin) + number);
      }
      if (Ole_pin.length == 1) {
        Dot_2("dot_full ml-1 mr-1");
        SetPin((await Ole_pin) + number);
      }
      if (Ole_pin.length == 2) {
        Dot_3("dot_full ml-1 mr-1");
        SetPin((await Ole_pin) + number);
      }
      if (Ole_pin.length == 3) {
        Dot_4("dot_full ml-1 mr-1");
        SetPin((await Ole_pin) + number);
      }
      if (Ole_pin.length == 4) {
        Dot_5("dot_full ml-1 mr-1");
        SetPin((await Ole_pin) + number);
      }
      if (Ole_pin.length == 5) {
        Dot_6("dot_full ml-1 mr-1");
        SetPin((await Ole_pin) + number);
        var data = {
          user_id: us_id,

          password: (await Ole_pin) + number,
        };
        await axios({
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          url: "/api/login_mobile",
          data: JSON.stringify({ data }),
        }).then(
          (response) => {
            if (response.status === 200) {
              onRequestWithdraw(); //ส่งข้อมูลขอถอนแต้ม
              closeConfrim();
              // Confrim(true);
            } else {
              Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "รหัสผ่านไม่ถูกต้อง!",
              });
              Dot_1("dot ml-1 mr-1");
              Dot_2("dot ml-1 mr-1");
              Dot_3("dot ml-1 mr-1");
              Dot_4("dot ml-1 mr-1");
              Dot_5("dot ml-1 mr-1");
              Dot_6("dot ml-1 mr-1");
              SetPin("");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  };
  const GoBack = async () => {
    return router.push("/mobile/route?tab=4");
  };
  return (
    <>
      {/* ////////////////////////////// */}
      <Modal style={customStyles2} isOpen={isloading}>
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </Modal>
      <div hidden={pending} style={{ height: "100vh" }}>
        <div
          style={{
            height: "100vh",
            backgroundColor: "rgb(156, 0, 0)",
            overflow: "scroll",
          }}
          hidden={detail}
        >
          <div className="container mt-3">
            <div className="row">
              <div className="col-2 d-flex justify-content-start">
                {/* <ChevronLeftIcon style={{ fontSize: 40, color: "#fff" }} /> */}
                <div>
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
              </div>
              <div className="col-8 d-flex justify-content-center align-items-center">
                <img
                  src="/image/logo.svg"
                  className="d-flex justify-content-center mt-5"
                  width={"300px"}
                  height={"150px"}
                />
              </div>
              <div className="col-2 d-flex justify-content-end">
                {/* <AddIcon style={{ fontSize: 40, color: "#fff" }} /> */}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-2">
            <div
              className="card"
              style={{
                width: "90vw",
                backgroundImage:
                  "linear-gradient(rgb(255,255,255), rgb(229,229,229))",
              }}
            >
              <div className="card-body ">
                <div className="d-flex justify-content-start col">
                  <input
                    className="form-control"
                    disabled={true}
                    style={{
                      backgroundColor: "rgb(236,216,146)",
                      color: "#fff",
                      textAlign: "center",
                    }}
                    value={
                      "แต้ม " +
                      new Intl.NumberFormat().format(point) +
                      " (" +
                      new Intl.NumberFormat().format(point / 10) +
                      " บาท) "
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-2  mb-5">
            <button
              type="button"
              className="btn  d-flex justify-content-center"
              style={{
                backgroundImage: "linear-gradient(rgb(101,0,0), rgb(53,0,0))",
                color: "#fff",
                fontFamily: "SukhumvitSet-SemiBold",
              }}
              onClick={onConfirmPass}
            >
              ยืนยันการถอน
            </button>
          </div>
        </div>

        {/* ////////////////////////////// */}
        <div style={{ height: "100vh" }} hidden={confrim}>
          <div className="container-fluid" style={{ height: "5vh" }}>
            <div className="container-fluid">
              <div className="row d-flex justify-content-end align-items-center mr-2 pt-3">
                <label
                  style={{
                    fontFamily: "SukhumvitSet-SemiBold",
                  }}
                  onClick={closeConfrim}
                >
                  X
                </label>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "20vh",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <form>
              <div className="form-group d-flex justify-content-center">
                <label>ยืนยันรหัสผ่านของคุณ</label>
              </div>
              <span className={dot_1} />
              <span className={dot_2} />
              <span className={dot_3} />
              <span className={dot_4} />
              <span className={dot_5} />
              <span className={dot_6} />
            </form>
          </div>
          <div className="container-fluid" style={{ height: "60vh" }}>
            <div className="container-fluid">
              <div className="row d-flex justify-content-around">
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => OnPinPress("1")}
                  >
                    1
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => OnPinPress("2")}
                  >
                    2
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => OnPinPress("3")}
                  >
                    3
                  </button>
                </div>
              </div>
            </div>

            <div className="container-fluid mt-3">
              <div className="row d-flex justify-content-around">
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => OnPinPress("4")}
                  >
                    4
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => OnPinPress("5")}
                  >
                    5
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => OnPinPress("6")}
                  >
                    6
                  </button>
                </div>
              </div>
            </div>
            <div className="container-fluid mt-3">
              <div className="row d-flex justify-content-around">
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => OnPinPress("7")}
                  >
                    7
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => OnPinPress("8")}
                  >
                    8
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => OnPinPress("9")}
                  >
                    9
                  </button>
                </div>
              </div>
            </div>
            <div className="container-fluid mt-3">
              <div className="row d-flex justify-content-around">
                <div className="col d-flex justify-content-center"></div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => OnPinPress("0")}
                  >
                    0
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => OnPinPress("x")}
                  >
                    x
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "100vh",
          backgroundColor: "rgb(156, 0, 0)",
          overflow: "scroll",
        }}
        hidden={!pending}
      >
        <div className="container mt-3">
          <div className="row">
            <div className="col-2 d-flex justify-content-start">
              {/* <ChevronLeftIcon style={{ fontSize: 40, color: "#fff" }} /> */}
              <div>
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
            </div>
            <div className="col-8 d-flex justify-content-center align-items-center">
              <img
                src="/image/logo.svg"
                className="d-flex justify-content-center  mt-5"
                width={"300px"}
                height={"150px"}
              />
            </div>
            <div className="col-2 d-flex justify-content-end">
              {/* <AddIcon style={{ fontSize: 40, color: "#fff" }} /> */}
            </div>
          </div>
        </div>
        <div
          className="d-flex justify-content-center  mt-2"
          style={{ color: "#fff", fontFamily: "SukhumvitSet-SemiBold" }}
        >
          <label className="ml-2 mr-2">{unready_text}</label>
        </div>
      </div>
    </>
  );
}
