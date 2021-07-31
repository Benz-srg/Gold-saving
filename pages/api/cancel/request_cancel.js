import dbConnect from "../../../utils/dbConnect";
import Cancel from "../../../models/Cancel";
import hisCancel from "../../../models/history/hisCancel";
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
          bank_name_admin: "",
          bank_number_admin: "",
          bank_account_admin: "",
          transfer_datetime: "",
          cancel_date: new Date(),
          status: "pending",
        };
        const cancel = await Cancel.create(item);
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
          cancel_date: new Date(),
          status: "pending",
          modify_by: req.body.data.user_id,
        };
        await hisCancel.create(hisitem);
        res.status(200).json({ success: true, data: cancel });
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
