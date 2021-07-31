import dbConnect from "../../../utils/dbConnect";
import Cancel from "../../../models/Cancel";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        // const cancel = await Cancel.find({ status: "pending" });

        const cancel = await Cancel.aggregate([
          {
            $match: {
              status: "pending", // dateStart, dateEnd should be Date objects
            },
          },
          { $sort: { cancel_date: -1 } },
          {
            $lookup: {
              from: "users", // colection ที่ต้องการจอย
              localField: "user_id", // ชือฟิล colection นี้
              foreignField: "user_id", // ชือฟิล colection ที่ต้องการจอย
              as: "users", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]);
        res.status(200).json({ success: true, data: cancel });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    // case "GET":
    //   break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
