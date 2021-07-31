import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios, { post } from "axios";
import Modal from "react-bootstrap/Modal";
import Visibility from "@material-ui/icons/Visibility";
import Lightbox from "react-awesome-lightbox";
const HistoryPage = ({ user }) => {
  const [seleteddata, Seleteddata] = useState(Array);
  const [datatable, setDatatable] = useState(Array);
  const [slip_img, Slip_img] = useState(String);
  const [all, All] = useState(true);
  const [custom, Custom] = useState(false);
  const [datestart, Datestart] = useState(new Date());
  var date_end = new Date();
  const [dateend, Dateend] = useState(date_end.setDate(date_end.getDate() + 1));
  const [show, setShow] = useState(false);
  const [flname, Flname] = useState(String);

  const [url_image, Url_image] = useState(String);
  const [imageIsShow, ImageIsShow] = useState(false);
  // const [datatable, setDatatable] = useState(Array);
  useEffect(async () => {
    loadhisdata();
  }, []);
  const loadhisdata = async () => {
    var register = await axios({
      method: "get",
      url: "/api/history/bill_his",
    }).then((response) => {
      return response.data.data;
    });
    var data = [];
    register.forEach((element) => {
      // console.log(element.fname);
      var detail = "";
      if (element.status === "pending") {
        detail = "อัปโหลดบิล";
      }
      if (element.status === "approved") {
        detail = "อนุมัติ";
      }
      if (element.status === "declined") {
        detail = "ไม่อนุมัติ";
      }
      if (element.status === "canceled") {
        detail = "ยกเลิก";
      }
      var row = {
        name: element.users[0].fname + " " + element.users[0].lname,
        detail: detail,
        date: moment(element.modify_date).format("DD-MM-YYYY HH:mm:ss"),
        action: <Visibility onClick={() => OnOpenDetail(element)} />,
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
        sort: "asc",
        width: 200,
      },
      {
        label: "",
        field: "action",
        // sort: "disable",
        width: 100,
      },
    ];
    var rows = data;
    var detail = { columns, rows };
    setDatatable(detail);
  };
  const OnOpenDetail = async (e) => {
    const word1 = await e.bill_path.replaceAll("\\", "/");
    var res1 = word1.slice(6);
    Flname(e.users[0].fname + " " + e.users[0].lname);
    Seleteddata(e);
    Slip_img(res1);
    setShow(true);
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
      url: "/api/history/bill_his",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        return response.data.data;
      },
      (error) => {
        console.log(error);
      }
    );
    // console.log(register);
    var data = [];
    register.forEach((element) => {
      var detail = "";
      if (element.status === "pending") {
        detail = "อัปโหลดบิล";
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
        date: moment(element.modify_date).format("YYYY-MM-DD HH:mm:ss"),
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
        // sort: "asc",
        width: 200,
      },
    ];
    var rows = data;
    var detail = { columns, rows };
    setDatatable(detail);
  };
  // const change_checkbox = async () => {
  //   if (all) {
  //     All(false);
  //     Custom(true);
  //   } else {
  //     All(true);
  //     Custom(false);
  //     loadhisdata();
  //   }
  // };

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

  const ShowImgFullScreen = async (e) => {
    Url_image(e);
    ImageIsShow(true);
    setShow(false);
    // console.log(e);
  };
  const HideImgFullScreen = async () => {
    ImageIsShow(false);
    setShow(true);
    // console.log("มานะ");
  };
  return (
    <>
      {imageIsShow ? (
        <Lightbox
          image={url_image}
          isOpen={imageIsShow}
          onClose={() => HideImgFullScreen()}
        />
      ) : null}
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
        <div className="card-header">ประวัติการอัปโหลดบิล</div>
        <div className="card-body">
          <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={datatable}
            order={['date', 'asc']}
            pagingTop
            searchTop
            searchBottom={false}
          />
        </div>
      </div>

      <Modal
        size="xl"
        show={show}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
        style={{ fontFamily: "SukhumvitSet-SemiBold" }}
      >
        <Modal.Header closeButton onClick={() => setShow(false)}>
          <Modal.Title id="example-custom-modal-styling-title">
            ข้อมูลประวัติการโอน
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
                  <label className="col-8">{flname}</label>
                </div>
                <div className="row mb-3">
                  <label className="col-4">จำนวนเงิน:</label>
                  <label className="col-8">
                    {new Intl.NumberFormat().format(seleteddata.money)}
                  </label>
                </div>
                <div className="row mb-3">
                  <label className="col-4">เวลาในสลิปโอนเงิน:</label>
                  <label className="col-8">{seleteddata.time}</label>
                </div>
              </div>
              <div className="col-4">
                <div className="row d-flex justify-content-center ">
                  <label>รูปสลิป</label>
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                  <img src={slip_img} width={"80%"} height={"300px"} />
                </div>
                <div className="row  d-flex justify-content-center align-items-center">
                  <button
                    onClick={() => ShowImgFullScreen(slip_img)}
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
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};
export default HistoryPage;
