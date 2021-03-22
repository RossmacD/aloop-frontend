import React, { useState } from 'react'

export const makeAction = (Component: any, props: any) => {
    const { action, ...restProps } = props;
    return <Component {...restProps} onClick={action} />
}