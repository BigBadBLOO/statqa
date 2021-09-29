//core
import React, {useState} from "react";

//components
import {Selector} from "@components/Base/Selector";
import {Button} from "@components/Base/Button";
import MyModal from "@components/Modal/Modal";
import GlobalLoader from "@components/Loaders/GlobaLoader";
import {useAppSelector} from "@/store/hooks";

interface IModalForAddApp {
    show: boolean;
    setShow: (arg0: boolean) => void
}

const ModalForAddFBCabinet: React.FC<IModalForAddApp> = ({show, setShow}) => {
    const initSelectedAccount: IIntegrationUser = {}
    const [selectedAccount, setSelectedAccount] = useState(initSelectedAccount)
    const [selectedCabinets, setSelectedCabinets] = useState([])

    const allIntegrationUsers = useAppSelector((state) => state.app.allIntegrationUsers)
    const integrationUsers = allIntegrationUsers.filter(user => user.app.name === 'Facebook')

    // //get Cabinets From FB
    // const [getCabinetsFromFB, cabinetsFromFB] = useLazyQuery(GetCabinetsFromFB, {fetchPolicy: "network-only"});
    // let cabinets: IntegrationCabinet[] = []
    // if (cabinetsFromFB.data) {
    //     cabinets = cabinetsFromFB.data.getCabinetsFromFB
    // }
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
        saveFBCabinetsMutation({
            variables: {
                account_id: selectedAccount.id,
                cabinets: selectedCabinets.map((el) => {
                    const {__typename, ...data} = el
                    return data
                })
            }
        }).then((data) => {
            setShow(false)
            setSelectedAccount({})
            setSelectedCabinets([])
            cabinets = []
            alert.success("Данные успешно добавлены")
        }).catch(e => {
            alert.error(JSON.stringify(e).substr(0, 30) + ' ...')
        })
    }

    return <MyModal show={show} showModal={setShow}>
        <form onSubmit={saveFBCabinetsHandler}>
            <p className="flex border-b pb-2">
                <span className="font-semibold text-xl">Добавить кабинет</span>
                <span className="material-icons ml-auto my-auto cursor-pointer text-gray-600"
                      onClick={() => setShow(false)}
                >
                close
            </span>
            </p>
            <p className="mt-4">Выберите аккаунт</p>
            <Selector
                type="primary"
                value={{value: selectedAccount.id, label: selectedAccount.name}}
                onChange={({value}) => {
                    const account = integrationUsers.find(el => el.id === value)
                    setSelectedAccount(account)
                    if (account) {
                    }
                }}
                options={
                    integrationUsers.map((account) => ({value: account.id, label: account.name}))
                }
            />
            <p className="mt-4">Выберите кабинет</p>
            {/*<Selector*/}
            {/*    type="primary"*/}
            {/*    value={selectedCabinets.map(el => ({value: el.uid, label: el.name}))}*/}
            {/*    isMulti={true}*/}
            {/*    isLoading={cabinetsFromFB.loading}*/}
            {/*    onChange={(data) => {*/}
            {/*        const cabinetsList = data.map(({value}: { value: string }) => cabinets.find((cabinet: IntegrationCabinet) => cabinet.uid === value))*/}
            {/*        setSelectedCabinets(cabinetsList)*/}
            {/*    }}*/}
            {/*    isOptionDisabled={(option: any) => option.disabled}*/}
            {/*    options={*/}
            {/*        [*/}
            {/*            {*/}
            {/*                label: "Достуные аккаунты",*/}
            {/*                options: cabinets*/}
            {/*                    .filter((cabinet: IntegrationCabinet) => !cabinet.account)*/}
            {/*                    .map((cabinet: IntegrationCabinet) => ({value: cabinet.uid, label: cabinet.name}))*/}

            {/*            },*/}
            {/*            {*/}
            {/*                label: "Интегрированные в других аккаунтах",*/}
            {/*                options: cabinets*/}
            {/*                    .filter((cabinet: IntegrationCabinet) => cabinet.account)*/}
            {/*                    .map((cabinet: IntegrationCabinet) => ({*/}
            {/*                        disabled: true,*/}
            {/*                        value: cabinet.uid,*/}
            {/*                        label: `${cabinet.name}(${cabinet.account.name})`*/}
            {/*                    }))*/}
            {/*            },*/}
            {/*        ]*/}
            {/*        // cabinets.map((cabinet: IntegrationCabinet) => ({value: cabinet.uid, label: cabinet.name}))*/}
            {/*    }*/}
            {/*/>*/}

            <Button
                className="mt-8 w-full"
                type="primary"
                text="сохранить"
                disabled={selectedCabinets.length === 0}
                submit={true}
            />
        </form>
    </MyModal>
}

export default ModalForAddFBCabinet