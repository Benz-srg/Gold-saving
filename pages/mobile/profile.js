import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import React, { useState, useEffect } from "react";
import axios, { post } from "axios";
import { useRouter } from "next/router";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import Swal from "sweetalert2";
import Refresh from "@material-ui/icons/Refresh";

export default function LabelBottomNavigation() {
  const router = useRouter();
  const [point, Point] = useState(String);
  const [us_id, Us_id] = useState(localStorage.getItem("auth"));
  const [bankname, Bankname] = useState("ชื่อธนาคาร");
  const [bankid, Bankid] = useState(String);
  const [userbankname, Userbankname] = useState(String);
  const [his, His] = useState(Array);
  useEffect(() => {
    UserDetail();
    HisDetail(); //ประวัติการถอนแต้ม
  }, []);
  const Refresh_data = async () => {
    UserDetail();
    HisDetail();
  };
  const HisDetail = async () => {
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
      url: "/api/withdraw/his_withdraw_point",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        // console.log(response.data.data[0] === undefined);

        if (response.data.data[0] === undefined) {
          var Data = [];
          for (let index = 0; index < 1; index++) {
            var row = {
              total: "ไม่พบข้อมูล ",
              status: " การถอนแต้ม",
            };
            Data.push(row);
          }
          His(Data);
        } else {
          var Data = [];
          for (let index = 0; index < response.data.data.length; index++) {
            const element = response.data.data[index];
            var status = "";
            if (element.status === "pending") {
              status = "กำลังตรวจสอบ";
            }
            if (element.status === "withdrawed") {
              status = "สำเร็จ";
            }
            if (element.status === "declined") {
              status = "ไม่ผ่าน";
            }

            var row = {
              total:
                "จำนวน " +
                Math.ceil(
                  new Intl.NumberFormat().format(parseInt(element.point) / 10)
                ) +
                " บาท",
              status: status,
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
  const UserDetail = async () => {
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
        console.log(response.data.data[0].point);
        Point(response.data.data[0].point);

        if (response.data.data[0].bank_name === "") {
          Bankname("-");
          Bankid("-");
          Userbankname("-");
        } else {
          Bankname(response.data.data[0].bank_name);
          Bankid(formatPhoneNumber(response.data.data[0].bank_number));
          Userbankname(response.data.data[0].bank_account);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  function formatPhoneNumber(input) {
    // console.log(digits);
    var format = "XXX-X-XXXXX-XXX";
    var digits = input.replace(/\D/g, "");
    // Replace each "X" with the next digit
    var count = 0;
    return format.replace(/X/g, function () {
      return digits.charAt(count++);
    });
  }
  const Bank_Setting = async () => {
    return router.push("/mobile/bank_setting");
  };
  const Point_Withdraw = async () => {
    console.log(new Intl.NumberFormat().format(point));
    if (new Intl.NumberFormat().format(point) <= 100) {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "แต้มสะสมของคุณต้องมากกว่า 100 แต้มขึ้นไป!",
      });
    } else {
      return router.push("/mobile/withdraw_point");
    }
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
        <div className="d-flex justify-content-center mt-2">
          <div
            className="card"
            style={{
              width: "90vw",
              backgroundImage:
                "linear-gradient(rgb(255,255,255), rgb(213,213,213))",
            }}
            onClick={() => Point_Withdraw()}
          >
            <div className="card-body">
              <div className="container">
                <div className="row">
                  <div
                    className="col"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(37,37,37)",
                    }}
                  >
                    แต้มสะสม
                  </div>
                  <div
                    className="col md-auto"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(231,180,0)",
                    }}
                  >
                    {new Intl.NumberFormat().format(point)} คะแนน
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <div
            className="card"
            style={{
              width: "90vw",
              backgroundImage:
                "linear-gradient(rgb(255,255,255), rgb(213,213,213))",
            }}
            onClick={() => Bank_Setting()}
          >
            <div className="card-body px-3">
              <div className="row mb-2">
                <div
                  className="col-12 d-flex justify-content-center"
                  style={{
                    fontFamily: "SukhumvitSet-SemiBold",
                    color: "rgb(37,37,37)",
                    fontSize: "4vw",
                  }}
                >
                  ข้อมูลบัญชีธนาคาร
                </div>
              </div>
              <div className="row">
                <div
                  className="col-5"
                  style={{
                    fontFamily: "SukhumvitSet-SemiBold",
                    color: "rgb(37,37,37)",
                    fontSize: "4vw",
                  }}
                >
                  ชื่อธนาคาร :
                </div>
                <div
                  className="col-7"
                  style={{
                    fontFamily: "SukhumvitSet-SemiBold",
                    color: "rgb(231,180,0)",
                    fontSize: "4vw",
                  }}
                >
                  {bankname}
                </div>
              </div>
              <div className="row">
                <div
                  className="col-5"
                  style={{
                    fontFamily: "SukhumvitSet-SemiBold",
                    color: "rgb(37,37,37)",
                    fontSize: "4vw",
                  }}
                >
                  เลขที่บัญชี :
                </div>
                <div
                  className="col-7"
                  style={{
                    fontFamily: "SukhumvitSet-SemiBold",
                    color: "rgb(231,180,0)",
                    fontSize: "4vw",
                  }}
                >
                  {bankid}
                </div>
              </div>
              <div className="row">
                <div
                  className="col-5"
                  style={{
                    fontFamily: "SukhumvitSet-SemiBold",
                    color: "rgb(37,37,37)",
                    fontSize: "4vw",
                  }}
                >
                  ชื่อเจ้าของบัญชี :
                </div>
                <div
                  className="col-7"
                  style={{
                    fontFamily: "SukhumvitSet-SemiBold",
                    color: "rgb(231,180,0)",
                    fontSize: "4vw",
                  }}
                >
                  {userbankname}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-start mt-3 ">
          <div>
            <p
              className="card-text ml-3"
              style={{ fontSize: "4vw", color: "#fff" }}
            >
              ประวัติการถอนแต้ม
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-2 mb-5">
          <div
            className="card p-2"
            style={{
              width: "90vw",
              minHeight: "10vh",
              backgroundImage:
                "linear-gradient(rgb(255,255,255), rgb(213,213,213))",
            }}
          >
            {his.map((item) => (
              <div
                className="station"
                style={{
                  fontFamily: "SukhumvitSet-SemiBold",
                  fontSize: "4vw",
                }}
              >
                {item.total} - {item.status}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
