import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import React, { useState, useEffect, useRef } from "react";
import axios, { post } from "axios";
import { useRouter } from "next/router";
import moment from "moment";
import Swal from "sweetalert2";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Refresh from "@material-ui/icons/Refresh";
import Modal from "react-bootstrap/Modal";
import ModalReact from "react-modal";
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
  const textAreaRef = useRef(null);
  const [isEmpty, IsEmpty] = useState(false);
  const [createroom, Createroom] = React.useState(false);
  const [joinroom, Joinroom] = React.useState(false);
  const [isloading, Isloading] = useState(false);
  const [isloading2, Isloading2] = useState(false);
  const [isloading_text, Isloading_text] = useState(false);
  const [all_room, All_room] = useState(Array);
  const [minmember, Minmember] = useState(String);
  const [installment, Installment] = useState(String);
  const [day, Day] = useState(String);
  const [member, Member] = useState("");
  const [hidealert, Hidealert] = useState(true);
  const [weight, Weight] = useState("น้ำหนักทอง");
  const [goldprice, setGoldprice] = useState(Array);
  const [password, Password] = useState(String);
  const [us_id, Us_id] = useState(localStorage.getItem("auth"));
  useEffect(() => {
    LoadSetingRoom();
    GoldPrice();
    LoadAllRoom();
  }, []);
  const Refresh_data = async () => {
    LoadSetingRoom();
    GoldPrice();
    LoadAllRoom();
  };
  const LoadAllRoom = async () => {
    var data = {
      user_id: us_id,
    };
    // console.log(us_id);
    await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/saving_rooms/load_owner_and_joining",
      data: JSON.stringify({ data: data }),
    }).then(
      async (response) => {
        //เช็คข้อมูล ห้องออมว่า มีมัย
        if (response.data.data.length === 0) {
          //ไม่มีข้อมูลห้องออม
          IsEmpty(false);
        } else {
          //มีข้อมูลห้องออม
          // console.log(response.data.data.length);
          IsEmpty(true);
        }
        var Data = [];
        for (let index = 0; index < response.data.data.length; index++) {
          const element = response.data.data[index];
          // console.log(element);

          // ส่งรหัสห้อง ( element.room_id )ไปหาว่า ห้องนี้ มีคนจอยแล้วกี่คน สูดสุดกี่คน
          var total_and_max = await axios({
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer my-token",
              "My-Custom-Header": "foobar",
            },
            url: "/api/saving_rooms/get_total_and_max",
            data: JSON.stringify({ data: element.room_id }),
          }).then(
            (response) => {
              return response.data.data;
            },
            (error) => {
              console.log(error);
            }
          );

          // console.log(total_and_max);
          moment.locale("th");
          var user_type = "";
          // เช็คว่าเป็นเจ้าของห้องรึป่าว;
          if (element.owner === us_id) {
            user_type = "เจ้าของห้อง";
          } else {
            user_type = "สมาชิก";
          }

          var token = "";
          var status = "";
          var render = 0;
          var created_date = "";
          var gold_type = "";
          var show_num_room = false;

          //  สถานะกำลังออม;
          if (element.status === "saving") {
            token = element.savingrooms_data[0].token;
            status = "กำลังออม";
            created_date = moment(
              element.savingrooms_data[0].created_date
            ).format("LLL");
            gold_type = element.savingrooms_data[0].weight;

            if (
              Date.parse(element.savingrooms_data[0].end_date) <
              Date.parse(new Date())
            ) {
              //ถ้าวันสิ้นสุดการออม  มันเลยแล้ว render จะเท่ากับ 1 หมายความว่า ขอมูลส่วนนี้ จะไม่โชว
              var render = 1;
            } else {
            }
          }
          //  สถานะออมสำเร็จ;
          if (element.status === "finished") {
            token = element.savingrooms_data[0].token;
            status = "ออมสำเร็จ";
            created_date = moment(
              element.savingrooms_data[0].created_date
            ).format("LLL");
            gold_type = element.savingrooms_data[0].weight;

            if (
              Date.parse(element.savingrooms_data[0].end_date) <
              Date.parse(new Date())
            ) {
              var render = 1;
            } else {
            }
          }
          //  สถานะถอนสำเร็จ
          if (element.status === "withdrawed") {
            token = element.savingrooms_data[0].token;
            status = "ถอนสำเร็จ";
            created_date = moment(
              element.savingrooms_data[0].created_date
            ).format("LLL");
            gold_type = element.savingrooms_data[0].weight;

            if (
              Date.parse(element.savingrooms_data[0].end_date) <
              Date.parse(new Date())
            ) {
              var render = 1;
            } else {
            }
          }
          //  สถานะยกเลิกออม
          if (element.status === "cancelled") {
            console.log("ยกเลิกออม");
            token = element.savingrooms_data[0].token;
            status = "ยกเลิกออม";
            created_date = moment(
              element.savingrooms_data[0].created_date
            ).format("LLL");
            gold_type = element.savingrooms_data[0].weight;

            if (
              Date.parse(element.savingrooms_data[0].end_date) <
              Date.parse(new Date())
            ) {
              var render = 1;
            } else {
            }
          }

          //  สถานะรอการตรวจสอบ ซ่อนปุ่ม คัดลอกหมายเลขห้อง
          if (element.status === "pending") {
            token = "";
            status = "รอดำเนินการ";
            show_num_room = true;

            created_date = created_date = moment(element.created_date).format(
              "LLL"
            );
            gold_type = element.weight;
          }

          if (render === 1) {
            //ถ้าวันสิ้นสุดการออม  มันเลยแล้ว render จะเท่ากับ 1 หมายความว่า ขอมูลส่วนนี้ จะไม่โชว
          } else {
            var row = {
              id: element.room_id,
              user_type: user_type,
              status: status,
              room_number: token,
              show_num_room: show_num_room,
              created_date: created_date,
              gold_type: gold_type,
              member: total_and_max.total + "/" + total_and_max.max,
            };
            Data.push(row);
          }
        }

        All_room(Data);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const GoldPrice = async () => {
    //api ราคา ทอง
    Isloading(true);
    await axios({
      method: "get",
      url: "https://thai-gold-api.herokuapp.com/latest",
    }).then((response) => {
      setGoldprice(response.data.response.price.gold_bar);
      Isloading(false);
    });
  };
  const LoadSetingRoom = async () => {
    await axios({
      method: "GET",
      url: "/api/saving_room_setting/save_setting",
    }).then((response) => {
      Minmember(response.data.data[0].min_member); //จำนวนคนขั้นต่ำในการส้รางห้อง
      Installment(response.data.data[0].installment); //จำนวนงวด
      Day(response.data.data[0].day); //จำนวนวันต่องวด
    });
  };
  const GoBack = async () => {
    return router.push("/mobile/route");
  };
  const CoppyText = async (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Copied",
      width: 200,
      height: 100,
      showConfirmButton: false,
      timer: 1000,
    });
    // e.target.focus();
  };
  const go_to_saving_room = async (e) => {
    if (e.status === "รอดำเนินการ") {
      //รอดำเนินการ
      // alert("รอดำเนินการ");
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "ระบบกำลังตรวจสอบข้อมูลการขอสร้างห้องของท่าน",
      });
    } else {
      localStorage.setItem("join_room", e.id); //รอดำเนินการ
      return router.push("/mobile/saving_room");
    }
  };
  const onChangeMember = async (e) => {
    const { value } = e.target;
    const message = value.slice(0, 5);
    if (isNaN(message)) {
    } else {
      await Member(message);
    }
  };
  const onCheckMin = async () => {
    if ((await parseInt(member)) < (await parseInt(minmember))) {
      await Hidealert(false);
    } else {
      await Hidealert(true);
    }
  };
  const onChangeWeight = async (e) => {
    const { value } = e.target;
    Weight(value);
  };
  const OnCheckCreateRoom = async () => {
    Isloading2(true); //modal_loading ทำงาน
    Isloading_text("ตรวจสอบ");
    if (member === "") {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "จำนวนสมาชิกต้องไม่ต่ำกว่า " + minmember + " คน",
      });
    }
    if (parseInt(member) < parseInt(minmember)) {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "จำนวนสมาชิกต้องไม่ต่ำกว่า " + minmember + " คน",
      });
    }
    if (weight == "น้ำหนักทอง") {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาระบุน้ำหนักทอง ",
      });
    }
    Createroom(false);
    OnSendrequest();
    // setTimeout(function () {

    // }, 5000);
  };
  const OnSendrequest = async () => {
    console.log("ประมวลผล");

    var room_id =
      "saveing_" + moment(new Date()).format("YYYYMMDD_HHmmss") + makeid(5); //gen room_id
    var token = await GenPassRoom(6); //gen token
    var end_date = new Date();
    end_date.setDate(
      end_date.getDate() + parseInt(installment) * parseInt(day)
    ); // วันสิ้นสุดการออม

    var currency = await goldprice.buy; //ราคาทอง 1 บาท
    var number = Number(currency.replace(/[^0-9\.-]+/g, "")); //แปลงราคาทองเป็น int

    // ราคาทองขายออก
    // ครึ่งสลึง = [(ราคาทองขายออก/8)+900]
    // 1 สลึง = [(ราคาทองขายออก/4)+1100]
    // 2 สลึง = [(ราคาทองขายออก/2)+1400]
    // 1 บาท = [ราคาทองขายออก+1750]
    var price = 0; //ราคาทองที่รวมค่ากำเหน็ด
    if (weight == "ครึ่งสลึง") {
      price = number / 8;
      price = price + 900;
    }
    if (weight == "1 สลึง") {
      price = number / 4;
      price = price + 1100;
    }
    if (weight == "2 สลึง") {
      price = number / 2;
      price = price + 1400;
    }
    if (weight == "1 บาท") {
      price = number + 1750;
    }

    console.log("ส่งข้อมูล");
    var data = {
      room_id: room_id,
      token: token,
      owner: us_id,
      weight: weight,
      price: price,
      status: "pending",
      start_date: new Date(),
      end_date: end_date,
      day: day,
      installment: installment,
      member: member,
    };
    console.log(data);

    setTimeout(async function () {
      await axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer my-token",
          "My-Custom-Header": "foobar",
        },
        url: "/api/saving_rooms/request_room",
        data: JSON.stringify({ data: data }),
      }).then(
        async (response) => {
          if ((await response.status) == 200) {
            console.log("สำเร็จ");
            Swal.fire({
              icon: "success",
              title: "เรียบร้อย",
              text: "ส่งคำขอสร้างห้องสำเร็จ",
            });
            Refresh_data();
            Member("");
            Isloading2(false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
      console.log("ส่งข้อความให้แอดมิน");
      // ส่ง line noti ให้ admin
      var message_admin = {
        message: "การสร้างห้อง รอการอนุมัติ",
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

      // ส่ง line noti ให้ user
      console.log("ส่งข้อความให้ผู้ใช้");
      var messages_user = {
        messages:
          "ระบบได้รับข้อมูลการสร้างห้องของท่านแล้ว \nกรุณารอการตรวจสอบภายใน 30 นาที",
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
    }, 2000);
    // noti

    // noti
  };
  const makeid = (length) => {
    // สุ่มตัวอักษร ตาม length
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const GenPassRoom = async (length) => {
    var result = "";
    var characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    var data = {
      token: result,
    };
    var pass = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/saving_rooms/check_password",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        if (response.status == 200) {
          return response.data.data;
        }
        if (response.status == 201) {
          GenPassRoom(6);
        }
      },
      (error) => {
        console.log(error);
      }
    );
    return pass;
  };

  const OnJoinRoom = async (e) => {
    var data = {
      token: password,
    };
    var data_room = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/saving_rooms/check_readyroom",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        if (response.status == 200) {
          return response.data.data;
        }
        if (response.status == 201) {
          return [];
        }
      },
      (error) => {
        console.log(error);
      }
    );
    if (data_room.length === 0) {
      //ถ้าไม่พบข้อมูลห้อง
      Password("");
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "ไม่พบข้อมูลห้องดังกล่าว",
      });
    } else {
      var user_id = us_id;
      var owner = data_room[0].owner;
      if (owner == user_id) {
        //ถ้าเป็นเจ้าของห้อง
        Password("");
        return Swal.fire({
          icon: "error",
          title: "ผิดพลาด",
          text: "คุณไม่สามารถเข้าร่วมเป็นสมาชิกห้องเดิมได้",
        });
      }

      var data = {
        room_id: data_room[0].room_id, //รหัสห้อง
        user_id: user_id, // user _ id
        total_savings: "0", // ยอดออม เริ่มต้นที่ 0
        join_date: "", //
        total_installment: "0", // จำนวนครั้งในการออม เริ่มต้นที่ 0
        finish_date: "", // วันที่ออมเสร็จจะ เซ็ตเป็นค่าว่างไว้ก่อน
        max_member: data_room[0].member, //จำนวนคนที่เข้าร่วมได้สูงสุด
      };
      await localStorage.setItem("join_room", data_room[0].room_id); //เซ็ต room_id ไว้ใน  localStorage ในตัวแปรที่ชื่อ join_room
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer my-token",
          "My-Custom-Header": "foobar",
        },
        url: "/api/joinroom/join_room",
        data: JSON.stringify({ data: data }),
      }).then(
        async (response) => {
          if (response.status == 200) {
            //ส่ง line noti ไปหาเจ้าของห้อง
            var messages_datail = {
              user_id: us_id,
              owner_id: data_room[0].owner,
              room_id: data_room[0].token,
            };
            await axios({
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer my-token",
                "My-Custom-Header": "foobar",
              },
              url: "/api/line_messaging_user_joinroom",
              data: JSON.stringify({ data: messages_datail }),
            }).then(
              (response) => {
                console.log(response);
              },
              (error) => {
                console.log(error);
              }
            );
            //ส่ง line noti ไปหาเจ้าของห้อง
            return router.push("/mobile/saving_room"); // ยังหน้าออมทอง
          }
          if (response.status == 201) {
            return Swal.fire({
              icon: "error",
              title: "ผิดพลาด",
              text: "สมาชิกในห้องเต็มแล้ว",
            });
          }
          if (response.status == 202) {
            return Swal.fire({
              icon: "error",
              title: "ผิดพลาด",
              text: "คุณไม่สามารถเข้าร่วมเป็นสมาชิกห้องเดิมได้",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
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
        <div className="container mt-3">
          <div className="row">
            <div className="col-2 d-flex justify-content-start">
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
            <div
              className="col-8 d-flex justify-content-center align-items-center"
              style={{ fontSize: "20px", color: "#fff" }}
            >
              รายการห้องออม
            </div>
            <div className="col-2 d-flex justify-content-end align-items-center">
              <Refresh
                style={{
                  fontSize: 30,
                  padding: "3px",
                  color: "#fff",
                  backgroundImage: "linear-gradient(rgb(101,0,0), rgb(53,0,0))",
                  borderRadius: "2px",
                }}
                onClick={Refresh_data}
              />
              {/* <AddIcon style={{ fontSize: 40, color: "#fff" }} /> */}
            </div>
          </div>
        </div>
        {/* สร้างห้อง เข้าห้อง */}
        <div className="d-flex justify-content-center mt-5">
          <div>
            <button
              type="button"
              className="btn  btn-sm"
              style={{
                backgroundColor: "#fff",
                width: "30vw",
                fontFamily: "SukhumvitSet-SemiBold",
              }}
              onClick={() => Createroom(true)}
            >
              สร้างห้อง
            </button>
            <button
              type="button"
              className="btn  btn-sm ml-2"
              style={{
                backgroundColor: "#fff",
                width: "30vw",
                fontFamily: "SukhumvitSet-SemiBold",
              }}
              onClick={() => Joinroom(true)}
            >
              เข้าร่วมห้อง
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="row mt-3" hidden={isEmpty}>
            <div
              className="col d-flex justify-content-center align-items-center"
              style={{
                fontSize: "5vw",
                color: "#fff",
                fontFamily: "SukhumvitSet-SemiBold",
              }}
            >
              ไม่พบข้อมูล ห้องออมของท่าน
            </div>
          </div>
        </div>
        {/* รายการห้องออม */}

        <div className="mt-5">
          {all_room.map((item) => (
            <div className="d-flex justify-content-center mb-2">
              <div
                className="card"
                style={{
                  width: "90vw",
                  backgroundImage: "linear-gradient(rgb(101,0,0), rgb(53,0,0))",
                  color: "#fff",
                  fontSize: "10pt",
                }}
              >
                <div className="card-body">
                  <div className="row">
                    <div
                      className="col-9"
                      onClick={() => go_to_saving_room(item)}
                    >
                      <div className="form-row" hidden={item.show_num_room}>
                        <div className="col">
                          <p className="card-text">
                            หมายเลขห้อง : {item.room_number}
                          </p>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col">
                          <p className="card-text">
                            ตำแหน่ง : {item.user_type}
                          </p>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col">
                          <p className="card-text">
                            น้ำหนักทอง : {item.gold_type}
                          </p>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col">
                          <p className="card-text">
                            วันที่สร้าง : {item.created_date}
                          </p>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col">
                          <p className="card-text">สถานะ : {item.status}</p>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col">
                          <p className="card-text">
                            จำนวนสมาชิก : {item.member}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 d-flex justify-content-center align-content-center">
                      <div>
                        <button
                          style={{
                            backgroundImage:
                              "linear-gradient(rgb(101,0,0), rgb(53,0,0))",
                            color: "#fff",
                            fontSize: "3vw",
                          }}
                          hidden={item.show_num_room}
                          onClick={() => CoppyText(item.room_number)}
                        >
                          {"คัดลอกหมายเลขห้อง"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        size="xl"
        show={createroom}
        // onHide={() => Createroom(false)}
        dialogClassName="modal-90w mt-30h"
        // aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Body>
          <form
            style={{
              maxHeight: "60vh",
              overflow: "scroll",
            }}
          >
            <div className="modal-body ">
              <div className="row">
                <div className="col-10"></div>
                <div className="col-2">
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={() => Createroom(false)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div>
              <p
                className="d-flex justify-content-center"
                style={{
                  color: "rgb(153, 0, 0)",
                  fontFamily: "SukhumvitSet-SemiBold",
                }}
              >
                สร้างห้องออมทอง
              </p>
              <p
                className="d-flex justify-content-center"
                style={{
                  color: "rgb(153, 0, 0)",
                  fontFamily: "SukhumvitSet-SemiBold",
                }}
              >
                ราคาทอง {goldprice.buy}
              </p>
              <input
                type="text"
                className="form-control InputRegister d-flex justify-content-center"
                style={{ backgroundColor: "rgb(153, 0, 0)", color: "#fff" }}
                placeholder={"จำนวนสมาชิกต้องไม่ต่ำกว่า  " + minmember}
                value={member}
                onChange={(e) => onChangeMember(e)}
                onMouseLeave={() => onCheckMin()}
              />
              <p hidden={hidealert}>*จำนวนสมาชิกต้องไม่ต่ำกว่า {minmember}</p>
              <select
                id="inputState"
                className="form-control mt-2"
                style={{ backgroundColor: "rgb(153, 0, 0)", color: "#fff" }}
                onChange={(e) => onChangeWeight(e)}
              >
                <option selected disabled>
                  น้ำหนักทอง
                </option>
                <option>ครึ่งสลึง</option>
                <option>1 สลึง</option>
                <option>2 สลึง</option>
                {/* <option>1 บาท</option> */}
              </select>
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary mt-2 "
                  onClick={() => OnCheckCreateRoom()} //กดยืนยันสร้างห้อง
                  style={{
                    textAlign: "center",
                    backgroundColor: "#007bff",
                    color: "#fff",
                  }}
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        size="xl"
        show={joinroom}
        onHide={() => Joinroom(false)}
        dialogClassName="modal-90w mt-30h"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Body>
          <form
            style={{
              maxHeight: "60vh",
              overflow: "scroll",
            }}
          >
            <div className="modal-body">
              <p
                className="d-flex justify-content-center"
                style={{
                  color: "rgb(153, 0, 0)",
                  fontFamily: "SukhumvitSet-SemiBold",
                }}
              >
                เข้าร่วมห้อง
              </p>
              <input
                type="password"
                className="form-control InputRegister d-flex justify-content-center"
                style={{ backgroundColor: "rgb(153, 0, 0)", color: "#fff" }}
                placeholder={"รหัสเข้าร่วมห้อง"}
                value={password}
                onChange={(e) => Password(e.target.value)}
              />
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-primary mt-2 justify-content-center"
                  onClick={OnJoinRoom}
                  style={{
                    textAlign: "center",
                    backgroundColor: "#007bff", //กดยืนยันเข้าร่วมห้อง
                    color: "#fff",
                  }}
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <ModalReact style={customStyles2} isOpen={isloading}>
        <button className="btn btn-primary" type="button" disabled>
          <span
            className="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          />
          กรุณารอสักครู่...
        </button>
      </ModalReact>
      <ModalReact style={customStyles2} isOpen={isloading2}>
        <button className="btn btn-primary" type="button" disabled>
          <span
            className="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          />
          {isloading_text}
        </button>
      </ModalReact>
    </>
  );
}
