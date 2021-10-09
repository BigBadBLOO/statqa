//core
import React from "react";

//components
import FacebookButtons from "./Facebook";
import VKButtons from "@pages/user.auth/integrations/components/TabPanelWithButtons/VK";

export interface ITabPanelWithButtons {
    app: IIntegrationApp
}

const TabPanelWithButtons: React.FC<ITabPanelWithButtons> = ({app}) => {
    switch (app.name) {
        case 'Facebook':
            return <FacebookButtons app={app}/>
        case 'ВКонтакте':
            return <VKButtons app={app}/>
        default:
            return <div className="py-4"/>
    }
}

export default TabPanelWithButtons