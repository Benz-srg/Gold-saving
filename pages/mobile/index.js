import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
  isMobile,
} from "react-device-detect";
import Swal from "sweetalert2";
const Page = () => {
  const router = useRouter();

  try {
    useEffect(async () => {
      await liff.init({ liffId: `1656271362-Q0yZk2JK` }).catch((err) => {
        throw err;
      });
      if (liff.isLoggedIn()) {
        let getProfile = await liff.getProfile(); //ดึงข้อมูลโปรไฟล์ผู้ใช้
        const id = await getProfile.userId; //ดึงข้อมูล id
        if (isMobile) {
          await localStorage.setItem("auth", id); //เก็บไว้ใน localstorage  ชื่อว่า auth
          await axios({
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            url: "/api/index_mobile",
            data: JSON.stringify({ id }),
          }).then(
            (response) => {
              if (response.status === 200) {
                return router.push("/mobile/login"); //เข้าไปหน้า login mobile
              }
              if (response.status === 203) {
                return router.push("/mobile/confirm_password"); //เข้าไปหน้า ยืนยันรหัสผ่าน
              }
              if (response.status === 201) {
                return router.push("/mobile/wait"); //เข้าไปหน้า รอการตรวจสอบ
              }
              if (response.status === 202) {
                return router.push("/mobile/register"); //เข้าไปหน้า สมัคร
              }
            },
            (error) => {
              console.log(error);
            }
          );
          // return <></>;
        } else {
          await localStorage.setItem("auth_backend", id);
          const user_id = id;
          await axios({
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            url: "/api/login_admin",
            data: JSON.stringify({ user_id }),
          }).then(
            (response) => {
              if (response.status === 200) {
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
                  user_id: response.data.data,
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
              }
              if (response.status === 201) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "ไม่พบบัญชีผู้ใช้!",
                });
              }
            },
            (error) => {
              console.log(error);
            }
          );
        }
      } else {
        liff.login();
      }
    }, []);
  } catch (error) {}

  return <div></div>;
};
export default Page;
