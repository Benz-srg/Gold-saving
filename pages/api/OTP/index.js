import dbConnect from "../../../utils/dbConnect";
import OneTimePassword from "../../../models/OneTimePassword";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        let item = {
          otp: req.body.data.otp,
          ref: req.body.data.ref,
          datetime: new Date(),
        };
        // console.log(req.body);
        const onetimepassword = await OneTimePassword.create(item);
        res.status(200).json({ success: true, data: onetimepassword });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "GET":
      try {
        // const onetimepassword = await OneTimePassword.find({
        //   otp: req.body.data.otp,
        //   ref: req.body.data.ref,
        // });
        const onetimepassword = await OneTimePassword.find({
          otp: req.query.otp,
          ref: req.query.ref,
        }).exec();

        if (onetimepassword.length === 0) {
          // console.log(req.query.otp);
          res.status(201).json({ success: true, data: onetimepassword }); //otp ไม่ถูกต้อง
        } else {
          // console.log(req.query.otp);
          res.status(200).json({ success: true, data: onetimepassword }); //otp ถูกต้อง
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
