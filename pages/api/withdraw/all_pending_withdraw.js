import dbConnect from "../../../utils/dbConnect";
import Withdraw from "../../../models/Withdraw";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        // const withdraw = await Withdraw.find({ status: "pending" });

        const withdraw = await Withdraw.aggregate([
          { $match: { status: "pending" } },
          {
            $lookup: {
              from: "users", // colection ที่ต้องการจอย
              localField: "user_id", // ชือฟิล colection นี้
              foreignField: "user_id", // ชือฟิล colection ที่ต้องการจอย
              as: "users", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]);
        res.status(200).json({ success: true, data: withdraw });
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
