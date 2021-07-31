import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
const line = require("@line/bot-sdk");
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);
export default async function handler(req, res) {
  await cors(req, res);
  const client = new line.Client({
    channelAccessToken:
      "lhO9PilhDwcnBoB65Ut20PDPrp97VTg8oFH7YseRCEnfTP0qotUXU++VfTHeNquQbexiFMy3LTs4IKgQdDE/BbQRKRve9t+l+s4/SkinIU9x99+BKnVaG82ZTQ7Z1QNVgSiVRUfg7D+4enkbgGkg/wdB04t89/1O/w1cDnyilFU=",
  });
  const message = {
    type: "text",
    text: req.body.data.messages,
  };
  client.pushMessage(req.body.data.user_id, message).then((res) => {
    // console.log(res);
  });
  res.json({ message: "success" });
}
