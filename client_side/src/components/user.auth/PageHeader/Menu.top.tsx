//core
import React from "react";

//components
import SearchStatistic from "@components/user.auth/PageHeader/SearchStatistic";
import UserAvatar from "@components/user.auth/PageHeader/User.avatar";

//redux
import {useAppSelector} from "@/store/hooks";


const MenuTop: React.FC = () => {
  const user = useAppSelector(state => state.user.currentUser)
  const date_tariff_end = user.date_tariff_end ? new Date(user.date_tariff_end) : null
  const delta = date_tariff_end ? date_tariff_end.getDate() - (new Date()).getDate() : 0
  const day = delta === 1 ? 'день' : delta > 2 && delta < 4 ? 'дня' : 'дней'
  return (
    <>
      <div className="fixed left-0 top-0 w-full p-2 pl-24 md:pl-40 h-12 border-b z-10 align-middle bg-white flex ">
        <SearchStatistic/>
        <div className="ml-auto flex divide-x">
          <i className="material-icons text-myGray my-auto mr-4">account_balance_wallet</i>
          {
            user.tariff === 'PAID' && user.date_tariff_end
              ? <p className="cursor-pointer font-bold my-auto mr-2 px-4 rounded" style={{
                background: delta > 3 ? '#F7FAED' : '#FFF2F6',
                color: delta > 3 ? '#8BA63A' : '#CC5C81',
              }}
              >{delta} {day}</p>
              : <i className="cursor-pointer material-icons my-auto mr-2 px-4 rounded" style={{
                background: '#F7FAED',
                color: 'green',
              }}
              >all_inclusive</i>
          }
          <UserAvatar/>
        </div>

      </div>
    </>
  )
}

export default MenuTop