import dbConnect from "../../utils/dbConnect";
import Register from "../../models/Register";
import Bill from "../../models/Bill";
import Withdraw from "../../models/Withdraw";
import Cancel from "../../models/Cancel";
import SavingRooms from "../../models/SavingRooms";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const register = await Register.find({ status: "pending" });
        const bill = await Bill.find({ status: "pending" });
        const withdraw = await Withdraw.find({ status: "pending" });
        const cancel = await Cancel.find({ status: "pending" });
        const savingrooms = await SavingRooms.find({ status: "pending" });
        const data_return = {
          Register_: await register.length,
          Bill_: await bill.length,
          Withdraw_: await withdraw.length,
          Cancel_: await cancel.length,
          SavingRooms_: await savingrooms.length,
        };
        res.status(200).json({ success: true, data: data_return });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
