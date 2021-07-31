import dbConnect from "../../../utils/dbConnect";
import Register from "../../../models/Register";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        Register.findByIdAndUpdate(
          req.body.data.id,
          { status: "declined" },
          function (err, result) {
            if (err) {
              res.status(201).json({ success: true, data: err });
            } else {
              res.status(200).json({ success: true, data: result });
            }
          }
        );
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        const register = await Register.find({ status: "pending" });
        console.log(register);
        res.status(200).json({ success: true, data: register });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
