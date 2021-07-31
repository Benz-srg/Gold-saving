import dbConnect from "../../../utils/dbConnect";
import SavingRooms from "../../../models/SavingRooms";
import hisSavingRooms from "../../../models/history/hisSavingRooms";
import JoinRooms from "../../../models/JoinRooms";
import hisJoinRooms from "../../../models/history/hisJoinRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const filter = { _id: req.body.data.id };
        const update = {
          status: "ready",
          approve_by: req.body.data.user_id,
        };
        let doc = await SavingRooms.findOneAndUpdate(filter, update);
        // owner เข้าร่วมห้องตัวเอง
        var item = {
          room_id: doc.room_id,
          user_id: doc.owner,
          owner: doc.owner,
          status: "saving",
          total_savings: "0",
          join_date: new Date(),
          total_installment: "0",
          finish_date: "",
        };
        await JoinRooms.create(item);

        //ประวัติ
        await hisJoinRooms.create(item);
        var item = {
          room_id: doc.room_id,
          token: doc.token,
          owner: doc.owner,
          weight: doc.weight,
          price: doc.price,
          status: doc.status,
          start_date: doc.start_date,
          end_date: doc.end_date,
          day: doc.day,
          fee: doc.fee,
          installment: doc.installment,
          member: doc.member,
          status: "approved",
          approve_by: req.body.data.user_id,
          created_date: new Date(),
          modify_by: req.body.data.user_id,
        };
        await hisSavingRooms.create(item);

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
