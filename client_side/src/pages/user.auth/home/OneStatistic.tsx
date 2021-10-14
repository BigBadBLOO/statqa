import React from "react";
import {useHistory} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import workWithServer from "@core/workWithServer";
import {addSelectedStatistic, removeSelectedStatistic} from "@/store/features/pageStatisticSlice";

interface IOneStatistic {
  statistic: Statistic,
  isSelected: boolean
}

const OneStatistic: React.FC<IOneStatistic> = ({statistic, isSelected}) => {
  let history = useHistory();

  const user = useAppSelector(state => state.user.currentUser)
  const has_access: boolean = statistic.user.id === user.id

  const dispatch = useAppDispatch();

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

  return <div className="bg-white rounded-xl p-4 border shadow-md relative">
    {
      has_access && !isSelected && <div
          className="z-10 h-6 w-6 absolute rounded-full right-2 top-2"
          style={{
            background: '#F7F7FA',
            border: '1px solid rgba(126, 126, 140, 0.2)'
          }}
          onClick={() => {
            dispatch(addSelectedStatistic(statistic.id))
          }}
      />
    }
    {
      has_access && isSelected && <div
          className="z-10 h-6 w-6 absolute flex rounded-full right-2 top-2"
          style={{
            background: '#F7FAED',
            border: '1px solid #8BA63A'
          }}
          onClick={() => {
            dispatch(removeSelectedStatistic(statistic.id))
          }}
      >
          <div
              className="h-4 w-4 m-auto rounded-full"
              style={{
                background: '#8BA63A'
              }}/>
      </div>
    }
    <div onClick={() => history.push(`/detailStatistic/${statistic.id}`)}>
      {
        url
          ? <div className="rounded-xl border h-36 w-full cursor-default" style={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
            transition: 'all 0.5s ease-in-out',
            position: 'relative',
            backgroundImage: `url("${url}")`,
            zIndex: 0
          }}/>
          // <img className="rounded-md border" src={url} alt="Нет изображения"/>
          : <div
            className="w-full h-36 rounded-xl flex p-4 text-2xl"
            style={{
              background: '#E6E6EB'
            }}
          >
            <p className="m-auto truncate">{statistic.name}</p>
          </div>
      }
    </div>
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
            return <div key={el.id} className="absolute" style={{
              zIndex: (statistic.accessForUsers.length - idx),
              transform: `translateX(${idx * 20}px)`
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