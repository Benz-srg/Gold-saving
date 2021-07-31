import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import React, { useState, useEffect } from "react";
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
  const [isEmpty, IsEmpty] = useState(false);
  const [isloading, Isloading] = useState(false);
  const [all_room, All_room] = useState(Array);
  const [us_id, Us_id] = useState(localStorage.getItem("auth"));
  useEffect(() => {
    LoadAllRoom();
  }, []);
  const Refresh_data = async () => {
    LoadAllRoom();
  };
  const LoadAllRoom = async () => {
    Isloading(true);
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
      url: "/api/saving_rooms/load_can_withdraw_room",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        if (response.data.data[0] === undefined) {
          IsEmpty(false);
        } else {
          IsEmpty(true);
          var Data = [];
          // console.log(response.data.data);
          for (let index = 0; index < response.data.data.length; index++) {
            const element = response.data.data[index];
            var status = "สามารถถอนได้";

            for (let i = 0; i < element.withdraw_data.length; i++) {
              const withdraw_data = element.withdraw_data[i];
              if (withdraw_data.room_id === element.room_id) {
                if ((withdraw_data.status = "pending")) {
                  status = "รอดำเนินการ";
                }
              }
            }
            var user_type = "";
            if (element.owner === us_id) {
              user_type = "เจ้าของห้อง";
            } else {
              user_type = "สมาชิก";
            }
            moment.locale("th");
            var row = {
              id: element.room_id,
              user_type: user_type,
              room_id: element.savingrooms_data[0].token,
              gold_type: element.savingrooms_data[0].weight,
              created_date: moment(
                element.savingrooms_data[0].created_date
              ).format("LLL"),
              status: status,
            };
            Data.push(row);
          }
          All_room(Data);
        }

        Isloading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const go_to_withdraw_room = async (e) => {
    await localStorage.setItem("join_room", e.id);
    return router.push("/mobile/withdraw_room");
  };

  return (
    <>
      <div
        style={{
          height: "90vh",
          backgroundColor: "rgb(156, 0, 0)",
          overflow: "scroll",
        }}
      >
        <div className="container ">
          <div className="row">
            <div className="col-3 d-flex justify-content-start">
              {/* <Refresh type="submit" style={{ fontSize: 40, color: "#fff" }} /> */}
            </div>
            <div
              className="col-6 d-flex justify-content-center"
              style={{
                fontFamily: "SukhumvitSet-SemiBold",
                color: "rgb(0,190,22)",
                fontSize: "3vw",
              }}
            >
              <img
                src="/image/logo.svg"
                className="d-flex justify-content-center mt-5"
                width={"300px"}
                height={"150px"}
              />
            </div>
            <div className="col-3 d-flex justify-content-end pt-3">
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
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <div className="row">
            <div
              className="col d-flex justify-content-center align-items-center"
              style={{
                fontSize: "4vw",
                color: "#fff",
                fontFamily: "SukhumvitSet-SemiBold",
              }}
            >
              รายการห้องออม ที่ออมสำเร็จ
            </div>
          </div>
          <div className="row" hidden={isEmpty}>
            <div
              className="col d-flex justify-content-center align-items-center"
              style={{
                fontSize: "5vw",
                color: "#fff",
                fontFamily: "SukhumvitSet-SemiBold",
              }}
            >
              ไม่พบข้อมูล ห้องที่สามารถถอนได้
            </div>
          </div>
        </div>

        {/* รายการห้องที่สามารถยกเลิกได้ */}
        <div className="mt-2">
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
                onClick={() => go_to_withdraw_room(item)}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-10">
                      <div className="form-row">
                        <div className="col">
                          <p className="card-text">
                            หมายเลขห้อง : {item.room_id}
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
                    </div>
                    <div className="col-2 d-flex justify-content-end align-items-center">
                      <ArrowForwardIosIcon
                        style={{
                          fontSize: 30,
                          padding: "3px",
                          color: "#fff",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
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
    </>
  );
}
