import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";
dbConnect();
const line = require("@line/bot-sdk");
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);
export default async function handler(req, res) {
  await cors(req, res);
  const users = await User.find({
    role: { $in: ["admin", "super_admin", "emp"] },
  });

  for (let index = 0; index < users.length; index++) {
    const element = users[index];
    const client = new line.Client({
      channelAccessToken:
        "lhO9PilhDwcnBoB65Ut20PDPrp97VTg8oFH7YseRCEnfTP0qotUXU++VfTHeNquQbexiFMy3LTs4IKgQdDE/BbQRKRve9t+l+s4/SkinIU9x99+BKnVaG82ZTQ7Z1QNVgSiVRUfg7D+4enkbgGkg/wdB04t89/1O/w1cDnyilFU=",
    });
    const message = {
      type: "text",
      text: req.body.data.message,
    };
    client.pushMessage(element.user_line_id, message).then((res) => {});
  }
  res.json({ message: "success" });
}
