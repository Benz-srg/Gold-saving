import dbConnect from "../../../utils/dbConnect";
import hisUser from "../../../models/history/hisUser";

// import hisRegister from "../../../models/history/hisRegister";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const hisuser = await hisUser.aggregate([
          {
            $match: {
              dateCreate: {
                $gte: new Date(req.body.data.datestart),
                $lte: new Date(req.body.data.dateend),
              }, // dateStart, dateEnd should be Date objects
            },
          },
          { $sort: { dateCreate: -1 } },
          {
            $lookup: {
              from: "users", // colection ที่ต้องการจอย
              localField: "createby", // ชือฟิล colection นี้
              foreignField: "user_id", // ชือฟิล colection ที่ต้องการจอย
              as: "users", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]);
        res.status(200).json({ success: true, data: hisuser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const hisuser = await hisUser.aggregate([
          { $sort: { dateCreate: -1 } },
          {
            $lookup: {
              from: "users", // colection ที่ต้องการจอย
              localField: "createby", // ชือฟิล colection นี้
              foreignField: "user_id", // ชือฟิล colection ที่ต้องการจอย
              as: "users", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]);
        res.status(200).json({ success: true, data: hisuser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
