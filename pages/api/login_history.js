import dbConnect from "../../utils/dbConnect";
import hisLogin from "../../models/history/hisLogin";
dbConnect();

export default async (req, res) => {
  if (req.method === "POST") {
    // console.log(req.body.data);
    var item = {
      user_id: req.body.data.user_id,
      device: req.body.data.device,
      browser_name: req.body.data.browser_name,
      datetime: new Date(),
    };
    const hislogin = await hisLogin.create(item);
    res.status(200).json({ success: true, data: hislogin });
  }
};
