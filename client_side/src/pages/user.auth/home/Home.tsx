import React from "react";
import {Button} from "@components/Base/Button";
import GroupOfBlockAdd from "@pages/user.auth/home/BlockAdd";
import {useAppSelector} from "@/store/hooks";
import ListOfStatistic from "@pages/user.auth/home/ListOfStatistic";

//#TODO button filter
export default function Home() {

  const statistics = useAppSelector((state) => state.statistic.statistics);


  return (
    <>
      <div className="flex divide-x-2">
        <p className="font-bold text-xl my-auto mr-2">Статистики</p>
        <div>
          <Button
            type="secondary"
            disabled={true}
            text="Фильтр"
            icon="filter_alt"
            className="ml-2"
            classNameText="sm:block"
            onClick={() => {}}
          />
        </div>
      </div>
      {
        statistics.length === 0
          ? <GroupOfBlockAdd/>
          : <ListOfStatistic statistics={statistics}/>
      }

    </>
  )
}