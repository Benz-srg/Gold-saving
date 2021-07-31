import dbConnect from "../../../utils/dbConnect";
import JoinRooms from "../../../models/JoinRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        // console.log(req.body.data);
        const joinrooms = await JoinRooms.find({
          room_id: req.body.data.room_id,
          total_installment: "0",
        });
        const joinrooms_all = await JoinRooms.find({
          room_id: req.body.data.room_id,
        });
        var total_uploaded = joinrooms_all.length - joinrooms.length;
        res.status(200).json({ success: true, data: total_uploaded });
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
