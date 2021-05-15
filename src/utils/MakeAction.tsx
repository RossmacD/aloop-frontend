import { Flex, Label, MenuButton, Button } from '@fluentui/react-northstar';
import React, { useState } from 'react'
import { VertMenuIcon } from '../style/icons';
import { colors } from '../style/colors'


export const makeAction = (Component: any, props: any) => {
    const { action, ...restProps } = props;
    return <Component {...restProps} onClick={action} />
}



export const makeMenuAction = (Component: any, props: any) => {
    // const { action, ...restProps } = props;
    const { action, role_id, unseen, style, ...restProps } = props;
    return (<Flex styles={{ alignItems: "center", justifyContent: "space-between", width: "100%" }} >
        <   Component {...restProps} onClick={action} wrapper={{ style: { ...style, flex: "1" } }} />
        {
            unseen && unseen > 0 ? <Label
                // styles={{ position: "absolute", right: "0.1rem" }}
                content={unseen}
                color={colors.green["300"]}
                circular
            /> : ""
        }
        {/* {
            role_id !== 2 ? <MenuButton trigger={<Button iconOnly text icon={<VertMenuIcon />} />}>

            </MenuButton> : ""
        } */}
    </Flex >)
}