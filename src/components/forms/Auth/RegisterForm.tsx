import React, { ReactElement, useState } from 'react'
import { Form } from '@fluentui/react-northstar'
import { useForm } from 'react-hook-form'
import { MakeForm } from '../../../utils/forms/MakeForm';
import { emailValidation } from '../../../utils/validators/emailValidation';
import { passwordValidation } from '../../../utils/validators/passwordValidation';
import { FormTemplate } from '../template/FormTemplate';
import { useMutation } from 'react-query';

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
    interface RegisterInput {
        email: string
        password: string
        firstName: string
        lastName: string
    }

    const [registerMutation, { isLoading }] = useMutation(({ email, password, firstName, lastName }: RegisterInput) => fetch(`http://${'192.168.50.90'}:8000/register`, {
        method: 'POST',
        body: JSON.stringify({ first_name: firstName, last_name: lastName, pass: password, email }),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res =>
        res.json()
    ).catch((e) => {
        console.error("REQUEST ERRor", e)
        throw e
    }))


    const [success, setSuccess] = useState(false)

    const attemptLogin = (data: any) => {
        // Get email and password from data
        const { email, password, firstName, lastName } = data;
        //Try to login
        if (email && password && firstName && lastName) {
            registerMutation({ email, password, firstName, lastName })
                .then((all) => {
                    console.log(all)
                    // If theres a server error show in UI
                    if (all.error) return setError("password", {
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