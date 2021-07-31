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
          status: { $in: ["ready", "pending"] },
          owner: req.body.data.user_id,
        });
        const joinrooms = await JoinRooms.find({
          status: { $in: ["saving", "finished"] },
          user_id: req.body.data.user_id,
        });
        // console.log(joinrooms.length);
        if (savingrooms.length == 0) {
          if (joinrooms.length == 0) {
            const data = {
              owner_room: "",
              join_rooms: "",
              status: 201,
            };
            res.status(200).json({ success: true, data: data });
          } else {
            const data = {
              owner_room: "",
              join_rooms: joinrooms[0].room_id,
              status: 202,
            };
            res.status(200).json({ success: true, data: data });
          }
        } else {
          if (savingrooms[0].status == "pending") {
            if (joinrooms.length == 0) {
              const data = {
                owner_room: savingrooms[0].room_id,
                join_rooms: "",
                status: 203,
              };
              res.status(200).json({ success: true, data: data });
            } else {
              const data = {
                owner_room: savingrooms[0].room_id,
                join_rooms: joinrooms[0].room_id,
                status: 204,
              };
              res.status(200).json({ success: true, data: data });
            }
          }
          if (savingrooms[0].status == "ready") {
            if (joinrooms.length == 0) {
              const data = {
                owner_room: savingrooms[0].room_id,
                join_rooms: "",
                status: 205,
              };
              res.status(200).json({ success: true, data: data });
            } else {
              const data = {
                owner_room: savingrooms[0].room_id,
                join_rooms: joinrooms[0].room_id,
                status: 206,
              };
              res.status(200).json({ success: true, data: data });
            }
          }
        }
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
