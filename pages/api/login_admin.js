import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
dbConnect();
import Cookies from "cookies";
export default async (req, res) => {
  if (req.method === "POST") {
    const cookies = new Cookies(req, res);
    const { user_id } = req.body;
    const user_data = await User.find({
      user_id: user_id,
      role: { $in: ["admin", "emp"] },
    });
    if (user_data.length == 0) {
      return res.status(201).json({
        status: "username not found",
      });
    } else {
      cookies.set("user", user_data[0]._id, {
        httpOnly: true, // true by default
      });
      return res.status(200).json({
        data: user_data[0].user_id,
      });
    }
  }
};
