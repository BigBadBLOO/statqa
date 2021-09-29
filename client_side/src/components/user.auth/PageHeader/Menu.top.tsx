//core
import React from "react";

import UserAvatar from "@components/user.auth/PageHeader/User.avatar";


const MenuTop: React.FC = () => {

  return (
    <>
      <div className="fixed left-0 top-0 w-full p-2 h-12 border-b z-10 align-middle bg-white flex">
        <UserAvatar/>
      </div>
    </>
  )
}

export default MenuTop