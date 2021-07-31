import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import axios from "axios";
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"],
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  if (req.method === "POST") {
    var id = req.body.id;
    const response = await axios.get(
      "https://api.line.me/v2/bot/profile/" + id,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "Pzv3pT5c+zG/s5kYSt7PrjDGKIRjDMTExR/VsehuS8fyarMAP+24knjEQjkrHRCZIhY0Zmof6x6Oj8e/ngIQgCz4mH9EZ0+Q/H8seFu52LvHnWWkDK98nt5yp+Kmyrqzuiw++awRMFxImk8V0brg6QdB04t89/1O/w1cDnyilFU=",
        },
      }
    );
    var data = response.data;
    return res.status(200).json({ data });
  }
}
