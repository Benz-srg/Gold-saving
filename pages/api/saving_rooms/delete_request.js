import dbConnect from "../../../utils/dbConnect";
import SavingRooms from "../../../models/SavingRooms";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        SavingRooms.findByIdAndDelete(req.body.data.id, function (err) {
          if (err) console.log(err);
          console.log("Successful deletion");
        });
        res.status(200).json({ success: true, data: "Successful deletion" });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
