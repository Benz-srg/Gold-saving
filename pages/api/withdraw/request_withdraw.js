import dbConnect from "../../../utils/dbConnect";
import Withdraw from "../../../models/Withdraw";
import hisWithdraw from "../../../models/history/hisWithdraw";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        // console.log(req.body.data);
        var item = {
          user_id: req.body.data.user_id,
          room_id: req.body.data.room_id,
          type: req.body.data.type,
          total: req.body.data.total,
          bank_name: req.body.data.bank_name,
          bank_number: req.body.data.bank_number,
          bank_account: req.body.data.bank_account,
          change: req.body.data.change, //เงินทอน
          point: req.body.data.point, //เงินทอน
          bank_name_admin: "",
          bank_number_admin: "",
          bank_account_admin: "",
          transfer_datetime: "",
          withdraw_date: new Date(),
          status: "pending",
        };
        const withdraw = await Withdraw.create(item);
        var hisitem = {
          user_id: req.body.data.user_id,
          room_id: req.body.data.room_id,
          type: req.body.data.type,
          total: req.body.data.total,
          bank_name: req.body.data.bank_name,
          bank_number: req.body.data.bank_number,
          bank_account: req.body.data.bank_account,
          bank_name_admin: "",
          bank_number_admin: "",
          bank_account_admin: "",
          transfer_datetime: "",
          change: req.body.data.change, //เงินทอน
          point: req.body.data.point, //เงินทอน
          withdraw_date: new Date(),
          status: "pending",
          modify_by: req.body.data.user_id,
        };
        await hisWithdraw.create(hisitem);
        res.status(200).json({ success: true, data: withdraw });
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
