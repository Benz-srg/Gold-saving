import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        // console.log(req.body.data.password);

        let user = await User.find({
          user_id: req.body.data.user_id,
        }).exec();

        res.status(200).json({ success: true, data: user });
        break;
      } catch (error) {
        res.status(400).json({ success: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
