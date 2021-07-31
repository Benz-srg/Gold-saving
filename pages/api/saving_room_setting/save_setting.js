import dbConnect from "../../../utils/dbConnect";
import SavingRoomsSetting from "../../../models/SavingRoomsSetting";
import hisSavingRoomsSetting from "../../../models/history/hisSavingRoomsSetting";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const savingroomssetting = await SavingRoomsSetting.find({
          room_id: "1",
        });
        if (savingroomssetting[0] == undefined) {
          var item = {
            room_id: "1",
            min_member: req.body.data.min_member,
            installment: req.body.data.installment,
            day: req.body.data.day,
            fee: req.body.data.fee,
            point: req.body.data.point,
          };
          var hisitem = {
            room_id: "1",
            min_member: req.body.data.min_member,
            installment: req.body.data.installment,
            day: req.body.data.day,
            fee: req.body.data.fee,
            point: req.body.data.point,
            update_by: req.body.data.user_id,
            update_date: new Date(),
          };
          await hisSavingRoomsSetting.create(hisitem);
          const savingroomssetting = await SavingRoomsSetting.create(item);
          res.status(200).json({ success: true, data: savingroomssetting });
        } else {
          const filter = { room_id: "1" };
          const update = {
            min_member: req.body.data.min_member,
            installment: req.body.data.installment,
            day: req.body.data.day,
            fee: req.body.data.fee,
            point: req.body.data.point,
          };
          const savingroomssetting = await SavingRoomsSetting.findOneAndUpdate(
            filter,
            update
          );
          var hisitem = {
            room_id: "1",
            min_member: req.body.data.min_member,
            installment: req.body.data.installment,
            day: req.body.data.day,
            fee: req.body.data.fee,
            point: req.body.data.point,
            update_by: req.body.data.user_id,
            update_date: new Date(),
          };
          await hisSavingRoomsSetting.create(hisitem);
          res.status(200).json({ success: true, data: savingroomssetting });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const savingroomssetting = await SavingRoomsSetting.find({
          room_id: "1",
        });
        res.status(200).json({ success: true, data: savingroomssetting });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
