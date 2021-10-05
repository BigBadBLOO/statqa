import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {Button} from "@components/Base/Button";
import React from "react";
import workWithServer from "@core/workWithServer";
import {addAlert} from "@/store/features/alertSlice";
import {setIntegrationUsers} from "@/store/features/integrationAppSlice";

const HeaderPage: React.FC = () => {
    const selectedRows = useAppSelector((state => state.integrationPage.selectedRows));
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.app.allIntegrationUsers);
    const handleDelete = () => {
        workWithServer.deleteUserAndCabinet(selectedRows)
            .then((data: Message) => {
                dispatch(addAlert(data));
                const user_ids = selectedRows.filter(row => row.type === 'user').map(row => row.id)
                const cabinet_ids = selectedRows.filter(row => row.type === 'cabinet').map(row => row.id)
                const filter_users = users.reduce((acc: IIntegrationUser[], user: IIntegrationUser) => {
                    if(user_ids.indexOf(user.id) < 0){
                        let user_temp = user;
                        if(cabinet_ids.length > 0){
                            const cabinets = user.cabinets.filter(cabinet => {
                                const cabinet_id = cabinet.id;
                                console.log( cabinet_ids.indexOf(cabinet_id) < 0)
                                return cabinet_ids.indexOf(cabinet_id) < 0
                            });
                            user_temp = {...user_temp, cabinets}
                        }
                        acc.push(user_temp)
                    }
                    return acc
                }, []);
                dispatch(setIntegrationUsers(filter_users))
            })
            .catch(() => {
                dispatch(addAlert({
                    type: 'error',
                    message: 'Не установлено соединение с сервером'
                }))
            })
    }
    return  <div className="flex divide-x-2">
        <p className="font-bold text-xl my-auto mr-2">Интеграция</p>
        <div>
            <Button
                type="secondary"
                disabled={selectedRows.length === 0}
                text="Удалить"
                icon="delete"
                className="ml-2"
                classNameText="sm:block"
                onClick={handleDelete}
            />
        </div>
    </div>
}

export default HeaderPage