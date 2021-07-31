import React, { useState, useEffect } from "react";
import axios, { post } from "axios";
import Cookies from "cookies";
import Typography from "@material-ui/core/Typography";

import { MDBDataTableV5, MDBBadge } from "mdbreact";
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
  const [datatableroom, setDatatableroom] = useState(Array); //ข้อมูลห้อง
  const [datatableroom_for_user, Datatableroom_for_user] = useState(Array); //ข้อมูลห้องของแต่ละ user
  const [datatableroom_for_room, Datatableroom_for_room] = useState(Array); //ข้อมูลห้องของแต่ละ user
  const [datatableroom_user, Datatableroom_user] = useState(Array); //ข้อมูลผู้ใช้
  const [seleteddata, Seleteddata] = useState(Array);
  const [show, setShow] = useState(false);
  const [showroomdetail, setShowroomdetail] = useState(false);
  const [showuserdetail, Showuserdetail] = useState(false);
  const [us_id, Us_id] = useState(localStorage.getItem("auth_backend"));
  const [us_role, Us_role] = useState(localStorage.getItem("role"));
  const [flname, Flname] = useState(String);

  const [total_room_member, Total_room_member] = useState(String); //สมาชิกทั้งหมด
  const [finished, Finished] = useState(String); //สมาชิกที่ออมเสร็จ
  const [unfinished, Unfinished] = useState(String); //สมาชิกที่ออมยังไม่เสร็จ
  const [withdrawed, Withdrawed] = useState(String); //ถอนไปแล้ว
  const [cancelled, Cancelled] = useState(String); //ยกเลิกออม
  const [total_saving, Total_saving] = useState(String); //ยกเลิกออม
  const [declined, Declined] = useState(String); //ยกเลิกออม


  useEffect(() => {
    LoadAllRoom(); // ข้อมูลห้อง
    LoadAllUser(); // ข้อมูลรายบุคคล
  }, []);
  const LoadAllUser = async () => {
    var AllUser = [];
    AllUser = await axios({
      method: "get",
      url: "/api/user/all_user",
    }).then((response) => {
      return response.data.data;
    });

    var data = [];
    AllUser.forEach((element) => {
      console.log(element);
      var total_savingroom = 0;
      var total_finishedroom = 0;
      var total_cancelledroom = 0;
      var total_withdrawedroom = 0;
      var total_money = 0;
      var Allroom_num = element.data_joinroom.length;
      for (let i = 0; i < element.data_joinroom.length; i++) {
        const joinroom = element.data_joinroom[i];
        if (joinroom.status === "finished") {
          total_finishedroom = total_finishedroom + 1;
        }
        if (joinroom.status === "saving") {
          total_savingroom = total_savingroom + 1;
        }
        if (joinroom.status === "withdrawed") {
          total_withdrawedroom = total_withdrawedroom + 1;
        }
        if (joinroom.status === "cancelled") {
          total_cancelledroom = total_cancelledroom + 1;
        }
        total_money = total_money + parseInt(joinroom.total_savings);
      }
      var row = {
        name: element.fname + " " + element.lname,
        Allroom_num: Allroom_num,
        total_savingroom: total_savingroom,
        total_finishedroom: total_finishedroom,
        total_cancelledroom: total_cancelledroom,
        total_withdrawedroom: total_withdrawedroom,
        total_money: new Intl.NumberFormat().format(total_money),
        action: <Visibility onClick={() => OnOpenDetailUser(element)} />,
      };
      data.push(row);
    });
    var columns = [
      {
        label: "ชื่อ-นามสกุล",
        field: "name",
        width: 150,
      },
      {
        label: "ห้องทั้งหมด(ห้อง)",
        field: "Allroom_num",
        width: 150,
      },
      {
        label: "กำลังออม(ห้อง)",
        field: "total_savingroom",
        width: 150,
      },
      {
        label: "ออมครบ(ห้อง)",
        field: "total_finishedroom",
        width: 150,
      },
      {
        label: "ยกเลิก(ห้อง)",
        field: "total_cancelledroom",
        width: 150,
      },
      {
        label: "ถอนสำเร็จ(ห้อง)",
        field: "total_withdrawedroom",
        width: 150,
      },
      {
        label: "ยอดโอนสะสม(บาท)",
        field: "total_money",
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
    Datatableroom_user(detail);
  };
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
      var val = "";
      if (element.status === "ready") {
        val = "กำลังออม";
        status = (
          <span
            pill
            className="badge badge-default"
            key={val}
            searchvalue={val}
          >
            {val}
          </span>
        );
        var ac = <Visibility onClick={() => OnOpenReadyRoomDetail(element)} />; // ดูข้อมูลอย่างเดี่ยว
      }
      if (element.status === "finished") {
        val = "ออมสำเสร็จ";
        status = (
          <span
            pill
            className="badge badge-success"
            key={val}
            searchvalue={val}
          >
            {val}
          </span>
        );
        var ac = <Visibility onClick={() => OnOpenReadyRoomDetail(element)} />; // ดูข้อมูลอย่างเดี่ยว
      }

      if (element.status === "declined") {
        val = "ยกเลิกออม";
        status = (
          <span
            pill
            className="badge badge-danger"
            key={val}
            searchvalue={val}
          >
            {val}
          </span>
        )
        var ac = <Visibility onClick={() => OnOpenDetail(element)}></Visibility> // ดูข้อมูลอย่างเดียว
      }
        

      if (Date.parse(element.end_date) < Date.parse(new Date())) {
        if (element.alert_status === "null") {
          val = "เลยกำหนด";
          status = (
            <span
              pill
              className="badge badge-danger"
              key={val}
              searchvalue={val}
            >
              {val}
            </span>
          );
        } else {
          val = "เลยกำหนด";
          status = (
            <span
              pill
              className="badge badge-warning"
              key={val}
              searchvalue={val}
            >
              {val}
            </span>
          );
        }
        var ac = <Visibility onClick={() => OnOpenDetail(element)} />; // ดูข้อมูลอย่างเดี่ยว
      }
      var alert_status = "";
      if (element.alert_status === "null") {
        alert_status = "ยังไม่ส่งข้อความแจ้งเตือน";
      } else {
        alert_status = "แจ้งเตือนแล้ว " + element.alert_total + " ครั้ง";
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
        alert_status: alert_status, //สถานะ
        action: ac, //ปุมกดดูรายละเอียด
      };

      if (element.status === "pending") {
      } else {
        data.push(row);
      }
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
        label: "สถานะการเตือน",
        field: "alert_status",
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

  const OnOpenDetailUser = async (e) => {
    Showuserdetail(true);
    var data = [];
    for (let index = 0; index < e.data_joinroom.length; index++) {
      const element = e.data_joinroom[index];

      var d = {
        room_id: element.room_id,
      };
      var RoonData = await axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer my-token",
          "My-Custom-Header": "foobar",
        },
        url: "/api/saving_rooms/roomdata_by_id",
        data: JSON.stringify({ data: d }),
      }).then((response) => {
        return response.data.data;
      });

      var status = "";
      var total_money = "";
      if (element.status === "finished") {
        status = "ออมสำเร็จ";
      }
      if (element.status === "saving") {
        status = "กำลังออม";
      }
      if (element.status === "withdrawed") {
        status = "ถอนสำเร็จ";
      }
      if (element.status === "cancelled") {
        status = "ยกเลิกออม";
      }
      total_money = parseInt(element.total_savings);

      var row = {
        name: e.fname + " " + e.lname,
        room_id: RoonData[0].token,
        total_money: new Intl.NumberFormat().format(total_money),
        status: status,
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
        label: "หมายเลขห้อง",
        field: "room_id",
        width: 150,
      },
      {
        label: "ยอดโอนสะสม(บาท)",
        field: "total_money",
        width: 150,
      },
      {
        label: "สถานะ",
        field: "status",
        width: 150,
      },
    ];
    var rows = data;
    var detail = { columns, rows };
    Datatableroom_for_user(detail);
  };
  const OnOpenDetail = async (e) => {
    Flname(e.users[0].fname + " " + e.users[0].lname);
    Seleteddata(e);
    setShow(true);
    var data = {
      room_id: e.room_id, //_id ห้องออม
    };
    var joinroom_data = await axios({
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
        return response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );
    // console.log(joinroom_data);

    Total_room_member(joinroom_data.length);
    var Finished_num = 0;
    var Unfinished_num = 0;
    var Withdrawed_num = 0;
    var Cancelled_num = 0;
    var Total_saving_num = 0;
    var rank = 0;
    var user_data = [];
    for (let index = 0; index < joinroom_data.length; index++) {
      const element = joinroom_data[index];
      console.log(element);

      var status = "";
      var total = "";
      var start_date = "";
      if (element.status === "cancelled") {
        Cancelled_num = Cancelled_num + 1;
        status = "ยกเลิกออม";
      }
      if (element.status === "withdrawed") {
        Withdrawed_num = Withdrawed_num + 1;
        status = "ถอนสำเร็จ";
      }
      if (element.status === "finished") {
        Finished_num = Finished_num + 1;
        status = "ออมสำเร็จ";
      }
      if (element.status === "saving") {
        Unfinished_num = Unfinished_num + 1;
        status = "กำลังออม";
      }
      rank = rank + 1;
      Total_saving_num = Total_saving_num + parseInt(element.total_savings);
      total = new Intl.NumberFormat().format(parseInt(element.total_savings));
      start_date = moment(element.join_date).format("YYYY-MM-DD HH:mm:ss"); //วันที่ส่งคำขอสร้างห้อง
      var row = {
        user: element.users[0].fname + " " + element.users[0].lname, //เจ้าของห้อง
        total: total,
        rank: rank,
        start_date: start_date,
        status: status, //สถานะ
      };
      user_data.push(row);
    }
    var columns = [
      {
        label: "อันดับ",
        field: "rank",
        width: 150,
      },
      {
        label: "ชื่อ-นามสกุล",
        field: "user",
        width: 150,
      },

      {
        label: "วันที่เริ่มออม",
        field: "start_date",
        width: 150,
      },
      {
        label: "ยอดออมสะสม",
        field: "total",
        width: 150,
      },
      {
        label: "สถานะ",
        field: "status",
        width: 150,
      },
    ];
    var rows = user_data;
    var detail = { columns, rows };
    Datatableroom_for_room(detail);

    //
    Finished(new Intl.NumberFormat().format(Finished_num));
    Unfinished(new Intl.NumberFormat().format(Unfinished_num));
    Withdrawed(new Intl.NumberFormat().format(Withdrawed_num));
    Cancelled(new Intl.NumberFormat().format(Cancelled_num));
    Total_saving(new Intl.NumberFormat().format(Total_saving_num));
  };
  const OnOpenReadyRoomDetail = async (e) => {
    Flname(e.users[0].fname + " " + e.users[0].lname);
    setShowroomdetail(true);
    Seleteddata(e);
    var data = {
      room_id: e.room_id, //_id ห้องออม
    };
    var joinroom_data = await axios({
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
        return response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );
    Total_room_member(joinroom_data.length);
    var Finished_num = 0;
    var Unfinished_num = 0;
    var Withdrawed_num = 0;
    var Cancelled_num = 0;
    var Total_saving_num = 0;
    var rank = 0;
    var user_data = [];
    for (let index = 0; index < joinroom_data.length; index++) {
      const element = joinroom_data[index];
      console.log(element);

      var status = "";
      var total = "";
      var start_date = "";
      if (element.status === "cancelled") {
        Cancelled_num = Cancelled_num + 1;
        status = "ยกเลิกออม";
      }
      if (element.status === "withdrawed") {
        Withdrawed_num = Withdrawed_num + 1;
        status = "ถอนสำเร็จ";
      }
      if (element.status === "finished") {
        Finished_num = Finished_num + 1;
        status = "ออมสำเร็จ";
      }
      if (element.status === "saving") {
        Unfinished_num = Unfinished_num + 1;
        status = "กำลังออม";
      }
      rank = rank + 1;
      Total_saving_num = Total_saving_num + parseInt(element.total_savings);
      total = new Intl.NumberFormat().format(parseInt(element.total_savings));
      start_date = moment(element.join_date).format("YYYY-MM-DD HH:mm:ss"); //วันที่ส่งคำขอสร้างห้อง
      var row = {
        user: element.users[0].fname + " " + element.users[0].lname, //เจ้าของห้อง
        total: total,
        rank: rank,
        start_date: start_date,
        status: status, //สถานะ
      };
      user_data.push(row);
    }
    var columns = [
      {
        label: "อันดับ",
        field: "rank",
        width: 150,
      },
      {
        label: "ชื่อ-นามสกุล",
        field: "user",
        width: 150,
      },

      {
        label: "วันที่เริ่มออม",
        field: "start_date",
        width: 150,
      },
      {
        label: "ยอดออมสะสม",
        field: "total",
        width: 150,
      },
      {
        label: "สถานะ",
        field: "status",
        width: 150,
      },
    ];
    var rows = user_data;
    var detail = { columns, rows };
    Datatableroom_for_room(detail);

    Finished(new Intl.NumberFormat().format(Finished_num));
    Unfinished(new Intl.NumberFormat().format(Unfinished_num));
    Withdrawed(new Intl.NumberFormat().format(Withdrawed_num));
    Cancelled(new Intl.NumberFormat().format(Cancelled_num));
    Total_saving(new Intl.NumberFormat().format(Total_saving_num));
  };
  const OnSendAlert = async (e) => {
    var data = {
      room_id: e.room_id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/line_messaging_by_room_id",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        // setShow(false);
        LoadAllRoom();
        return Swal.fire({
          icon: "success",
          title: "เรียบร้อย",
          text: "ส่งข้อความแจ้งเตือนสำเร็จ",
        });
      },
      (error) => {
        console.log(error);
      }
    );
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
        {/* ข้อมูลห้อง */}
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
              sortRows={["status"]}
            />
          </div>
        </div>
        {/* ข้อมูลห้อง */}
        <div className="card mb-5">
          <div className="card-header">รายการผู้ใช้</div>
          <div className="card-body">
            <MDBDataTableV5
              hover
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              data={datatableroom_user}
              pagingTop
              searchTop
              searchBottom={false}
            />
          </div>
        </div>

        {/* ข้อมูลห้องที่เลยกำหนด */}
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
                <div className="col-6">
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
                <div className="col-6">
                  <div className="row mb-3">
                    <label className="col-4">จำนวนสามชิกทั้งหมด:</label>
                    <label className="col-8">{total_room_member}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ออมยังไม่ครบ:</label>
                    <label className="col-8">{unfinished}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ออมครบ:</label>
                    <label className="col-8">{finished}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ถอน:</label>
                    <label className="col-8">{withdrawed}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ยกเลิกออม:</label>
                    <label className="col-8">{cancelled}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ยอดออมทั้งหมด:</label>
                    <label className="col-8">{total_saving}</label>
                  </div>
                </div>
              </div>
              <div className="card mb-5">
                <div className="card-header">ข้อมูลสมาชิกในห้อง</div>
                <div className="card-body">
                  <MDBDataTableV5
                    hover
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    data={datatableroom_for_room}
                    pagingTop
                    searchTop
                    searchBottom={false}
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => OnSendAlert(seleteddata)}
              type="button"
              className="btn btn-success"
            >
              ส่งข้อความแจ้งเตือน
            </button>
          </Modal.Footer>
        </Modal>

        {/* ข้อมูลห้องที่กำลังออม */}
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
                <div className="col-6">
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
                <div className="col-6">
                  <div className="row mb-3">
                    <label className="col-4">จำนวนสามชิกทั้งหมด:</label>
                    <label className="col-8">{total_room_member}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ออมยังไม่ครบ:</label>
                    <label className="col-8">{unfinished}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ออมครบ:</label>
                    <label className="col-8">{finished}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ถอน:</label>
                    <label className="col-8">{withdrawed}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ยกเลิกออม:</label>
                    <label className="col-8">{cancelled}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ยอดออมทั้งหมด:</label>
                    <label className="col-8">{total_saving}</label>
                  </div>
                </div>
              </div>
              <div className="card mb-5">
                <div className="card-header">ข้อมูลสมาชิกในห้อง</div>
                <div className="card-body">
                  <MDBDataTableV5
                    hover
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    data={datatableroom_for_room}
                    pagingTop
                    searchTop
                    searchBottom={false}
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>

        {/* ข้อมูลผู้ใช้ */}
        <Modal
          size="xl"
          show={showuserdetail}
          dialogClassName="modal-dialog modal-xl "
          aria-labelledby="example-custom-modal-styling-title"
          centered
          style={{ fontFamily: "SukhumvitSet-SemiBold" }}
        >
          <Modal.Header closeButton onClick={() => Showuserdetail(false)}>
            <Modal.Title id="example-custom-modal-styling-title">
              ข้อมูลผู้ใช้
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ minHeight: "70vh", maxHeight: "70vh", overflowY: "auto" }}
          >
            <form>
              <div className="card mb-5">
                <div className="card-header">รายการห้องออมของผู้ใช้</div>
                <div className="card-body">
                  <MDBDataTableV5
                    hover
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    data={datatableroom_for_user}
                    pagingTop
                    searchTop
                    searchBottom={false}
                  />
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
