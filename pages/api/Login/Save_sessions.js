import withSession from "../../../lib/session";

export default withSession(async (req, res) => {
  if (req.method === "POST") {
    const { id } = req.body;
    req.session.set("user", { id });
    await req.session.save();
    return res.status(200).json({
      status: "login success",
    });
  }
});
