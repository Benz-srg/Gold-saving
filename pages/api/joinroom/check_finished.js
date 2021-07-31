import dbConnect from "../../../utils/dbConnect";
import JoinRooms from "../../../models/JoinRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const joinrooms = await JoinRooms.find({
          user_id: req.body.data.user_id,
          room_id: req.body.data.room_id,
          status: "finished",
        });
        // console.log(joinrooms.length);
        if (joinrooms.length == 0) {
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
