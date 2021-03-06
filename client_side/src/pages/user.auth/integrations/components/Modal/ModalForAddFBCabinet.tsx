//core
import React, {useEffect, useState} from "react";

//components
import {Selector} from "@components/Base/Selector";
import {Button} from "@components/Base/Button";
import MyModal from "@components/Modal/Modal";

import workWithServer from "@core/workWithServer";

//redux
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setIntegrationUsers} from "@/store/features/integrationAppSlice";
import {addAlert} from "@/store/features/alertSlice";
import {setSelectedRows} from "@/store/features/integrationPageSlice";

interface IModalForAddApp {
  show: boolean;
  setShow: (arg0: boolean) => void
}

const ModalForAddFBCabinet: React.FC<IModalForAddApp> = ({show, setShow}) => {
  const initSelectedAccount: IIntegrationUser = {}
  const [selectedAccount, setSelectedAccount] = useState(initSelectedAccount)
  const [cabinets, setCabinets] = useState([])
  const [selectedCabinets, setSelectedCabinets] = useState([])
  const [isLoadingCabinet, setIsLoadingCabinet] =useState(false)
  const dispatch = useAppDispatch();
  const allIntegrationUsers = useAppSelector((state) => state.app.allIntegrationUsers)
  const integrationUsers = allIntegrationUsers.filter(user => user.app.name === 'Facebook')

  const [error, setError] = useState('')
  //get Cabinets From FB
  useEffect(() => {
    if (selectedAccount.id) {
      setIsLoadingCabinet(true)
      const account_id = selectedAccount.id
      workWithServer.getIntegrationCabinetsFromFB({account_id})
        .then((data: IIntegrationCabinet[] | Message) => {
          setSelectedCabinets([])
          if (Array.isArray(data)) {
            setCabinets(data)
          } else if (typeof data === 'object') {
            setCabinets([])
            setError(data.message)
          }
          setIsLoadingCabinet(false)
        })
    }
  }, [selectedAccount])

  // //addCabinets
  // const [saveFBCabinetsMutation] = useMutation(saveFBCabinets, {
  //     update(cache, {data: {saveFBCabinets}}) {
  //         const old_data: { getListIntegrationAccounts: IntegrationAccount[] } = cache.readQuery({
  //             query: GetListIntegrationAccounts,
  //             variables: {
  //                 platformName: params.platformId
  //             }
  //         });
  //         cache.writeQuery({
  //             query: GetListIntegrationAccounts,
  //             variables: {
  //                 platformName: params.platformId
  //             },
  //             data: {
  //                 getListIntegrationAccounts: old_data.getListIntegrationAccounts.map(account => {
  //                     const old_cabinets = account.cabinets ? account.cabinets : []
  //                     const cabinets = saveFBCabinets.filter((cabinet: IntegrationCabinet) => cabinet.account.id === account.id)
  //                     return {...account, cabinets: [...old_cabinets, ...cabinets]}
  //                 })
  //             }
  //         })
  //     }
  // });
  //
  const saveFBCabinetsHandler = (e: React.FormEvent) => {
    e.preventDefault()
    workWithServer.saveIntegrationCabinetsFromFB({
      account_id: selectedAccount.id,
      cabinets: selectedCabinets
    }).then((data: IIntegrationCabinet[]) => {
      const idx_user = allIntegrationUsers.findIndex((el) => el.id === selectedAccount.id)
      if(idx_user >= 0){
        const result = allIntegrationUsers.map(user => {
          if(user.id === selectedAccount.id){
            return {...user, cabinets: [...user.cabinets, ...data]}
          }
          return user
        });
        dispatch(setIntegrationUsers(result))
        dispatch(setSelectedRows([]))
        dispatch(addAlert({type: 'success', message: '???????????????? ?????????????? ??????????????????'}))
      }
      setShow(false)
      setSelectedAccount({})
      setSelectedCabinets([])
      setCabinets([])
    }).catch(e => {
      setError(JSON.stringify(e) + ' ...')
    })
  }

  return <MyModal show={show} showModal={setShow}>
    <form onSubmit={saveFBCabinetsHandler}>
      <p className="flex border-b pb-2">
        <span className="font-semibold text-xl">???????????????? ??????????????</span>
        <span className="material-icons ml-auto my-auto cursor-pointer text-gray-600"
              onClick={() => setShow(false)}
        >
                close
            </span>
      </p>
      <p className="mt-4">???????????????? ??????????????</p>
      <Selector
        type="primary"
        value={{value: selectedAccount.id, label: selectedAccount.name}}
        onChange={({value}) => {
          const account = integrationUsers.find(el => el.id === value)
          setSelectedAccount(account)
          setError('')
        }}
        options={
          integrationUsers.map((account) => ({value: account.id, label: account.name}))
        }
      />
      <p className="mt-4">???????????????? ??????????????</p>
      <Selector
        type="primary"
        value={selectedCabinets.map(el => ({value: el.uid, label: el.name}))}
        isMulti={true}
        isLoading={isLoadingCabinet}
        onChange={(data) => {
          const cabinetsList = data.map(({value}: { value: string }) => cabinets.find((cabinet) => cabinet.uid === value))
          setSelectedCabinets(cabinetsList)
        }}
        isOptionDisabled={(option: any) => option.disabled}
        options={
          [
            {
              label: "???????????????? ????????????????",
              options: cabinets
                .filter((cabinet) => !cabinet.account)
                .map((cabinet) => ({value: cabinet.uid, label: cabinet.name}))

            },
            {
              label: "?????????????????????????????? ?? ???????????? ??????????????????",
              options: cabinets
                .filter((cabinet) => cabinet.account)
                .map((cabinet) => ({
                  disabled: true,
                  value: cabinet.uid,
                  label: `${cabinet.name}(${cabinet.account.name})`
                }))
            },
          ]
        }
      />

      {
        error && <p className="pt-2 text-center text-red-500">{error}</p>
      }
      <Button
        className="mt-8 w-full"
        type="primary"
        text="??????????????????"
        disabled={selectedCabinets.length === 0}
        submit={true}
      />
    </form>
  </MyModal>
}

export default ModalForAddFBCabinet