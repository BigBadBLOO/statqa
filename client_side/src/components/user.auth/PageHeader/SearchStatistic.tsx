//core
import React, {useEffect, useState} from "react";
import workWithServer from "@core/workWithServer";
import SearchStatisticRowList from "@components/user.auth/PageHeader/SearchStatistic.row";

//redux
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setStatistics} from "@/store/features/statisticSlice";


const SearchStatistic: React.FC = () => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState('')
  const [showPanel, setShowPanel] = useState(false)

  const statistics = useAppSelector(state => state.statistic.statistics);

  useEffect(() => {
    if (statistics.length === 0) {
      workWithServer.getStatistics().then((data: Statistic[]) => {
        dispatch(setStatistics(data))
      })
    }
  }, [])

  const filter_statistics: Statistic[] = statistics.filter(statistic => {
    if (statistic.name.indexOf(search) >= 0) {
      return true;
    }
    if (statistic.description.indexOf(search) >= 0) {
      return true;
    }
    if (statistic.campaigns.length > 0 && search === 'фб') {
      const fb_campaign = statistic.campaigns.find(campaign => campaign.type === 'Facebook')
      if (fb_campaign) return true;
    }
    if (statistic.campaigns.length > 0 && search === 'вк') {
      const vk_campaign = statistic.campaigns.find(campaign => campaign.type === 'ВКонтакте')
      if (vk_campaign) return true;
    }
    return statistic.tags.indexOf(search) >= 0;
  })

  const active_statistics = filter_statistics.filter(statistic => !statistic.in_archive)
  const archive_statistics = filter_statistics.filter(statistic => statistic.in_archive)


  return (
    <>
      <div
        className="hidden md:flex m-auto mr-2 relative border rounded-full  w-full md:w-96"
        style={{
          background: '#E6E6EB'
        }}
      >
        <input
          className="mx-4 outline-none w-full bg-transparent z-50"
          placeholder="Название статистики, описание или метка"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          onFocus={() => {
            setShowPanel(true)
          }}
        />
        <i className="material-icons ml-auto mr-2">search</i>
        {
          showPanel && <div
              className="absolute z-50 w-full md:w-full h-64 overflow-y-auto bg-white top-8 shadow-lg rounded border p-2"
          >
            {
              filter_statistics.length === 0 && <p className="text-center">Список пуст</p>
            }
              <SearchStatisticRowList title="Активные статистики" statistics={active_statistics}/>
              <SearchStatisticRowList title="Архивные статистики" statistics={archive_statistics}/>

          </div>
        }
      </div>
      {
        showPanel && <div
            className="absolute h-screen w-screen top-0 left-0 z-40"
            onClick={() => setShowPanel(false)}
        />
      }
    </>
  )
}

export default SearchStatistic