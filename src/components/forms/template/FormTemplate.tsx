import React, { ReactElement, useState } from 'react'
import { ComponentEventHandler, Form, FormProps } from '@fluentui/react-northstar'
import { Redirect } from 'react-router-dom';

interface Props {
    onSubmit?: ComponentEventHandler<FormProps>
    success?: boolean,
    fetching?: boolean
    to?: string
}

export const FormTemplate: React.FC<Props> = ({ children, onSubmit, success, fetching, to = '/' }) => {
    return success ? <Redirect to={to} /> : (
        <Form onSubmit={onSubmit} styles={{ justifyContent: 'start', width: 'auto', margin: '1rem 2rem' }}>
            {children}
            <Form.Button content="Submit" loading={fetching} disabled={fetching} fluid primary />
        </Form>
    )
}

