import dbConnect from "../../../utils/dbConnect";
import JoinRooms from "../../../models/JoinRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const joinrooms = await JoinRooms.aggregate([
          {
            $match: {
              room_id: req.body.data.room_id,
            },
          },
          { $sort: { finish_date: 1, total_savings: -1 } },
          {
            $lookup: {
              from: "users", // colection ที่ต้องการจอย
              localField: "user_id", // ชือฟิล colection นี้
              foreignField: "user_id", // ชือฟิล colection ที่ต้องการจอย
              as: "users", // แสดงใน path ที่ชื่อว่า "users"
            },
          },
        ]);
        var data_finished = [];
        var data_unfinished = [];
        for (let index = 0; index < joinrooms.length; index++) {
          const element = joinrooms[index];
          if (element.finish_date === "") {
            data_unfinished.push(element);
          } else {
            data_finished.push(element);
          }
        }

        // console.log(data_finished);
        // console.log(data_unfinished);

        var children = data_finished.concat(data_unfinished); //ออมเสร็จอยู่บน ,ออมมากอยู่บน
        res.status(200).json({ success: true, data: children });
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
