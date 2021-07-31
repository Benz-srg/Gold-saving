import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "cookies";
import axios, { post } from "axios";
import {
  isChrome,
  isFirefox,
  isSafari,
  isOpera,
  isIE,
  isEdge,
  isYandex,
  isChromium,
} from "react-device-detect";
const useUser = () => ({ user: null, loading: false });
const IndexPage = ({ loged }) => {
  const router = useRouter();
  const { user, loading } = useUser();
  if (!loged) {
    useEffect(async () => {
      router.push("/browser/login");
    }, []);
    return <p></p>;
  } else {
    useEffect(async () => {
      var id = loged;
      const response = await axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer my-token",
          "My-Custom-Header": "foobar",
        },
        url: "/api/check_log",
        data: JSON.stringify({ id }),
      }).then(
        (response) => {
          // console.log(response);
          var data = {
            response: response.status,
            user_id: response.data.data,
          };
          return data;
        },
        (error) => {}
      );
      console.log(response);
      if (response.response === 200) {
        var browser_name = "";
        if (isChrome) {
          browser_name = "isChrome";
        }
        if (isFirefox) {
          browser_name = "isFirefox";
        }
        if (isSafari) {
          browser_name = "isSafari";
        }
        if (isOpera) {
          browser_name = "isOpera";
        }
        if (isIE) {
          browser_name = "isIE";
        }
        if (isEdge) {
          browser_name = "isEdge";
        }
        if (isYandex) {
          browser_name = "isYandex";
        }
        if (isChromium) {
          browser_name = "isChromium";
        }
        var data = {
          user_id: response.user_id,
          device: "",
          browser_name: browser_name,
        };
        axios({
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer my-token",
            "My-Custom-Header": "foobar",
          },
          url: "/api/login_history",
          data: JSON.stringify({ data: data }),
        }).then(
          (response) => {
            return router.push("/browser/route");
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        axios({
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          url: "/api/logout",
        }).then(
          (response) => {
            return router.push("/browser/login");
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }, []);
    return <p></p>;
  }
};

export const getServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const loged = await cookies.get("user");
  if (loged === undefined) {
    return {
      props: {},
    };
  } else {
    return {
      props: { loged },
    };
  }
};

export default IndexPage;
