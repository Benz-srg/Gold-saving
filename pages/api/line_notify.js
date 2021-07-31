import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import axios from "axios";
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
dbConnect();
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  if (req.method === "POST") {
    // const users = await User.find({ user_id: req.body.message.user_id });

    // console.log();
    axios({
      method: "post",
      url: "https://notify-api.line.me/api/notify",
      headers: {
        Authorization:
          "Bearer " + "XiSAjpnbJbyA6c8sCFujheLotCbBkGdKxdA4RIr6wQF",
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
      data: 'message="' + req.body.message.message + '"',
    });
  }
}
