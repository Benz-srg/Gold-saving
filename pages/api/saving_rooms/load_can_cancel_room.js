import dbConnect from "../../../utils/dbConnect";
import SavingRooms from "../../../models/SavingRooms";
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
              status: { $in: ["saving"] },
              user_id: req.body.data.user_id,
              total_installment: { $ne: "0" },
            },
          },
          {
            $lookup: {
              from: "cancels", // colection ที่ต้องการจอย
              localField: "user_id", // ชือฟิล colection นี้
              foreignField: "user_id", // ชือฟิล colection ที่ต้องการจอย
              as: "cancel_data", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
          {
            $lookup: {
              from: "savingrooms", // colection ที่ต้องการจอย
              localField: "room_id", // ชือฟิล colection นี้
              foreignField: "room_id", // ชือฟิล colection ที่ต้องการจอย
              as: "savingrooms_data", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]);
        // console.log(joinrooms);
        if (joinrooms.length === 0) {
          res.status(200).json({ success: true, data: [] });
        } else {
          res.status(200).json({ success: true, data: joinrooms });
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
