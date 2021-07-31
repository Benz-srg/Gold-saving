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

  const [isloading, Isloading] = useState(false);

  const [bankname, Bankname] = useState("ชื่อธนาคาร");
  const [bankid, Bankid] = useState(String);
  const [userbankname, Userbankname] = useState(String);

  const [dot_1, Dot_1] = useState("dot ml-1 mr-1");
  const [dot_2, Dot_2] = useState("dot ml-1 mr-1");
  const [dot_3, Dot_3] = useState("dot ml-1 mr-1");
  const [dot_4, Dot_4] = useState("dot ml-1 mr-1");
  const [dot_5, Dot_5] = useState("dot ml-1 mr-1");
  const [dot_6, Dot_6] = useState("dot ml-1 mr-1");
  const [PIN, SetPin] = useState("");
  const [bankdetail, Bankdetail] = useState(false);
  const [confrim, Confrim] = useState(true);
  const [us_id, Us_id] = useState(localStorage.getItem("auth"));
  useEffect(() => {
    LoadBankDetail();
  }, []);
  const LoadBankDetail = async () => {
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
      url: "/api/user/user_detail",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        // console.log(response.data.data[0].point);

        if (response.data.data[0].bank_name === "") {
          Bankname("ชื่อธนาคาร");
          Bankid("");
          Userbankname("");
        } else {
          Bankname(response.data.data[0].bank_name);
          Bankid(response.data.data[0].bank_number);
          Userbankname(response.data.data[0].bank_account);
        }

        Isloading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const onConfirmBank = async () => {
    if (bankname === "" || bankname === "ชื่อธนาคาร") {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาเลือกธนาคาร",
      });
    }
    if (bankid.length < 10) {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "เลขบัญชีธนาคารไม่ถูกต้อง",
      });
    }
    if (userbankname === "") {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาระบุชื่อเจ้าของบัญชีธนาคาร",
      });
    }
    Bankdetail(true);
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
    Bankdetail(false);
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
              SaveBankDetail(); //ฟังชั้นอัพเดทข้อมูลธนาคาร
              Bankdetail(false);
              Confrim(true);
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

  const SaveBankDetail = async () => {
    var data = {
      user_id: us_id,
      bank_name: bankname,
      bank_number: bankid,
      bank_account: userbankname,
    };
    console.log(data);
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/user/update_bankdetail",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        Swal.fire({
          icon: "success",
          title: "เรียบร้อย",
          text: "บันทึกข้อมูลสำเร็จ",
        });
        LoadBankDetail();
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const onSelectBank = async (e) => {
    const { value } = e.target;
    Bankname(value);
  };
  const GoBack = async () => {
    return router.push("/mobile/route?tab=4");
  };
  return (
    <>
      <Modal style={customStyles2} isOpen={isloading}>
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </Modal>
      <div hidden={bankdetail} style={{ height: "100vh" }}>
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
            <label>ระบุข้อมูลธนาคาร</label>
          </div>
          <div className="container">
            <div
              className="form-group"
              style={{ color: "#fff", fontFamily: "SukhumvitSet-SemiBold" }}
            >
              <label htmlFor="exampleInputEmail1">ชื่อธนาคาร :</label>
              <select
                id="inputState"
                className="form-control mt-2"
                style={{ backgroundColor: "rgb(153, 0, 0)", color: "#fff" }}
                onChange={(e) => onSelectBank(e)}
                value={bankname}
                contentEditable={true}
              >
                <option selected disabled={true}>
                  ชื่อธนาคาร
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
            <div
              className="form-group"
              style={{ color: "#fff", fontFamily: "SukhumvitSet-SemiBold" }}
            >
              <label htmlFor="exampleInputPassword1">เลขที่บัญชี :</label>
              <NumberFormat
                id="exampleInputPassword1"
                className="form-control  inputUpload d-flex justify-content-center"
                format="###-#-#####-###"
                style={{
                  backgroundColor: "rgb(156, 0, 0)",
                  fontFamily: "SukhumvitSet-SemiBold",
                  color: "#fff",
                }}
                value={bankid}
                onValueChange={(values) => Bankid(values.value)}
              />
            </div>

            <div
              className="form-group"
              style={{ color: "#fff", fontFamily: "SukhumvitSet-SemiBold" }}
            >
              <label htmlFor="exampleInputPassword1">ชื่อเจ้าของบัญชี :</label>
              <input
                type="text"
                className="form-control inputUpload d-flex justify-content-center"
                id="exampleInputPassword1"
                placeholder="คำนำหน้า ชื่อ-นามสกุล "
                style={{
                  backgroundColor: "rgb(156, 0, 0)",
                  fontFamily: "SukhumvitSet-SemiBold",
                  color: "#fff",
                }}
                value={userbankname}
                onChange={(e) => Userbankname(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center mt-2 mb-5">
              <button
                type="button"
                className="btn  d-flex justify-content-center"
                style={{
                  backgroundImage: "linear-gradient(rgb(101,0,0), rgb(53,0,0))",
                  color: "#fff",
                  fontFamily: "SukhumvitSet-SemiBold",
                }}
                onClick={onConfirmBank} //ปุ่มบันทึกข้อมูล
              >
                บันทึกข้อมูล
              </button>
            </div>
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
