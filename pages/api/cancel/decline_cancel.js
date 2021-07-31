import dbConnect from "../../../utils/dbConnect";
import Cancel from "../../../models/Cancel";
import hisCancel from "../../../models/history/hisCancel";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const filter1 = { _id: req.body.data.id };
        const update1 = {
          status: "declined",
        };
        let doc = await Cancel.findOneAndUpdate(filter1, update1);

        var item = {
          user_id: doc.user_id,
          room_id: doc.room_id,
          type: doc.type,
          total: doc.total,
          cancel_date: new Date(),
          status: "declined",
          modify_by: req.body.data.modify_by,
        };
        await hisCancel.create(item);

        res.status(200).json({ success: true, data: doc });
        // res.status(200).json({ success: true, data: cancel });
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
