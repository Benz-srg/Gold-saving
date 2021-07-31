import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import SavingRooms from "../../../models/SavingRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const all_users = await User.find();
        const mgr_users = await User.find({ role: "mgr" }); //james add this role
        const admin_users = await User.find({ role: "admin" });
        const user_users = await User.find({ role: "user" });
        const emp_users = await User.find({ role: "emp" });
        const sup_users = await User.find({ role: "super_admin" });

        const all_savingrooms = await SavingRooms.find();
        const ready_savingrooms = await SavingRooms.find({ status: "ready" });
        const pending_savingrooms = await SavingRooms.find({
          status: "pending",
        });
        const finish_savingrooms = await SavingRooms.find({
          status: "finished",
        });

        var data = {
          allusers: all_users.length,
          mgr_users: mgr_users.length, //james add this role
          admin_users: admin_users.length,
          user_users: user_users.length,
          emp_users: emp_users.length,
          sup_users: sup_users.length,

          allsavingrooms: all_savingrooms.length,
          ready_savingrooms: ready_savingrooms.length,
          pending_savingrooms: pending_savingrooms.length,
          finish_savingrooms: finish_savingrooms.length,
        };

        res.status(200).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};