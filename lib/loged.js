import { withIronSession } from "next-iron-session";
export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("user");
    if (!user) {
      res.statusCode = 404;
      res.end();
      return { props: {} };
    }
    return {
      props: { user },
    };
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
    password: process.env.SECRET_COOKIE_PASSWORD,
  }
);
