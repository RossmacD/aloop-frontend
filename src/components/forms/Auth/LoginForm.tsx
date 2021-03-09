


import React, { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLoginQuery } from '../../../api/authQueries'
import { MakeForm } from '../../../utils/forms/MakeForm'
import { emailValidation } from '../../../utils/validators/emailValidation'
import { passwordValidation } from '../../../utils/validators/passwordValidation'
import { LOGIN } from '../../app/authReducer'
import { FormTemplate } from '../template/FormTemplate'
import { AuthUserContext } from '../../app/App'
interface Props {

}

export const LoginForm: React.FC<Props> = ({ children }) => {
    const authcontext = useContext(AuthUserContext)
    // Form Validation
    const { register, handleSubmit, setError, errors, formState, getValues } = useForm({ mode: 'onBlur', reValidateMode: 'onBlur', });
    // Submission : Change to react Query
    // const [{ fetching }, registerMutation] = useRegisterMutation()
    // const todosQuery = useQuery('todos', getTodos)
    // const { isLoading, error, data }

    // const [loginMutation, { isLoading }] = useLoginQuery();
    const { mutateAsync: loginMutation, isLoading } = useLoginQuery();

    const [success, setSuccess] = useState(false)

    const attemptLogin: SubmitHandler<any> = (data, event) => {
        event?.preventDefault();
        // Get email and password from data
        const { email, password } = data;
        //Try to login
        if (email && password) {
            loginMutation({ email, pass: password, })
                .then((all) => {
                    console.log(all)
                    // If theres a server error show in UI
                    if (all && (all.message || all.errors)) return setError("password", {
                        type: "server",
                        message: all?.errors[0]?.message || "Password Incorrect"
                    })
                    // Process successful login
                    console.log(all)
                    authcontext?.dispatch({
                        type: LOGIN,
                        payload: all
                    })
                    setSuccess(true)
                })
                .catch((err) => {
                    console.log(err);
                    setError("password", { type: "server", message: "Error: 500" })
                })
        } else {
            setError("password", {
                type: "server",
                message: "Invalid input"
            })
        }
    }

    return (<FormTemplate success={success} fetching={isLoading} onSubmit={handleSubmit(attemptLogin)}>
        {MakeForm([
            { id: "email", type: 'email', validation: emailValidation },
            { id: "password", type: 'password', validation: passwordValidation }
        ],
            errors, register, formState)}
    </FormTemplate>
    )
}