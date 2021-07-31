import React, { useState, useEffect } from "react";
import axios, { post } from "axios";
import { useRouter } from "next/router";
// import Modal from "react-bootstrap/Modal";
import moment from "moment";
import Swal from "sweetalert2";
import Modal from "react-modal";

import NumberFormat from "react-number-format";
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
  const [withdraw, Withdraw] = useState(true);
  const [isloading, Isloading] = useState(false);
  const [price, Price] = useState(String);
  const [installment, Installment] = useState(String);
  const [totalsaving, Totalsaving] = useState(String);
  const [point, Point] = useState(String);
  const [change, Change] = useState(String);
  const [rank, Rank] = useState(String);
  const [weight, Weight] = useState(String);
  const [unready_text, Unready_text] = useState(String);
  const [gold, Gold] = useState(true);
  const [dot_1, Dot_1] = useState("dot ml-1 mr-1");
  const [dot_2, Dot_2] = useState("dot ml-1 mr-1");
  const [dot_3, Dot_3] = useState("dot ml-1 mr-1");
  const [dot_4, Dot_4] = useState("dot ml-1 mr-1");
  const [dot_5, Dot_5] = useState("dot ml-1 mr-1");
  const [dot_6, Dot_6] = useState("dot ml-1 mr-1");
  const [PIN, SetPin] = useState("");
  const [us_id, Us_id] = useState(localStorage.getItem("auth"));
  const [join_room_id, Join_room_id] = useState(
    localStorage.getItem("join_room")
  );
  const [detail, Detail] = useState(false);
  const [bankdetail, Bankdetail] = useState(true);
  const [confrim, Confrim] = useState(true);
  const [bankname, Bankname] = useState("ชื่อธนาคาร");
  const [bankid, Bankid] = useState(String);
  const [userbankname, Userbankname] = useState(String);
  useEffect(async () => {
    if (join_room_id === "") {
      Isloading(true);
      Withdraw(true);
      Unready_text("คุณยังไม่มีห้องออม กรุณาเข้าร่วมห้องเพื่อทำการออม");
      Isloading(false);
    } else {
      Isloading(true);
      check_finished();
    }
  }, []);

  const check_finished = async () => {
    var data = {
      room_id: join_room_id,
      user_id: us_id,
    };

    // ดึงข้อมูลผู้ใช้ที่ออมงวดแรก ในห้องนั้นๆ
    var total_member_uploadbill = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/joinroom/total_member_uploaded",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        return response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );
    // ข้อมูลการออมของผู้ใช้
    var total = await axios({
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
        Totalsaving(Math.ceil(response.data.data[0].total_savings));
        return response.data.data[0].total_savings;
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
      url: "/api/joinroom/check_finished",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        console.log("สถานะออม : " + response.status);
        if (response.status == 200) {
          //ออมครบ
          Withdraw(false);
          check_pending();
        } else {
          //ออมไม่ครบ
          Withdraw(true);
          Unready_text(
            "คุณไม่สามารถทำการถอนได้ เนื่องจากยังออมไม่ครบจำนวนที่กำหนด"
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
    //ดึงข้อมูลอันดับที่จบได้ เช่น อันดับ 1 ,2 ,3
    var rank_number = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/joinroom/ranking_by_id",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        Rank(response.data.data);
        return response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );
    //ข้อมูลห้องงออม
    axios({
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
        var weight = response.data.data[0].weight;
        var poin = 0;
        console.log(Math.ceil(response.data.data[0].price));
        /// ตัวหาร
        //คำนวนโบนัส

        //   ขนาดทอง : "ครึ่งสลึง"{
        //  ตัวหาร = (10 / 20000) * (ราคาทองแบบ(ไม่)รวมค่ากำเหน็ด ขนาด "1 บาท");
        //  แต้ม= (ราคาทองแบบรวมค่ากำเหน็ด ขนาด "ครึ่งสลึง") ÷ ตัวหาร;
        //        }
        //       ขนาดทอง : "1 สลึง"{
        //  ตัวหาร = (12 / 25000) * (ราคาทองแบบ(ไม่)รวมค่ากำเหน็ด  ขนาด "1 บาท");
        //  แต้ม= (ราคาทองแบบรวมค่ากำเหน็ด ขนาด "1 สลึง") ÷ ตัวหาร;
        //        }
        //       ขนาดทอง : "2 สลึง"{
        //  ตัวหาร = (20 / 26000) * (ราคาทองแบบ(ไม่)รวมค่ากำเหน็ด ขนาด "1 บาท");
        //  แต้ม= (ราคาทองแบบรวมค่ากำเหน็ด ขนาด "2 สลึง") ÷ ตัวหาร;
        //        }
        //       ขนาดทอง : "1 บาท"{
        //  ตัวหาร = (30 / 26000) * (ราคาทองแบบ(ไม่)รวมค่ากำเหน็ด ขนาด "1 บาท");
        //  แต้ม= (ราคาทองแบบรวมค่ากำเหน็ด ขนาด "1 บาท") ÷ ตัวหาร;
        //        }

        if (weight == "ครึ่งสลึง") {
          var price_nomal = (response.data.data[0].price - 900) * 8; //แปลงราคารวมค่ากำเหน็ดกลับไปเป็นราคาทองแบบ(ไม่)รวมค่ากำเหน็ด
          var divider = (10 / 20000) * price_nomal; /// ตัวหาร
          poin = Math.ceil(response.data.data[0].price) / divider;
        }
        if (weight == "1 สลึง") {
          var price_nomal = (response.data.data[0].price - 1100) * 4; //แปลงราคารวมค่ากำเหน็ดกลับไปเป็นราคาทองแบบ(ไม่)รวมค่ากำเหน็ด
          var divider = (12 / 25000) * price_nomal; /// ตัวหาร
          poin = Math.ceil(response.data.data[0].price) / divider;
        }
        if (weight == "2 สลึง") {
          var price_nomal = (response.data.data[0].price - 1400) * 2; //แปลงราคารวมค่ากำเหน็ดกลับไปเป็นราคาทองแบบ(ไม่)รวมค่ากำเหน็ด

          console.log(price_nomal);
          var divider = (20 / 26000) * price_nomal; /// ตัวหาร
          poin = Math.ceil(response.data.data[0].price) / divider;
        }
        if (weight == "1 บาท") {
          var price_nomal = response.data.data[0].price - 1750;
          var divider = (30 / 26000) * price_nomal; /// ตัวหาร
          poin = Math.ceil(response.data.data[0].price) / divider;
        }

        console.log(poin); //แต้มแบบยังไม่คูณอันดับ

        // total_member_uploadbill จำนวนคนที่ออมงวดแรก
        // มี 2 ลำดับ ลำดับ1 = แต้ม*2
        // ในห้องมีสมาชิก 3 คน
        // มี 3 ลำดับ ลำดับ1 = แต้ม*3
        // ในห้องมีสมาชิก 4 คน
        // มี 4 ลำดับ ลำดับ1 = แต้ม*4
        // ลำดับ 1 แต้ม*5
        // ลำดับ 2 แต้ม*4
        // ลำดับ 3 แต้ม*3
        // ลำดับ 4 แต้ม*2
        // ลำดับ 5 แต้ม*1
        // ลำดับต่ำว่าลงไป แต้ม*1
        if (total_member_uploadbill === 2) {
          //มีสองคน
          if (rank_number == 1) {
            // ถ้าได้ที่ 1 จะคูณ 2
            poin = poin * 2;
          }
          if (rank_number == 2) {
            poin = poin * 1;
          }
        }
        if (total_member_uploadbill === 3) {
          if (rank_number == 1) {
            poin = poin * 3;
          }
          if (rank_number == 2) {
            poin = poin * 2;
          }
          if (rank_number == 3) {
            poin = poin * 1;
          }
        }
        if (total_member_uploadbill === 4) {
          if (rank_number == 1) {
            poin = poin * 4;
          }
          if (rank_number == 2) {
            poin = poin * 3;
          }
          if (rank_number == 3) {
            poin = poin * 2;
          }
          if (rank_number == 4) {
            poin = poin * 1;
          }
        }
        if (total_member_uploadbill > 4) {
          //ถ้ามีมากกว่า 4 คน
          if (rank_number == 1) {
            // ถ้าได้ที่ 1 จะคูณ 5
            poin = poin * 5;
          }
          if (rank_number == 2) {
            poin = poin * 4;
          }
          if (rank_number == 3) {
            poin = poin * 3;
          }
          if (rank_number == 4) {
            poin = poin * 2;
          }
          if (rank_number > 4) {
            poin = poin * 1;
          }
        }
        Point(Math.ceil(poin)); //โบนัส
        Price(Math.ceil(response.data.data[0].price)); //ราคาทอง
        Installment(Math.ceil(response.data.data[0].installment)); //ราคาทอง
        Change(Math.ceil(total) - ((Math.ceil(response.data.data[0].price / response.data.data[0].installment) * response.data.data[0].installment))); //เงินทอน
        Weight(response.data.data[0].weight); //น้ำหนักทอง
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
      url: "/api/withdraw/check_pending",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        console.log("สถานะการถอน : " + response.status);
        // console.log(response);
        if (response.status == 200) {
          //กำลังออม
          Withdraw(true);
          Unready_text("กำลังดำเนินการ กรุณารอการตรวจสอบรายการภายใน 30 นาที");
        } else {
          Withdraw(false);
        }
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
    //การจะเป็นการถอนทองอย่างเดียว
    var type = "";
    var total = "";
    if (gold) {
      type = "gold";
      total = weight;
    } else {
      // type = "money";
      // total = price;
    }

    //ดึงข้อมูลธนาคาร
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
      //ถ้าไม่มีข้อมูลธนาคาร
      await localStorage.setItem("tab", "โปรไฟล์");
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาตั้งค่าบัญชีธนาคาร!",
      });
      return router.push("/mobile/bank_setting");
    } else {
      //ถ้ามีข้อมูลธนาคาร

      //noti admin
      var message_admin = {
        message: "ลูกค้าถอนทอง รอการตรวจสอบ",
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
      //noti user
      var messages_user = {
        messages:
          "ระบบได้รับข้อมูลการถอนทองของท่านแล้ว \nกรุณารอการตรวจสอบภายใน 30 นาที",
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
        room_id: join_room_id,
        user_id: us_id,
        type: type,
        total: total,
        bank_name: user_data.bank_name,
        bank_number: user_data.bank_number,
        bank_account: user_data.bank_account,
        change: change, //เงินทอน
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
          check_finished();
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
              onRequestWithdraw();
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
    return router.push("/mobile/route?tab=2");
  };
  return (
    <>
      {/* ////////////////////////////// */}
      <Modal style={customStyles2} isOpen={isloading}>
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </Modal>
      <div hidden={withdraw} style={{ height: "100vh" }}>
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
          <div
            className="d-flex justify-content-center mt-2"
            style={{ color: "#fff", fontFamily: "SukhumvitSet-SemiBold" }}
          >
            <label>ถอนทอง</label>
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
                  <label>ทอง {weight}</label>
                </div>
                <div className="d-flex justify-content-start col">
                  <input
                    className="form-control"
                    disabled={true}
                    style={{
                      backgroundColor: "#D4AC0D",
                      color: "#fff",
                    }}
                    value={"จบอันดับที่ " + rank}
                  />
                </div>
                <div className="d-flex justify-content-start col">
                  <input
                    className="form-control"
                    disabled={true}
                    style={{
                      backgroundColor: "#D4AC0D",
                      color: "#fff",
                    }}
                    value={
                      "ราคาทอง " +
                      new Intl.NumberFormat().format(Math.ceil((price / installment))*installment)+
                      " บาท"
                    }
                    // {new Intl.NumberFormat().format(price) +
                    //   " บาท"}
                  />
                </div>
                <div className="d-flex justify-content-start col">
                  <input
                    className="form-control"
                    disabled={true}
                    style={{
                      backgroundColor: "#D4AC0D",
                      color: "#fff",
                    }}
                    value={
                      "ยอดโอนสะสม " +
                      new Intl.NumberFormat().format(totalsaving) +
                      " บาท"
                    }
                  />
                </div>
                <div className="d-flex justify-content-start col">
                  <input
                    className="form-control"
                    disabled={true}
                    style={{
                      backgroundColor: "#D4AC0D",
                      color: "#fff",
                    }}
                    value={
                      "เงินทอน " +
                      new Intl.NumberFormat().format(change) +
                      " บาท"
                    }
                  />
                </div>
                <div className="d-flex justify-content-start col">
                  <input
                    className="form-control"
                    disabled={true}
                    style={{
                      backgroundColor: "#D4AC0D",
                      color: "#fff",
                    }}
                    value={
                      "โบนัส " +
                      new Intl.NumberFormat().format(point) +
                      " (" +
                      (new Intl.NumberFormat().format(point / 10)).toFixed(2) +
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
              onClick={onConfirmPass} //ปุ่มถอน
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
        hidden={!withdraw}
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
