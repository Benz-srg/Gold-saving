import dbConnect from "../../../utils/dbConnect";
import Cancel from "../../../models/Cancel";
import JoinRooms from "../../../models/JoinRooms";
import hisCancel from "../../../models/history/hisCancel";
import SavingRooms from "../../../models/SavingRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        // อัพเดท ตาราง joinroom .เป็o cancelled
        const filter = {
          user_id: req.body.data.user_id,
          room_id: req.body.data.room_id,
        };
        const update = {
          status: "cancelled",
        };
        await JoinRooms.findOneAndUpdate(filter, update);

        // อัพเดท ตาราง Cancel .เป็o cancelled
        const filter1 = { _id: req.body.data.id };
        const update1 = {
          status: "cancelled",
          bank_name_admin: req.body.data.bank_name_admin,
          bank_number_admin: req.body.data.bank_number_admin,
          bank_account_admin: req.body.data.bank_account_admin,
          transfer_datetime: req.body.data.transfer_datetime,
        };
        let doc = await Cancel.findOneAndUpdate(filter1, update1);
        var item = {
          user_id: doc.user_id,
          room_id: doc.room_id,
          type: doc.type,
          total: doc.total,
          cancel_date: new Date(),
          status: "cancelled",
          modify_by: req.body.data.modify_by,
          bank_name_admin: req.body.data.bank_name_admin,
          bank_number_admin: req.body.data.bank_number_admin,
          bank_account_admin: req.body.data.bank_account_admin,
          transfer_datetime: req.body.data.transfer_datetime,
        };

        // เพิ่ม ประวัติ
        await hisCancel.create(item);
        const room = await SavingRooms.find({
          room_id: req.body.data.room_id,
        });
        // อัพเดท ข้อมูลห้อง เช็คว่า คนออมเสร็จกี่คน+คนยกเลิกกี่คน  ถ้าเท่ากับ จำนวนสมาชิกตอนสร้างห้องแล้ว สถานะห้องจะเปลี่ยนเป็น finished
        var mem_room = parseInt(room[0].member);
        const total = await JoinRooms.find({
          status: { $ne: "saving" },
          room_id: req.body.data.room_id,
        });
        if (total.length >= mem_room) {
          const filter = { room_id: req.body.data.room_id };
          const update = {
            status: "finished",
          };
          await SavingRooms.findOneAndUpdate(filter, update);
        }
        res.status(200).json({ success: true, data: doc });
        // res.status(200).json({ success: true, data: cancel });
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
