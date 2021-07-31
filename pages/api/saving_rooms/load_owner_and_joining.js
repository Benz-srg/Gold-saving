import dbConnect from "../../../utils/dbConnect";
import SavingRooms from "../../../models/SavingRooms";
import JoinRooms from "../../../models/JoinRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const savingrooms = await SavingRooms.find({
          status: { $in: ["pending"] },
          owner: req.body.data.user_id,
        });
        const savingrooms_finished = await SavingRooms.find({
          status: { $in: ["finished"] },
          owner: req.body.data.user_id,
        });
        const joinrooms_owner = await JoinRooms.aggregate([
          {
            $match: {
              status: {
                $in: ["saving", "finished", "withdrawed", "cancelled"],
              },
              user_id: req.body.data.user_id,
              owner: req.body.data.user_id,
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

        const joinrooms_joiner = await JoinRooms.aggregate([
          {
            $match: {
              status: { $in: ["saving"] },
              user_id: req.body.data.user_id,
              owner: { $ne: req.body.data.user_id },
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

        var owner_room = [];
        var joiner_room = [];
        var pending = [];

        for (let index = 0; index < joinrooms_owner.length; index++) {
          const element = joinrooms_owner[index];
          var p = 0;
          for (let i = 0; i < savingrooms_finished.length; i++) {
            const ele = savingrooms_finished[i];
            if (ele.room_id === element.room_id) {
              p = 1;
            }
          }
          if (p === 1) {
          } else {
            owner_room.push(element);
          }
        }

        for (let index = 0; index < joinrooms_joiner.length; index++) {
          const element = joinrooms_joiner[index];
          joiner_room.push(element);
        }
        for (let index = 0; index < savingrooms.length; index++) {
          const element = savingrooms[index];
          pending.push(element);
        }
        var children = pending.concat(owner_room.concat(joiner_room));
        // console.log(children);
        res.status(200).json({ success: true, data: children });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
