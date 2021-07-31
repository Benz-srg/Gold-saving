import dbConnect from "../../../utils/dbConnect";
import Withdraw from "../../../models/Withdraw";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const withdraw = await Withdraw.find({
          user_id: req.body.data.user_id,
          room_id: req.body.data.room_id,
          status: "pending",
        });
        if (withdraw.length == 0) {
          res.status(201).json({ success: true });
        } else {
          res.status(200).json({ success: true });
        }
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
