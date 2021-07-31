import dbConnect from "../../../utils/dbConnect";
import SavingRooms from "../../../models/SavingRooms";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const savingrooms = await SavingRooms.find({
          status: "ready",
          token: req.body.data.token,
        });
        // console.log(savingrooms.length);
        if (savingrooms.length == 0) {
          res.status(201).json({ success: true, data: "" });
        } else {
          res.status(200).json({ success: true, data: savingrooms });
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
