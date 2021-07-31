import Cookies from "cookies";
export default async (req, res) => {
  const cookies = new Cookies(req, res);
  cookies.set("user");
  res.json({ isLoggedIn: false });
};
