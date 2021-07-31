import dbConnect from "../../../utils/dbConnect";
import SavingRooms from "../../../models/SavingRooms";
import JoinRooms from "../../../models/JoinRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const savingrooms = await SavingRooms.find({
          room_id: req.body.data,
        });
        const joinrooms = await JoinRooms.find({
          room_id: req.body.data,
        });
        var data = {
          max: parseInt(savingrooms[0].member), //จำนวนคนสูงสุด
          total: joinrooms.length, //จำนวนคนที่ออม
        };
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
