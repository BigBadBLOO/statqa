//core
import React, {Suspense, lazy} from "react";
import {Route, Switch} from "react-router-dom";


//components
import GlobalLoader from "@components/Loaders/GlobaLoader";
import Header from "@components/user.auth/PageHeader/Header";
import BodyWrapper from "@components/user.auth/PageBody/BodyWrapper";


const Home = lazy(() => import('@pages/user.auth/home/Home'));
const PageNotFound = lazy(() => import('@pages/common/ErrorPages/PageNotFound404'));
const Documentation = lazy(() => import('@pages/user.auth/Documentation/Documentation'));
const Settings = lazy(() => import("@pages/user.auth/settings/Settings"));
const Integrations = lazy(() => import("@pages/integrations/Integrations"));
const RouterNavbar: React.FC = () => {
  return (
    <div className="pt-12 md:pl-12">
      <Header/>
      <BodyWrapper>
        <Suspense fallback={GlobalLoader}>
          <Switch>
            <Route path="/" exact={true} component={Home}/>
            {/*Интеграции*/}
            <Route path="/integrations/" exact component={Integrations}/>
            {/*Настройки*/}
            <Route path="/settings/" exact component={Settings}/>
            {/*Документация*/}
            <Route path="/documentation/" exact component={Documentation}/>
            <Route component={PageNotFound}/>
          </Switch>
        </Suspense>
      </BodyWrapper>
    </div>
  )
}
export default RouterNavbar