import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import hisUser from "../../../models/history/hisUser";
dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      var item = {
        user_id: req.body.data.user_line_id,
        password: "",
        role: "user",
        fname: req.body.data.fname,
        lname: req.body.data.lname,
        phonenumber: req.body.data.phonenumber,
        idcard: req.body.data.idcard,
        brithday: req.body.data.brithday,
        address: req.body.data.address,
        province: req.body.data.province,
        district: req.body.data.district,
        canton: req.body.data.canton,
        postal_code: req.body.data.postal_code,
        user_line_id: req.body.data.user_line_id,
        fileUserWithIdCard: req.body.data.fileUserWithIdCard,
        bank_name: "",
        bank_number: "",
        bank_account: "",
        point: "0",
        status: "nopass",
        dateCreate: new Date(),
        createby: req.body.user_id,
      };
      await hisUser.create(item);
      const user = await User.create(item);
      res.status(200).json({ success: true, data: user });

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
