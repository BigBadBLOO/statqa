// core
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";

//components
import {Button} from "@components/Base/Button";
import {ImageUploader, Input} from "@components/Base/Input";
import Row from "@components/Base/Row";
import {Selector} from "@components/Base/Selector";

//redux
import {useAppSelector} from "@/store/hooks";
import Back from "@components/Base/back/Back";
import EditButton from "@pages/user.auth/detailStatistic/EditButton";
import TableStatistic from "@pages/user.auth/detailStatistic/TableStatistic";

export default function DetailStatistic() {
  let {id}: { id: string } = useParams();
  const statistics = useAppSelector(state => state.statistic.statistics)
  const statistic = statistics.find(el => el.id === Number(id))
  if (id && !statistic) return <p className="text-center">Статистики не существует или у Вас нет к ней доступа</p>


  return (
    <>
      <div className="flex">
        <Back/>
        <span className="font-bold text-xl my-auto mr-2">
          Статистика {statistic.name}
        </span>
        <div className="ml-auto">
          <EditButton id={statistic.id}/>
          <i className="material-icons rounded p-1 cursor-pointer" style={{
            color: '#7E7E8C',
            background: '#E6E6EB'
          }}>cached</i>
        </div>
      </div>
      <TableStatistic/>
    </>
  )
}