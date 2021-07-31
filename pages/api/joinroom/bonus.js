import dbConnect from "../../../utils/dbConnect";
import JoinRooms from "../../../models/JoinRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const joinrooms = await JoinRooms.aggregate([
          {
            $match: {
              room_id: req.body.data.room_id,
              total_installment: { $ne: "0" },
            },
          },
          {
            $lookup: {
              from: "savingrooms", // colection ที่ต้องการจอย
              localField: "room_id", // ชือฟิล colection นี้
              foreignField: "room_id", // ชือฟิล colection ที่ต้องการจอย
              as: "savingroom", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]); //ออมเสร็จอยู่บน ,ออมมากอยู่บน
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
