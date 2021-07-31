import Cookies from "cookies";
export default async (req, res) => {
  if (req.method === "get") {
    const cookies = new Cookies(req, res);
    const logged = await cookies.get("user");
    console.log(logged);
    return res.status(200).json({
      status: logged,
    });
  }
};
