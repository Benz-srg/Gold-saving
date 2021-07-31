import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios, { post } from "axios";
const HistoryPage = ({ user }) => {
  const [datatable, setDatatable] = useState(Array);
  const [all, All] = useState(true);
  const [custom, Custom] = useState(false);
  const [datestart, Datestart] = useState(new Date());
  var date_end = new Date();
  const [dateend, Dateend] = useState(date_end.setDate(date_end.getDate() + 1));
  // const [datatable, setDatatable] = useState(Array);
  useEffect(async () => {
    loadhisdata();
  }, []);
  const loadhisdata = async () => {
    var register = await axios({
      method: "get",
      url: "/api/history/login_his",
    }).then((response) => {
      // console.log(response);
      return response.data.data;
    });
    var data = [];
    register.forEach((element) => {
      var device_name = "";
      if (element.device === "") {
        device_name = "Desktop";
      } else {
        if (element.device === "isAndroid") {
          device_name = "Android";
        } else {
          device_name = "IOS";
        }
      }
      var browser_name = "";
      if (element.browser_name === "") {
        browser_name = "ไลน์";
      } else {
        browser_name = element.browser_name;
      }
      var row = {
        name: element.users[0].fname + " " + element.users[0].lname,
        browser: browser_name,
        decive: device_name,
        date: moment(element.datetime).format("YYYY-MM-DD HH:mm:ss"),
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
        label: "ชื่อบราวเซอร์",
        field: "browser",
        width: 270,
      },
      {
        label: "ชื่ออุปกรณ์",
        field: "decive",
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
    setDatatable(detail);
  };
  const loadhisdatacustom = async () => {
    var data = {
      datestart: moment(datestart).format("YYYY-MM-DD"),
      dateend: moment(dateend).add(1, "days").format("YYYY-MM-DD"),
    };
    var register = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/history/login_his",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        console.log(response.data.data);
        return response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );
    // console.log(register);
    var data = [];
    register.forEach((element) => {
      var device_name = "";
      if (element.device === "") {
        device_name = "Desktop";
      } else {
        if (element.device === "isAndroid") {
          device_name = "Android";
        } else {
          device_name = "IOS";
        }
      }
      var browser_name = "";
      if (element.browser_name === "") {
        browser_name = "ไลน์";
      } else {
        browser_name = element.browser_name;
      }
      var row = {
        name: element.users[0].fname + " " + element.users[0].lname,
        browser: browser_name,
        decive: device_name,
        date: moment(element.datetime).format("YYYY-MM-DD HH:mm:ss"),
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
        label: "ชื่อบราวเซอร์",
        field: "browser",
        width: 270,
      },
      {
        label: "ชื่ออุปกรณ์",
        field: "decive",
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
    setDatatable(detail);
  };
  const change_checkbox = async () => {
    if (all) {
      All(false);
      Custom(true);
    } else {
      All(true);
      Custom(false);
      loadhisdata();
    }
  };

  const search = async () => {
    console.log(datestart, dateend);
    loadhisdatacustom();
  };
  const OnChangeDateBegin = async (date) => {
    if (Date.parse(date) >= Date.parse(new Date(dateend))) {
      var d = new Date(dateend);
      Datestart(d.setDate(d.getDate() - 1));
    } else {
      Datestart(date);
    }
  };
  const OnChangeDateEnd = async (date) => {
    if (Date.parse(date) <= Date.parse(new Date(datestart))) {
      var d = new Date(datestart);
      Dateend(d.setDate(d.getDate() + 1));
    } else {
      Dateend(date);
    }
  };
  const reset = async () => {
    loadhisdata();
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
                onChange={(date) => OnChangeDateBegin(date)}
                selected={datestart}
              />
            </div>
            <div className="col">
              ถึง
              <DatePicker
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                className="form-control InputRegister"
                placeholderText="วันเริ่มต้น"
                onChange={(date) => OnChangeDateEnd(date)}
                selected={dateend}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button
                type="button"
                className="btn btn-primary mr-3"
                onClick={search}
              >
                ค้นหา
              </button>
              <button type="button" className="btn btn-danger" onClick={reset}>
                รีเซ็ต
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-5">
        <div className="card-header">ประวัติการเข้าสุ่ระบบ</div>
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
    </>
  );
};
export default HistoryPage;
