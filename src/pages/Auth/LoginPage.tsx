import React, { ReactElement } from 'react';
// import LoginForm from '../../components/forms/Auth/loginForm/LoginForm';
import CenteredPage from '../templates/CenteredPage';
import { Link } from 'react-router-dom';
import { PASS_RESET_PATH } from '../../routes/Paths';
import { LoginForm } from '../../components/forms/Auth/LoginForm';

const LoginPage = (): ReactElement => (
    <CenteredPage>
        <h1>Login</h1>
        <LoginForm />
        <Link to={PASS_RESET_PATH}>Forgot Password?</Link>
    </CenteredPage>)


export default LoginPage;
