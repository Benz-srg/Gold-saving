import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        // console.log(req.body);
        const filter = { user_id: req.body.user_id };
        const update = { password: "", status: "nopass" };
        let user = await User.findOneAndUpdate(filter, update);
        res.status(200).json(user);
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
