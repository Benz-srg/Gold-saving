import dbConnect from "../../../utils/dbConnect";
import Bill from "../../../models/Bill";
import User from "../../../models/User";
dbConnect();

async function myFunction(item) {
  var DATA = [];
  for (let index = 0; index < item.length; index++) {
    const element = item[index];

    const user = await User.findOne({
      user_id: element.user_id,
    });
    var row = {
      bill: element,
      user: user,
    };
    DATA.push(row);
  }
  return DATA;
}
export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const bill = await Bill.find({
          room_id: req.body.data.room_id,
        }).sort([["upload_date", "desc"]]);

        if (bill.length != 0) {
          var data = await myFunction(bill);
        } else {
        }
        // console.log(await Data);
        res.status(200).json({ success: true, data: data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
