//core
import React, {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
import clsx from "clsx";

//components
import Logo from "@components/Base/Logo/Logo";
import {ElementNavbar} from "@pages/platform/components/header/ElementNavbar";

//redux
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import Cookies from "js-cookie";
import {setCurrentUser} from "@/store/features/userSlice";
import workWithServer from "@core/workWithServer";
import {setStatistics} from "@/store/features/statisticSlice";


const SearchStatistic: React.FC = () => {
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState('')
    const statistics = useAppSelector(state => state.statistic.statistics);

    useEffect(() => {
        if(statistics.length === 0){
            workWithServer.getStatistics().then((data: Statistic[]) => {
                dispatch(setStatistics(data))
            })
        }
    }, [])
    const filter_statistic = statistics.filter(el => el.name.indexOf(search) >= 0)
    return (
        <div className="m-auto mr-2 relative">
            <input
                className="border rounded-full outline-none px-2 md:px-4 w-full md:w-64"
                placeholder="Поиск статистик..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
            />
            <div className="absolute w-full md:w-64 bg-white top-8 shadow-lg rounded border p-2">
                {
                    filter_statistic.map(el => <div>{el.name}</div>)
                }
            </div>
        </div>
    )
}

export default SearchStatistic