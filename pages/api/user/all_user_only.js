import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.aggregate([
          {
            $match: {
              status: { $in: ["ready", "nopass"] },
            },
          },
          { $sort: { dateCreate: -1 } },
          // {
          //   $lookup: {
          //     from: "savingrooms", // colection ที่ต้องการจอย
          //     localField: "room_id", // ชือฟิล colection นี้
          //     foreignField: "room_id", // ชือฟิล colection ที่ต้องการจอย
          //     as: "savingrooms_data", // แสดงใน path ที่ชื่อว่า "users"
          //   },
          // },
        ]);
        // const users = await User.find({ status: { $in: ["ready", "nopass"] } });
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const users = await User.aggregate([
          {
            $match: {
              role: { $in: req.body.data },
            },
          },
          { $sort: { dateCreate: -1 } },
        ]);
        // const users = await User.find({ status: { $in: ["ready", "nopass"] } });
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

      res.status(400).json({ success: false });
      break;
  }
};
