//core
import React from "react";

//components
import SearchStatistic from "@components/user.auth/PageHeader/SearchStatistic";
import UserAvatar from "@components/user.auth/PageHeader/User.avatar";

//redux
import {useAppSelector} from "@/store/hooks";
import Notifications from "@components/user.auth/PageHeader/Notification";
import AccountBalance from "@components/user.auth/PageHeader/AccountBalance";


const MenuTop: React.FC = () => {
  return (
    <>
      <div className="fixed left-0 top-0 w-full p-2 pl-24 md:pl-40 h-12 border-b z-10 align-middle bg-white flex ">
        <SearchStatistic/>
        <div className="ml-auto flex md:divide-x">
          <AccountBalance className="hidden md:flex mr-4"/>
          <div className="flex">
            <Notifications/>
            <UserAvatar/>
          </div>
        </div>

      </div>
    </>
  )
}

export default MenuTop