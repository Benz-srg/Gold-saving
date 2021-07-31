import React, { useState, useEffect } from "react";
import Cookies from "cookies";
import axios, { post } from "axios";
import Typography from "@material-ui/core/Typography";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import { MDBDataTableV5 } from "mdbreact";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";
import moment from "moment";
// Required component
import Lightbox from "react-awesome-lightbox";
// Required stylesheet
import "react-awesome-lightbox/build/style.css";
import Visibility from "@material-ui/icons/Visibility";
const ManagerememberPage = ({ user }) => {
  const [show, setShow] = useState(false);
  const [no_pass, No_pass] = useState(false);
  const [show_detail, setShow_detail] = useState(false);
  const [fileUserWithIdCard, FileUserWithIdCard] = useState(String);

  const [url_image, Url_image] = useState(String);
  const [imageIsShow, ImageIsShow] = useState(false);
  const [datatable, setDatatable] = useState(Array);
  const [datatableuser, setDatatableuser] = useState(Array);
  const [seleteddata, Seleteddata] = useState(Array);
  const [us_id, Us_id] = useState(localStorage.getItem("auth_backend"));
  const [us_role, Us_role] = useState(localStorage.getItem("role"));
  const [_id, _Id] = useState(String);

  const [c_mgr, C_mgr] = useState(false); // james add
  const [c_admin, C_admin] = useState(false);
  const [c_emp, C_emp] = useState(false);
  const [c_user, C_user] = useState(false);
  const [hide_mgr, Hide_mgr] = useState(false); // james add
  const [hide_admin, Hide_admin] = useState(false);
  const [hide_emp, Hide_emp] = useState(false);
  const [disable_user, Disable_user] = useState(false);

  useEffect(async () => {
    if (us_role === "admin") {
      Hide_admin(true);
    }
    if (us_role ==="mgr") { //james add
      Hide_admin(true);
      Hide_mgr(true);
    }
    if (us_role === "emp") {
      Hide_mgr(true);
      Hide_admin(true);
      Hide_emp(true);
      Disable_user(true);
    }
    ReloadRegisterData(); //ข้อมูลการสมัคร
    ReloadUserData(); //ข้อมูลผู้ใช้
  }, []);
  const OnOpenDetail = async (e) => {
    Seleteddata(e);
    _Id(e._id);
    FileUserWithIdCard(e.fileUserWithIdCard);
    setShow(true);
  };
  const OnOpenDetail2 = async (e) => {
    Seleteddata(e);
    // console.log(e.role);
    if (e.role === "admin") {
      //เช็คเพื่อ โชว radio input
      C_admin(true);
      C_mgr(false);
      C_emp(false);
      C_user(false);
    }
    if (e.role === "mgr") { //james add
      //เช็คเพื่อ โชว radio input
      C_admin(false);
      C_mgr(true);
      C_emp(false);
      C_user(false);
    }
    if (e.role === "emp") {
      //เช็คเพื่อ โชว radio input
      C_mgr(false);
      C_admin(false);
      C_emp(true);
      C_user(false);
    }
    if (e.role === "user") {
      //เช็คเพื่อ โชว radio input
      C_mgr(false);
      C_admin(false);
      C_emp(false);
      C_user(true);
    }

    if (e.status === "nopass") {
      No_pass(true); //ช่อนปุ่มรีเซ้ต พาสเวิด
    } else {
      No_pass(false); //"โชวปุ่มรีเซ้ต พาสเวิด
    }
    _Id(e._id);
    setShow_detail(true);
  };

  const OnDecline = async (e) => {
    var data = {
      id: e._id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/register/update_decline",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {},
      (error) => {
        console.log(error);
      }
    );

    // noti user
    var messages =
      "ขออภัย! บัญชีผู้ใช้ของท่านไม่ผ่านการตรวจสอบ กรุณาทำรายการใหม่อีกครั้ง กดลิงค์ https://liff.line.me/1655646312-MoaYJXR6";
    var data = {
      messages: messages,
      user_id: e.user_line_id,
    };
    await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/line_messaging",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    ReloadRegisterData();
    setShow(false);
  };
  const ShowImgFullScreen = async (e) => {
    Url_image(e);
    ImageIsShow(true);
    setShow(false);
    // console.log(e);
  };
  const HideImgFullScreen = async () => {
    ImageIsShow(false);
    setShow(true);
  };
  const OnApprove = async (e) => {
    var data = {
      id: e._id,
    };
    var main = {
      user_id: us_id,
      data: e,
    };
    /// update ตาราง register จาก pending เป็น Approve
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/register/update_approve",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {},
      (error) => {
        console.log(error);
      }
    );

    /// insert ข้อมูลเข้าตาราง user
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/user/insert",
      data: JSON.stringify(main),
    }).then(
      (response) => {
        ReloadRegisterData();
        ReloadUserData();
        setShow(false);
        return Swal.fire({
          icon: "success",
          title: "เรียบร้อย",
          text: "เพิ่มข้อมูลผู้ใช้สำเร็จ",
        });
      },
      (error) => {
        console.log(error);
      }
    );

    /// noti เข้า user ที่สมัคร
    var messages =
      "การสมัครสมาชิกของท่านผ่านการตรวจสอบและได้รับการยืนยันเรียบร้อยแล้ว กดลิงค์ https://liff.line.me/1655646312-MoaYJXR6  เพื่อกำหนดรหัสผ่าน";
    var data = {
      messages: messages,
      user_id: e.user_line_id,
    };
    await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/line_messaging",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const OnResetPass = async (e) => {
    var data = e;
    console.log(data);
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/user/reset_password",
      data: JSON.stringify(data),
    }).then(
      (response) => {
        ReloadRegisterData();
        ReloadUserData();
        setShow_detail(false);
        return Swal.fire({
          icon: "success",
          title: "เรียบร้อย",
          text: "รีเซ็ตรหัสผ่านผู้ใช้สำเร็จ",
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const OnSave = async (e) => {
    // console.log(e.user_id);
    // console.log("แอดมิน" + c_admin);
    // console.log("พนักงาน" + c_emp);
    // console.log("ผู้ใช้ทั่วไป" + c_user);

    var role = "";
    if (c_admin) {
      role = "admin";
    }
    if (c_mgr) { //james add
      role = "mgr"
    }
    if (c_emp) {
      role = "emp";
    }
    if (c_user) {
      role = "user";
    }

    var data = { user_id: e.user_id, role: role };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/user/update_role",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        ReloadRegisterData();
        ReloadUserData();
        setShow_detail(false);
        return Swal.fire({
          icon: "success",
          title: "เรียบร้อย",
          text: "บันทึกข้อมูลสำเร็จ",
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const OnCloseDetail = async (e) => {
    setShow(false);
  };
  const OnCloseDetail2 = async (e) => {
    setShow_detail(false);
  };
  const Getuser = async (id) => {
    var displayName = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/line_detail",
      data: JSON.stringify({ id: id }),
    }).then(
      (response) => {
        return response.data.data.displayName;
      },
      (error) => {
        console.log(error);
      }
    );
    return displayName;
  };

  const ReloadUserData = async () => {
    // console.log(",,,,,,,," + us_role);
    var data;
    if (us_role === "super_admin") {
      //ถ้าเป็น supper admin
      data = ["admin", "mgr", "emp", "user"]; //james add mgr
    }
    if (us_role === "admin") {
      //ถ้าเป็น  เจ้าของร้าน
      data = ["emp", "user", "mgr", "admin"];
    }
    if (us_role === "mgr") {
      //ถ้าเป็น  ผู้จัดการร้าน
      data = ["emp", "user"];
    }
    if (us_role === "emp") {
      //ถ้าเป็น  พนักงาน
      data = ["user"];
    }

    var user_data = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/user/all_user",
      data: JSON.stringify({ data: data }),
    }).then((response) => {
      return response.data.data;
    });

    var data = [];
    for (let index = 0; index < user_data.length; index++) {
      const element = user_data[index];
      var userdata = await Getuser(element.user_line_id);
      var role = "";
      if (element.role === "admin") {
        role = "เจ้าของร้าน";
      }
      if (element.role === "mgr") { //james add
        role = "ผู้จัดการร้าน";
      }
      if (element.role === "emp") {
        role = "พนักงาน";
      }
      if (element.role === "user") {
        role = "ผู้ใช้ทั่วไป";
      }

      var row = {
        name: element.fname + " " + element.lname,
        line_id: userdata,
        role: role,
        date: moment(element.dateCreate).format("DD-MM-YYYY HH:mm:ss"),
        action: <Visibility onClick={() => OnOpenDetail2(element)} />,
      };
      data.push(row);
    }
    var columns = [
      {
        label: "ชื่อ-นามสกุล",
        field: "name",
        width: 150,
      },
      {
        label: "ชื่อไลน์",
        field: "line_id",
        width: 270,
      },
      {
        label: "ประเภทผู้ใช้งาน",
        field: "role",
        width: 200,
      },
      {
        label: "วันที่เป็นสมาชิก",
        field: "date",
        // sort: "desc",
        width: 200,
      },
      {
        label: "",
        field: "action",
        sort: "disabled",
        width: 100,
      },
    ];
    var rows = data;
    var detail = { columns, rows };
    setDatatableuser(detail);
  };
  const ReloadRegisterData = async () => {
    var register = await axios({
      method: "get",
      url: "/api/register/send_request",
    }).then((response) => {
      return response.data.data;
    });
    var data = [];
    for (let index = 0; index < register.length; index++) {
      const element = register[index];
      var userdata = await Getuser(element.user_line_id);
      var row = {
        name: element.fname + " " + element.lname,
        line_id: userdata,
        date: moment(element.dateRegister).format("YYYY-MM-DD HH:mm:ss"),
        action: <Visibility onClick={() => OnOpenDetail(element)} />,
      };
      data.push(row);
    }
    var columns = [
      {
        label: "ชื่อ-นามสกุล",
        field: "name",
        width: 150,
      },
      {
        label: "ชื่อไลน์",
        field: "line_id",
        width: 270,
      },
      {
        label: "วันที่สมัคร",
        field: "date",
        width: 200,
      },

      {
        label: "",
        field: "action",
        sort: "disabled",
        width: 100,
      },
    ];
    var rows = data;
    var detail = { columns, rows };
    setDatatable(detail);
  };
  const onChangeRadioBox = async (e) => {
    console.log(e);
    if (e === "c_admin") {
      C_admin(true);
      C_mgr(false);
      C_emp(false);
      C_user(false);
    }
    if (e === "c_mgr") {
      C_mgr(true);
      C_emp(false);
      C_user(false);
      C_admin(false);
    }
    if (e === "c_emp") {
      C_admin(false);
      C_mgr(false);
      C_emp(true);
      C_user(false);
    }
    if (e === "c_user") {
      C_mgr(false);
      C_admin(false);
      C_emp(false);
      C_user(true);
    }
  };
  return (
    <>
      <Typography paragraph>
        {imageIsShow ? (
          <Lightbox
            image={url_image}
            isOpen={imageIsShow}
            onClose={() => HideImgFullScreen()}
          />
        ) : null}

        <div className="card mb-5">
          <div className="card-header">คำขอสมัครสมาชิก</div>
          <div className="card-body">
            <MDBDataTableV5
              hover
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              data={datatable}
              pagingTop
              searchTop
              searchBottom={false}
            />
          </div>
        </div>
        <div className="card mb-5">
          <div className="card-header">ข้อมูลสมาชิก</div>
          <div className="card-body">
            <MDBDataTableV5
              hover
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              data={datatableuser}
              pagingTop
              searchTop
              searchBottom={false}
            />
          </div>
        </div>
        {/* อนุมัติสมาชิก */}
        <Modal
          size="xl"
          show={show}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          centered
          style={{ fontFamily: "SukhumvitSet-SemiBold" }}
        >
          <Modal.Header closeButton onClick={() => OnCloseDetail()}>
            <Modal.Title id="example-custom-modal-styling-title">
              ข้อมูลผู้สมัคร
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ minHeight: "70vh", maxHeight: "70vh", overflowY: "auto" }}
          >
            <form>
              <div className="row">
                <div className="col-8">
                  <div className="row mb-3">
                    <label className="col-4">ชื่อ-นามสกุล:</label>
                    <label className="col-8">
                      {seleteddata.fname + "  " + seleteddata.lname}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">เบอร์โทรศัพท์มือถือ:</label>
                    <label className="col-8">{seleteddata.phonenumber}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">หมายเลขบัตรประชาชน:</label>
                    <label className="col-8">{seleteddata.idcard}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">วัน/เดือน/ปีเกิด:</label>
                    <label className="col-8">
                      {moment(seleteddata.brithday).format("DD/MM/YYYY")}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ที่อยู่จัดส่ง:</label>
                    <label className="col-8">{seleteddata.address}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">จังหวัด:</label>
                    <label className="col-8">{seleteddata.province}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">อำเภอ:</label>
                    <label className="col-8">{seleteddata.district}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ตำบล:</label>
                    <label className="col-8">{seleteddata.canton}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">รหัสไปรษณีย์:</label>
                    <label className="col-8">{seleteddata.postal_code}</label>
                  </div>
                </div>
                <div className="col-4">
                  <div className="row d-flex justify-content-center ">
                    <label>รูปถ่ายคู่บัตรประชาชน</label>
                  </div>
                  <div className="row d-flex justify-content-center align-items-center">
                    <img
                      src={fileUserWithIdCard}
                      width={"80%"}
                      height={"300px"}
                    />
                  </div>
                  <div className="row  d-flex justify-content-center align-items-center">
                    <button
                      onClick={() => ShowImgFullScreen(fileUserWithIdCard)}
                      type="button"
                      className="btn btn-success"
                    >
                      <Visibility />
                      ดูรูปภาพ
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => OnDecline(seleteddata)}
              type="button"
              className="btn btn-danger"
            >
              ไม่อนุมัติ
            </button>
            <button
              onClick={() => OnApprove(seleteddata)}
              type="button"
              className="btn btn-success"
            >
              อนุมัติ
            </button>
          </Modal.Footer>
        </Modal>
        {/* ข้อมูลผู้ใช้ */}
        <Modal
          size="xl"
          show={show_detail}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          centered
          style={{ fontFamily: "SukhumvitSet-SemiBold" }}
        >
          <Modal.Header closeButton onClick={() => OnCloseDetail2()}>
            <Modal.Title id="example-custom-modal-styling-title">
              ข้อมูลผู้ใช้
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ minHeight: "70vh", maxHeight: "70vh", overflowY: "auto" }}
          >
            <form>
              <div className="row">
                <div className="col-8">
                  <div className="row mb-3">
                    <label className="col-4">ชื่อ-นามสกุล:</label>
                    <label className="col-8">
                      {seleteddata.fname + "  " + seleteddata.lname}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">เบอร์โทรศัพท์มือถือ:</label>
                    <label className="col-8">{seleteddata.phonenumber}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">หมายเลขบัตรประชาชน:</label>
                    <label className="col-8">{seleteddata.idcard}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">วัน/เดือน/ปีเกิด:</label>
                    <label className="col-8">
                      {moment(seleteddata.brithday).format("DD/MM/YYYY")}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ที่อยู่จัดส่ง:</label>
                    <label className="col-8">{seleteddata.address}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">จังหวัด:</label>
                    <label className="col-8">{seleteddata.province}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">อำเภอ:</label>
                    <label className="col-8">{seleteddata.district}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ตำบล:</label>
                    <label className="col-8">{seleteddata.canton}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">รหัสไปรษณีย์:</label>
                    <label className="col-8">{seleteddata.postal_code}</label>
                  </div>
                </div>
                <div className="col-4">
                  <div>
                    <label>ประเภทผู้ใช้งาน:</label>
                    <div className="form-check" hidden={hide_admin}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        checked={c_admin}
                        onClick={() => onChangeRadioBox("c_admin")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        เจ้าของร้าน
                      </label>
                    </div>
                    {/* james add */}
                    <div className="form-check" hidden={hide_mgr}> 
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        checked={c_mgr}
                        onClick={() => onChangeRadioBox("c_mgr")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        ผู้จัดการร้าน
                      </label>
                    </div>

                    <div className="form-check" hidden={hide_emp}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckChecked"
                        checked={c_emp}
                        onClick={() => onChangeRadioBox("c_emp")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        พนักงาน
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckChecked"
                        checked={c_user}
                        onClick={() => onChangeRadioBox("c_user")}
                        disabled={disable_user}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckChecked"
                      >
                        ผู้ใช้ทั่วไป
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => OnSave(seleteddata)}
              type="button"
              className="btn btn-primary mr-3"
              style={{ width: "30vw" }}
            >
              บันทึก
            </button>
            <button
              hidden={no_pass}
              onClick={() => OnResetPass(seleteddata)}
              type="button"
              className="btn btn-success"
              style={{ width: "30vw" }}
            >
              รีเซ็ตรหัสผ่าน
            </button>
          </Modal.Footer>
        </Modal>
      </Typography>
    </>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const user = await cookies.get("user");
  if (!user) {
    res.statusCode = 404;
    res.end();
    return { props: {} };
  }
  return {
    props: { user },
  };
};
export default ManagerememberPage;
