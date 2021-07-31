import dbConnect from "../../../utils/dbConnect";
import JoinRooms from "../../../models/JoinRooms";
import SavingRooms from "../../../models/SavingRooms";
import hisJoinRooms from "../../../models/history/hisJoinRooms";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const joinrooms = await JoinRooms.find({
          room_id: req.body.data.room_id,
        });
        const savingrooms = await SavingRooms.find({
          room_id: req.body.data.room_id,
        });

        const joinrooms_old = await JoinRooms.find({
          room_id: req.body.data.room_id,
          user_id: req.body.data.user_id,
        });

        if (joinrooms_old.length > 0) {
          res.status(202).json({ success: true, data: "max" }); //เข้าร่วมห้องเดิม
        } else {
          if (joinrooms.length < parseInt(req.body.data.max_member)) {
            //เข้าร่วมห้องได้ปกติ
            var item = {
              room_id: req.body.data.room_id,
              user_id: req.body.data.user_id,
              owner: savingrooms[0].owner,
              status: "saving",
              total_savings: "0",
              join_date: new Date(),
              total_installment: "0",
              finish_date: "",
            };
            const joinrooms = await JoinRooms.create(item);
            await hisJoinRooms.create(item);
            res.status(200).json({ success: true, data: joinrooms });
          } else {
            res.status(201).json({ success: true, data: "max" }); //ห้องเต็ม
          }
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
