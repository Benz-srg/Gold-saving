import React, { useState, useEffect } from "react";
import axios, { post } from "axios";
import Cookies from "cookies";
import Typography from "@material-ui/core/Typography";

import { MDBDataTableV5 } from "mdbreact";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import Swal from "sweetalert2";

import Visibility from "@material-ui/icons/Visibility";
const ManageroomPage = ({ user }) => {
  const [fixbutton, Fixbutton] = useState(false);
  const [member, Member] = useState(String);
  const [installment, Installment] = useState(String);
  const [day, Day] = useState(String);
  const [fee, Fee] = useState(String);
  const [datatable, setDatatable] = useState(Array);
  const [datatableroom, setDatatableroom] = useState(Array);
  const [seleteddata, Seleteddata] = useState(Array);
  const [show, setShow] = useState(false);
  const [showroomdetail, setShowroomdetail] = useState(false);
  const [us_id, Us_id] = useState(localStorage.getItem("auth_backend"));
  const [us_role, Us_role] = useState(localStorage.getItem("role"));
  const [flname, Flname] = useState(String);
  useEffect(() => {
    LoadAllRoom();
  }, []);
  const LoadAllRoom = async () => {
    var Allrequest = await axios({
      method: "get",
      url: "/api/saving_rooms/all_room",
    }).then((response) => {
      return response.data.data;
    });
    var data = [];
    Allrequest.forEach((element) => {
      var status = "";
      if (element.status === "ready") {
        status = "กำลังออม";
        var ac = <Visibility onClick={() => OnOpenReadyRoomDetail(element)} />; // ดูข้อมูลอย่างเดี่ยว
      }
      if (element.status === "finished") {
        status = "ออมสำเสร็จ";
        var ac = <Visibility onClick={() => OnOpenReadyRoomDetail(element)} />; // ดูข้อมูลอย่างเดี่ยว
      }
      if (element.status === "pending") {
        status = "รออนุมัติ";
        var ac = <Visibility onClick={() => OnOpenDetail(element)} />; // รออนุมัติ
      }

      var row = {
        room_id: element.token, //รหัสห้อง
        owner: element.users[0].fname + " " + element.users[0].lname, //เจ้าของห้อง
        start_date: moment(element.start_date).format("YYYY-MM-DD"), //วันที่เริ่มออม
        end_date: moment(element.end_date).format("YYYY-MM-DD"), //วันที่สิ้นสุด
        created_date: moment(element.created_date).format(
          "YYYY-MM-DD HH:mm:ss"
        ), //วันที่ส่งคำขอสร้างห้อง
        status: status, //สถานะ
        action: ac, //ปุมกดดูรายละเอียด
      };
      data.push(row);
    });
    var columns = [
      {
        label: "หมายเลขห้อง",
        field: "room_id",
        width: 150,
      },
      {
        label: "เจ้าของห้อง",
        field: "owner",
        width: 150,
      },
      {
        label: "เริ่มออม",
        field: "start_date",
        width: 150,
      },
      {
        label: "สิ้นสุด",
        field: "end_date",
        width: 150,
      },
      {
        label: "วันที่ เวลาสร้างห้อง",
        field: "created_date",
        width: 150,
      },
      {
        label: "สถานะ",
        field: "status",
        width: 150,
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
    setDatatableroom(detail);
  };

  const OnOpenDetail = async (e) => {
    Flname(e.users[0].fname + " " + e.users[0].lname);
    Seleteddata(e);
    setShow(true);
  };
  const OnOpenReadyRoomDetail = async (e) => {
    Flname(e.users[0].fname + " " + e.users[0].lname);
    setShowroomdetail(true);
    Seleteddata(e);
    // setShow(true);
  };
  const OnApprove = async (e) => {
    var data = {
      id: e._id, //_id ห้องออม
      user_id: us_id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/saving_rooms/update_approve",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        setShow(false);
        LoadAllRoom();
        return Swal.fire({
          icon: "success",
          title: "เรียบร้อย",
          text: "อนุมัติสร้างห้องสำเร็จ",
        });
      },
      (error) => {
        console.log(error);
      }
    );

    // noti แม่ออม
    var messages =
      "คำขอสร้างห้องของคุณผ่านการตรวจสอบ \n รหัสเข้าร่วมห้อง : " + e.token;
    var data = {
      messages: messages,
      user_id: e.users[0].user_line_id,
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

    setShow(false);
  };
  const OnNotApprove = async (e) => {
    // console.log(e);
    var data = {
      id: e._id,
      user_id: us_id, // user_id admin ที่กดำเนินการ
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/saving_rooms/update_decline",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        setShow(false);
        LoadAllRoom();
        return Swal.fire({
          icon: "success",
          title: "เรียบร้อย",
          text: "ปฏิเสธสร้างห้องสำเร็จ",
        });
      },
      (error) => {
        console.log(error);
      }
    );

    var messages = "ขออภัย! คำขอสร้างห้องของคุณไม่ผ่านการตรวจสอบ";
    var data = {
      messages: messages,
      user_id: e.users[0].user_line_id,
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
    setShow(false);
  };

  return (
    <>
      <Typography paragraph>
        <div className="card mb-5">
          <div className="card-header">รายการห้องออม</div>
          <div className="card-body">
            <MDBDataTableV5
              hover
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              data={datatableroom}
              pagingTop
              searchTop
              searchBottom={false}
            />
          </div>
        </div>

        {/* รอดำเนินการ */}
        <Modal
          size="xl"
          show={show}
          dialogClassName="modal-90w "
          aria-labelledby="example-custom-modal-styling-title"
          centered
          style={{ fontFamily: "SukhumvitSet-SemiBold" }}
        >
          <Modal.Header closeButton onClick={() => setShow(false)}>
            <Modal.Title id="example-custom-modal-styling-title">
              ข้อมูลคำขอสร้างห้อง
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ minHeight: "70vh", maxHeight: "70vh", overflowY: "auto" }}
          >
            <form>
              <div className="row">
                <div className="col-8">
                  <div className="row mb-3">
                    <label className="col-4">แม่ออม:</label>
                    <label className="col-8">{flname}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">รหัสเข้าร่วมห้อง:</label>
                    <label className="col-8">{seleteddata.token}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">น้ำหนักทอง:</label>
                    <label className="col-8">{seleteddata.weight}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ราคาทอง:</label>
                    <label className="col-8">
                      {new Intl.NumberFormat().format(
                        Math.ceil(seleteddata.price)
                      )}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">เริ่มออม:</label>
                    <label className="col-8">
                      {moment(seleteddata.start_date).format("DD-MM-YYYY")}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">สิ้นสุด:</label>
                    <label className="col-8">
                      {moment(seleteddata.end_date).format("DD-MM-YYYY")}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">จำนวนงวด:</label>
                    <label className="col-8">{seleteddata.installment}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ระยะเวลาต่องวด(วัน):</label>
                    <label className="col-8">{seleteddata.day}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">จำนวนสมาชิกสูงสุด:</label>
                    <label className="col-8">{seleteddata.member}</label>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => OnNotApprove(seleteddata)}
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

        {/* ดูข้อมูล */}
        <Modal
          size="xl"
          show={showroomdetail}
          dialogClassName="modal-dialog modal-xl "
          aria-labelledby="example-custom-modal-styling-title"
          centered
          style={{ fontFamily: "SukhumvitSet-SemiBold" }}
        >
          <Modal.Header closeButton onClick={() => setShowroomdetail(false)}>
            <Modal.Title id="example-custom-modal-styling-title">
              ข้อมูลห้อง
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ minHeight: "70vh", maxHeight: "70vh", overflowY: "auto" }}
          >
            <form>
              <div className="row">
                <div className="col-8">
                  <div className="row mb-3">
                    <label className="col-4">แม่ออม:</label>
                    <label className="col-8">{flname}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">รหัสเข้าร่วมห้อง:</label>
                    <label className="col-8">{seleteddata.token}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">น้ำหนักทอง:</label>
                    <label className="col-8">{seleteddata.weight}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ราคาทอง:</label>
                    <label className="col-8">
                      {new Intl.NumberFormat().format(
                        Math.ceil(seleteddata.price)
                      )}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">เริ่มออม:</label>
                    <label className="col-8">
                      {moment(seleteddata.start_date).format("DD-MM-YYYY")}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">สิ้นสุด:</label>
                    <label className="col-8">
                      {moment(seleteddata.end_date).format("DD-MM-YYYY")}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">จำนวนงวด:</label>
                    <label className="col-8">{seleteddata.installment}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ระยะเวลาต่องวด(วัน):</label>
                    <label className="col-8">{seleteddata.day}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">จำนวนสมาชิกสูงสุด:</label>
                    <label className="col-8">{seleteddata.member}</label>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </Typography>
    </>
  );
};
export const getServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const user = await cookies.get("user");
  console.log(user);
  if (!user) {
    res.statusCode = 404;
    res.end();
    return { props: {} };
  }
  return {
    props: { user },
  };
};

export default ManageroomPage;
