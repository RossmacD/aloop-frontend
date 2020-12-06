import React, { ReactElement } from 'react';
import RegisterForm from '../../components/forms/Auth/RegisterForm';
import CenteredPage from '../templates/CenteredPage';
// import RegisterForm from '../../components/forms/Auth/registerForm/RegisterForm';

const RegisterPage = (): ReactElement => (
    <CenteredPage>
        <h1>Add New User</h1>
        <RegisterForm />
    </CenteredPage>)


export default RegisterPage;
