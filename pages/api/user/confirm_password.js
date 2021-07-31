import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import { ContactSupportOutlined } from "@material-ui/icons";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const filter = { user_id: req.body.data.user_id };
        const update = { password: req.body.data.password, status: "ready" };
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
