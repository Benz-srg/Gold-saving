import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/register";
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ fields, files }, null, 2));
  });
  return;
};
