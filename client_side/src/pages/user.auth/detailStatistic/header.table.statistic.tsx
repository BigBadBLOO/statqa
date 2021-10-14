//core
import React from "react";
import clsx from "clsx";

//components

//functions
import {to_datetime_format} from "@core/workWithDate";


const header_table_statistic = () => {
  return [
    {
      Header: "ID",
      accessor: "id",
      width: 100,
      search: {
        searchField: true,
      },
      Cell: ({row}: any) => {
        const expand = row.canExpand ? (
          <span
            className={clsx("material-icons ml-2 transition duration-500 ease-in-out", {'transform rotate-180 ': row.isExpanded})}
            {...row.getToggleRowExpandedProps()}
          >
                    expand_more
                </span>
        ) : null
        return <div className="flex place-items-center">
          <span className="">{row.values.id}</span>
          {expand}
        </div>
      }
    },
    {
      Header: "Выплата",
      accessor: "payment",
    },
    {
      Header: "Дубль",
      accessor: "isDouble",
      Cell: ({row}: any) => {
        return <span
          className="p-1 text-sm my-auto rounded"
          style={{
            background: !row.original.isDouble ? "#F7FAED" : '#FFF2F7',
            color: !row.original.isDouble ? '#8BA63A' : '#CC5C81'
          }}
        >
                    {(row.original.isDouble ? "Да" : "Нет")}
                </span>
      },
      search: {
        // searchField: true,
        defaultValues: {
          'Да': false,
          "Нет": false
        }
      },
    },
    {
      Header: "Время создания",
      accessor: "date_create",
      Cell: ({row}: any) => {
        return <>{to_datetime_format(new Date(row.original.date_create))}</>
      }
    },
    {
      Header: "Оффер",
      accessor: "offer",
      Cell: ({row}: any) => {
        const name = row.original.offer ? row.original.offer.name : row.original.offer_name
        return <>{name}</>
      }
    },
    {
      Header: "Прелендинг",
      accessor: "prelanding",
      Cell: ({row}: any) => {
        const name = row.original.prelanding ? row.original.prelanding.name : row.original.prelanding_name
        return <>{name}</>
      }
    },
    {
      Header: "Лендинг",
      accessor: "landing",
      Cell: ({row}: any) => {
        const name = row.original.landing ? row.original.landing.name : row.original.landing_name
        return <>{name}</>
      }
    },
    {
      Header: "Поток",
      accessor: "flow",
      Cell: ({row}: any) => {
        const name = row.original.flow ? row.original.flow.name : row.original.flow_name
        return <>{name}</>
      }
    },
  ]
}

export default header_table_statistic