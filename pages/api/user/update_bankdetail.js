import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        // console.log(req.body.data);
        const filter = { user_id: req.body.data.user_id };
        const update = {
          bank_name: req.body.data.bank_name,
          bank_number: req.body.data.bank_number,
          bank_account: req.body.data.bank_account,
        };
        // console.log(update);
        let user = await User.findOneAndUpdate(filter, update);
        // console.log(user);
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
