import dbConnect from "../../../utils/dbConnect";
import JoinRooms from "../../../models/JoinRooms";
import hisJoinRooms from "../../../models/history/hisJoinRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        // console.log(req.body.data);               user_id: req.body.data.user_id,
        const joinrooms = await JoinRooms.aggregate([
          {
            $match: {
              room_id: req.body.data.room_id,
              status: "finished",
            },
          },
          { $sort: { finish_date: 1 } },
        ]);
        // console.log(joinrooms.length);

        var rank = 0;
        if (joinrooms.length > 0) {
          for (let index = 0; index < joinrooms.length; index++) {
            const user_id = joinrooms[index].user_id;
            if (user_id === req.body.data.user_id) {
              // console.log(index);
              rank = index + 1;
            }
          }
        }

        res.status(200).json({ success: true, data: rank });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
