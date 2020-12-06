import React, { ReactElement } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
// import Temp from "../components/temp/Temp";
// import LoginForm from "../components/forms/Auth/loginForm/LoginForm";

// import LoginPage from "../pages/Auth/LoginPage";
import ErrorPage from "../pages/templates/ErrorPage";
import RegisterPage from "../pages/Auth/RegisterPage";
// import PasswordResetPage from "../pages/Auth/PassResetPage";
// import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage";
import { LOGIN_PATH, REGISTER_PATH, PASS_RESET_PATH } from "./Paths";
import CenteredPage from "../pages/templates/CenteredPage";
import { VideoCall } from "../components/video/VideoCall";

export default () => {
  // const [{ data: loginData }] = useGetOwnEmailQuery();

  // const onlyLoggedIn = (page: ReactElement, alt: ReactElement = <Redirect to="/login" />) => loginData?.getSelf?.email ? page : alt
  // const onlyLoggedOut = (page: ReactElement, alt: ReactElement = <Redirect to="/" />) => !loginData?.getSelf?.email ? page : alt

  return (
    <Switch>
      <Route exact path="/">
        <CenteredPage>
          {/* {onlyLoggedIn(<Temp />, <h1>Welcome to Greenstar Aviation</h1>)} */}
        </CenteredPage>
      </Route>
      <Route path={LOGIN_PATH}>
        {/* {onlyLoggedOut(<LoginPage />)} */}
      </Route>
      <Route path={REGISTER_PATH}>
        <RegisterPage />
      </Route>
      <Route path={"/video"}>
        <CenteredPage>
          <VideoCall />
        </CenteredPage>
      </Route>
      {/* <Route path={PASS_RESET_PATH}>
        {onlyLoggedOut(<ForgotPasswordPage />)}
      </Route> */}
      {/* <Route path={PASS_RESET_PATH + '/:token'}>
        {onlyLoggedOut(<PasswordResetPage />)}
      </Route> */}
      <Route path="*">
        <ErrorPage error={{ number: 404, message: "Page not found" }}></ErrorPage>
      </Route>
    </Switch>
  )
}