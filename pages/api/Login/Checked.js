// import { withIronSession } from "next-iron-session";
// import User from "../../../models/User";
// dbConnect();
// export default withIronSession(
//   async (req, res) => {
//     if (req.method === "POST") {
//       const { username, password } = req.body;
//       const user_data = await User.find({ user_id: username });
//       console.log(user_data[0].user_id);
//       if (user_data[0].user_id == undefined) {
//         return res.status(201).json({
//           status: "username not found",
//         });
//       } else {
//         if (user_data[0].password !== password) {
//           return res.status(202).json({
//             status: "password not correct",
//           });
//         } else {
//           if (user_data[0].role !== "admin") {
//             return res.status(203).json({
//               status: "not admin",
//             });
//           } else {
//             req.session.set("user", { user_data });
//             await req.session.save();
//             return res.status(200).json({
//               status: "login success",
//             });
//           }
//         }
//       }
//       req.session.set("user", { username });
//       await req.session.save();
//       return res.status(200).json({
//         status: "login success",
//       });
//     }
//   },
//   {
//     cookieName: "MYSITECOOKIE",
//     cookieOptions: {
//       secure: process.env.NODE_ENV === "production" ? true : false,
//     },
//     password: process.env.SECRET_COOKIE_PASSWORD,
//   }
// );

import { withIronSession } from "next-iron-session";

async function handler(req, res) {
  // if (req.method === "POST") {
  //   const { username, password } = req.body;

  //   req.session.set("user", { username });
  //   await req.session.save();
  //   return res.status(200).json({
  //     status: "login success",
  //   });
  // }
  req.session.set("user", {
    id: 230,
    admin: true,
  });
  await req.session.save();
  res.send("Logged in");
}

export default withIronSession(handler, {
  cookieName: "MYSITECOOKIE",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
  password: process.env.SECRET_COOKIE_PASSWORD,
});
