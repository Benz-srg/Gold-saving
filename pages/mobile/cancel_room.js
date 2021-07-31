import React, { useState, useEffect } from "react";
import axios, { post } from "axios";
import { useRouter } from "next/router";
import moment from "moment";
import Swal from "sweetalert2";
import Modal from "react-modal";
import NumberFormat from "react-number-format";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { createBrowserHistory } from "history";
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
  const [price, Price] = useState(String);
  const [isloading, Isloading] = useState(false);
  const [fee, Fee] = useState(String);

  const [bankname, Bankname] = useState("ชื่อธนาคาร");
  const [bankid, Bankid] = useState(String);
  const [userbankname, Userbankname] = useState(String);

  const [total_savings, Total_savings] = useState(String);
  const [total_savings_gold, Total_savings_gold] = useState(String);
  const [btn_cancel, Btn_cancel] = useState(true);
  const [zero, Zero] = useState(false);
  const [gold, Gold] = useState(false);

  const [dot_1, Dot_1] = useState("dot ml-1 mr-1");
  const [dot_2, Dot_2] = useState("dot ml-1 mr-1");
  const [dot_3, Dot_3] = useState("dot ml-1 mr-1");
  const [dot_4, Dot_4] = useState("dot ml-1 mr-1");
  const [dot_5, Dot_5] = useState("dot ml-1 mr-1");
  const [dot_6, Dot_6] = useState("dot ml-1 mr-1");
  const [PIN, SetPin] = useState("");
  const [detail, Detail] = useState(false);
  const [bankdetail, Bankdetail] = useState(true);
  const [confrim, Confrim] = useState(true);
  const [unready_text, Unready_text] = useState(String);
  const [pending, Pending] = useState(true);

  const [us_id, Us_id] = useState(localStorage.getItem("auth"));
  const [idPattern, IdPattern] = useState([
    { char: /\d/, repeat: 3 },
    { exactly: "-" },
    { char: /\d/, repeat: 2 },
    { char: /[a-z]/i },
  ]);

  const [join_room_id, Join_room_id] = useState(
    localStorage.getItem("join_room")
  );
  useEffect(() => {
    if (join_room_id === "") {
      Isloading(true);
      Pending(true);
      Unready_text("คุณยังไม่มีห้องออม กรุณาเข้าร่วมห้องเพื่อทำการออม");
      Isloading(false);
    } else {
      Isloading(true);
      load_savingroom();
      check_finished();
    }
  }, []);

  const check_finished = async () => {
    var data = {
      room_id: join_room_id,
      user_id: us_id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/joinroom/check_finished",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        console.log("สถานะออม : " + response.status);
        if (response.status == 200) {
          //ออมครบ
          Pending(true);
          Unready_text(
            "คุณไม่สามารถทำการยกเลิกได้ เนื่องจากคุณออมครบตามจำนวนที่กำหนดแล้ว"
          );
        } else {
          //ออมไม่ครบ
          Pending(false);
          check_pending();
        }
        Isloading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const check_pending = async () => {
    var data = {
      user_id: us_id,
      room_id: join_room_id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/cancel/check_pending",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        // console.log(response);
        if (response.status == 200) {
          Pending(true);
          Unready_text(
            "คำขอยกเลิกออมเสร็จสมบูรณ์แล้ว ระบบกำลังตรวจสอบและโอนเงินให้ท่านค่ะ"
          );
        } else {
          Pending(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const load_savingroom = async () => {
    // ข้อมูลการออม
    var data = {
      room_id: join_room_id,
      user_id: us_id,
    };
    var total = await axios({
      // ข้อมูลการออมของผู้ใช้
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
        Total_savings(response.data.data[0].total_savings);
        if (response.data.data[0].total_savings === "0") {
          Zero(true);
        } else {
          Zero(false);
        }
        return response.data.data[0].total_savings;
      },
      (error) => {
        console.log(error);
      }
    );

    var fee_full = await axios({
      // ข้อมูลห้องออม
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
        var weight = response.data.data[0].weight; //น้ำหนัก
        var installment = parseInt(response.data.data[0].installment); //งวดทั้งหมด
        var price = parseInt(response.data.data[0].price); //ราคา รวมค่ากำเหน็ด

        // ค่าธรรมเนียมกรณียกเลิก
        // ครึ่งสลึง กับ 1สลึง เท่ากับงวดแรก
        // 1สลึง กับ 1 บาท เท่ากับ 500 บ. ค่ะ
        var full_bath = 0;
        var fees = 0;
        var One_Bath = 15.16;
        if (weight == "ครึ่งสลึง") {
          //ท่ากับงวดแรก
          full_bath = 1 / 8;
          fees = Math.ceil(price / installment); // ราคาทอง หารจำนวนงวด = ยอดชำระงวดแรก
        }
        if (weight == "1 สลึง") {
          full_bath = 1 / 4;
          fees = Math.ceil(price / installment);
        }
        if (weight == "2 สลึง") {
          //เท่ากับ 500
          full_bath = 1 / 2;
          fees = 500;
        }
        if (weight == "1 บาท") {
          full_bath = 1;
          fees = 500;
        }
        Fee(fees); //ค่าธรรมเนียม
        var g = One_Bath * full_bath;

        var sum = total / response.data.data[0].price;
        var total_g = parseFloat(g * sum).toFixed(4);
        Total_savings_gold(total_g);

        var number = Number(
          response.data.data[0].price.replace(/[^0-9.-]+/g, "")
        );
        Price(number); //
        // Fee(Math.floor(fee));
        return Math.ceil(fees);
      },
      (error) => {
        console.log(error);
      }
    );

    if (total <= fee_full) {
      //ถ้าจำนวนเงินออม น้อยกว่าหรือเท่ากับ ค่าธรรมเนียมจะไม่สามารถยกเลิกได้
      Btn_cancel(true); //ซ่อนปุ่มยกเลิก
    } else {
      Btn_cancel(false); //โชวปุ่มยกเลิก
    }
  };

  const onRequestCancel = async () => {
    var type = "";
    var total = "";
    // var number = (parseInt(total_savings) - parseInt(fee)) / parseInt(price);
    // var total_num = number * 15.16;
    if (gold) {
      // type = "gold";
      // total = total_num;
    } else {
      type = "money";
      total = parseInt(Math.ceil(total_savings)) - parseInt(fee); //ยอดออมลบ ค่าธรรมเนี่ยม
    }
    var data = {
      user_id: us_id, //ยอด
    };
    // ดึงข้อมูล ธนาคาร
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
      return router.push("/mobile/bank_setting"); // ไปยังหน้าตั้งค่าธนาคาร
    } else {
      // noti admin
      var message_admin = {
        message: "ลูกค้ายกเลิกออม รอการตรวจสอบ",
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
          "ระบบได้รับข้อมูลการยกเลิกออมของท่านแล้ว \nกรุณารอการตรวจสอบภายใน 30 นาที",
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

      // send request ส่งคำขอ ยกเลิก เข้าไปใน ตาราง cancel
      var data = {
        room_id: join_room_id, //รหัสห้อง
        user_id: us_id,
        type: type, //เงิน
        total: total,
        bank_name: user_data.bank_name,
        bank_number: user_data.bank_number,
        bank_account: user_data.bank_account,
      };
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer my-token",
          "My-Custom-Header": "foobar",
        },
        url: "/api/cancel/request_cancel",
        data: JSON.stringify({ data: data }),
      }).then(
        (response) => {
          check_pending();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };
  const onConfirmPass = async () => {
    Detail(true);
    Confrim(false);
  };

  const closeConfrim = async () => {
    Dot_1("dot ml-1 mr-1");
    Dot_2("dot ml-1 mr-1");
    Dot_3("dot ml-1 mr-1");
    Dot_4("dot ml-1 mr-1");
    Dot_5("dot ml-1 mr-1");
    Dot_6("dot ml-1 mr-1");
    SetPin("");
    Detail(false);
    Confrim(true);
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
              onRequestCancel(); //ส่งคำขอยกเลิก
              closeConfrim();
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
  const onSelectBank = async (e) => {
    const { value } = e.target;

    Bankname(value);
  };
  const GoBack = async () => {
    return router.push("/mobile/route?tab=3");
  };
  return (
    <>
      <Modal style={customStyles2} isOpen={isloading}>
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </Modal>
      <div hidden={detail} style={{ height: "100vh" }}>
        <div
          style={{
            height: "100vh",
            backgroundColor: "rgb(156, 0, 0)",
            overflow: "scroll",
          }}
          hidden={pending}
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
              <div className="col-8 d-flex justify-content-center align-items-center mt-5">
                <img
                  src="/image/logo.svg"
                  className="d-flex justify-content-center"
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
            className="d-flex justify-content-center mt-2"
            style={{ color: "#fff", fontFamily: "SukhumvitSet-SemiBold" }}
          >
            <label>ยกเลิกการออม</label>
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
                <div
                  className="d-flex justify-content-center col"
                  style={{
                    fontFamily: "SukhumvitSet-SemiBold",
                    color: "rgb(37,37,37)",
                  }}
                >
                  <label hidden={zero}>ทองสะสม {total_savings_gold} กรัม</label>
                  <label hidden={!zero}>ทองสะสม 0 กรัม</label>
                </div>
                <div className="d-flex justify-content-center col">
                  <input
                    className="form-control"
                    disabled={true}
                    style={{
                      textAlign: "center",
                      backgroundColor: "rgb(236,216,146)",
                      color: "#fff",
                    }}
                    value={new Intl.NumberFormat().format(total_savings)}
                  />
                </div>
                <div className="d-flex justify-content-center col">
                  <label>
                    ค่าธรรมเนียม {new Intl.NumberFormat().format(fee)}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div hidden={btn_cancel}>
            <div className="d-flex justify-content-center mt-2 mb-5">
              <button
                type="button"
                className="btn  d-flex justify-content-center"
                style={{
                  // width: "30vw",
                  backgroundImage: "linear-gradient(rgb(101,0,0), rgb(53,0,0))",
                  color: "#fff",
                  fontFamily: "SukhumvitSet-SemiBold",
                }}
                onClick={onConfirmPass} //ปุ่มยกเลิก
              >
                ยืนยันการยกเลิก
              </button>
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
                  className="d-flex justify-content-center"
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
            className="d-flex justify-content-center mt-2"
            style={{ color: "#fff", fontFamily: "SukhumvitSet-SemiBold" }}
          >
            <label className="ml-2 mr-2">{unready_text}</label>
          </div>
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
    </>
  );
}
