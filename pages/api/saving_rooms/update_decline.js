import dbConnect from "../../../utils/dbConnect";
import SavingRooms from "../../../models/SavingRooms";
import hisSavingRooms from "../../../models/history/hisSavingRooms";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const filter = { _id: req.body.data.id }; //fliter id
        const update = {
          status: "declined",
        };
        let doc = await SavingRooms.findOneAndUpdate(filter, update);

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
          status: "declined",
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
