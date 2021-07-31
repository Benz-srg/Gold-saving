import dbConnect from "../../../utils/dbConnect";
import SavingRooms from "../../../models/SavingRooms";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        // console.log(req.body.data);
        var item = {
          room_id: req.body.data.room_id,
          token: req.body.data.token,
          owner: req.body.data.owner,
          weight: req.body.data.weight,
          price: ceil(req.body.data.price),
          status: req.body.data.status,
          start_date: req.body.data.start_date,
          end_date: req.body.data.end_date,
          day: req.body.data.day,
          fee: req.body.data.fee,
          installment: req.body.data.installment,
          member: req.body.data.member,
        };
        const savingrooms = await SavingRooms.create(item);
        res.status(200).json({ success: true, data: savingrooms });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const savingrooms = await SavingRooms.aggregate([
          { $match: { status: "pending" } },
          {
            $lookup: {
              from: "users", // colection ที่ต้องการจอย
              localField: "owner", // ชือฟิล colection นี้
              foreignField: "user_id", // ชือฟิล colection ที่ต้องการจอย
              as: "users", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]);

        // console.log(savingrooms);

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
