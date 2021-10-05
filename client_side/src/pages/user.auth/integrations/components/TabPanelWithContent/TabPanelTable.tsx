//core
import React, {useEffect, useMemo, useState} from "react";
import {useExpanded, useRowSelect, useTable} from "react-table";
import clsx from "clsx";
import {CSSTransition, TransitionGroup} from "react-transition-group";

//components
import CheckBox from "@components/Base/CheckBox";

//styles
import './tabPanelTable.css'

//redux
import {useAppDispatch} from "@/store/hooks";
import {setSelectedRows} from "@/store/features/integrationPageSlice";
import workWithServer from "@core/workWithServer";

import {
    IntegrationCabinetRow,
    IntegrationUserRow
} from "@pages/user.auth/integrations/components/TabPanelWithContent/Rows";

interface ITabPanelTable {
    data: IIntegrationUser[]
}

const TabPanelTable: React.FC<ITabPanelTable> = ({data}) => {
    const [accountConnection, setAccountConnection]: [{ [key: number]: boolean }, (arg0: object) => void] = useState({});
    const dispatch = useAppDispatch();
    //for test status account
    useEffect(() => {
        workWithServer.getStatusAccounts(data.map(el => el.id))
            .then(res => {
                setAccountConnection(res)
            })

    }, [])


    const [expandedRows, setExpandedRow] = useState({})
    const [selectedRowsInit, setSelectedRowsInit] = useState([])
    const columns = useMemo(() => [{Header: 'Column 1', accessor: 'id'}], [])

    const {
        selectedFlatRows,
        rows,
        prepareRow,
        state: {selectedRowIds, expanded},
    }: any = useTable({
        columns,
        data,
        getSubRows: (row: any) => {
            return row.cabinets || []
        },
        initialState: {
            expanded: expandedRows,
            selectedRowIds: selectedRowsInit
        }
    }, useExpanded, useRowSelect)

    useEffect(() => {
        // setSelectedRows(selectedFlatRows)
        setSelectedRowsInit(selectedRowIds)
    }, [selectedRowIds])

    useEffect(() => {
        setExpandedRow(expanded)
    }, [expanded])

    useEffect(() => {
        const result = selectedFlatRows.map((el: any) => {
            const type = el.depth === 0 ? 'user' : 'cabinet';
            const id = el.original ? el.original.id : -1;
            return {
                type,
                id
            }
        })
        dispatch(setSelectedRows(result))
    }, [selectedFlatRows])

    if (data.length === 0) return <p className="text-center">У Вас нет интегрируемых аккаунтов</p>

    return <TransitionGroup className="rounded bg-white p-4 divide-y relative overflow-y-auto" style={{height: '63vh'}}>
        {
            rows.map((row: any) => {
                prepareRow(row)
                return (
                    <CSSTransition key={row.id} timeout={100} classNames="fade">
                        <div className="flex py-2">
                            <div className="w-8 flex">
                                {
                                    row.canExpand
                                        ? (
                                            <span
                                                className={clsx("material-icons ml-2 transition duration-500 ease-in-out", {'transform rotate-180 ': row.isExpanded})}
                                                {...row.getToggleRowExpandedProps()}
                                            >
                                                expand_more
                                            </span>
                                        ) : null
                                }
                            </div>
                            <CheckBox
                                className={clsx("m-1", {"ml-6": row.original.hasOwnProperty('access_get_statistic')})}
                                type="indeterminate" {...row.getToggleRowSelectedProps()}
                            />
                            {
                                row.original.hasOwnProperty('token') &&
                                <IntegrationUserRow row={row} accountConnection={accountConnection}/>
                            }
                            {
                                row.original.hasOwnProperty('access_get_statistic') &&
                                <IntegrationCabinetRow row={row}/>
                            }
                        </div>
                    </CSSTransition>
                )
            })
        }
    </TransitionGroup>
}

export default TabPanelTable