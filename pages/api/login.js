import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
dbConnect();
import Cookies from "cookies";
export default async (req, res) => {
  if (req.method === "POST") {
    const cookies = new Cookies(req, res);
    const { username, password } = req.body;
    const user_data = await User.find({ user_id: username });
    if (user_data.length == 0) {
      return res.status(201).json({
        status: "username not found",
      });
    } else {
      if (user_data[0].password !== password) {
        return res.status(202).json({
          status: "password not correct",
        });
      } else {
        // if (user_data[0].role !== "super_admin") {
        //   return res.status(203).json({
        //     status: "not admin",
        //   });
        // } else {
          cookies.set("user", user_data[0]._id, {
            httpOnly: true, // true by default
          });
          return res.status(200).json({
            data: user_data[0].user_id,
          });
        }
      }
    }
  };
