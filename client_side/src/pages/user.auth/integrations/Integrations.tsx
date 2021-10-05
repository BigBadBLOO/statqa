//core
import React, {useEffect} from "react";

//components
import HeaderPage from "@pages/user.auth/integrations/components/HeaderPage";
import TabPanelWithContent from "./components/TabPanelWithContent/TabPanelWIthContent";

//styles
import './integration.scss'
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import workWithServer from "@core/workWithServer";
import {setAllApps} from "@/store/features/integrationAppSlice";



const Integrations: React.FC = () => {
  const apps = useAppSelector((state => state.app.allApps))

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(apps.length === 0){
      workWithServer.getAllApp().then((data) => {
        dispatch(setAllApps(data))
      })
    }
  }, [])

  return (
    <>
      <HeaderPage/>
      <TabPanelWithContent/>
    </>
  )
}

export default Integrations