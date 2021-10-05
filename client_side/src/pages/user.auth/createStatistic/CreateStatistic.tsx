// core
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

//components
import {Button} from "@components/Base/Button";
import {ImageUploader, Input} from "@components/Base/Input";
import Row from "@components/Base/Row";
import workWithServer from "@core/workWithServer";
import {Selector} from "@components/Base/Selector";
import {useAppDispatch} from "@/store/hooks";
import {addAlert} from "@/store/features/alertSlice";

export default function CreateStatistic() {
  let history = useHistory();
  const dispatch = useAppDispatch();
  const initStatistic: Statistic = {
    name: '',
    campaigns: []
  }
  const [addStatistic, setAddStatistic] = useState(initStatistic)
  const [image, setImage] = useState(addStatistic.avatar)
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    workWithServer.getCampaignsName().then((data: Campaign[]) => {
      setCampaigns(data)
    })
  }, [])


  const fb_campaigns = campaigns.filter(el => el.type === 'Facebook')
  const vk_campaigns = campaigns.filter(el => el.type === 'ВКонтакте')

  const saveStatisticHandler = () => {
    workWithServer.saveStatistic(addStatistic).then((data: Message) => {
      dispatch(addAlert(data))
    })
  }
  return (
    <>
      <div className="flex">
        <i
          className="material-icons mr-2 my-auto cursor-pointer"
          onClick={() => {
            history.push('/')
          }}
        >arrow_back</i>
        <span className="font-bold text-xl my-auto mr-2">Создание статистики</span>
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
            setValue={(description) => setAddStatistic((prev: Statistic) => ({
              ...prev,
              description
            }))}
          />
        </Row>
        <Row label="Обложка">
          <ImageUploader image={image} setImage={setImage} circle={false}/>
        </Row>
        <Row label="Метки">
          <Input
            value={addStatistic.tags}
            placeholder="Укажите метки через запятую, не более 5 штук"
            setValue={(tags) => setAddStatistic((prev: Statistic) => ({
              ...prev,
              tags
            }))}
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
                    setAddStatistic({...addStatistic, campaigns: [...other_campaigns,...campaigns]})
                  }}
                  options={fb_campaigns.map(el => ({value: el.uid, label: el.name}))}
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
                    setAddStatistic({...addStatistic, campaigns: [...other_campaigns,...campaigns]})
                  }}
                  options={vk_campaigns.map(el => ({value: el.uid, label: el.name}))}
              />
          </Row>
        }
        <Row label="Ценность конверсии">
          <Input
            value={addStatistic.conversion}
            placeholder="Средний доход с одной конверсии"
            setValue={(tags) => setAddStatistic((prev: Statistic) => ({
              ...prev,
              tags
            }))}
          />
        </Row>
      </div>
      <div className="rounded shadow-sm bg-white mt-4 p-4">
        <Row label="Доступы">
          <Input
            value={addStatistic.conversion}
            placeholder="Введите эл. почту"
            setValue={(tags) => setAddStatistic((prev: Statistic) => ({
              ...prev,
              tags
            }))}
          />
        </Row>
      </div>

      <Button
        type="primary"
        text="Создать статистику"
        icon="add"
        className="mx-auto mt-4 w-full md:w-auto"
        onClick={saveStatisticHandler}
      />
    </>
  )
}