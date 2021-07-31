import Cookies from "cookies";
export default async (req, res) => {
  const cookies = new Cookies(req, res);
  cookies.set("myCookieName", "login", {
    httpOnly: true, // true by default
  });
  res.status(200).json({ status: "Login => connected " });
};

// import Cookies from 'cookies'
// Homepage.getInitialProps = ({ req, res }) => {

//     const cookies = new Cookies(req, res)
//     cookies.set('myCookieName', 'some-value', {
//         httpOnly: true // true by default
//     })
// }
