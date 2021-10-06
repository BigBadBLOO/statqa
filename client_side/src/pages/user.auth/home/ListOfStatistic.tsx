import React, {useEffect} from "react";
import {Button} from "@components/Base/Button";
import clsx from "clsx";
import {useHistory} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import workWithServer from "@core/workWithServer";
import {setIntegrationUsers} from "@/store/features/integrationAppSlice";

interface IListOfStatistic {
    statistics: Statistic[]
}

const ListOfStatistic: React.FC<IListOfStatistic> = ({statistics}) => {

    return <>
        {
        statistics.map(el => <p>{el.name}</p>)
        }
        </>
}

export default ListOfStatistic