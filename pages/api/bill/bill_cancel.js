import dbConnect from "../../../utils/dbConnect";
import Bill from "../../../models/Bill";
import JoinRooms from "../../../models/JoinRooms";
import SavingRooms from "../../../models/SavingRooms";
import hisBill from "../../../models/history/hisBill";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const bill = await Bill.find({
          user_id: req.body.data.user_id,
          status: "pending",
          room_id: req.body.data.room_id,
        });
        console.log(bill.length);
        if (bill.length === 0) {
          res.status(201).json({ success: true });
        } else {
          const filter = {
            user_id: req.body.data.user_id,
            status: "pending",
            room_id: req.body.data.room_id,
          };
          const update = {
            status: "canceled",
          };
          let doc = await Bill.findOneAndUpdate(filter, update);
          let item = {
            user_id: doc.user_id,
            time: doc.time,
            money: doc.money,
            status: "canceled",
            bill_path: doc.bill_path,
            room_id: doc.room_id,
            upload_date: doc.upload_date,
            modify_by: req.body.data.user_id,
            modify_date: new Date(),
          };
          await hisBill.create(item);
          res.status(200).json({ success: true, data: doc });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
