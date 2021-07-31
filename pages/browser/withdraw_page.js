import React, { useState, useEffect } from "react";
import Cookies from "cookies";
import Header from "../../components/Header";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { MDBDataTableV5 } from "mdbreact";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../../components/theme.js";
import { EditSharp } from "@material-ui/icons";
import axios, { post } from "axios";
import moment from "moment";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Visibility from "@material-ui/icons/Visibility";
import NumberFormat from "react-number-format";
const PromotionPage = ({ user }) => {
  const [seleteddata, Seleteddata] = useState(Array);
  const [datatable, setDatatable] = useState(Array);
  const [flname, Flname] = useState(String);
  const [show, setShow] = useState(false);
  const [totalvalue, Totalvalue] = useState(String);
  const [t_name, T_name] = useState(String);
  const [confrim_pass, Confrim_pass] = useState(true);

  const [bank_name_admin, Bank_name_admin] = useState("กรุณาเลือกธนาคาร...");
  const [bank_number_admin, Bank_number_admin] = useState(String);
  const [bank_account_admin, Bank_account_admin] = useState(String);
  const [transfer_datetime, Transfer_datetime] = useState(new Date());
  const [us_id, Us_id] = useState(localStorage.getItem("auth_backend"));
  const [us_role, Us_role] = useState(localStorage.getItem("role"));
  useEffect(async () => {
    LoadDataWithdraw();
  }, []);
  const onSelectBank = async (e) => {
    const { value } = e.target;
    Bank_name_admin(value);
  };
  const OnOpenDetail = async (e) => {
    // if (element.type === "gold") {
    //   type_name = "ทอง";
    // } else {
    //   type_name = "แต้ม";
    // }
    if (e.type === "gold") {
      Totalvalue(e.total);
      T_name("ทอง");
    } else {
      Totalvalue(new Intl.NumberFormat().format(e.total));
      T_name("แต้ม");
    }
    Flname(e.users[0].fname + " " + e.users[0].lname);
    Seleteddata(e);
    setShow(true);
  };
  const LoadDataWithdraw = async () => {
    var dataWithdraw = await axios({
      method: "get",
      url: "/api/withdraw/all_pending_withdraw",
    }).then((response) => {
      return response.data.data;
    });
    console.log(dataWithdraw);
    var data = [];
    dataWithdraw.forEach((element) => {
      var type_name = "";
      if (element.type === "gold") {
        type_name = "ทอง";
      } else {
        type_name = "แต้ม";
      }
      var total_v = "";

      if (element.type === "point") {
        total_v =
          new Intl.NumberFormat().format(
            Math.ceil(parseInt(element.point / 10))
          ) + " บาท";
      } else {
        total_v = element.total;
      }
      var row = {
        user_id: element.users[0].fname + " " + element.users[0].lname,
        type: type_name,
        total: total_v,
        date: moment(element.withdraw_date).format("YYYY-MM-DD HH:mm:ss"),
        action: <Visibility onClick={() => OnOpenDetail(element)} />,
      };
      data.push(row);
    });
    var columns = [
      {
        label: "ชื่อ-นามสกุล",
        field: "user_id",
        width: 150,
      },
      {
        label: "ประเภท",
        field: "type",
        width: 270,
      },
      {
        label: "จำนวน",
        field: "total",
        width: 200,
      },
      {
        label: "วันที่ เวลา",
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
  const OnCloseDetail = async (e) => {
    setShow(false);
    Bank_name_admin("กรุณาเลือกธนาคาร...");
    Bank_number_admin("String");
    Bank_account_admin("");
    Transfer_datetime(new Date());
  };
  const OnDontApprove = async (e) => {
    // console.log(e);
    var data = {
      id: e._id,
      user_id: e.user_id,
      room_id: e.room_id,
      modify_by: us_id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/withdraw/decline_withdraw",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        // console.log(response);
        return Swal.fire({
          icon: "success",
          title: "เรียบร้อย",
          text: "ปฏิเสธการถอน สำเร็จ",
        });
      },
      (error) => {
        console.log(error);
      }
    );
    var type_name = "";
    if (e.type === "gold") {
      type_name = "ทอง";
    } else {
      type_name = "แต้ม";
    }

    // noti user
    var messages = "ขออภัย! คำขอถอน " + type_name + " ถูกปฎิเสธ";
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
    await LoadDataWithdraw();
    setShow(false);
  };
  const OnApprove = async (e) => {
    var b_name = "";
    if (bank_name_admin === "กรุณาเลือกธนาคาร...") {
      b_name = "ไม่ระบุธนาคาร";
    } else {
      b_name = bank_name_admin;
    }
    var data = {
      id: e._id,
      user_id: e.user_id,
      room_id: e.room_id,
      modify_by: us_id,
      bank_name_admin: b_name,
      bank_number_admin: bank_number_admin,
      bank_account_admin: bank_account_admin,
      transfer_datetime: transfer_datetime,
    };

    if (e.type === "gold") {
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer my-token",
          "My-Custom-Header": "foobar",
        },
        url: "/api/withdraw/approve_withdraw",
        data: JSON.stringify({ data: data }),
      }).then(
        (response) => {
          LoadDataWithdraw();
          setShow(false);
          return Swal.fire({
            icon: "success",
            title: "เรียบร้อย",
            text: "อนุมัติการถอน สำเร็จ",
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer my-token",
          "My-Custom-Header": "foobar",
        },
        url: "/api/withdraw/approve_withdraw_point",
        data: JSON.stringify({ data: data }),
      }).then(
        (response) => {
          LoadDataWithdraw();
          setShow(false);
          return Swal.fire({
            icon: "success",
            title: "เรียบร้อย",
            text: "อนุมัติการถอน สำเร็จ",
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }

    var type_name = "";
    if (e.type === "gold") {
      type_name = "ทอง";
    } else {
      type_name = "แต้ม";
    }
    if (seleteddata.type === "point") {
      var messages =
        "คำขอถอน " +
        type_name +
        " จำนวน " +
        new Intl.NumberFormat().format(Math.ceil(seleteddata.point / 10)) +
        " บาท ของคุณได้รับการอนุมัติแล้ว";
    } else {
      var messages =
        "คำขอถอน " +
        type_name +
        " จำนวน " +
        seleteddata.total +
        "\nเงินทอนจำนวน " +
        new Intl.NumberFormat().format(seleteddata.change) +
        " บาท" +
        "\nและโบนัส " +
        new Intl.NumberFormat().format(Math.ceil(seleteddata.point / 10)) +
        " บาท" +
        " ของคุณได้รับการอนุมัติแล้ว";
    }
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
  };
  return (
    <>
      <Typography paragraph>
        <div className="card mb-5">
          <div className="card-header">ตรวจสอบรายการถอน ทอง-แต้ม</div>
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

        {/* ข้อมูลการถอน */}
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
              ข้อมูลการถอน
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ minHeight: "70vh", maxHeight: "70vh", overflowY: "auto" }}
          >
            <form>
              <div className="row">
                <div className="col-6">
                  <div className="row mb-3">
                    <label className="col-4">ชื่อ-นามสกุล:</label>
                    <label className="col-8">{flname}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ประเภท:</label>
                    <label className="col-8">{t_name}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ชื่อธนาคาร:</label>
                    <label className="col-8">{seleteddata.bank_name}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">เลขที่บัญชี:</label>
                    <label className="col-8">{seleteddata.bank_number}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ชื่อเจ้าของบัญชี:</label>
                    <label className="col-8">{seleteddata.bank_account}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">เงินทอน:</label>
                    <label className="col-8">
                      {new Intl.NumberFormat().format(seleteddata.change)}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">แต้ม:</label>
                    <label className="col-8">
                      {new Intl.NumberFormat().format(seleteddata.point)}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">เป็นจำนวนเงิน:</label>
                    <label className="col-8">
                      {new Intl.NumberFormat().format(
                        Math.ceil(seleteddata.point / 10)
                      )}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">ทองจำนวน:</label>
                    <label className="col-8">{totalvalue}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-4">วันที่:</label>
                    <label className="col-8">
                      {moment(seleteddata.withdraw_date).format("DD/MM/YYYY")}
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card ">
                    <div className="card-body">
                      <h5 className="card-title">ข้อมูลการโอน(โอนจาก)</h5>
                      <div className="container">
                        <div className="row ">
                          <label>ชื่อบัญชี:</label>
                        </div>
                        <div className="row">
                          <input
                            className="custom_date"
                            type="text"
                            value={bank_account_admin}
                            onChange={(e) => Bank_account_admin(e.target.value)}
                          />
                        </div>
                        <div className="row">
                          <label>ชื่อธนาคาร:</label>
                        </div>
                        <div className="row">
                          <select
                            contentEditable={true}
                            className="custom_date"
                            onChange={(e) => onSelectBank(e)}
                            value={bank_name_admin}
                          >
                            <option selected disabled={true}>
                              กรุณาเลือกธนาคาร...
                            </option>
                            <option>ธนาคารแห่งประเทศไทย</option>
                            <option>ธนาคารกสิกรไทย</option>
                            <option>ธนาคารกรุงเทพ</option>
                            <option>ธนาคารกรุงไทย</option>
                            <option>ธนาคารกรุงศรีอยุธยา</option>
                            <option>ธนาคารซีไอเอ็มบีไทย</option>
                            <option>ธนาคารทหารไทย</option>
                            <option>ธนาคารไทยพาณิชย์</option>
                            <option>ธนาคารยูโอบี</option>
                            <option>ธนาคารแลนด์แอนด์ เฮ้าส์</option>
                            <option>ธนาคารสแตนดาร์ด</option>
                            <option>ธนาคารธนชาต</option>
                            <option>ธนาคารออมสิน</option>
                            <option>ธนาคารเกียรตินาคินภัทร</option>
                            <option>ธนาคารซิตี้แบงค์</option>
                            <option>ธนาคารอาคารสงเคราะห์</option>
                            <option>ธนาคาร ธ.ก.ส</option>
                            <option>ธนาคารมิซูโฮ</option>
                            <option>ธนาคารอิสลาม</option>
                            <option>ธนาคารทิสโก้</option>
                            <option>ธนาคารไอซีบีซี</option>
                            <option>ธนาคารไทยเครดิต</option>
                            <option>ธนาคารซูมิโตโมมิตซุย</option>
                            <option>ธนาคารเอชเอสบีซี</option>
                            <option>ธนาคารดอยซ์แบงก์ เอจี</option>
                            <option>ธนาคารแห่งประเทศจีน</option>
                            <option>ธนาคารเอเอ็นแซด</option>
                          </select>
                        </div>
                        <div className="row ">
                          <label>เลขที่บัญชี:</label>
                        </div>
                        <div className="row">
                          <NumberFormat
                            className="inputUpload2 "
                            format="###-#-#####-###"
                            style={{
                              backgroundColor: "#fff",
                              fontFamily: "SukhumvitSet-SemiBold",
                              color: "rgb(0, 0, 0)",
                              border: " 1px solid #343a40",
                              borderRadius: "0.1rem",
                            }}
                            value={bank_number_admin}
                            onValueChange={(values) =>
                              Bank_number_admin(values.value)
                            }
                          />
                        </div>
                        <div className="row">
                          <label>วันเวลาใน สลิปโอนเงิน:</label>
                        </div>
                        <div className="row">
                          <div className="custom_date">
                            <DatePicker
                              selected={transfer_datetime}
                              onChange={(e) => Transfer_datetime(e)}
                              timeInputLabel="Time:"
                              dateFormat="MM/dd/yyyy h:mm aa"
                              showTimeInput
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => OnDontApprove(seleteddata)}
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

export default PromotionPage;
