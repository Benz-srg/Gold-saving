import dbConnect from "../../../utils/dbConnect";
import hisLogin from "../../../models/history/hisLogin";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const hislogin = await hisLogin.aggregate([
          {
            $match: {
              datetime: {
                $gte: new Date(req.body.data.datestart),
                $lte: new Date(req.body.data.dateend),
              }, // dateStart, dateEnd should be Date objects
            },
          },
          { $sort: { datetime: -1 } },
          {
            $lookup: {
              from: "users", // colection ที่ต้องการจอย
              localField: "user_id", // ชือฟิล colection นี้
              foreignField: "user_id", // ชือฟิล colection ที่ต้องการจอย
              as: "users", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]);
        res.status(200).json({ success: true, data: hislogin });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const hislogin = await hisLogin.aggregate([
          { $sort: { datetime: -1 } },
          {
            $lookup: {
              from: "users", // colection ที่ต้องการจอย
              localField: "user_id", // ชือฟิล colection นี้
              foreignField: "user_id", // ชือฟิล colection ที่ต้องการจอย
              as: "users", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]);
        res.status(200).json({ success: true, data: hislogin });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
