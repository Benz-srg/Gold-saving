import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
import Register from "../../models/Register";
dbConnect();
import Cookies from "cookies";
export default async (req, res) => {
  if (req.method === "POST") {
    const { id } = req.body;
    const user_data = await User.find({ user_id: id });
    const register_data = await Register.find({ user_line_id: id });

    if (user_data[0] == undefined) {
      if (register_data[0] == undefined) {
        return res.status(202).json({
          //ไม่มีข้อมูลในระบบ
          status: "nodata",
        });
      } else {
        if (register_data[0].status == "pending") {
          //มีข้อมูลในระบบ สมัครสมาชิก รอการยืนยัน
          return res.status(201).json({
            status: "pending",
          });
        } else {
          return res.status(202).json({
            //ไม่มีข้อมูลในระบบ
            status: "nodata",
          });
        }
      }
    } else {
      if (user_data[0].status == "nopass") {
        return res.status(203).json({
          //มีข้อมูลในตาราง user แล้ว แต่ไม่มีรหัสผ่าน ยืนยันรหัสผ่าน
          status: "fristime",
        });
      } else {
        return res.status(200).json({
          //กรอกรหัสเข้าใช้งาน
          status: "success",
        });
      }
    }
  }
};
