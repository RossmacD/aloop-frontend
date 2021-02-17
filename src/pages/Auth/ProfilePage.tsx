import React, { ReactElement, useEffect } from 'react';
import CenteredPage from '../templates/CenteredPage';
import { Link, Redirect } from 'react-router-dom';
import { LOGIN_PATH, } from '../../routes/Paths';
import { useGetSelfQuery } from '../../api/authQueries';
import { Flex, Loader, Text } from '@fluentui/react-northstar'

const ProfilePage = (): ReactElement => {
    // const authenticated = false

    // const cache = useQueryCache();
    const { status, data, error, isFetching } = useGetSelfQuery();

    return isFetching ? (<Loader />) : !error ?
        (
            <CenteredPage>
                <h1>Welcome {data.email}</h1>
            </CenteredPage>
        )
        : (
            // <Redirect to={LOGIN_PATH} />
            <CenteredPage>
                <Text error>{typeof error === "string" ? error : "Authentication Error: Timeout"}</Text>
                <Link to={LOGIN_PATH}>Login</Link>
            </CenteredPage>
        )


}


export default ProfilePage;
