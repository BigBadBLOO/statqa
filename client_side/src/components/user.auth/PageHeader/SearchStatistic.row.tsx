//core
import React from "react";

import workWithServer from "@core/workWithServer";

interface ISearchStatisticRow {
  statistic: Statistic
}

const SearchStatisticRow: React.FC<ISearchStatisticRow> = ({statistic}) => {
  let url = ''
  if (statistic.avatar) {
    if (typeof statistic.avatar === 'object') url = URL.createObjectURL(statistic.avatar)
    else url = workWithServer.getStatisticAvatar(statistic.avatar)
  }
  const firstSymbol = statistic && statistic.name[0]
  return (
    <div className="flex my-2 cursor-pointer">
      {
        url
          ? <img className="h-8 rounded-md" src={url} alt={`${firstSymbol}`}/>
          : <div className="w-8 h-8 bg-myGray rounded-md flex">
            <p className="m-auto text-gray-500 font-bold text-2xl">{firstSymbol}</p>
          </div>
      }
      <p className="truncate ml-2 my-auto">{statistic.name}</p>
    </div>
  )
}

export default SearchStatisticRow