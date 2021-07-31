import dbConnect from "../../../utils/dbConnect";
import hisSavingRooms from "../../../models/history/hisSavingRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const hissavingrooms = await hisSavingRooms.aggregate([
          {
            $match: {
              created_date: {
                $gte: new Date(req.body.data.datestart),
                $lte: new Date(req.body.data.dateend),
              }, // dateStart, dateEnd should be Date objects
            },
          },
          { $sort: { created_date: -1 } },
          {
            $lookup: {
              from: "users", // colection ที่ต้องการจอย
              localField: "modify_by", // ชือฟิล colection นี้
              foreignField: "user_id", // ชือฟิล colection ที่ต้องการจอย
              as: "users", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]);
        res.status(200).json({ success: true, data: hissavingrooms });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const hissavingrooms = await hisSavingRooms.aggregate([
          { $sort: { created_date: -1 } },
          {
            $lookup: {
              from: "users", // colection ที่ต้องการจอย
              localField: "modify_by", // ชือฟิล colection นี้
              foreignField: "user_id", // ชือฟิล colection ที่ต้องการจอย
              as: "users", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]);
        res.status(200).json({ success: true, data: hissavingrooms });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
