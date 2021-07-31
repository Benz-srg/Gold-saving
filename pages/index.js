import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "cookies";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

const useUser = () => ({ user: null, loading: false });
const Page = () => {
  const router = useRouter();
  const { user, loading } = useUser();
  if (isMobile) {
    //  ถ้าเป็น Mobile
    useEffect(() => {
      if (!(user || loading)) {
        router.push("/mobile/");
      }
    }, [user, loading]);
    return <></>;
  } else {
    //  ถ้าเป็น browser
    useEffect(() => {
      if (!(user || loading)) {
        router.push("/browser/");
      }
    }, [user, loading]);
    return <></>;
  }
};
export default Page;
