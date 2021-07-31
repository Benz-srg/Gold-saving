import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const BottomMenu = () => {
  const router = useRouter();
  const [value, setValue] = React.useState("recents");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onChangePage = (e) => {
    console.log(e.target.outerText);
    if (e.target.outerText == "หน้าหลัก") {
      return router.push("/mobile/main");
    }
    if (e.target.outerText == "ฝาก") {
      return router.push("/mobile/upload_bill");
    }
    if (e.target.outerText == "ถอน") {
      return router.push("/mobile/withdraw");
    }
    if (e.target.outerText == "โปรไฟล์") {
      return router.push("/mobile/profile");
    }
  };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };
  // const router = useRouter();
  // const OnLogout = async (e) => {
  //   e.preventDefault();
  //   axios({
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     url: "/api/logout",
  //   }).then(
  //     (response) => {
  //       return router.push("/browser/login");
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // };
  // const OnClickMenu = async (e) => {
  //   const menu_name = e;
  //   if (menu_name == "แดชบอร์ด") {
  //     return router.push("/browser/dashboard");
  //   }
  //   if (menu_name == "จัดการห้องออม") {
  //     return router.push("/browser/manageroom");
  //   }
  //   if (menu_name == "จัดการสมาชิก") {
  //     return router.push("/browser/manageremember");
  //   }
  //   if (menu_name == "โปรโมชั่น") {
  //     return router.push("/browser/promotion");
  //   }
  //   if (menu_name == "ตรวจสอบสลิป") {
  //     return router.push("/browser/checkslip");
  //   }
  //   if (menu_name == "ข้อมูลย้อนหลัง") {
  //     return router.push("/browser/history");
  //   }
  // };

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className="container"
      >
        <BottomNavigationAction
          label="หน้าหลัก"
          value="หน้าหลัก"
          icon={<RestoreIcon />}
          onClick={(e) => onChangePage(e)}
        />
        <BottomNavigationAction
          label="ฝาก"
          value="ฝาก"
          icon={<FavoriteIcon />}
          onClick={(e) => onChangePage(e)}
        />
        <BottomNavigationAction
          label="ถอน"
          value="ถอน"
          icon={<LocationOnIcon />}
          onClick={(e) => onChangePage(e)}
        />
        <BottomNavigationAction
          label="โปรไฟล์"
          value="โปรไฟล์"
          icon={<FolderIcon />}
          onClick={(e) => onChangePage(e)}
        />
      </BottomNavigation>
    </>
  );
};
export default BottomMenu;
