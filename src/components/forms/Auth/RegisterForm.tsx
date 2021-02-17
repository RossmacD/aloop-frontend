import React, { ReactElement, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MakeForm } from '../../../utils/forms/MakeForm';
import { emailValidation } from '../../../utils/validators/emailValidation';
import { passwordValidation } from '../../../utils/validators/passwordValidation';
import { FormTemplate } from '../template/FormTemplate';
import { useRegisteryQuery } from '../../../api/authQueries';

interface Props {
    width?: string
}

function RegisterForm({ width }: Props): ReactElement {
    // Form Validation
    const { register, handleSubmit, setError, errors, formState, getValues } = useForm({ mode: 'onBlur', reValidateMode: 'onBlur' });
    // Submission : Change to react Query
    // const [{ fetching }, registerMutation] = useRegisterMutation()
    // const todosQuery = useQuery('todos', getTodos)
    // const { isLoading, error, data }

    const [registerMutation, { isLoading }] = useRegisteryQuery();

    const [success, setSuccess] = useState(false)

    const attemptLogin: SubmitHandler<any> = (data) => {
        // Get email and password from data
        const { email, password, firstName, lastName } = data;
        //Try to login
        if (email && password && firstName && lastName) {
            registerMutation({ email, pass: password, first_name: firstName, last_name: lastName })
                .then((all) => {
                    console.log(all)
                    // If theres a server error show in UI
                    if (!all || !all.ok) return setError("password", {
                        type: "server",
                        message: "Email already taken"
                    })
                    // Process successful login
                    console.log(all)
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
            { id: "password", type: 'password', validation: passwordValidation },
            {
                id: "confirmPassword", type: 'password', validation: {
                    ...passwordValidation,
                    validate: (value) => {
                        const { password } = getValues()
                        return value === password || 'Passwords must match'
                    }
                }
            },
            { id: 'firstName', validation: { required: true } },
            { id: 'lastName', validation: { required: true } }
        ],
            errors, register, formState)}
    </FormTemplate>
    )
}

export default RegisterForm