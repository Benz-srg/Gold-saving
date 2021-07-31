import React, { Fragment, Component, useEffect } from "react";
import Swal from "sweetalert2";
import axios, { post } from "axios";
import { useRouter } from "next/router";
import { isAndroid, isIOS } from "react-device-detect";
import Router from "next/router";

// const router = useRouter();
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
class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dot_1_1: "dot ml-1 mr-1",
      dot_2_1: "dot ml-1 mr-1",
      dot_3_1: "dot ml-1 mr-1",
      dot_4_1: "dot ml-1 mr-1",
      dot_5_1: "dot ml-1 mr-1",
      dot_6_1: "dot ml-1 mr-1",

      dot_1_2: "dot ml-1 mr-1",
      dot_2_2: "dot ml-1 mr-1",
      dot_3_2: "dot ml-1 mr-1",
      dot_4_2: "dot ml-1 mr-1",
      dot_5_2: "dot ml-1 mr-1",
      dot_6_2: "dot ml-1 mr-1",

      PIN_1: "",
      PIN_2: "",
      view1: false,
      view2: true,
      user_line_id: "",
    };
  }

  componentDidMount = async () => {
    this.setState({
      user_line_id: await localStorage.getItem("auth"), //ดึง id line จาก localstroge ที่เซ็ตในหน้า mobile/index
    });
  };
  OnPinPress1 = async (number) => {
    var Ole_pin = await this.state.PIN_1;
    if (number == "x") {
      // console.log(Ole_pin.length);
      if (Ole_pin.length == 1) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN_1: str,
          dot_1_1: "dot ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 2) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN_1: str,
          dot_2_1: "dot ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 3) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN_1: str,
          dot_3_1: "dot ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 4) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN_1: str,
          dot_4_1: "dot ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 5) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN_1: str,
          dot_5_1: "dot ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 6) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN_1: str,
          dot_6_1: "dot ml-1 mr-1",
        });
      }
    } else {
      if (Ole_pin.length == 0) {
        this.setState({
          PIN_1: (await Ole_pin) + number,
          dot_1_1: "dot_full ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 1) {
        this.setState({
          PIN_1: (await Ole_pin) + number,
          dot_2_1: "dot_full ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 2) {
        this.setState({
          PIN_1: (await Ole_pin) + number,
          dot_3_1: "dot_full ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 3) {
        this.setState({
          PIN_1: (await Ole_pin) + number,
          dot_4_1: "dot_full ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 4) {
        this.setState({
          PIN_1: (await Ole_pin) + number,
          dot_5_1: "dot_full ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 5) {
        this.setState({
          PIN_1: (await Ole_pin) + number,
          dot_6_1: "dot_full ml-1 mr-1",
          view1: true,
          view2: false,
        });
      }
    }
  };
  OnPinPress2 = async (number) => {
    var Ole_pin = await this.state.PIN_2;
    if (number == "x") {
      console.log(Ole_pin.length);
      if (Ole_pin.length == 1) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN_2: str,
          dot_1_2: "dot ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 2) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN_2: str,
          dot_2_2: "dot ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 3) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN_2: str,
          dot_3_2: "dot ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 4) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN_2: str,
          dot_4_2: "dot ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 5) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN_2: str,
          dot_5_2: "dot ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 6) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN_2: str,
          dot_6_2: "dot ml-1 mr-1",
        });
      }
    } else {
      if (Ole_pin.length == 0) {
        this.setState({
          PIN_2: (await Ole_pin) + number,
          dot_1_2: "dot_full ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 1) {
        this.setState({
          PIN_2: (await Ole_pin) + number,
          dot_2_2: "dot_full ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 2) {
        this.setState({
          PIN_2: (await Ole_pin) + number,
          dot_3_2: "dot_full ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 3) {
        this.setState({
          PIN_2: (await Ole_pin) + number,
          dot_4_2: "dot_full ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 4) {
        this.setState({
          PIN_2: (await Ole_pin) + number,
          dot_5_2: "dot_full ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 5) {
        this.setState({
          PIN_2: (await Ole_pin) + number,
          dot_6_2: "dot_full ml-1 mr-1",
        });

        if ((await this.state.PIN_2) == (await this.state.PIN_1)) {
          // alert("true");
          var data = {
            user_id: this.state.user_line_id,
            password: this.state.PIN_2,
          };

          await axios({
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            url: "/api/user/confirm_password",
            data: JSON.stringify({ data }),
          }).then(
            (response) => {
              // console.log(response);
              if (response.status === 200) {
                var device_name = "";
                if (isAndroid) {
                  device_name = "isAndroid";
                }
                if (isIOS) {
                  device_name = "isIOS";
                }

                /// บันทึกการ login
                var data = {
                  user_id: this.state.user_line_id,
                  device: device_name,
                  browser_name: "",
                };
                axios({
                  method: "post",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer my-token",
                    "My-Custom-Header": "foobar",
                  },
                  url: "/api/login_history",
                  data: JSON.stringify({ data: data }),
                }).then(
                  (response) => {
                    Swal.fire({
                      icon: "success",
                      title: "เสร็จสิ้น",
                      text: "ยืนยันรหัสผ่านสำเร็จ",
                    });
                    return Router.push("/mobile/route"); //หน้าเมนู
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          // alert("รหัสผ่านไม่ถูกต้อง");
          Swal.fire({
            icon: "error",
            title: "ผิดพลาด",
            text: "รหัสผ่านไม่ตรงกัน!",
          });
          this.setState({
            PIN_2: "",
            PIN_1: "",

            dot_1_1: "dot ml-1 mr-1",
            dot_2_1: "dot ml-1 mr-1",
            dot_3_1: "dot ml-1 mr-1",
            dot_4_1: "dot ml-1 mr-1",
            dot_5_1: "dot ml-1 mr-1",
            dot_6_1: "dot ml-1 mr-1",

            dot_1_2: "dot ml-1 mr-1",
            dot_2_2: "dot ml-1 mr-1",
            dot_3_2: "dot ml-1 mr-1",
            dot_4_2: "dot ml-1 mr-1",
            dot_5_2: "dot ml-1 mr-1",
            dot_6_2: "dot ml-1 mr-1",

            view1: false, //โชวหน้า pin 1
            view2: true,
          });
        }
      }
    }
  };

  render() {
    return (
      <>
        <div style={{ height: "100vh" }} hidden={this.state.view1}>
          <div
            style={{
              height: "30vh",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <form>
              <div className="form-group d-flex justify-content-center ml-2 mr-2">
                <label style={{ textAlign: "center" }}>
                  กรุณาตั้งรหัสผ่านเพื่อใช้ในการล็อกอินในครั้งต่อไป
                </label>
              </div>
              <div className="form-group d-flex justify-content-center">
                <span className={this.state.dot_1_1} />
                <span className={this.state.dot_2_1} />
                <span className={this.state.dot_3_1} />
                <span className={this.state.dot_4_1} />
                <span className={this.state.dot_5_1} />
                <span className={this.state.dot_6_1} />
              </div>
            </form>
          </div>
          <div className="container-fluid" style={{ height: "70vh" }}>
            <div className="container-fluid">
              <div className="row d-flex justify-content-around">
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress1("1")}
                  >
                    1
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress1("2")}
                  >
                    2
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress1("3")}
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
                    onClick={() => this.OnPinPress1("4")}
                  >
                    4
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress1("5")}
                  >
                    5
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress1("6")}
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
                    onClick={() => this.OnPinPress1("7")}
                  >
                    7
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress1("8")}
                  >
                    8
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress1("9")}
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
                    onClick={() => this.OnPinPress1("0")}
                  >
                    0
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress1("x")}
                  >
                    x
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "100vh" }} hidden={this.state.view2}>
          <div
            style={{
              height: "30vh",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <form>
              <div className="form-group d-flex justify-content-center">
                <label>ยืนยันรหัสผ่านอีกครั้ง</label>
              </div>
              <span className={this.state.dot_1_2} />
              <span className={this.state.dot_2_2} />
              <span className={this.state.dot_3_2} />
              <span className={this.state.dot_4_2} />
              <span className={this.state.dot_5_2} />
              <span className={this.state.dot_6_2} />
            </form>
          </div>
          <div className="container-fluid" style={{ height: "70vh" }}>
            <div className="container-fluid">
              <div className="row d-flex justify-content-around">
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress2("1")}
                  >
                    1
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress2("2")}
                  >
                    2
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress2("3")}
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
                    onClick={() => this.OnPinPress2("4")}
                  >
                    4
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress2("5")}
                  >
                    5
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress2("6")}
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
                    onClick={() => this.OnPinPress2("7")}
                  >
                    7
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress2("8")}
                  >
                    8
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress2("9")}
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
                    onClick={() => this.OnPinPress2("0")}
                  >
                    0
                  </button>
                </div>
                <div className="col d-flex justify-content-center">
                  <button
                    className="btn-no-focus"
                    style={ButtonStyle}
                    onClick={() => this.OnPinPress2("x")}
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
}

export default login;
