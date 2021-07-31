import dbConnect from "../../../utils/dbConnect";
import Bill from "../../../models/Bill";
import JoinRooms from "../../../models/JoinRooms";
import SavingRooms from "../../../models/SavingRooms";
import SavingRoomsSetting from "../../../models/SavingRoomsSetting";
import User from "../../../models/User";
import hisBill from "../../../models/history/hisBill";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const savingroomssetting = await SavingRoomsSetting.find({
          room_id: "1",
        });
        //ข้อมูล แต้มแม่ออม
        var point = parseInt(savingroomssetting[0].point);

        // อัพเดทข้อมูลบิล จาก pending เป็น approved
        const filter = { _id: req.body.data.id };
        const update = {
          status: "approved",
        };
        let document = await Bill.findOneAndUpdate(filter, update);
        // เพิ่มประวัติ การอัพโหลดบิล
        let item = {
          user_id: document.user_id,
          time: document.time,
          money: document.money,
          status: "approved",
          bill_path: document.bill_path,
          room_id: document.room_id,
          upload_date: document.upload_date,
          modify_by: req.body.data.modify_by,
          modify_date: new Date(),
        };
        await hisBill.create(item);

        // ข้อมูลเงินสะสม
        const beforeData = await JoinRooms.find({
          user_id: req.body.data.user_id,
          room_id: req.body.data.room_id,
        });
        const total_saving =
          parseInt(beforeData[0].total_savings) + parseInt(req.body.data.money); // ข้อมูลเงินสะสมหลังจาก + ครั้งล่าสุด

        const room = await SavingRooms.find({
          room_id: beforeData[0].room_id,
        });
        var all_price = Math.ceil(room[0].price); // ข้อมูลราคาทอง
        var mem_room = parseInt(room[0].member); // ข้อมูลสะมาชิกสูงสุด สมาชิกในห้อง

        if (all_price <= total_saving) {
          //ถ้าราคาทอง น้อยกว่าหรือเท่ากับ ยอดโอนสะสม (ออมครบ)
          const filter = { _id: beforeData[0]._id };
          const update = {
            finish_date: new Date(),
            total_savings: total_saving,
            status: "finished",
            total_installment: parseInt(beforeData[0].total_installment) + 1,
          };

          if (parseInt(beforeData[0].total_installment) === 0) {
            //งวดแรก
            const old_point = await User.find({
              user_id: beforeData[0].owner,
            });
            const filter = { user_id: beforeData[0].owner };
            const update = {
              point: parseInt(old_point[0].point) + point,
            };
            await User.findOneAndUpdate(filter, update);
          }

          let doc = await JoinRooms.findOneAndUpdate(filter, update);
          const total = await JoinRooms.find({
            status: { $ne: "saving" },
            room_id: req.body.data.room_id,
          });
          // อัพเดท ข้อมูลห้อง เช็คว่า คนออมเสร็จกี่คน+คนยกเลิกกี่คน  ถ้าเท่ากับ จำนวนสมาชิกตอนสร้างห้องแล้ว สถานะห้องจะเปลี่ยนเป็น finished
          if (total.length >= mem_room) {
            const filter = { room_id: req.body.data.room_id };
            const update = {
              status: "finished",
            };
            await SavingRooms.findOneAndUpdate(filter, update);
          }
          res.status(200).json({ success: true, data: doc });
        } else {
          //(ออมไม่ครบ)
          const filter = { _id: beforeData[0]._id };
          const update = {
            total_savings: total_saving,
            total_installment: parseInt(beforeData[0].total_installment) + 1,
          };
          let doc = await JoinRooms.findOneAndUpdate(filter, update);
          if (parseInt(beforeData[0].total_installment) === 0) {
            //งวดแรก
            const old_point = await User.find({
              user_id: beforeData[0].owner,
            });
            const filter = { user_id: beforeData[0].owner };
            const update = {
              point: parseInt(old_point[0].point) + point,
            };
            await User.findOneAndUpdate(filter, update);
          }
          res.status(200).json({ success: true, data: doc });
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
