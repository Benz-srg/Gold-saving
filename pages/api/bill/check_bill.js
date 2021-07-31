import dbConnect from "../../../utils/dbConnect";
import Bill from "../../../models/Bill";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const bill = await Bill.find({
          user_id: req.body.data.user_id,
          room_id: req.body.data.room_id,
        }).sort([["upload_date", "desc"]]);
        res.status(200).json({ success: true, data: bill });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
