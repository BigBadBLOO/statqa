// core
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";

//components
import {Button} from "@components/Base/Button";
import {ImageUploader, Input} from "@components/Base/Input";
import Row from "@components/Base/Row";
import {Selector} from "@components/Base/Selector";
import TagsLabel from "@pages/user.auth/createStatistic/TagsLabel";

//redux
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {addAlert} from "@/store/features/alertSlice";
import workWithServer from "@core/workWithServer";
import {Campaign} from "../../../../../server_side/src/statistic/campaign.entity";
import Back from "@components/Base/back/Back";


export default function CreateStatistic() {
  let history = useHistory();
  let {id}: { id: string } = useParams();
  const statistics = useAppSelector(state => state.statistic.statistics)
  const statistic = statistics.find(el => el.id === Number(id))

  const dispatch = useAppDispatch();

  const initStatistic: Statistic = {
    in_archive: false,
    tags: '',
    description: '',
    name: '',
    conversion: null,
    campaigns: []
  };

  const [addStatistic, setAddStatistic] = useState(initStatistic)
  const [image, setImage] = useState(addStatistic.avatar)
  const [campaigns, setCampaigns] = useState([])
  const [connectedCampaigns, setConnectedCampaigns] = useState([])

  useEffect(() => {
    workWithServer.getCampaignsName().then((data: {result: Campaign[],  connected: Campaign[]}) => {
      setCampaigns(data.result)
      setConnectedCampaigns(data.connected)
    })
  }, [])

  useEffect(() => {
    if (id && statistic) {
      setAddStatistic(statistic)
      if (statistic.avatar) {
        const avatar = workWithServer.getStatisticAvatar(statistic.avatar)
        setImage(avatar)
      }
    }
  }, [statistic])

  if (id && !statistic) return <p className="text-center">Статистики не существует или у Вас нет к ней доступа</p>
  const fb_campaigns = campaigns.filter(el => el.type === 'Facebook')
  const vk_campaigns = campaigns.filter(el => el.type === 'ВКонтакте')

  const fb_connected_campaigns = connectedCampaigns.filter(el => el.type === 'Facebook')
  const vk_connected_campaigns = connectedCampaigns.filter(el => el.type === 'ВКонтакте')

  const fb_grouped_options: GroupedOption[] = [
    {
      label: 'Новые',
      options: fb_campaigns.map(el => ({value: el.uid, label: el.name})),
    },
    {
      label: 'Подключенные',
      options: fb_connected_campaigns.map(el => ({value: el.uid, label: el.name, isDisabled: true})),
    },
  ];

  const vk_grouped_options: GroupedOption[] = [
    {
      label: 'Новые',
      options: vk_campaigns.map(el => ({value: el.uid, label: el.name})),
    },
    {
      label: 'Подключенные',
      options: vk_connected_campaigns.map(el => ({value: el.uid, label: el.name, isDisabled: true})),
    },
  ];

  const saveStatisticHandler = () => {
    workWithServer.saveStatistic(addStatistic).then((data: Message) => {
      if (image) {
        const formData = new FormData();
        formData.append('file', image)
        formData.append('id', data.data)
        workWithServer.changeStatisticAvatar(formData).then(r => {
        })
      }
      dispatch(addAlert(data))
      history.push('/')
    })
  };

  return (
    <>
      <div className="flex">
        <Back/>
        <span className="font-bold text-xl my-auto mr-2">
          {
            id
              ? `Редактирование «${statistic && statistic.name}»`
              : 'Создание статистики'
          }
        </span>
      </div>

      <div className="rounded shadow-sm bg-white mt-4 p-4">
        <Row label="Название статистики">
          <Input
            value={addStatistic.name}
            placeholder="Введите название"
            setValue={(name) => setAddStatistic((prev: Statistic) => ({
              ...prev,
              name
            }))}
          />
        </Row>
        <Row label="Описание статистики">
          <Input
            value={addStatistic.description}
            placeholder="Введите описание"
            setValue={(description) => setAddStatistic((prev: Statistic) => ({...prev, description}))}
          />
        </Row>
        <Row label="Обложка">
          <ImageUploader image={image} setImage={setImage} circle={false}/>
        </Row>
        <Row label={<TagsLabel
            title="Метки"
            help={
              <span>
                Метки для группировки статистик и быстрого поиска. <br/>
                Метки источников трафика создаются автоматически
              </span>
            }
          />}>
          <Input
            value={addStatistic.tags}
            placeholder="Укажите метки через запятую, не более 5 штук"
            setValue={(tags) => setAddStatistic((prev: Statistic) => ({...prev, tags}))}
          />
        </Row>
      </div>
      <div className="rounded shadow-sm bg-white mt-4 p-4">
        {
          fb_campaigns.length > 0 && <Row label="Кампаний Facebook">
              <Selector
                  type="modal"
                  isMulti={true}
                  value={
                    addStatistic.campaigns
                      .filter(el => el.type === 'Facebook')
                      .map(el => ({value: el.uid, label: el.name}))
                  }
                  onChange={(data) => {
                    const campaigns = data.map(({value}: { value: number }) => {
                      return fb_campaigns.find(el => el.uid === value)
                    })
                    const other_campaigns = addStatistic.campaigns.filter(el => el.type !== 'Facebook')
                    setAddStatistic({...addStatistic, campaigns: [...other_campaigns, ...campaigns]})
                  }}
                  options={fb_grouped_options}
              />
          </Row>
        }
        {
          vk_campaigns.length > 0 && <Row label="Кампаний ВКонтакте">
              <Selector
                  type="modal"
                  isMulti={true}
                  value={
                    addStatistic.campaigns
                      .filter(el => el.type === 'ВКонтакте')
                      .map(el => ({value: el.uid, label: el.name}))
                  }
                  onChange={(data) => {
                    const campaigns = data.map(({value}: { value: number }) => {
                      return vk_campaigns.find(el => el.uid === value)
                    })
                    const other_campaigns = addStatistic.campaigns.filter(el => el.type !== 'ВКонтакте')
                    setAddStatistic({...addStatistic, campaigns: [...other_campaigns, ...campaigns]})
                  }}
                  options={vk_grouped_options}
              />
          </Row>
        }
        <Row label={<TagsLabel
          title="Ценность конверсии"
          help={
            <span>Укажите средний доход с одной конверсии в валюте рекламного кабинета, чтобы в статистике считалась экономика: доход, прибыль и ROI</span>
          }
        />}>
          <Input
            value={addStatistic.conversion}
            placeholder="Средний доход с одной конверсии"
            setValue={(conversion) => setAddStatistic((prev: Statistic) => ({
              ...prev,
              conversion
            }))}
          />
        </Row>
      </div>
      <div className="rounded shadow-sm bg-white mt-4 p-4">
        <Row label="Доступы">
          {/*<Input*/}
          {/*  value={addStatistic.conversion}*/}
          {/*  placeholder="Введите эл. почту"*/}
          {/*  setValue={(tags) => setAddStatistic((prev: Statistic) => ({*/}
          {/*    ...prev,*/}
          {/*    tags*/}
          {/*  }))}*/}
          {/*/>*/}
        </Row>
      </div>

      <Button
        type="primary"
        text={id ? "Сохранить" : "Создать статистику"}
        icon="add"
        className="mx-auto mt-4 w-full md:w-auto"
        onClick={saveStatisticHandler}
      />
    </>
  )
}