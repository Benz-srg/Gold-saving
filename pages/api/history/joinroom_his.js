import dbConnect from "../../../utils/dbConnect";
import hisJoinRooms from "../../../models/history/hisJoinRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const hisjoinrooms = await hisJoinRooms.aggregate([
          {
            $match: {
              join_date: {
                $gte: new Date(req.body.data.datestart),
                $lte: new Date(req.body.data.dateend),
              }, // dateStart, dateEnd should be Date objects
            },
          },
          { $sort: { join_date: -1 } },
          {
            $lookup: {
              from: "users", // colection ที่ต้องการจอย
              localField: "user_id", // ชือฟิล colection นี้
              foreignField: "user_id", // ชือฟิล colection ที่ต้องการจอย
              as: "users", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]);
        res.status(200).json({ success: true, data: hisjoinrooms });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const hisjoinrooms = await hisJoinRooms.aggregate([
          { $sort: { join_date: -1 } },
          {
            $lookup: {
              from: "users", // colection ที่ต้องการจอย
              localField: "user_id", // ชือฟิล colection นี้
              foreignField: "user_id", // ชือฟิล colection ที่ต้องการจอย
              as: "users", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]);
        res.status(200).json({ success: true, data: hisjoinrooms });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
