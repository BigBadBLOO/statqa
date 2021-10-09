//core
import React, {useState} from "react";

//components
import {Button} from "@components/Base/Button";
import ModalForAddIntegrationAccount from "../Modal/ModalForAddIntegrationAccount";

import {ITabPanelWithButtons} from "@pages/user.auth/integrations/components/TabPanelWithButtons/TabPanelWithButtons";

const VKButtons: React.FC<ITabPanelWithButtons> = ({app}) => {

    const [showModalForAddAccount, setShowModalForAddAccount] = useState(false)

    return <div className="flex py-4">
        <Button
            type="primary"
            text="Доб. аккаунт"
            icon="add"
            className="mr-2"
            onClick={() => setShowModalForAddAccount(true)}
        />

        <ModalForAddIntegrationAccount
            show={showModalForAddAccount}
            setShow={setShowModalForAddAccount}
            app={app}
        />
    </div>
}

export default VKButtons