import React, { useState, useEffect } from "react";
import axios, { post } from "axios";
import { useRouter } from "next/router";
import Refresh from "@material-ui/icons/Refresh";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ModalReact from "react-modal";

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
  backgroundColor: "rgb(153 ,0 ,0)",
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

export default function LabelBottomNavigation() {
  const router = useRouter();
  const [goldprice, setGoldprice] = useState(Array);
  const [gold, setGold] = useState(String);
  const [goldSell, setGoldSell] = useState("24700");
  const [isloading, Isloading] = useState(false);
  const [total_owner, Total_owner] = useState(Number);
  const [total_user, Total_user] = useState(Number);
  const [condition_show, Condition_show] = useState(false);

  const [us_id, Us_is] = useState(localStorage.getItem("auth"));

  // const [us_id, Us_is] = useState("U7418a093802fcba0517db47ac5f2946f"); //test Robert
  useEffect(async () => {
    GoldPrice();
    LoadAllRoom();
    await localStorage.setItem("auth", us_id);
  }, []);
  const GoldPrice = async () => {
    //ดึงราคาทอง
    await axios({
      method: "get",
      url: "https://thai-gold-api.herokuapp.com/latest",
    }).then((response) => {
      setGoldprice(response.data.response.price.gold_bar);
      setGold(response.data.response.price.gold_bar);
                    if(gold.buy != undefined) {
                        setGoldSell(parseFloat(gold.buy.replace(/,/g, '')))
                    }
      console.log(gold.sell)
    });
  };

  // const updateGoldInstallment = () => {
  //     setInterval(
  //         () =>
  //             axios({
  //                 method: "GET",
  //                 url: "https://thai-gold-api.herokuapp.com/latest"
  //               }).then((response) =>{
  //                 setGold(response.data.response.price.gold);
  //                 if(gold.sell != undefined) {
  //                     setGoldSell(parseFloat(gold.sell.replace(/,/g, '')))
  //                 }
  //               }),
  //          1000*10
  //     )
  // }

  //แปลง str to float
  const strConvert = (strGold) => {
    if (strGold != undefined) {
      return parseInt(strGold.replace(/,/g, ''))
    } else {
      return 0
    }

  }

  //ค่างวด
  const goldItm1 = (goldSellPrice) => {
    const val = ((goldSellPrice/8)+900)/16;
    if (val > val.toFixed(0)) {
      return (val + 1).toFixed(0)
    }
    return val.toFixed(0)
  }
  const goldItm2 = (goldSellPrice) => {
    const val = ((goldSellPrice/4)+1100)/16
    if (val > val.toFixed(0)) {
      return (val + 1).toFixed(0)
    }
    return val.toFixed(0)
  }
  const goldItm3 = (goldSellPrice) => {
    const val = ((goldSellPrice/2)+1400)/16
    if (val > val.toFixed(0)) {
      return (val + 1).toFixed(0)
    }
    return val.toFixed(0)
  }
  const goldItm4 = (goldSellPrice) => {
    const val = (goldSellPrice+1750)/16
    if (val > val.toFixed(0)) {
      return (val + 1).toFixed(0)
    }
    return val.toFixed(0)
  }

  //สำหรับ return ค่างวดทองที่ถูกอัพเดทแล้ว
  const GoldInstallment1 = (gold) => {
    if (goldItm1(strConvert(gold))< 100) {
      return "กรุณารอสักครู่"
    } else {
      return goldItm1(strConvert(gold)) + " บาท"
    }
  }
  const GoldInstallment2 = (gold) => {
    if (goldItm2(strConvert(gold))< 100) {
      return "กรุณารอสักครู่"
    } else {
      return goldItm2(strConvert(gold)) + " บาท"
    }
  }
  const GoldInstallment3 = (gold) => {
    if (goldItm3(strConvert(gold))< 100) {
      return "กรุณารอสักครู่"
    } else {
      return goldItm3(strConvert(gold)) + " บาท"
    }
  }
  const GoldInstallment4 = (gold) => {
    if (goldItm4(strConvert(gold))< 100) {
      return "กรุณารอสักครู่"
    } else {
      console.log(gold + ' || ' + parseInt(strConvert(gold)))
      return goldItm4(strConvert(gold)) + " บาท"
    }
  }

  const numberWithcomma = (gold_price) => {
    return gold_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const LoadAllRoom = async () => {
    //ดึงข้อมูล ออมกี่ห้อง เป็นเจ้าของกี่ห้อง
    var data = {
      user_id: us_id,
    };
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer my-token",
        "My-Custom-Header": "foobar",
      },
      url: "/api/saving_rooms/check_all_room_by_user_id",
      data: JSON.stringify({ data: data }),
    }).then(
      (response) => {
        var owner = 0;
        var user = 0;
        for (let index = 0; index < response.data.data.length; index++) {
          const element = response.data.data[index];
          if (
            Date.parse(element.savingrooms_data[0].end_date) <
            Date.parse(new Date())
          ) {
            // ถ้าเลยวันหมดอายุการออม
          } else {
            // ถ้าไม่เลยวันหมดอายุการออม
            if (element.savingrooms_data[0].status === "finished") {
              // ถ้าออมเสร็จ
            } else {
              if (element.owner === us_id) {
                //ถ้า id เจ้าของห้อง ตรงกับ ไอดี ที่ใช้งาน login
                owner = owner + 1;
              } else {
                user = user + 1;
              }
            }
          }
        }

        Total_owner(owner); //จำนวนห้องที่เป็นเจ้าของ
        Total_user(user); //จำนวนห้องที่เป็นสมาชิก
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const go_to_list_room = async () => {
    return router.push("/mobile/list_room");
  };
  return (
    <>
      <div
        style={{
          height: "90vh",
          backgroundColor: "rgb(156, 0, 0)",
          overflow: "scroll",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-3 d-flex justify-content-start">
              {/* <Refresh type="submit" style={{ fontSize: 40, color: "#fff" }} /> */}
            </div>
            <div
              className="col-6 d-flex justify-content-center"
              style={{
                fontFamily: "SukhumvitSet-SemiBold",
                color: "rgb(0,190,22)",
                fontSize: "3vw",
              }}
            >
              <img
                src="/image/logo.svg"
                className="d-flex justify-content-center mt-5"
                width={"300px"}
                height={"150px"}
              />
            </div>
            <div className="col-3 d-flex justify-content-end pt-3">
              {/* <Refresh type="submit" style={{ fontSize: 40, color: "#fff" }} /> */}
            </div>
          </div>
        </div>
        <div className="container" style={{marginTop:"0.4rem"}}>
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4"></div>
            <div className="col-4" style={{textAlign:"right"}}>

            <button
              type="button"
              onClick={() => Condition_show(true)}
              className="btn"
              style={{
                backgroundColor: "rgba(231, 180, 0,1)",
                fontFamily: "SukhumvitSet-SemiBold",
                color: "#fff",
                borderColor: "rgba(231, 180, 0,1)",
                fontSize:"2vw",
                marginRight:"2vw",
                padding:"1px"
              }}
            >
              อ่านเงื่อนไขการออม
            </button> {/* ปุ่ม อ่านเงื่อนไข */}

            </div>
          </div>
        </div>


        <div className="d-flex justify-content-center mt-2">
          <div className="card" style={{ width: "90vw" }}>
        {/* ปุ่มไม่ได้ใช้ แต่เผื่อไว้แก้ */}
          <button
              type="button"
              onClick={() => Condition_show(true)}
              className="btn"
              style={{
                backgroundColor: "rgba(231, 180, 0,0)",
                fontSize: "3vw",
                fontFamily: "SukhumvitSet-SemiBold",
                color: "rgb(157,21,2)",
                borderColor: "rgba(231, 180, 0,0)",
                right:"0",
                position: "absolute",
                display:"none"
              }}
            >
              อ่านเงื่อนไขการออม
            </button> {/* ปุ่ม อ่านเงื่อนไข */}
            <div className="card-body" style={{marginTop:"2vw"}}>
              <div className="container">
                {/* <div className="row">
                  <div
                    className="col-4"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(153,0,0)",
                      fontSize: "3vw",
                    }}
                  >
                    ราคาทองสมาคม
                  </div>
                  <div
                    className="col-4"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(255,6,6)",
                      fontSize: "3vw",
                    }}
                  >
                    ซื้อเข้า
                  </div>
                  <div
                    className="col-4"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(255,6,6)",
                      fontSize: "3vw",
                    }}
                  >
                    ขายออก
                  </div>
                </div> */}
                {/* <div className="row">
                  <div
                    className="col-4"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(231,180,0)",
                      fontSize: "3vw",
                    }}
                  >
                    96.5%
                  </div>
                  <div
                    className="col-4"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(255,6,6)",
                      fontSize: "3vw",
                    }}
                  >
                    {goldprice.sell}
                  </div>
                  <div
                    className="col-4"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(255,6,6)",
                      fontSize: "3vw",
                    }}
                  >
                    {goldprice.buy}
                  </div>
                </div> */}
                {/* <div className="">
                  เรทออมวันนี้
                </div> */}
                <div className="row text-center">
                  <div
                    className="col-12"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(153,0,0)",
                      fontSize: "3.8vw",
                    }}
                  >
                   เรทออมวันนี้
                  </div>
                 
                </div>
                <div className="row">

                </div>
                {/* ค่างวดทอง */}
                <div className="row" style={{marginTop:"20px",marginLeft:"5px;"}}>
                  <div
                    className="col-5 ml-4"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(153,0,0)",
                      fontSize: "2.8vw",
                    }}
                  >
                    ครึ่งสลึง งวดแรก
                  </div>
                  
                  <div
                    className="col-5 text-center"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(153,0,0)",
                      fontSize: "3vw",
                    }}
                  >
                    {numberWithcomma(GoldInstallment1(gold.buy))} {/* ราคางวดทอง ครึ่งสลึง */}
                  </div>
                </div>

                <div className="row">
                  <div
                    className="col-5  ml-4"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(153,0,0)",
                      fontSize: "2.8vw",
                      marginLeft:"5px;"
                    }}
                  >
                    1 สลึง งวดแรก
                  </div>
                  
                  <div
                    className="col-5 text-center"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(153,0,0)",
                      fontSize: "3vw",

                    }}
                  >
                    {numberWithcomma(GoldInstallment2(gold.buy))} {/* ราคางวดทอง 1 สลึง */}
                  </div>
                </div>

                <div className="row">
                  <div
                    className="col-5 ml-4"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(153,0,0)",
                      fontSize: "2.8vw",
                      marginLeft:"5px;"
                    }}
                  >
                    2 สลึง งวดแรก
                  </div>
                  
                  <div
                    className="col-5 text-center"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(153,0,0)",
                      fontSize: "3vw",
                      // marginLeft:"5px;"
                    }}
                  >
                    {numberWithcomma(GoldInstallment3(gold.buy))} {/* ราคางวดทอง 2 สลึง */}
                  </div>
                </div>
                <div className="row mt-4">
                  <div
                    className="col-12"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(153,0,0)",
                      fontSize: "2.8vw",
                    }}
                  >
                    * งวดถัดไปออมเท่างวดแรก หรือ 100 บาท ขึ้นไป <br/>
                    * ส่งออมวันไหนก็ได้ ให้ครบภายใน 16 สัปดาห์
                   
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-12"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(153,0,0)",
                      fontSize: "2.8vw",
                    }}
                  >
                    {/* ** ออมวันไหนก็ได้ ให้ครบถายใน 4 เดือน */}
                  </div>
                 
                </div>
{/*  
                <div className="row">
                  <div
                    className="col-4"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(153,0,0)",
                      fontSize: "2.8vw",
                    }}
                  >
                    1 บาทงวดแรก
                  </div>
                  <div className="col-4"></div>
                  <div
                    className="col-4"
                    style={{
                      fontFamily: "SukhumvitSet-SemiBold",
                      color: "rgb(153,0,0)",
                      fontSize: "3vw",
                    
                    }}
                  >
                    {numberWithcomma(GoldInstallment4(gold.buy))}
                  </div>
                </div>

              */}


                {/* สุดค่างวดทอง */}
              </div>
            </div>
          </div>
        </div>
      


        <div className="d-flex justify-content-center mt-2  mb-2">
          <div
            className="card"
            style={{
              width: "90vw",
              backgroundImage: "linear-gradient(rgb(101,0,0), rgb(53,0,0))",
              color: "#fff",
              fontSize: "10pt",
            }}
            onClick={go_to_list_room}
          >
            <div className="card-body">
              <div className="row">
                <div className="col-10">
                  <div className="form-row">
                    <div className="col">
                      <p className="card-text">
                        เป็นเจ้าของ : {total_owner} ห้อง
                      </p>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      <p className="card-text">
                        เป็นสมาชิก : {total_user} ห้อง
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <ArrowForwardIosIcon
                    style={{
                      fontSize: 30,
                      padding: "3px",
                      color: "#fff",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mb-5">
          <div
            className="d-flex justify-content-center"
            style={{ width: "90vw" }}
          >

            {/* <button
              type="button"
              onClick={() => Condition_show(true)}
              className="btn"
              style={{
                backgroundColor: "rgb(231, 180, 0)",
                fontFamily: "SukhumvitSet-SemiBold",
                color: "#fff",
                borderColor: "rgb(231, 180, 0)",
              }}
            >
              อ่านเงื่อนไขการออม
            </button> */}

          </div>
        </div>
      </div>
      <ModalReact style={customStyles2} isOpen={isloading}>
        <button className="btn btn-primary" type="button" disabled>
          <span
            className="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          />
          กรุณารอสักครู่...
        </button>
      </ModalReact>

      <ModalReact isOpen={condition_show} style={customStyles}>
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
              onClick={() => Condition_show(false)}
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
              2. หน่วยทองคำ 1 บาท เท่ากับ 15.16 กรัม / 2 สลึง เท่ากับ 7.58 กรัม
              / 1 สลึง เท่ากับ 3.79 กรัม / ครึ่งสลึง เท่ากับ 1.90 กรัม / 1 กรัม
              เท่ากับ 1.00 กรัม / 0.6 กรัม เท่ากับ 0.60 กรัม
            </p>
            <p style={TitleNameStyle}>
              3.
              ลูกค้าตกลงออมทองเป็นประจำตามความประสงค์ให้ครบจำนวนเงินที่ตกลงไว้
              ภายในระยะเวลา 16 สัปดาห์
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
              7. เมื่อลูกค้าออมไม่ครบจำนวนเงินที่ตกลงกันไว้ ภายในระยะเวลา 16
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
              onClick={() => Condition_show(false)}
            >
              ปิด
            </button>
          </div>
        </div>
      </ModalReact>
    </>
  );
}
