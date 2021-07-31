import dbConnect from "../../../utils/dbConnect";
import Bill from "../../../models/Bill";
import hisBill from "../../../models/history/hisBill";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const filter = { _id: req.body.data.id };
        const update = {
          status: "declined",
        };
        let doc = await Bill.findOneAndUpdate(filter, update);
        let item = {
          user_id: doc.user_id,
          time: doc.time,
          money: doc.money,
          status: "declined",
          bill_path: doc.bill_path,
          room_id: doc.room_id,
          upload_date: doc.upload_date,
          modify_by: req.body.data.modify_by,
          modify_date: new Date(),
        };
        await hisBill.create(item);
        res.status(200).json({ success: true, data: doc });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
