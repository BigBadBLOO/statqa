//core
import React from "react";

import workWithServer from "@core/workWithServer";
import {useHistory} from "react-router-dom";

interface ISearchStatisticRow {
    statistic: Statistic
}

const SearchStatisticRow: React.FC<ISearchStatisticRow> = ({statistic}) => {
    const history = useHistory()
    let url = ''
    if (statistic.avatar) {
        if (typeof statistic.avatar === 'object') url = URL.createObjectURL(statistic.avatar)
        else url = workWithServer.getStatisticAvatar(statistic.avatar)
    }
    const firstSymbol = statistic && statistic.name[0]
    return (
        <div
            className="flex my-2 cursor-pointer"
            onClick={() => {
                history.push(`/`)
            }}
        >
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

interface ISearchStatisticRowList {
    title: string
    statistics: Statistic[]
}
const SearchStatisticRowList: React.FC<ISearchStatisticRowList> = ({statistics, title}) => {

    return statistics.length > 0 && <>
        <p>{title}</p>
        {
            statistics.map(statistic => {
                return <SearchStatisticRow key={statistic.id} statistic={statistic}/>
            })
        }
    </>
}

export default SearchStatisticRowList
