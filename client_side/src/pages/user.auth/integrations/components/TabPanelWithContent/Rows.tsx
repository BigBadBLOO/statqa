import React, {useState} from "react";
import clsx from "clsx";
import Moment from "react-moment";
import CheckBox from "@components/Base/CheckBox";
import workWithServer from "@core/workWithServer";
import {useAppDispatch} from "@/store/hooks";
import {addAlert} from "@/store/features/alertSlice";

interface IIntegrationUserRow {
    row: any
    accountConnection: { [key: number]: boolean }
}

export const IntegrationUserRow: React.FC<IIntegrationUserRow> = ({row, accountConnection}) => {
    return <>
        <span className="my-auto ml-1 truncate">{row.original.name}</span>
        <div className="ml-auto flex">
            <span className="mr-1 my-auto hidden sm:block">Обновлен: </span>
            <Moment
                className="my-auto mr-2 w-28"
                format="D MMM YYYY"
                locale="ru"
            >
                {row.original.token_date_update}
            </Moment>

            <span
                className={clsx('mr-1 h-4 w-4 rounded-full my-auto', {
                    'animate-pulse': typeof accountConnection[row.original.id] === 'undefined'
                })}
                style={{
                    background: accountConnection[row.original.id]
                        ? '#8BA63A'
                        : '#CC5C81'
                }}
            />
        </div>
    </>
}

interface IIntegrationCabinetRow {
    row: any
}

export const IntegrationCabinetRow: React.FC<IIntegrationCabinetRow> = ({row}) => {
    const [factor, setFactor] = useState(row.original.factor)
    const [checked, setChecked] = useState(row.original.access_get_statistic)
    const dispatch = useAppDispatch()
    return <div className="flex w-full overflow-auto">
                                    <span className="truncate ">
                                        {row.original.name} x
                                    </span>
        <input
            value={factor}
            className="px-1 mx-2 w-10 border rounded outline-none whitespace-nowrap"
            onKeyPress={(e) => {
                const x = e.charCode || e.keyCode;
                if (isNaN(Number(String.fromCharCode(e.which))) &&
                    x != 46 || x === 32 || x === 13 || (x === 46 && e.target.value.includes('.'))) {
                    e.preventDefault();
                }
            }}
            onChange={(e) => {
                const value = e.target.value
                const split = value.split('.')
                if (Number(split[0]) <= 100 && !(split.length === 2 && Number(split[1]) >= 100)) {
                    setFactor(Number(value))
                }
            }}
            onBlur={(e) => {
                const value = e.target.value;
                workWithServer.setCabinetInfo({
                    cabinet_id: row.original.id,
                    factor: Number(value),
                    access_get_statistic: checked
                }).then((data: IIntegrationCabinet) => {
                    setFactor(data.factor)
                }).catch(() => {
                    dispatch(addAlert({
                        type: 'error',
                        message: 'Отсутствует соединение с сервером'
                    }))
                })
            }}
        />
        <CheckBox
            className="ml-auto my-auto mr-2"
            checked={checked}
            onChange={(e) => {
                const check = e.target.checked
                workWithServer.setCabinetInfo({
                    cabinet_id: row.original.id,
                    factor: factor,
                    access_get_statistic: check
                }).then((data: IIntegrationCabinet) => {
                    setChecked(data.access_get_statistic)
                }).catch(() => {
                    setChecked(!check)
                    dispatch(addAlert({
                        type: 'error',
                        message: 'Отсутствует соединение с сервером'
                    }))
                })
            }}
        />
        <span className="hidden sm:block my-auto">Получать статистику?</span>
    </div>
}
