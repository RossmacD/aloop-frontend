import { Grid } from '@fluentui/react-northstar'
import React from 'react'
import CenteredPage from './CenteredPage'

interface Props {

}

export const GridPage: React.FC<Props> = ({ children }) => {
    return (
        <CenteredPage vertCenter={false}>
            <Grid styles={{
                gridTemplateColumns: 'repeat(6, 1fr)', width: '100%', gridTemplateRows: 'min-content',
                // gap: '2rem 1.5rem'
                columnGap: '1.5rem'
            }}>
                {children}
            </Grid>
        </CenteredPage>
    )
}