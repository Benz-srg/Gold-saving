import dbConnect from "../../../utils/dbConnect";
import Withdraw from "../../../models/Withdraw";
import User from "../../../models/User";
import hisWithdraw from "../../../models/history/hisWithdraw";
dbConnect();
export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        //อัพเดทแต้ม ผุ้ใช้ให้เหลือ 0
        const filter = {
          user_id: req.body.data.user_id,
        };
        const update = {
          point: "0",
        };
        await User.findOneAndUpdate(filter, update);

        //อัพเดทตาราง withdraw ผุ้ใช้ให้เหลือ 0
        const filter1 = { _id: req.body.data.id };
        const update1 = {
          status: "withdrawed",
          bank_name_admin: req.body.data.bank_name_admin,
          bank_number_admin: req.body.data.bank_number_admin,
          bank_account_admin: req.body.data.bank_account_admin,
          transfer_datetime: req.body.data.transfer_datetime,
        };
        let doc = await Withdraw.findOneAndUpdate(filter1, update1);
        //เพิ่มประวัติ withdraw
        var item = {
          user_id: doc.user_id,
          room_id: doc.room_id,
          type: doc.type,
          total: doc.total,
          withdraw_date: new Date(),
          status: "withdrawed",
          modify_by: req.body.data.modify_by,
          bank_name_admin: req.body.data.bank_name_admin,
          bank_number_admin: req.body.data.bank_number_admin,
          bank_account_admin: req.body.data.bank_account_admin,
          transfer_datetime: req.body.data.transfer_datetime,

          bank_name: doc.bank_name,
          bank_number: doc.bank_number,
          bank_account: doc.bank_account,
          change: doc.change, //เงินทอน
          point: doc.point, //เงินทอน
        };
        await hisWithdraw.create(item);
        res.status(200).json({ success: true, data: doc });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
