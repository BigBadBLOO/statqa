import React, {useEffect} from "react";
import {Button} from "@components/Base/Button";
import clsx from "clsx";
import {useHistory} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import workWithServer from "@core/workWithServer";
import {setIntegrationUsers} from "@/store/features/integrationAppSlice";

interface IOneStatistic {
  statistic: Statistic,
}

const OneStatistic: React.FC<IOneStatistic> = ({statistic}) => {
  let history = useHistory();

  const user = useAppSelector(state => state.user.currentUser)
  const has_access: boolean = statistic.user.id === user.id
  const selected = false

  let url = ''
  if (statistic.avatar) {
    url = workWithServer.getStatisticAvatar(statistic.avatar)
  }
  const tagsCampaign = statistic.campaigns
    ? statistic.campaigns
      .map(campaign => {
        switch (campaign.type) {
          case 'Facebook':
            return 'фб'
          case 'ВКонтакте':
            return 'вк'
          default:
            return 'другое'
        }
      })
      .filter((v, i, a) => a.indexOf(v) === i)
    : null
  const tagsList = statistic.tags.split(',')

  return <div className="self-start bg-white rounded-xl p-4 border shadow-md w-full relative">
    {
      has_access && !selected && <div className="h-6 w-6 absolute rounded-full border right-2 top-2" style={{
        background: '#F7F7FA'
      }}/>
    }
    {
      url
        ? <img className="rounded-md border" src={url} alt="Нет изображения"/>
        : <div
          className="w-full h-36 rounded-xl flex p-4 text-2xl"
          style={{
            background: '#E6E6EB'
          }}
        >
          <p className="m-auto truncate">{statistic.name}</p>
        </div>
    }
    <p className="mt-2 font-bold text-xl truncate">{statistic.name}</p>
    <p className="mt-2">{statistic.description}</p>
    <div className="flex flex-wrap">
      {
        tagsCampaign && tagsCampaign.map(tag => (
          <span
            key={tag}
            className="px-2 mr-2 mt-2 rounded text-white "
            style={{background: tag === 'фб' ? '#1877F2' : tag === 'вк' ? '#5181B8' : '#000000'}}
          >{tag}</span>
        ))
      }
      {
        tagsList && tagsList.map(tag => <p key={tag} className="px-2 mr-2 mt-2 rounded"
                                           style={{background: '#E6E6EB'}}>{tag}</p>)
      }
    </div>
    <div className="grid grid-cols-5 mt-4">
      <div className="col-span-3 relative h-10">
        {
          statistic.accessForUsers && statistic.accessForUsers.map((el, idx) => {
            let user_avatar = ''
            if (el.user.avatar) {
              user_avatar = workWithServer.getUserAvatar(el.user.avatar)
            }
            return <div className="absolute" style={{
              zIndex: (statistic.accessForUsers.length - idx),
              transform: `translateX(${idx*20}px)`
            }}>
              {
                user_avatar
                  ? <img className="w-8 h-8 rounded-full" src={user_avatar}/>
                  : <div className="w-8 h-8 rounded-full flex" style={{background: '#E6E6EB'}}>
                    <p className="m-auto text-myGray">{el.user.username[0]}</p>
                  </div>
              }
            </div>
          })
        }
      </div>
      {
        has_access && <p
            className="my-auto text-right col-span-2 cursor-pointer"
            style={{color: '#B4B4BF'}}
            onClick={() => {
              history.push(`editStatistic/${statistic.id}`)
            }}
        >Редактировать</p>
      }
    </div>
  </div>
}

export default OneStatistic