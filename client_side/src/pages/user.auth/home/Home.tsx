import React, {useState} from "react";
import {Button} from "@components/Base/Button";
import GroupOfBlockAdd from "@pages/user.auth/home/BlockAdd";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import ListOfStatistic from "@pages/user.auth/home/ListOfStatistic";
import workWithServer from "@core/workWithServer";
import {addAlert} from "@/store/features/alertSlice";
import Select from "react-select";

export default function Home() {

  const [filter, setFilter] = useState('')

  const statistics = useAppSelector((state) => state.statistic.statistics);
  const selectedStatistic = useAppSelector((state) => state.pageStatistic.selectedStatistic);
  const dispatch = useAppDispatch();
  const filteredStatistic = statistics.filter(statistic => {
    if (filter === '') return true
    if (filter === 'active') return true
    if (filter === 'archive') return true
    return true
  })

  const options = [
    {label: 'Все встатистики', value: ''},
    {label: 'Только мои', value: 'own'},
    {label: 'Доступные мне', value: 'accessible'},
    {label: 'Архивные', value: 'archive'}
  ]
  return (
    <>
      <div className="flex divide-x-2">
        <p className="font-bold text-xl my-auto mr-2">Статистики</p>
        <div className="flex">
          {
            statistics.length === 0
              ? <Button
              type="secondary"
              disabled={true}
              text="Фильтр"
              icon="filter_alt"
              className="ml-2"
              classNameText="sm:block"
            />
              : <div>1</div>
          }

          {/*<Button*/}
          {/*  type="secondary"*/}
          {/*  disabled={selectedStatistic.length === 0}*/}
          {/*  text="Архивировать"*/}
          {/*  icon="filter_alt"*/}
          {/*  className="ml-2"*/}
          {/*  classNameText="sm:block"*/}
          {/*  onClick={() => {*/}
          {/*    workWithServer*/}
          {/*      .workWithStatisticsArchive(selectedStatistic.reduce((acc, value) => {*/}
          {/*        const id: string = String(value)*/}
          {/*        const data: { [key: string]: boolean } = acc*/}
          {/*        data[id] = true*/}
          {/*        return data*/}
          {/*      }, {}))*/}
          {/*      .then((data: Message) => dispatch(addAlert(data)))*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<Button*/}
          {/*  type="secondary"*/}
          {/*  disabled={selectedStatistic.length === 0}*/}
          {/*  text="Удалить"*/}
          {/*  icon="filter_alt"*/}
          {/*  className="ml-2"*/}
          {/*  classNameText="sm:block"*/}
          {/*  onClick={() => {*/}
          {/*    workWithServer*/}
          {/*      .deleteStatistics(selectedStatistic)*/}
          {/*      .then((data: Message) => dispatch(addAlert(data)))*/}
          {/*  }}*/}
          {/*/>*/}
        </div>
      </div>
      {
        filteredStatistic.length === 0
          ? <GroupOfBlockAdd/>
          : <ListOfStatistic statistics={filteredStatistic}/>
      }

    </>
  )
}