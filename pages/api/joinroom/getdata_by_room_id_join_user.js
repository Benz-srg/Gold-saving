import dbConnect from "../../../utils/dbConnect";
import JoinRooms from "../../../models/JoinRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        // const joinrooms = await JoinRooms.find({
        //   room_id: req.body.data.room_id,
        // });
        const joinrooms = await JoinRooms.aggregate([
          {
            $match: {
              room_id: req.body.data.room_id,
            },
          },
          { $sort: { finish_date: 1, total_savings: -1 } },
          {
            $lookup: {
              from: "users", // colection ที่ต้องการจอย
              localField: "user_id", // ชือฟิล colection นี้
              foreignField: "user_id", // ชือฟิล colection ที่ต้องการจอย
              as: "users", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]);
        res.status(200).json({ success: true, data: joinrooms });
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
