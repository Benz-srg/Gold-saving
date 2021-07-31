import dbConnect from "../../../utils/dbConnect";
import SavingRooms from "../../../models/SavingRooms";
import JoinRooms from "../../../models/JoinRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        // saving = กำลังออม
        // finished = ออมครบ
        // withdrawed = ถอนสำเร็จ
        // cancelled = ยกเลิกออม
        const joinrooms = await JoinRooms.aggregate([
          {
            $match: {
              status: {
                $in: ["saving", "finished", "withdrawed", "cancelled"],
              },
              user_id: req.body.data.user_id,
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
        res.status(200).json({ success: true, data: joinrooms });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const savingrooms = await SavingRooms.find({
          status: "pending",
          owner: "",
        });

        res.status(200).json({ success: true, data: savingrooms });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
