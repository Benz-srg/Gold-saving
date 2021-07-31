import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import React, { useState, useEffect } from "react";
import axios, { post } from "axios";
import { useRouter } from "next/router";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import Swal from "sweetalert2";
export default function LabelBottomNavigation() {
  const router = useRouter();
  const [his, His] = useState([{}]);
  const [ranking, Ranking] = useState([{}]);
  const [show_ranking, Show_ranking] = useState(false);
  const [price, Price] = useState(String);
  const [installment, Installment] = useState(String);
  const [total_savings, Total_savings] = useState(String);
  const [weight, Weight] = useState(String);
  const [total_installment, Total_installment] = useState(String);

  const [us_id, Us_id] = useState(localStorage.getItem("auth"));
  const [owner_room_id, Owner_room_id] = useState(
    localStorage.getItem("owner_room")
  );
  useEffect(() => {
    LoadDataHis();
    RoomDetail();
  }, []);
  const RoomDetail = async () => {
    var data = {
      user_id: us_id,
      room_id: owner_room_id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/joinroom/ranking",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        if (response.data.data.length === 0) {
          var Data = [];
          for (let index = 0; index < 1; index++) {
            var row = {
              num: "ไม่พบข้อมูลสมาชิก",
              user_id: "",
              total_saving: "",
            };
            Data.push(row);
          }
          Ranking(Data);
        } else {
          var Data = [];
          for (let index = 0; index < response.data.data.length; index++) {
            const element = response.data.data[index];
            const num = index + 1;
            var status = "";
            if (element.finish_date === "") {
              status = "กำลังออม";
            } else {
              status = "ออมครบ";
            }
            var row = {
              num: "อันดับ : " + num,
              user_id: element.users[0].fname + " " + element.users[0].lname,
              total_saving:
                "ยอดโอนสะสม " +
                new Intl.NumberFormat().format(element.total_savings),
              status: status,
            };
            Data.push(row);
          }
          Ranking(Data);
        }
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
      url: "/api/saving_rooms/roomdata_by_id",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        Price(Math.ceil(response.data.data[0].price));
        Installment(response.data.data[0].installment);
        Weight(response.data.data[0].weight);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const LoadDataHis = async () => {
    var data = {
      user_id: us_id,
      room_id: owner_room_id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/bill/check_bill_by_room_id",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        if (response.data.data == undefined) {
          var Data = [];
          for (let index = 0; index < 1; index++) {
            var row = {
              title: "",
              name: "ไม่พบข้อมูลประวัติ",
              when: "",
              status: "",
            };
            Data.push(row);
          }
          His(Data);
        } else {
          var Data = [];
          for (let index = 0; index < response.data.data.length; index++) {
            const bill = response.data.data[index].bill;
            const user = response.data.data[index].user;
            var sta = "";
            if (bill.status == "pending") {
              sta = "กำลังตรวจสอบ";
            }
            if (bill.status == "approved") {
              sta = "สำเร็จ";
            }
            if (bill.status == "declined") {
              sta = "ไม่ผ่าน";
            }
            var row = {
              title: "อัปโหลดสลิป",
              name: user.fname + " " + user.lname,
              when: moment(bill.upload_date).format("YYYY-MM-DD HH:mm:ss"),
              total_saving: new Intl.NumberFormat().format(bill.money),
              status: sta,
            };
            Data.push(row);
          }
          His(Data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const GoBack = async () => {
    return router.push("/mobile/route");
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
            className="d-flex justify-content-center mt-5"
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
          <div>
            <button
              type="button"
              className="btn  btn-sm ml-2"
              style={{
                backgroundColor: "rgb(56, 0, 0)",
                // width: "30vw",
                fontFamily: "SukhumvitSet-SemiBold",
                color: "#fff",
              }}
              onClick={() => Show_ranking(true)}
            >
              ตรวจสอบอันดับ
            </button>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <p
            className="card-text"
            style={{
              fontSize: "16pt",
              fontFamily: "SukhumvitSet-SemiBold",
              color: "#fff",
            }}
          >
            จำนวนทอง {weight}
          </p>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body justify-content-center ">
              <p
                className="card-text"
                style={{
                  fontSize: "16pt",
                  fontFamily: "SukhumvitSet-SemiBold",
                  color: "rgb(153, 0, 0)",
                  textAlign: "center",
                }}
              >
                ราคาทอง
              </p>
              <p
                className="card-text"
                style={{
                  fontSize: "16pt",
                  fontFamily: "SukhumvitSet-SemiBold",
                  color: "rgb(153, 0, 0)",
                  textAlign: "center",
                }}
              >
                {new Intl.NumberFormat().format(price)}
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <p
            className="card-text"
            style={{
              fontSize: "16pt",
              fontFamily: "SukhumvitSet-SemiBold",
              color: "#fff",
            }}
          >
            ประวัติการโอน
          </p>
        </div>
        <div className="d-flex justify-content-center mt-2  mb-5">
          <div
            className="card"
            style={{
              width: "90vw",
              minHeight: "10vh",
              backgroundImage:
                "linear-gradient(rgb(255,255,255), rgb(195,195,195)",
              padding: "5px",
            }}
          >
            {his.map((item) => (
              <div className="station">
                [{item.name}]{item.when} ยอดโอน {item.total_saving} -{" "}
                {item.status}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        size="xl"
        show={show_ranking}
        onHide={() => Show_ranking(false)}
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
            <div className="modal-body ">
              {ranking.map((item) => (
                <div className="station">
                  {item.num} {item.user_id} {item.total_saving} {item.status}
                </div>
              ))}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
