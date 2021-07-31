import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
dbConnect();
export default async (req, res) => {
  if (req.method === "POST") {
    const { id } = req.body;
    const user_data = await User.find({
      _id: id,
      role: { $in: ["admin", "emp", "super_admin", "mgr"] }, 
    });
    if (user_data.length == 0) {
      return res.status(201).json({ success: true });
    } else {
      return res
        .status(200)
        .json({ success: true, data: user_data[0].user_id });
    }
  }
};
