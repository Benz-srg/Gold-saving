import dbConnect from "../../../utils/dbConnect";
import Register from "../../../models/Register";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        Register.findByIdAndDelete(req.body.data.id, function (err) {
          if (err) console.log(err);
          console.log("Successful deletion");
        });
        res.status(200).json({ success: true, data: "Successful deletion" });
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
