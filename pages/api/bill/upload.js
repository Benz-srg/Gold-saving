import dbConnect from "../../../utils/dbConnect";
import Bill from "../../../models/Bill";
import hisBill from "../../../models/history/hisBill";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        let item = {
          user_id: req.body.data.user_id,
          time: req.body.data.time,
          money: req.body.data.money,
          status: "pending",
          bill_path: req.body.data.bill_path,
          room_id: req.body.data.room_id,
          upload_date: new Date(),
        };
        const bill = await Bill.create(item);

        let hisitem = {
          user_id: req.body.data.user_id,
          time: req.body.data.time,
          money: req.body.data.money,
          status: "pending",
          bill_path: req.body.data.bill_path,
          room_id: req.body.data.room_id,
          upload_date: new Date(),
          modify_by: req.body.data.user_id,
          modify_date: new Date(),
        };
        await hisBill.create(hisitem);
        res.status(200).json({ success: true, data: bill });
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
