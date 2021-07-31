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
  axios({
    method: "get",
    url: "http://www.thsms.com/api/rest",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers":
        "X-Requested-With,content-type,Authorization",
      "Access-Control-Allow-Credentials": true,
    },
    params: {
      method: "send",
      username: "tectony",
      password: "&1Va64vBHq5F99AJ",
      from: "VIP",
      to: req.body.data.phone,
      message: req.body.data.messages,
    },
  }).then(
    (response) => {},
    (error) => {}
  );
  res.json({ message: "success" });
}
