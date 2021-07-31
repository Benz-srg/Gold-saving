import dbConnect from "../../../utils/dbConnect";
import SavingRooms from "../../../models/SavingRooms";
import hisSavingRooms from "../../../models/history/hisSavingRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        var item = {
          room_id: req.body.data.room_id,
          token: req.body.data.token,
          owner: req.body.data.owner,
          weight: req.body.data.weight,
          price: req.body.data.price,
          status: req.body.data.status,
          start_date: req.body.data.start_date,
          end_date: req.body.data.end_date,
          day: req.body.data.day,
          installment: req.body.data.installment,
          member: req.body.data.member,
          alert_status: "null",
          alert_total: "0",
          approve_by: "",
          created_date: new Date(),
        };

        var item_his = {
          room_id: req.body.data.room_id,
          token: req.body.data.token,
          owner: req.body.data.owner,
          weight: req.body.data.weight,
          price: req.body.data.price,
          status: req.body.data.status,
          start_date: req.body.data.start_date,
          end_date: req.body.data.end_date,
          day: req.body.data.day,
          installment: req.body.data.installment,
          member: req.body.data.member,
          approve_by: "",
          created_date: new Date(),
          modify_by: req.body.data.owner,
          alert_status: "null",
          alert_total: "0",
        };
        const savingrooms = await SavingRooms.create(item); //เข้า Tb_saving
        await hisSavingRooms.create(item_his); //เข้า Hisstory Saivng
        res.status(200).json({ success: true, data: savingrooms });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    case "GET":
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
