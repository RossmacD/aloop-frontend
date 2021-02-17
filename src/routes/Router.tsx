import React, { ReactElement } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import RegisterPage from "../pages/Auth/RegisterPage";
import { LOGIN_PATH, REGISTER_PATH } from "./Paths";
import CenteredPage from "../pages/templates/CenteredPage";
import { VideoCall } from "../components/video/VideoCall";
import LoginPage from "../pages/Auth/LoginPage";
import { HomePage } from "../pages/HomePage";
import ProfilePage from "../pages/Auth/ProfilePage";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // const [{ data: loginData }] = useGetOwnEmailQuery();

  // const onlyLoggedIn = (page: ReactElement, alt: ReactElement = <Redirect to="/login" />) => loginData?.getSelf?.email ? page : alt
  // const onlyLoggedOut = (page: ReactElement, alt: ReactElement = <Redirect to="/" />) => !loginData?.getSelf?.email ? page : alt

  // const self = useGetSelfQuery();

  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path={LOGIN_PATH}>
        {/* {onlyLoggedOut(<LoginPage />)} */}
        <LoginPage />
      </Route>
      <Route path={REGISTER_PATH}>
        <RegisterPage />
      </Route>
      <Route path={"/video"}>
        <CenteredPage>
          <VideoCall />
        </CenteredPage>
      </Route>
      <Route path={"/profile"}>
        <ProfilePage />
      </Route>
      {/* <Route path={PASS_RESET_PATH}>
        {onlyLoggedOut(<ForgotPasswordPage />)}
      </Route> */}
      {/* <Route path={PASS_RESET_PATH + '/:token'}>
        {onlyLoggedOut(<PasswordResetPage />)}
      </Route> */}
      <Route path="*">
        {/* <ErrorPage error={{ number: 404, message: "Page not found" }}></ErrorPage> */}
      </Route>
    </Switch>
  )
}