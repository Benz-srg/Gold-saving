import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios, { post } from "axios";
const HistoryPage = ({ user }) => {
  // const [datatable, setDatatable] = useState(Array);
  const [datasavingroom, Datasavingroom] = useState(Array);
  const [all_savingroom, All_savingroom] = useState(true);
  const [custom_savingroom, Custom_savingroom] = useState(false);
  var date_end = new Date();
  const [datestart_savingroom, Datestart_savingroom] = useState(new Date());
  const [dateend_savingroom, Dateen_savingroom] = useState(
    date_end.setDate(date_end.getDate() + 1)
  );
  const [datestart_joinroom, Datestart_joinroom] = useState(new Date());
  const [dateend_joinroom, Dateen_joinroom] = useState(
    date_end.setDate(date_end.getDate() + 1)
  );

  // const [datatable, setDatatable] = useState(Array);
  const [datajoinroom, Datajoinroom] = useState(Array);
  const [all_joinroom, All_joinroom] = useState(true);
  const [custom_joinroom, Custom_joinroom] = useState(false);
  useEffect(async () => {
    loadhisdata_savingroom();
    loadhisdata_joinroom();
  }, []);
  const loadhisdata_savingroom = async () => {
    var register = await axios({
      method: "get",
      url: "/api/history/savingroom_his",
    }).then((response) => {
      console.log(response);
      return response.data.data;
    });
    var data = [];
    register.forEach((element) => {
      var detail = "";
      if (element.status === "pending") {
        detail = "ส่งคำขอสร้างห้อง";
      }
      if (element.status === "approved") {
        detail = "อนุมัติ";
      }
      if (element.status === "declined") {
        detail = "ไม่อนุมัติ";
      }
      var row = {
        name: element.users[0].fname + " " + element.users[0].lname,
        detail: detail,
        date: moment(element.created_date).format("YYYY-MM-DD HH:mm:ss"),
      };
      data.push(row);
    });
    var columns = [
      {
        label: "กระทำโดย",
        field: "name",
        width: 150,
      },
      {
        label: "รายละเอียด",
        field: "detail",
        width: 270,
      },
      {
        label: "วันที่ เวลา",
        field: "date",

        width: 200,
      },
    ];
    var rows = data;
    var detail = { columns, rows };
    Datasavingroom(detail);
  };
  const loadhisdatacustom_savingroom = async () => {
    var data = {
      datestart: moment(datestart_savingroom).format("YYYY-MM-DD"),
      dateend: moment(dateend_savingroom).add(1, "days").format("YYYY-MM-DD"),
    };
    var register = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/history/savingroom_his",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        return response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );
    var data = [];
    register.forEach((element) => {
      var detail = "";
      if (element.status === "pending") {
        detail = "ส่งคำขอสร้างห้อง";
      }
      if (element.status === "approved") {
        detail = "อนุมัติ";
      }
      if (element.status === "declined") {
        detail = "ไม่อนุมัติ";
      }
      var row = {
        name: element.users[0].fname + " " + element.users[0].lname,
        detail: detail,
        date: moment(element.created_date).format("YYYY-MM-DD HH:mm:ss"),
      };
      data.push(row);
    });
    var columns = [
      {
        label: "กระทำโดย",
        field: "name",
        width: 150,
      },
      {
        label: "รายละเอียด",
        field: "detail",
        width: 270,
      },
      {
        label: "วันที่ เวลา",
        field: "date",
        width: 200,
      },
    ];
    var rows = data;
    var detail = { columns, rows };
    Datasavingroom(detail);
  };

  const change_checkbox_savingroom = async () => {
    if (all_savingroom) {
      All_savingroom(false);
      Custom_savingroom(true);
    } else {
      All_savingroom(true);
      Custom_savingroom(false);
      loadhisdata_savingroom();
    }
  };

  const search_savingroom = async () => {
    loadhisdatacustom_savingroom();
  };
  const loadhisdata_joinroom = async () => {
    var register = await axios({
      method: "get",
      url: "/api/history/joinroom_his",
    }).then((response) => {
      console.log(response);
      return response.data.data;
    });
    var data = [];
    register.forEach((element) => {
      var detail = "";
      if (element.status === "saving") {
        detail = "เข้าร่วมห้อง";
      }
      if (element.status === "finished") {
        detail = "ออมสำเร็จ";
      }
      if (element.status === "cancelled") {
        detail = "ยกเลิกออม";
      }
      var row = {
        name: element.users[0].fname + " " + element.users[0].lname,
        detail: detail,
        room_id: element.room_id,
        date: moment(element.join_date).format("YYYY-MM-DD HH:mm:ss"),
      };
      data.push(row);
    });
    var columns = [
      {
        label: "กระทำโดย",
        field: "name",
        width: 150,
      },
      {
        label: "รายละเอียด",
        field: "detail",
        width: 270,
      },
      {
        label: "ไอดีห้อง",
        field: "room_id",
        width: 270,
      },
      {
        label: "วันที่ เวลา",
        field: "date",
        width: 200,
      },
    ];
    var rows = data;
    var detail = { columns, rows };
    Datajoinroom(detail);
  };
  const loadhisdatacustom_joinroom = async () => {
    var data = {
      datestart: moment(datestart_joinroom).format("YYYY-MM-DD"),
      dateend: moment(dateend_joinroom).add(1, "days").format("YYYY-MM-DD"),
    };
    var register = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/history/joinroom_his",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        return response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );
    var data = [];
    register.forEach((element) => {
      var detail = "";
      if (element.status === "saving") {
        detail = "เข้าร่วมห้อง";
      }
      if (element.status === "finished") {
        detail = "ออมสำเร็จ";
      }
      if (element.status === "cancelled") {
        detail = "ยกเลิกออม";
      }
      var row = {
        name: element.users[0].fname + " " + element.users[0].lname,
        detail: detail,
        room_id: element.room_id,
        date: moment(element.join_date).format("YYYY-MM-DD HH:mm:ss"),
      };
      data.push(row);
    });
    var columns = [
      {
        label: "กระทำโดย",
        field: "name",
        width: 150,
      },
      {
        label: "รายละเอียด",
        field: "detail",
        width: 270,
      },
      {
        label: "ไอดีห้อง",
        field: "room_id",
        width: 270,
      },
      {
        label: "วันที่ เวลา",
        field: "date",
        width: 200,
      },
    ];
    var rows = data;
    var detail = { columns, rows };
    Datajoinroom(detail);
  };

  const change_checkbox_joinroom = async () => {
    if (all_joinroom) {
      All_joinroom(false);
      Custom_joinroom(true);
    } else {
      All_joinroom(true);
      Custom_joinroom(false);
      loadhisdata_joinroom();
    }
  };

  const search_joinroom = async () => {
    loadhisdatacustom_joinroom();
  };

  const OnChangeDateBegin_savingroom = async (date) => {
    if (Date.parse(date) >= Date.parse(new Date(dateend_savingroom))) {
      var d = new Date(dateend_savingroom);
      Datestart_savingroom(d.setDate(d.getDate() - 1));
    } else {
      Datestart_savingroom(date);
    }
  };
  const OnChangeDateEnd_savingroom = async (date) => {
    if (Date.parse(date) <= Date.parse(new Date(datestart_savingroom))) {
      var d = new Date(datestart_savingroom);
      Dateend_savingroom(d.setDate(d.getDate() + 1));
    } else {
      Dateend_savingroom(date);
    }
  };
  const reset_savingroom = async () => {
    loadhisdata_savingroom();
  };
  const OnChangeDateBegin_joinroom = async (date) => {
    if (Date.parse(date) >= Date.parse(new Date(dateend_joinroom))) {
      var d = new Date(dateend_joinroom);
      Datestart_joinroom(d.setDate(d.getDate() - 1));
    } else {
      Datestart_joinroom(date);
    }
  };
  const OnChangeDateEnd_joinroom = async (date) => {
    if (Date.parse(date) <= Date.parse(new Date(datestart_joinroom))) {
      var d = new Date(datestart_joinroom);
      Dateend_joinroom(d.setDate(d.getDate() + 1));
    } else {
      Dateend_joinroom(date);
    }
  };
  const reset_joinroom = async () => {
    loadhisdata_joinroom();
  };

  return (
    <>
      <div className="card mt-3">
        <div className="card-header">
          <div className="row">
            <div className="col">กรุณาระบุช่วงเวลาที่ต้องการค้นหา</div>
          </div>
          <div className="row">
            <div className="col">
              ตั้งแต่
              <DatePicker
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                className="form-control InputRegister"
                placeholderText="วันเริ่มต้น"
                onChange={(date) => OnChangeDateBegin_savingroom(date)}
                selected={datestart_savingroom}
              />
            </div>
            <div className="col">
              ถึง
              <DatePicker
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                className="form-control InputRegister"
                placeholderText="วันเริ่มต้น"
                onChange={(date) => OnChangeDateEnd_savingroom(date)}
                selected={dateend_savingroom}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button
                type="button"
                className="btn btn-primary mr-3"
                onClick={search_savingroom}
              >
                ค้นหา
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={reset_savingroom}
              >
                รีเซ็ต
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-5">
        <div className="card-header">ประวัติห้องออม</div>
        <div className="card-body">
          <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={datasavingroom}
            pagingTop
            searchTop
            searchBottom={false}
          />
        </div>
      </div>
      {/* ///////////////////// */}
      <div className="card mt-3">
        <div className="card-header">
          <div className="row">
            <div className="col">กรุณาระบุช่วงเวลาที่ต้องการค้นหา</div>
          </div>
          <div className="row">
            <div className="col">
              ตั้งแต่
              <DatePicker
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                className="form-control InputRegister"
                placeholderText="วันเริ่มต้น"
                onChange={(date) => OnChangeDateBegin_joinroom(date)}
                selected={datestart_joinroom}
              />
            </div>
            <div className="col">
              ถึง
              <DatePicker
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                className="form-control InputRegister"
                placeholderText="วันเริ่มต้น"
                onChange={(date) => OnChangeDateEnd_joinroom(date)}
                selected={dateend_joinroom}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button
                type="button"
                className="btn btn-primary mr-3"
                onClick={search_joinroom}
              >
                ค้นหา
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={reset_joinroom}
              >
                รีเซ็ต
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-5">
        <div className="card-header">ประวัติการเข้าร่วมห้องออม</div>
        <div className="card-body">
          <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={datajoinroom}
            pagingTop
            searchTop
            searchBottom={false}
          />
        </div>
      </div>
    </>
  );
};
export default HistoryPage;
