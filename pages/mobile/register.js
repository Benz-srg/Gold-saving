import React, { Component } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";
import axios, { post } from "axios";
import Swal from "sweetalert2";
import ModalB from "react-bootstrap/Modal";
import CalendarToday from "@material-ui/icons/CalendarToday";

import Calendar from "react-calendar";
import Modal from "react-modal";
import InputAddress from "react-thailand-address-autocomplete";
import moment from "moment";
import Router from "next/router";
const InputStyle = {
  backgroundColor: "rgb(236 ,216 ,146) ",
  color: "rgb(255 ,255 ,255) ",
  fontSize: "12pt",
  borderWidth: "0",
  fontFamily: "SukhumvitSet-SemiBold",
};
const InputStyleThailand = {
  height: "calc(1.5em + .75rem + 2px)",
  width: "100%",
  backgroundColor: "rgb(236 ,216 ,146) ",
  color: "rgb(255 ,255 ,255) ",
  fontSize: "12pt",
  borderWidth: "0",
  fontFamily: "SukhumvitSet-SemiBold",
};
const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  content: {
    position: "absolute",
    top: "10px",
    left: "10px",
    right: "10px",
    bottom: "10px",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "0px",
  },
};
const customStylesCarlendar = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "10%",
  },
};
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
  backgroundColor: "rgb(153 ,0 ,0) ",
  color: "white",
  fontSize: "12pt",
};
const TitleStyle = {
  color: "rgb(0 ,0 ,0) ",
  fontSize: "18pt",
  fontFamily: "SukhumvitSet-SemiBold",
};
const TitleNameStyle = {
  color: "rgb(0 ,0 ,0) ",
  fontSize: "10pt",
  fontFamily: "SukhumvitSet-SemiBold",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.textInputfname = React.createRef();
    this.textInputlname = React.createRef();
    this.textInputidcard = React.createRef();
    this.textInputbrithday = React.createRef();
    this.textInputexpiry = React.createRef();
    this.textInputbackidcard = React.createRef();
    this.textInputjob = React.createRef();
    this.textInputjob_location = React.createRef();
    this.textInputaddress = React.createRef();
    this.textInputsubdistrict = React.createRef();
    this.textInputdistrict = React.createRef();
    this.textInputprovince = React.createRef();
    this.textInputzipcode = React.createRef();

    this.textInputphonenumber = React.createRef();
    this.state = {
      logo_path: "/image/logo.svg",
      fname: "",
      lname: "",
      phonenumber: "",
      idcard: "",
      brithday: null,
      brithday_th: null,
      expiry: null,
      backidcard: "",
      job: "",
      job_location: "",
      address: "",
      subdistrict: "",
      district: "",
      province: "",
      zipcode: "",
      text_status: "",

      user_line_id: "",
      is_checked: false,
      fileIdCard: "",
      fileUserWithIdCard: "",
      imageIdCard: "",
      imageUserWithIdCard: "",
      modal_show: false,
      condition_show: false,
      otpconfirm_show: false,
      page_1: false,
      page_2: true,
      refcode: "",
      otpconfirm: "",
      regexp: /^[0-9\b]+$/,
      calendar_show: false,
    };
  }

  componentDidMount = async () => {
    this.setState({
      user_line_id: await localStorage.getItem("auth"),
    });
  };
  imageIdCardChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        fileIdCard: file,
        imageIdCard: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onChangeDate(e) {
    var date = moment(e).add(543, "year").format("DD/MM/YYYY");
    // console.log(date);
    this.setState({
      brithday: e,
      brithday_th: date,
      calendar_show: false,
    });
  }
  onSelect(fullAddress) {
    const { subdistrict, district, province, zipcode } = fullAddress;
    this.setState({
      subdistrict,
      district,
      province,
      zipcode,
    });
  }

  imageUserWithIdCardChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        fileUserWithIdCard: file,
        imageUserWithIdCard: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }
  onChecked = () => {
    var that = this.state;
    if (that.is_checked === true) {
      this.setState({ is_checked: false });
    } else {
      this.setState({ is_checked: true });
    }
  };
  onRegister = async () => {
    var that = this.state;
    var fileUserWithIdCardPath = await this.fileUpload(
      that.fileUserWithIdCard
    ).then((response) => {
      return response.data.secure_url;
    }); // อัพโหลดรูป และรับค่า Url

    //แจ้งเตือนเข้า แอดมิน
    var message_admin = {
      message: "ใบสมัคร รอการอนุมัติ",
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

    //insert regis data
    var data = {
      fname: that.fname,
      lname: that.lname,
      phonenumber: that.phonenumber,
      idcard: that.idcard,
      brithday: that.brithday,
      address: that.address,
      province: that.province,
      district: that.district,
      canton: that.subdistrict,
      postal_code: that.zipcode,
      user_line_id: that.user_line_id,
      fileUserWithIdCard: fileUserWithIdCardPath,
      PIN: "",
      status: "pending",
    };

    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/register/send_request",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        this.setState({ modal_show: false });
        Swal.fire({
          icon: "success",
          title: "เรียบร้อย",
          text: "กรุณารอการยืนยันในภายหลัง",
        });
        return Router.push("/mobile/wait");
      },
      (error) => {
        console.log(error);
      }
    );
  };
  fileUpload = (file) => {
    const url = "https://api.cloudinary.com/v1_1/zxv/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "register");
    return axios.post(url, formData);
  };

  onCheckOTP = async () => {
    this.setState({ otpconfirm_show: false });
    axios
      .get("/api/OTP", {
        params: {
          otp: this.state.otpconfirm, // otp ที่กรอกจาก input
          ref: this.state.refcode, // ref
        },
      })
      .then(
        (response) => {
          console.log(response.status);
          if (response.status === 200) {
            this.setState({ modal_show: true });
            this.onRegister();
          }
          if (response.status === 201) {
            this.setState({
              otpconfirm: "",
            });
            return Swal.fire({
              icon: "error",
              title: "ผิดพลาด",
              text: "รหัส OTP ไม่ถูกต้อง!",
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  onSendOTP = async () => {
    if (this.state.phonenumber === "") {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาระบุเบอร์โทรศัพท์!",
      });
    }
    var OTPnumber = "";
    var possible = "0123456789";
    for (var i = 0; i < 6; i++) {
      OTPnumber += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    var Ref = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++) {
      Ref += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    var messages = "รหัสอ้างอิง : " + Ref + "\r\n" + "รหัส OTP : " + OTPnumber;
    var data = {
      otp: OTPnumber,
      ref: Ref,
      phone: this.state.phonenumber,
      messages: messages,
    };
    // ส่ง OTP เข้ามือถือ
    await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/opt",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    // ส่ง Insert ข้อมูล OTP เข้า DB
    await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/OTP",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.setState({
      refcode: Ref,
      otpconfirm_show: true,
    });
  };

  onNextPage = async () => {
    var that = this.state;
    if (that.fname === "") {
      this.textInputfname.current.focus();
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาระบุ ชือ!",
      });
    }
    if (that.lname === "") {
      this.textInputlname.current.focus();
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาระบุ นามสกุล!",
      });
    }

    // console.log(that.idcard.length);
    if (that.idcard.length != 13) {
      this.textInputidcard.current.focus();
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "เลขบัตรประชาชน ต้องมี 13 หลัก",
      });
    }
    if (that.idcard === "") {
      this.textInputidcard.current.focus();
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาระบุ เลขบัตรประชาชน!",
      });
    }
    if (that.brithday === null) {
      this.textInputbrithday.current.focus();
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาระบุ วันเกิด!",
      });
    }
    if (that.address === "") {
      this.textInputaddress.current.focus();
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาระบุ ทีอยู่จัดส่ง!",
      });
    }
    if (that.subdistrict === "") {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาระบุ ตำบล/แขวง!",
      });
    }
    if (that.district === "") {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาระบุ อำเภอ/เขต!",
      });
    }
    if (that.province === "") {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาระบุ จังหวัด!",
      });
    }
    if (that.zipcode === "") {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาระบุ รหัสไปรษณีย์!",
      });
    }
    if (that.imageUserWithIdCard === "") {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณาอัปโหลด รูปถ่ายคู่บัตรประชาชน!",
      });
    }
    if (that.is_checked === false) {
      return Swal.fire({
        icon: "error",
        title: "ผิดพลาด",
        text: "กรุณายอมรับเงื่อนไข!",
      });
    }

    this.setState({
      page_1: true, //หน้า 1 hiden true
      page_2: false, //หน้า 2
    });
  };
  onBackPage = async () => {
    this.setState({
      page_1: false,
      page_2: true,
    });
  };
  onSendNotiToadminTets = async (e) => {
    var message_admin = {
      message: "ใบสมัคร รอการอนุมัติ",
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
  };
  onChangeIdCard = (e) => {
    const { value, maxLength } = e.target;
    const message = value.slice(0, 13);
    if (isNaN(message)) {
    } else {
      this.setState({
        idcard: message,
      });
    }
  };

  render() {
    let { imageIdCard } = this.state;
    let { imageUserWithIdCard } = this.state;
    let $imagePreviewIdCard = null;
    if (imageIdCard) {
      $imagePreviewIdCard = (
        <img
          src={imageIdCard}
          width="300px"
          height="200px"
          alt=""
          style={{ marginLeft: "10px" }}
        />
      );
    } else {
      $imagePreviewIdCard = (
        <img
          src="/image/register/บัตรประชาชน.jpg"
          width="300px"
          height="200px"
          alt=""
          style={{ marginLeft: "10px" }}
        />
      );
    }
    let $imagePreviewUserWithIdCard = null;
    if (imageUserWithIdCard) {
      $imagePreviewUserWithIdCard = (
        <img
          src={imageUserWithIdCard}
          width="300px"
          height="200px"
          alt=""
          style={{ marginLeft: "10px" }}
        />
      );
    } else {
      $imagePreviewUserWithIdCard = (
        <img
          src="/image/register/ภาพถ่ายคู่บัตร.png"
          width="300px"
          height="200px"
          alt=""
          style={{ marginLeft: "10px" }}
        />
      );
    }

    return (
      <>
        {/* /////////////////////// */}
        {/* หน้า 1 */}
        <div className="tab-content mb-5" hidden={this.state.page_1}>
          <div className="container mt-5">
            <div className="d-flex justify-content-center mb-3">
              <img
                src="/image/logo.svg"
                className="d-flex justify-content-center mb-3"
                width={"300px"}
                height={"150px"}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                style={TitleStyle}
              >
                สร้างบัญชี
              </label>
            </div>

            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                style={TitleNameStyle}
              >
                ข้อมูลส่วนตัว
              </label>
            </div>
            <div className="mb-3">
              <input
                ref={this.textInputfname}
                type="text"
                className="form-control InputRegister"
                placeholder="ชื่อจริง"
                onChange={(e) => this.setState({ fname: e.target.value })}
                style={InputStyle}
              />
            </div>
            <div className="mb-3">
              <input
                ref={this.textInputlname}
                type="text"
                className="form-control InputRegister"
                placeholder="นามสกุล"
                onChange={(e) => this.setState({ lname: e.target.value })}
                style={InputStyle}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                style={TitleNameStyle}
              >
                ข้อมูลบัตรประชาชน
              </label>
            </div>
            <div className="mb-3">
              <input
                ref={this.textInputidcard}
                type="tel"
                className="form-control InputRegister"
                placeholder="หมายเลขบัตรประชาชน"
                value={this.state.idcard}
                onChange={this.onChangeIdCard}
                // onChange={}
                style={InputStyle}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                style={TitleNameStyle}
              >
                วันเดือนปีเกิด(กดปฏิทิน)
              </label>
            </div>
            <div className="input-group mb-3">
              <input
                ref={this.textInputbrithday}
                type="text"
                className="form-control InputRegister"
                placeholder="วันเดือนปีเกิด"
                // disabled={true}
                value={this.state.brithday_th}
                style={InputStyle}
                readOnly={true}
              />
              <div
                className="input-group-prepend"
                style={{
                  backgroundColor: "rgb(236 ,216 ,146) ",
                  color: "rgb(255 ,255 ,255) ",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CalendarToday
                  onClick={() => this.setState({ calendar_show: true })}
                />
              </div>
            </div>
            <ModalB
              show={this.state.calendar_show}
              onHide={() => this.setState({ calendar_show: false })}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <ModalB.Header closeButton></ModalB.Header>
              <ModalB.Body>
                <div>
                  <Calendar
                    locale="th"
                    onChange={(e) => this.onChangeDate(e)}
                    value={this.state.brithday}
                  />
                </div>
              </ModalB.Body>
            </ModalB>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                style={TitleNameStyle}
              >
                ที่อยู่จัดส่ง
              </label>
            </div>
            <div className="mb-3">
              <input
                ref={this.textInputaddress}
                type="text"
                className="form-control InputRegister"
                placeholder="บ้านเลขที่และชื่อถนน"
                onChange={(e) => this.setState({ address: e.target.value })}
                style={InputStyle}
              />
            </div>
            <div className="custom-thailand  mb-3">
              <InputAddress
                address="subdistrict"
                className="InputRegister"
                placeholder="แขวง/ตำบล"
                value={this.state.subdistrict}
                onChange={(e) => this.onChange(e)}
                onSelect={(e) => this.onSelect(e)}
                style={InputStyleThailand}
              />
            </div>
            <div className="custom-thailand mb-3">
              <InputAddress
                className="InputRegister"
                address="district"
                placeholder="เขต / อำเภอ"
                value={this.state.district}
                onChange={(e) => this.onChange(e)}
                onSelect={(e) => this.onSelect(e)}
                style={InputStyleThailand}
              />
            </div>
            <div className="custom-thailand mb-3">
              <InputAddress
                className="InputRegister"
                address="province"
                placeholder="จังหวัด"
                value={this.state.province}
                onChange={(e) => this.onChange(e)}
                onSelect={(e) => this.onSelect(e)}
                style={InputStyleThailand}
              />
            </div>
            <div className="custom-thailand mb-3">
              <InputAddress
                className="InputRegister"
                address="zipcode"
                placeholder="รหัสไปรษณีย์"
                value={this.state.zipcode}
                onChange={(e) => this.onChange(e)}
                onSelect={(e) => this.onSelect(e)}
                style={InputStyleThailand}
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                style={TitleNameStyle}
              >
                *รูปถ่ายคู่บัตรประชาชน
              </label>
            </div>
            <div className="d-flex justify-content-center mb-3">
              {$imagePreviewUserWithIdCard}
            </div>
            <input
              className="fileInput"
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              onChange={(e) => this.imageUserWithIdCardChange(e)}
            />
            <div className="mb-3 form-check mt-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={this.is_checked}
                onChange={this.onChecked}
              />
              <label
                className="form-check-label "
                htmlFor="exampleCheck1"
                style={TitleNameStyle}
              >
                ข้าพเจ้ายอมรับ เงื่อนไขและข้อตกลง ของห้างทองแม่อุ๋ย
              </label>
            </div>
            <button
              className="btn btn-danger container mb-3"
              // onClick={this.onNextPage}
              onClick={() => this.setState({ condition_show: true })}
              style={ButtonStyle}
            >
              อ่านเงื่อนไข
            </button>
            <button
              className="btn btn-danger container"
              onClick={this.onNextPage}
              style={ButtonStyle}
            >
              ต่อไป
            </button>
          </div>
        </div>
        {/* หน้า 2 */}
        <div className="tab-content mb-5" hidden={this.state.page_2}>
          <div className="container mt-5">
            <div className="d-flex justify-content-center mb-3">
              <img
                src="/image/logo.svg"
                className="d-flex justify-content-center mb-3"
                width={"300px"}
                height={"150px"}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                style={TitleStyle}
              >
                สร้างบัญชี
              </label>
            </div>

            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                style={TitleNameStyle}
              >
                ยืนยันตัวตน
              </label>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control InputRegister"
                placeholder="เบอร์โทรศัพท์มือถือ"
                onChange={(e) => this.setState({ phonenumber: e.target.value })}
                style={InputStyle}
              />
            </div>
            <button
              className="btn btn-danger container mb-3"
              onClick={this.onSendOTP}
              style={ButtonStyle}
            >
              ส่งรหัส OTP
            </button>
            <button
              className="btn btn-danger container mb-3"
              onClick={this.onBackPage}
              style={ButtonStyle}
            >
              ย้อนกลับ
            </button>
          </div>
        </div>
        <Modal style={customStyles2} isOpen={this.state.modal_show}>
          <span
            className="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          />
          กรุณารอสักครู่...
          {/* {this.state.text_status} */}
        </Modal>

        <Modal isOpen={this.state.condition_show} style={customStyles}>
          <div className="card">
            {/* Modal Header */}
            <div className="modal-header">
              <h1 className="modal-title" style={TitleStyle}>
                เงื่อนไขและข้อตกลง
              </h1>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => this.setState({ condition_show: false })}
              >
                ×
              </button>
            </div>
            <div className="modal-body ">
              <p style={TitleNameStyle}>
                1. การออมทอง คือการที่ลูกค้าตกลงซื้อทองคำรูปพรรณ 96.5%
                ในลักษณะทยอยซื้อ
                และลูกค้าตกลงให้ร้านค้าเป็นผู้เก็บรักษาทองคำที่ลูกค้าซื้อในแต่ละครั้งไว้
              </p>
              <p style={TitleNameStyle}>
                2. หน่วยทองคำ 1 บาท เท่ากับ 15.16 กรัม / 2 สลึง เท่ากับ 7.58
                กรัม / 1 สลึง เท่ากับ 3.79 กรัม / ครึ่งสลึง เท่ากับ 1.90 กรัม /
                1 กรัม เท่ากับ 1.00 กรัม / 0.6 กรัม เท่ากับ 0.60 กรัม
              </p>
              <p style={TitleNameStyle}>
                3.
                ลูกค้าตกลงออมทองเป็นประจำตามความประสงค์ให้ครบจำนวนเงินที่ตกลงไว้
                ภายในระยะเวลา 24 สัปดาห์
              </p>
              <p style={TitleNameStyle}>
                4. ร้านค้าจะคำนวณเงินงวดตามน้ำหนักทองคำที่ลูกค้าแจ้งความประสงค์
                โดยใช้ราคาทองคำที่ประกาศจากสมาคมค้าทองแห่งประเทศไทยวันที่ออมงวดแรก
              </p>
              <p style={TitleNameStyle}>
                5. ในกรณีที่ลูกค้าออมครบจำนวนเงินที่ตกลงกันไว้
                ลูกค้าสามารถขอรับทองคำรูปพรรณตามแบบสินค้าที่มีอยู่ในร้านค้าในขณะนั้นได้
                โดยไม่มีค่าใช้จ่ายใดๆ เว้นแต่ลูกค้ารับทองคำรูปพรรณลายพิเศษ
                หรือให้ร้านค้าจัดส่งทอง
                ค่าใช้จ่ายที่เกิดขึ้นลูกค้าเป็นผู้รับผิดชอบ
              </p>
              <p style={TitleNameStyle}>
                6. ลูกค้าสามารถยกเลิกการออมและรับเป็นเงินได้
                โดยลูกค้าเป็นผู้รับผิดชอบค่าธรรมเนียม
                น้ำหนักทองครึ่งสลึงและหนึ่งสลึง ค่าธรรมเนียมเท่ากับเงินออมงวดแรก
                น้ำหนักทองสองสลึงและหนึ่งบาท ค่าธรรมเนียมเท่ากับห้าร้อยบาท
              </p>
              <p style={TitleNameStyle}>
                7. เมื่อลูกค้าออมไม่ครบจำนวนเงินที่ตกลงกันไว้ ภายในระยะเวลา 24
                สัปดาห์ บัญชีออมทองนี้จะถูกยกเลิก
                ลูกค้าจะได้รับเงินคืนตามจำนวนเงินที่ส่งมาหักค่าธรรมเนียม
              </p>
              <p style={TitleNameStyle}>
                8. ลูกค้ายอมรับว่า
                การออมทองตามสัญญานี้มิใช่การฝากเงินกับธนาคารพาณิชย์หรือสถาบันการเงินใดๆ
                แต่เป็นการทยอยซื้อทองคำรูปพรรณ
                ร้านค้าจึงไม่มีส่วนต้องรับผิดชอบในผลขาดทุน
                หรือชำระดอกเบี้ยที่เกิดขึ้นจากการออมทองนี้
              </p>
              <p style={TitleNameStyle}>
                9. ลูกค้ายอมรับว่า การออมทองนี้ และ/หรือการซื้อทองคำ
                และ/หรือการขายทองคำ และ/หรือการขอรับทองคำ และ/หรือการยกเลิก
                ไม่ว่าครั้งใด รายการใด เป็นการตัดสินใจของลูกค้าเองทั้งสิ้น
                ลูกค้าเข้าใจเป็นอย่างดีและยอมรับว่าการออมทองคำเป็นการลงทุนที่มีความเสี่ยง
                เนื่องจากความผันผวนขึ้นลงของราคาทองคำเกิดขึ้นตลอดเวลา
                ข้าพเจ้าได้อ่าน เข้าใจ และยอมรับเงื่อนไขและข้อตกลงนี้
              </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => this.setState({ condition_show: false })}
              >
                ปิด
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={this.state.otpconfirm_show}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="container" style={{ maxHeight: "300px" }}>
            <div className="modal-header">
              <h1 className="modal-title" style={TitleStyle}>
                กรอกรหัส OTP
              </h1>
            </div>
            <div className="modal-body">
              <p style={TitleNameStyle}>รหัสอ้างอิง : {this.state.refcode}</p>
              <input
                type="text"
                className="form-control InputRegister"
                placeholder="หมายเลข OTP 6 หลัก"
                onChange={(e) => this.setState({ otpconfirm: e.target.value })}
                style={InputStyle}
              />
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-danger container mt-3"
                onClick={this.onCheckOTP}
                style={ButtonStyle}
              >
                ยืนยัน
              </button>
              <button
                className="btn btn-danger container mt-3"
                onClick={this.onSendOTP}
                style={ButtonStyle}
              >
                ส่งรหัส OTP อีกครั้ง
              </button>
              <button
                className="btn btn-danger container"
                onClick={() => this.setState({ otpconfirm_show: false })}
                style={ButtonStyle}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </Modal>
        {/* /////////////////////// */}
      </>
    );
  }
}

export default App;
