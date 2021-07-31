import React, { Fragment, Component } from "react";
import axios, { post } from "axios";
import Swal from "sweetalert2";
import Router from "next/router";
import { isAndroid, isIOS } from "react-device-detect";
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
      dot_1: "dot ml-1 mr-1",
      dot_2: "dot ml-1 mr-1",
      dot_3: "dot ml-1 mr-1",
      dot_4: "dot ml-1 mr-1",
      dot_5: "dot ml-1 mr-1",
      dot_6: "dot ml-1 mr-1",
      PIN: "",
      user_line_id: "",
    };
  }

  componentDidMount = async () => {
    this.setState({
      user_line_id: await localStorage.getItem("auth"),
    });
  };
  OnPinPress = async (number) => {
    var Ole_pin = await this.state.PIN;
    if (number == "x") {
      console.log(Ole_pin.length);
      if (Ole_pin.length == 1) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN: str,
          dot_1: "dot ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 2) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN: str,
          dot_2: "dot ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 3) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN: str,
          dot_3: "dot ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 4) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN: str,
          dot_4: "dot ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 5) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN: str,
          dot_5: "dot ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 6) {
        var str = Ole_pin;
        str = str.substring(0, str.length - 1);
        this.setState({
          PIN: str,
          dot_6: "dot ml-1 mr-1",
        });
      }
    } else {
      if (Ole_pin.length == 0) {
        this.setState({
          PIN: (await Ole_pin) + number,
          dot_1: "dot_full ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 1) {
        this.setState({
          PIN: (await Ole_pin) + number,
          dot_2: "dot_full ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 2) {
        this.setState({
          PIN: (await Ole_pin) + number,
          dot_3: "dot_full ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 3) {
        this.setState({
          PIN: (await Ole_pin) + number,
          dot_4: "dot_full ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 4) {
        this.setState({
          PIN: (await Ole_pin) + number,
          dot_5: "dot_full ml-1 mr-1",
        });
      }
      if (Ole_pin.length == 5) {
        this.setState({
          PIN: (await Ole_pin) + number,
          dot_6: "dot_full ml-1 mr-1",
        });

        //เช็ค  passsword
        var data = {
          user_id: this.state.user_line_id,
          password: await this.state.PIN,
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
              // ถ้ารหัสผ่านถูกต้อง
              var device_name = "";
              if (isAndroid) {
                device_name = "isAndroid";
              }
              if (isIOS) {
                device_name = "isIOS";
              }
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
                  return Router.push("/mobile/route"); //ไปหน้าเมนู
                },
                (error) => {
                  console.log(error);
                }
              );
            } else {
              // ถ้ารหัสผ่านไม่ถูกต้อง
              Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "รหัสผ่านไม่ถูกต้อง!",
              });
              this.setState({
                dot_1: "dot ml-1 mr-1",
                dot_2: "dot ml-1 mr-1",
                dot_3: "dot ml-1 mr-1",
                dot_4: "dot ml-1 mr-1",
                dot_5: "dot ml-1 mr-1",
                dot_6: "dot ml-1 mr-1",
                PIN: "",
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  };

  render() {
    return (
      <div style={{ height: "100vh" }}>
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
              <label>รหัสผ่านของคุณ</label>
            </div>
            <span className={this.state.dot_1} />
            <span className={this.state.dot_2} />
            <span className={this.state.dot_3} />
            <span className={this.state.dot_4} />
            <span className={this.state.dot_5} />
            <span className={this.state.dot_6} />
          </form>
        </div>
        <div className="container-fluid" style={{ height: "70vh" }}>
          <div className="container-fluid">
            <div className="row d-flex justify-content-around">
              <div className="col d-flex justify-content-center">
                <button
                  className="btn-no-focus"
                  style={ButtonStyle}
                  onClick={() => this.OnPinPress("1")}
                >
                  1
                </button>
              </div>
              <div className="col d-flex justify-content-center">
                <button
                  className="btn-no-focus"
                  style={ButtonStyle}
                  onClick={() => this.OnPinPress("2")}
                >
                  2
                </button>
              </div>
              <div className="col d-flex justify-content-center">
                <button
                  className="btn-no-focus"
                  style={ButtonStyle}
                  onClick={() => this.OnPinPress("3")}
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
                  onClick={() => this.OnPinPress("4")}
                >
                  4
                </button>
              </div>
              <div className="col d-flex justify-content-center">
                <button
                  className="btn-no-focus"
                  style={ButtonStyle}
                  onClick={() => this.OnPinPress("5")}
                >
                  5
                </button>
              </div>
              <div className="col d-flex justify-content-center">
                <button
                  className="btn-no-focus"
                  style={ButtonStyle}
                  onClick={() => this.OnPinPress("6")}
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
                  onClick={() => this.OnPinPress("7")}
                >
                  7
                </button>
              </div>
              <div className="col d-flex justify-content-center">
                <button
                  className="btn-no-focus"
                  style={ButtonStyle}
                  onClick={() => this.OnPinPress("8")}
                >
                  8
                </button>
              </div>
              <div className="col d-flex justify-content-center">
                <button
                  className="btn-no-focus"
                  style={ButtonStyle}
                  onClick={() => this.OnPinPress("9")}
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
                  onClick={() => this.OnPinPress("0")}
                >
                  0
                </button>
              </div>
              <div className="col d-flex justify-content-center">
                <button
                  className="btn-no-focus"
                  style={ButtonStyle}
                  onClick={() => this.OnPinPress("x")}
                >
                  x
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default login;
