import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.find({ user_id: "admin" });
        // const users = await User.find({ user_id: "admin" });
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        let item = {
          user_id: req.body.user_id,
          password: req.body.password,
          type: req.body.type,
        };
        await User.create(item);
        res.status(200).json(item);
        break;

        // res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
