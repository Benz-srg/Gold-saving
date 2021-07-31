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
          user_line_id: req.body.data.user_id,
          password: req.body.data.password,
        }).exec();
        if (user[0] == undefined) {
          res.status(201).json("not found");
        } else {
          if (user[0].status === "nopass") {
            res.status(201).json("not found");
          } else {
            res.status(200).json(user);
          }
        }
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
