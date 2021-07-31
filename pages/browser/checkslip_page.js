import React, { useState, useEffect } from "react";
import Cookies from "cookies";
import axios, { post } from "axios";
import Typography from "@material-ui/core/Typography";
import { MDBDataTableV5 } from "mdbreact";
import moment from "moment";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Visibility from "@material-ui/icons/Visibility";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Lightbox from "react-awesome-lightbox";
const CheckslipPage = ({ user }) => {
  const [seleteddata, Seleteddata] = useState(Array);
  const [datatable, setDatatable] = useState(Array);
  const [slip_img, Slip_img] = useState(String);
  const [flname, Flname] = useState(String);
  const [show, setShow] = useState(false);
  const [_id, _Id] = useState(String);

  const [url_image, Url_image] = useState(String);
  const [imageIsShow, ImageIsShow] = useState(false);
  const [us_id, Us_id] = useState(localStorage.getItem("auth_backend"));
  const [us_role, Us_role] = useState(localStorage.getItem("role"));
  useEffect(async () => {
    LoadDataSlip();
  }, []);
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
  const LoadDataSlip = async () => {
    var dataslip = await axios({
      method: "get",
      url: "/api/bill/check_all_bill_pending",
    }).then((response) => {
      return response.data.data;
    });
    var data = [];
    for (let index = 0; index < dataslip.length; index++) {
      const element = dataslip[index];
      var userdata = await Getuser(element.users[0].user_line_id);
      var row = {
        name: element.users[0].fname + " " + element.users[0].lname,
        line_id: userdata,
        money: new Intl.NumberFormat().format(element.money),
        date: moment(element.upload_date).format("YYYY-MM-DD HH:mm:ss"),
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
        label: "จำนวนเงิน",
        field: "money",
        width: 200,
      },
      {
        label: "วันที่ทำรายการ",
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

  const OnOpenDetail = async (e) => {
    const word1 = await e.bill_path.replaceAll("\\", "/");
    var res1 = word1.slice(6);
    Flname(e.users[0].fname + " " + e.users[0].lname);
    Seleteddata(e);
    _Id(e._id);
    Slip_img(res1);
    setShow(true);
  };
  const OnApprove = async (e) => {
    var data = {
      id: e._id,
      user_id: e.user_id,
      money: e.money,
      modify_by: us_id,
      room_id: e.room_id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/bill/bill_approve",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    // noti user
    var messages =
      "ข้อมูลการโอนเงินขอท่าน ผ่านการตรวจสอบแล้ว เป็นจำนวนเงิน " +
      new Intl.NumberFormat().format(e.money) +
      " บาท";
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
    LoadDataSlip();
    setShow(false);
  };
  const OnNotApprove = async (e) => {
    var data = {
      id: e,
      modify_by: us_id,
    };

    // อัพเดท ตาราง bill จาก pending เป็น decline
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/bill/bill_decline",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        LoadDataSlip();
        setShow(false);
      },
      (error) => {
        console.log(error);
      }
    );

    // noti user
    var messages = "ขออภัย! ข้อมูลการโอนเงินของท่าน ไม่ผ่านการตรวจสอบ";
    var data = {
      messages: messages,
      user_id: e.users[0].user_line_id,
    };
    console.log(data);
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
      <Typography paragraph>
        {imageIsShow ? (
          <Lightbox
            image={url_image}
            isOpen={imageIsShow}
            onClose={() => HideImgFullScreen()}
          />
        ) : null}
        <div className="card mb-5">
          <div className="card-header">ตรวจสอบสลิป</div>
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

        {/* ข้อมูลสลิป */}
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
              ข้อมูลการโอน
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
                    <label className="col-8">
                      {moment(seleteddata.time).format("YYYY-MM-DD HH:mm:ss")}
                    </label>
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
      </Typography>
    </>
  );
};
//   <span onClick={OnLogout}>Go To login</span> */}
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

export default CheckslipPage;
