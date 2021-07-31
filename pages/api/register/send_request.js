import dbConnect from "../../../utils/dbConnect";
import Register from "../../../models/Register"; //ตารางข้อมูลการสมัคร
import hisRegister from "../../../models/history/hisRegister"; //ตารางประวัติการสมัคร
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        let hisitem = {
          fname: req.body.data.fname,
          lname: req.body.data.lname,
          phonenumber: req.body.data.phonenumber,
          idcard: req.body.data.idcard,
          brithday: req.body.data.brithday,
          address: req.body.data.address,
          province: req.body.data.province,
          district: req.body.data.district,
          canton: req.body.data.canton,
          postal_code: req.body.data.postal_code,
          user_line_id: req.body.data.user_line_id,
          status: req.body.data.status,
          dateRegister: new Date(),
        };
        await hisRegister.create(hisitem);
        let item = {
          fname: req.body.data.fname,
          lname: req.body.data.lname,
          phonenumber: req.body.data.phonenumber,
          idcard: req.body.data.idcard,
          brithday: req.body.data.brithday,
          address: req.body.data.address,
          province: req.body.data.province,
          district: req.body.data.district,
          canton: req.body.data.canton,
          postal_code: req.body.data.postal_code,
          user_line_id: req.body.data.user_line_id,
          fileUserWithIdCard: req.body.data.fileUserWithIdCard,
          status: req.body.data.status,
          dateRegister: new Date(),
        };
        const register = await Register.create(item);
        res.status(200).json({ success: true, data: register });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const register = await Register.find({ status: "pending" });
        // console.log(register);
        res.status(200).json({ success: true, data: register });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
