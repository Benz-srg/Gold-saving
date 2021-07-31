import dbConnect from "../../../utils/dbConnect";
import Bill from "../../../models/Bill";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        // const bill = await Bill.find({ status: "pending" });

        const bill = await Bill.aggregate([
          {
            $match: {
              status: "pending", // dateStart, dateEnd should be Date objects
            },
          },
          { $sort: { upload_date: -1 } },
          {
            $lookup: {
              from: "users", // colection ที่ต้องการจอย
              localField: "user_id", // ชือฟิล colection นี้
              foreignField: "user_id", // ชือฟิล colection ที่ต้องการจอย
              as: "users", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]);
        res.status(200).json({ success: true, data: bill });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
